import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, GripVertical, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  stats_badge: string | null;
  icon_name: string | null;
  display_order: number;
  is_active: boolean;
}

const LUCIDE_ICONS = [
  "BadgeCheck", "Building2", "ShieldCheck", "Clock", "Users", "Award",
  "CheckCircle2", "Target", "Zap", "Heart", "Star", "TrendingUp"
];

const SortableItem = ({ item, onEdit, onDelete }: { item: WhyChooseUsItem; onEdit: (item: WhyChooseUsItem) => void; onDelete: (id: string) => void }) => {
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
              <h4 className="font-semibold text-foreground">{item.title}</h4>
              {item.stats_badge && <p className="text-sm text-steel-blue">{item.stats_badge}</p>}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(item)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span>Icon: {item.icon_name || "None"}</span>
            <span>•</span>
            <span>Order: {item.display_order}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomepageWhyChooseUs = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<WhyChooseUsItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", stats_badge: "", icon_name: "BadgeCheck" });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["why-choose-us-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("why_choose_us_items")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as WhyChooseUsItem[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<WhyChooseUsItem> }) => {
      const { error } = await supabase.from("why_choose_us_items").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["why-choose-us-items"] });
      toast({ title: "Updated successfully" });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (item: Omit<WhyChooseUsItem, "id" | "is_active">) => {
      const { error } = await supabase.from("why_choose_us_items").insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["why-choose-us-items"] });
      setIsAdding(false);
      setFormData({ title: "", description: "", stats_badge: "", icon_name: "BadgeCheck" });
      toast({ title: "Item added successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("why_choose_us_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["why-choose-us-items"] });
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
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, updates: { ...formData } });
      setEditingItem(null);
    } else {
      createMutation.mutate({ ...formData, display_order: items.length + 1 } as any);
    }
    setFormData({ title: "", description: "", stats_badge: "", icon_name: "BadgeCheck" });
  };

  const handleEdit = (item: WhyChooseUsItem) => {
    setEditingItem(item);
    setFormData({ title: item.title, description: item.description, stats_badge: item.stats_badge || "", icon_name: item.icon_name || "BadgeCheck" });
    setIsAdding(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Why Choose Us Section</h1>
        <p className="text-muted-foreground">Manage the differentiator cards on the homepage</p>
      </div>

      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} className="mb-6">
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      )}

      {isAdding && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">{editingItem ? "Edit Item" : "Add New Item"}</h3>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
            </div>
            <div>
              <Label>Stats Badge</Label>
              <Input value={formData.stats_badge} onChange={(e) => setFormData({ ...formData, stats_badge: e.target.value })} placeholder="e.g., 500+ Projects" />
            </div>
            <div>
              <Label>Icon</Label>
              <select value={formData.icon_name} onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })} className="w-full border rounded-md p-2">
                {LUCIDE_ICONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save</Button>
              <Button variant="outline" onClick={() => { setIsAdding(false); setEditingItem(null); setFormData({ title: "", description: "", stats_badge: "", icon_name: "BadgeCheck" }); }}>Cancel</Button>
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
    </div>
  );
};

export default HomepageWhyChooseUs;
