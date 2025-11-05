import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { UnifiedSidebar } from "@/components/admin/UnifiedSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, GripVertical, Mail, Linkedin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  full_name: string;
  position: string;
  bio: string | null;
  photo_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  credentials: string[];
  notable_projects: string[];
  display_order: number;
  is_active: boolean;
}

function SortableTeamCard({ member, onEdit, onDelete }: { member: TeamMember; onEdit: (member: TeamMember) => void; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: member.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-card border rounded-lg p-4">
      <div className="flex items-center gap-4">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </button>
        <Avatar className="h-12 w-12">
          <AvatarImage src={member.photo_url || ''} alt={member.full_name} />
          <AvatarFallback>{member.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">{member.full_name}</h3>
          <p className="text-sm text-muted-foreground">{member.position}</p>
        </div>
        <div className="flex items-center gap-2">
          {member.email && <Mail className="w-4 h-4 text-muted-foreground" />}
          {member.linkedin_url && <Linkedin className="w-4 h-4 text-muted-foreground" />}
          <Switch checked={member.is_active} disabled />
          <Button variant="ghost" size="sm" onClick={() => onEdit(member)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(member.id)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LeadershipTeam() {
  const { isLoading, isAdmin } = useAdminAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  const [formData, setFormData] = useState({
    full_name: "",
    position: "",
    bio: "",
    photo_url: "",
    email: "",
    linkedin_url: "",
    credentials: [] as string[],
    notable_projects: [] as string[],
    is_active: true
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (!isLoading && isAdmin) {
      fetchMembers();
    }
  }, [isLoading, isAdmin]);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('leadership_team')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setMembers(data || []);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = members.findIndex(m => m.id === active.id);
    const newIndex = members.findIndex(m => m.id === over.id);
    const newMembers = arrayMove(members, oldIndex, newIndex);
    setMembers(newMembers);

    try {
      const updates = newMembers.map((member, index) => 
        supabase.from('leadership_team').update({ display_order: index }).eq('id', member.id)
      );
      await Promise.all(updates);
      toast({ title: "Success", description: "Order updated successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      fetchMembers();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const payload = {
        ...formData,
        display_order: editingMember ? editingMember.display_order : members.length,
        ...(editingMember ? { updated_by: user.id } : { created_by: user.id })
      };

      if (editingMember) {
        const { error } = await supabase
          .from('leadership_team')
          .update(payload)
          .eq('id', editingMember.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('leadership_team').insert([payload]);
        if (error) throw error;
      }

      toast({ title: "Success", description: `Team member ${editingMember ? 'updated' : 'added'} successfully` });
      setDialogOpen(false);
      resetForm();
      fetchMembers();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      const { error } = await supabase.from('leadership_team').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Success", description: "Team member deleted successfully" });
      fetchMembers();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      full_name: member.full_name,
      position: member.position,
      bio: member.bio || "",
      photo_url: member.photo_url || "",
      email: member.email || "",
      linkedin_url: member.linkedin_url || "",
      credentials: member.credentials || [],
      notable_projects: member.notable_projects || [],
      is_active: member.is_active
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingMember(null);
    setFormData({
      full_name: "",
      position: "",
      bio: "",
      photo_url: "",
      email: "",
      linkedin_url: "",
      credentials: [],
      notable_projects: [],
      is_active: true
    });
  };

  if (isLoading || loading) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <UnifiedSidebar collapsed={false} onToggle={() => {}} />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Leadership Team</h1>
            <p className="text-muted-foreground">Manage your leadership team profiles</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Add Team Member</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingMember ? 'Edit' : 'Add'} Team Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Photo</Label>
                    <ImageUploadField
                      value={formData.photo_url}
                      onChange={(url) => setFormData({ ...formData, photo_url: url })}
                      bucket="project-images"
                      label="Upload team member photo"
                    />
                  </div>
                  <div>
                    <Label>Full Name *</Label>
                    <Input required value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
                  </div>
                  <div>
                    <Label>Position *</Label>
                    <Input required value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div>
                    <Label>LinkedIn URL</Label>
                    <Input value={formData.linkedin_url} onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <Label>Bio</Label>
                    <Textarea rows={4} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <Label>Credentials (one per line)</Label>
                    <Textarea 
                      rows={3} 
                      value={formData.credentials.join('\n')} 
                      onChange={(e) => setFormData({ ...formData, credentials: e.target.value.split('\n').filter(c => c.trim()) })} 
                      placeholder="LEED AP&#10;PMP Certified&#10;Gold Seal Certification"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Notable Projects (one per line)</Label>
                    <Textarea 
                      rows={3} 
                      value={formData.notable_projects.join('\n')} 
                      onChange={(e) => setFormData({ ...formData, notable_projects: e.target.value.split('\n').filter(p => p.trim()) })} 
                      placeholder="Waterfront Condo Tower&#10;Heritage Building Restoration"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                    <Label>Active</Label>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">{editingMember ? 'Update' : 'Create'}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Members ({members.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {members.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No team members yet. Click "Add Team Member" to get started.
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={members.map(m => m.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {members.map(member => (
                      <SortableTeamCard key={member.id} member={member} onEdit={openEditDialog} onDelete={handleDelete} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
