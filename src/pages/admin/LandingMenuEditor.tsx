import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, GripVertical } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface MenuItem {
  id: string;
  number: string;
  title: string;
  subtext: string;
  link: string;
  display_order: number;
}

function SortableMenuItem({
  item,
  onUpdate,
}: {
  item: MenuItem;
  onUpdate: (id: string, field: string, value: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card border rounded-lg p-4 mb-3"
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="mt-2 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`number-${item.id}`}>Number</Label>
              <Input
                id={`number-${item.id}`}
                value={item.number}
                onChange={(e) => onUpdate(item.id, "number", e.target.value)}
                placeholder="01"
                maxLength={2}
              />
            </div>
            <div>
              <Label htmlFor={`link-${item.id}`}>Link</Label>
              <Input
                id={`link-${item.id}`}
                value={item.link}
                onChange={(e) => onUpdate(item.id, "link", e.target.value)}
                placeholder="/services"
              />
            </div>
          </div>
          <div>
            <Label htmlFor={`title-${item.id}`}>Title</Label>
            <Input
              id={`title-${item.id}`}
              value={item.title}
              onChange={(e) => onUpdate(item.id, "title", e.target.value)}
              placeholder="OUR SERVICES"
            />
          </div>
          <div>
            <Label htmlFor={`subtext-${item.id}`}>Subtext</Label>
            <Textarea
              id={`subtext-${item.id}`}
              value={item.subtext}
              onChange={(e) => onUpdate(item.id, "subtext", e.target.value)}
              placeholder="Painting, Exterior Systems & Specialty Work"
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const LandingMenuEditor = () => {
  const { isLoading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from("landing_menu_items")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error: any) {
      toast.error("Failed to load menu items");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setMenuItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update display_order
        return newItems.map((item, index) => ({
          ...item,
          display_order: index + 1,
        }));
      });
    }
  };

  const handleUpdate = (id: string, field: string, value: string) => {
    setMenuItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      for (const item of menuItems) {
        const { error } = await supabase
          .from("landing_menu_items")
          .update({
            number: item.number,
            title: item.title,
            subtext: item.subtext,
            link: item.link,
            display_order: item.display_order,
            updated_by: user?.id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", item.id);

        if (error) throw error;
      }

      toast.success("Hero menu items updated successfully");
      navigate("/admin");
    } catch (error: any) {
      toast.error("Failed to update menu items");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <AdminPageLayout
      title="Edit Home Hero Menu"
      description="Drag to reorder. These items appear overlaid on the homepage hero videos."
      actions={
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      }
    >
      <Card>
        <CardContent className="p-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={menuItems.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {menuItems.map((item) => (
                <SortableMenuItem
                  key={item.id}
                  item={item}
                  onUpdate={handleUpdate}
                />
              ))}
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default LandingMenuEditor;
