import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface OverviewSection {
  id: string;
  section_type: "approach" | "values" | "promise";
  title: string;
}

interface OverviewItem {
  id: string;
  section_id: string;
  title: string | null;
  content: string;
  icon_name: string | null;
  display_order: number;
}

const LUCIDE_ICONS = ["ShieldCheck", "Award", "MessageSquare", "Heart", "CheckCircle2", "Target", "Zap", "Star"];

const SortableItem = ({ item, onEdit, onDelete }: { item: OverviewItem; onEdit: (item: OverviewItem) => void; onDelete: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-card border rounded-lg p-4 mb-3">
      <div className="flex items-start gap-3">
        <button {...attributes} {...listeners} className="mt-2 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              {item.title && <h4 className="font-semibold text-foreground">{item.title}</h4>}
              <p className="text-sm text-muted-foreground">{item.content}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(item)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomepageCompanyOverview = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"approach" | "values" | "promise">("approach");
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<OverviewItem | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", icon_name: "" });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const { data: sections = [] } = useQuery({
    queryKey: ["company-overview-sections"],
    queryFn: async () => {
      const { data, error } = await supabase.from("company_overview_sections").select("*").order("display_order");
      if (error) throw error;
      return data as OverviewSection[];
    },
  });

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["company-overview-items", activeTab],
    queryFn: async () => {
      const section = sections.find((s) => s.section_type === activeTab);
      if (!section) return [];
      const { data, error } = await supabase.from("company_overview_items").select("*").eq("section_id", section.id).order("display_order");
      if (error) throw error;
      return data as OverviewItem[];
    },
    enabled: sections.length > 0,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<OverviewItem> }) => {
      const { error } = await supabase.from("company_overview_items").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-overview-items"] });
      toast({ title: "Updated successfully" });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (item: Omit<OverviewItem, "id">) => {
      const { error } = await supabase.from("company_overview_items").insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-overview-items"] });
      setIsAdding(false);
      setFormData({ title: "", content: "", icon_name: "" });
      toast({ title: "Item added successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("company_overview_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-overview-items"] });
      toast({ title: "Item deleted" });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);

    newItems.forEach((item, index) => {
      updateMutation.mutate({ id: item.id, updates: { display_order: index + 1 } });
    });
  };

  const handleSave = () => {
    const section = sections.find((s) => s.section_type === activeTab);
    if (!section) return;

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, updates: { ...formData } });
      setEditingItem(null);
    } else {
      createMutation.mutate({ ...formData, section_id: section.id, display_order: items.length + 1 } as any);
    }
    setFormData({ title: "", content: "", icon_name: "" });
  };

  const handleEdit = (item: OverviewItem) => {
    setEditingItem(item);
    setFormData({ title: item.title || "", content: item.content, icon_name: item.icon_name || "" });
    setIsAdding(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Company Overview Hub</h1>
        <p className="text-muted-foreground">Manage the tabbed content section on the homepage</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList>
          <TabsTrigger value="approach">Our Approach</TabsTrigger>
          <TabsTrigger value="values">Our Values</TabsTrigger>
          <TabsTrigger value="promise">Our Promise</TabsTrigger>
        </TabsList>

        {["approach", "values", "promise"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {!isAdding && (
              <Button onClick={() => setIsAdding(true)} className="mb-6">
                <Plus className="w-4 h-4 mr-2" /> Add Item
              </Button>
            )}

            {isAdding && (
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">{editingItem ? "Edit Item" : "Add New Item"}</h3>
                <div className="space-y-4">
                  {tab !== "approach" && (
                    <div>
                      <Label>Title (optional for approach)</Label>
                      <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                  )}
                  <div>
                    <Label>Content</Label>
                    <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={3} />
                  </div>
                  {tab !== "approach" && (
                    <div>
                      <Label>Icon</Label>
                      <select value={formData.icon_name} onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })} className="w-full border rounded-md p-2">
                        <option value="">None</option>
                        {LUCIDE_ICONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                      </select>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save</Button>
                    <Button variant="outline" onClick={() => { setIsAdding(false); setEditingItem(null); setFormData({ title: "", content: "", icon_name: "" }); }}>Cancel</Button>
                  </div>
                </div>
              </Card>
            )}

            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                  {items.map((item) => (
                    <SortableItem key={item.id} item={item} onEdit={handleEdit} onDelete={(id) => deleteMutation.mutate(id)} />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HomepageCompanyOverview;
