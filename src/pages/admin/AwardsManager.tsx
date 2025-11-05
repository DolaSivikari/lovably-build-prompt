import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Award, AlertCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

interface AwardCertification {
  id: string;
  title: string;
  issuing_organization: string;
  date_received: string;
  expiry_date: string | null;
  category: 'certification' | 'award' | 'membership' | 'accreditation';
  badge_image_url: string | null;
  credential_number: string | null;
  verification_url: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  show_on_homepage: boolean;
  created_at: string;
  updated_at: string;
}

const AwardsManager = () => {
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [awards, setAwards] = useState<AwardCertification[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Partial<AwardCertification> | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  const fetchAwards = async () => {
    try {
        const { data, error } = await supabase
        .from('awards_certifications')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setAwards(data as AwardCertification[] || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAwards();
    }
  }, [isAdmin]);

  const handleSave = async () => {
    if (!editingAward?.title || !editingAward?.issuing_organization) {
      toast({
        title: 'Validation Error',
        description: 'Title and issuing organization are required',
        variant: 'destructive',
      });
      return;
    }

    try {
      const payload = {
        title: editingAward.title,
        issuing_organization: editingAward.issuing_organization,
        date_received: editingAward.date_received,
        expiry_date: editingAward.expiry_date,
        category: editingAward.category || 'certification',
        badge_image_url: editingAward.badge_image_url,
        credential_number: editingAward.credential_number,
        verification_url: editingAward.verification_url,
        description: editingAward.description,
        display_order: editingAward.display_order,
        is_active: editingAward.is_active,
        show_on_homepage: editingAward.show_on_homepage,
        ...(editingAward.id ? { updated_by: userId } : { created_by: userId }),
      };

      if (editingAward.id) {
        const { error } = await supabase
          .from('awards_certifications')
          .update(payload)
          .eq('id', editingAward.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Award updated successfully' });
      } else {
        const { error } = await supabase
          .from('awards_certifications')
          .insert([payload]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Award created successfully' });
      }

      setDialogOpen(false);
      setEditingAward(null);
      fetchAwards();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this award?')) return;

    try {
      const { error } = await supabase
        .from('awards_certifications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Award deleted successfully' });
      fetchAwards();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const newAward = () => {
    setEditingAward({
      title: '',
      issuing_organization: '',
      date_received: new Date().toISOString().split('T')[0],
      expiry_date: null,
      category: 'certification',
      badge_image_url: null,
      credential_number: null,
      verification_url: null,
      description: null,
      display_order: awards.length,
      is_active: true,
      show_on_homepage: false,
    });
    setDialogOpen(true);
  };

  const isExpired = (expiryDate: string | null): boolean => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (authLoading || loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Awards & Certifications</h1>
            <p className="text-muted-foreground">
              Manage company certifications, awards, and professional memberships
            </p>
          </div>
        </div>
        <Button onClick={newAward}>
          <Plus className="w-4 h-4 mr-2" />
          Add Award
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Homepage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {awards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No awards or certifications found. Click "Add Award" to create one.
                </TableCell>
              </TableRow>
            ) : (
              awards.map((award) => (
                <TableRow key={award.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {isExpired(award.expiry_date) && (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                      {award.title}
                    </div>
                  </TableCell>
                  <TableCell>{award.issuing_organization}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {award.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(award.date_received).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {award.expiry_date ? (
                      <span className={isExpired(award.expiry_date) ? 'text-destructive font-semibold' : ''}>
                        {new Date(award.expiry_date).toLocaleDateString()}
                        {isExpired(award.expiry_date) && ' (Expired)'}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">No expiry</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={award.is_active ? 'default' : 'secondary'}>
                      {award.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {award.show_on_homepage ? (
                      <Award className="h-4 w-4 text-primary" />
                    ) : null}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingAward(award);
                          setDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(award.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAward?.id ? 'Edit Award' : 'Add New Award'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={editingAward?.title || ''}
                onChange={(e) =>
                  setEditingAward({ ...editingAward, title: e.target.value })
                }
                placeholder="e.g., WSIB Clearance Certificate"
              />
            </div>

            <div>
              <Label htmlFor="organization">Issuing Organization *</Label>
              <Input
                id="organization"
                value={editingAward?.issuing_organization || ''}
                onChange={(e) =>
                  setEditingAward({
                    ...editingAward,
                    issuing_organization: e.target.value,
                  })
                }
                placeholder="e.g., Workplace Safety and Insurance Board"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editingAward?.category || 'certification'}
                  onValueChange={(value: any) =>
                    setEditingAward({ ...editingAward, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="certification">Certification</SelectItem>
                    <SelectItem value="award">Award</SelectItem>
                    <SelectItem value="membership">Membership</SelectItem>
                    <SelectItem value="accreditation">Accreditation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={editingAward?.display_order || 0}
                  onChange={(e) =>
                    setEditingAward({
                      ...editingAward,
                      display_order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date_received">Date Received</Label>
                <Input
                  id="date_received"
                  type="date"
                  value={editingAward?.date_received || ''}
                  onChange={(e) =>
                    setEditingAward({ ...editingAward, date_received: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="expiry_date">Expiry Date (optional)</Label>
                <Input
                  id="expiry_date"
                  type="date"
                  value={editingAward?.expiry_date || ''}
                  onChange={(e) =>
                    setEditingAward({
                      ...editingAward,
                      expiry_date: e.target.value || null,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="credential_number">Credential Number (optional)</Label>
              <Input
                id="credential_number"
                value={editingAward?.credential_number || ''}
                onChange={(e) =>
                  setEditingAward({
                    ...editingAward,
                    credential_number: e.target.value || null,
                  })
                }
                placeholder="e.g., COR-2023-12345"
              />
            </div>

            <div>
              <Label htmlFor="verification_url">Verification URL (optional)</Label>
              <Input
                id="verification_url"
                value={editingAward?.verification_url || ''}
                onChange={(e) =>
                  setEditingAward({
                    ...editingAward,
                    verification_url: e.target.value || null,
                  })
                }
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingAward?.description || ''}
                onChange={(e) =>
                  setEditingAward({ ...editingAward, description: e.target.value || null })
                }
                placeholder="Brief description of this award or certification"
                rows={3}
              />
            </div>

            <div>
              <Label>Badge Image (optional)</Label>
              <ImageUploadField
                value={editingAward?.badge_image_url || ''}
                onChange={(url) =>
                  setEditingAward({ ...editingAward, badge_image_url: url || null })
                }
                bucket="project-images"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={editingAward?.is_active || false}
                  onCheckedChange={(checked) =>
                    setEditingAward({ ...editingAward, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show_on_homepage"
                  checked={editingAward?.show_on_homepage || false}
                  onCheckedChange={(checked) =>
                    setEditingAward({ ...editingAward, show_on_homepage: checked })
                  }
                />
                <Label htmlFor="show_on_homepage">Show on Homepage</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingAward?.id ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AwardsManager;
