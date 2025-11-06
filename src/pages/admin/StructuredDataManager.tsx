import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface StructuredDataTemplate {
  id: string;
  name: string;
  type: string;
  schema_json: any;
  is_active: boolean;
  created_at: string;
}

const SCHEMA_TYPES = [
  { value: "Article", label: "Article (Blog Posts)" },
  { value: "Product", label: "Product" },
  { value: "Service", label: "Service" },
  { value: "Organization", label: "Organization" },
  { value: "LocalBusiness", label: "Local Business" },
  { value: "FAQPage", label: "FAQ Page" },
  { value: "BreadcrumbList", label: "Breadcrumb" },
  { value: "Review", label: "Review" },
];

const StructuredDataManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: "", type: "Article", schema_json: "{}" });

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["structured-data-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("structured_data_templates" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as StructuredDataTemplate[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (template: any) => {
      const { error } = await supabase.from("structured_data_templates" as any).insert(template);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["structured-data-templates"] });
      setIsAdding(false);
      setFormData({ name: "", type: "Article", schema_json: "{}" });
      toast({ title: "Structured data template created" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("structured_data_templates" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["structured-data-templates"] });
      toast({ title: "Template deleted" });
    },
  });

  const handleSave = () => {
    try {
      const parsedJson = JSON.parse(formData.schema_json);
      createMutation.mutate({
        name: formData.name,
        type: formData.type,
        schema_json: parsedJson,
        is_active: true,
      });
    } catch (error) {
      toast({ variant: "destructive", title: "Invalid JSON", description: "Please check your JSON syntax" });
    }
  };

  const getDefaultSchema = (type: string) => {
    const schemas: Record<string, any> = {
      Article: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "{{title}}",
        datePublished: "{{published_at}}",
        author: { "@type": "Person", name: "{{author}}" },
      },
      Organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Ascent Group Construction",
        url: "https://ascentgroupconstruction.com",
        logo: "{{logo_url}}",
      },
    };
    return JSON.stringify(schemas[type] || {}, null, 2);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Structured Data Manager</h1>
        <p className="text-muted-foreground">Create JSON-LD templates for rich search results</p>
      </div>

      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} className="mb-6">
          <Plus className="w-4 h-4 mr-2" /> Add Template
        </Button>
      )}

      {isAdding && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Template</h3>
          <div className="space-y-4">
            <div>
              <Label>Template Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Blog Post Article Schema"
              />
            </div>
            <div>
              <Label>Schema Type</Label>
              <select
                value={formData.type}
                onChange={(e) => {
                  const type = e.target.value;
                  setFormData({ ...formData, type, schema_json: getDefaultSchema(type) });
                }}
                className="w-full border rounded-md p-2"
              >
                {SCHEMA_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>JSON-LD Schema</Label>
              <Textarea
                value={formData.schema_json}
                onChange={(e) => setFormData({ ...formData, schema_json: e.target.value })}
                rows={12}
                className="font-mono text-sm"
                placeholder='{"@context": "https://schema.org", "@type": "Article"}'
              />
              <p className="text-sm text-muted-foreground mt-1">
                Use &#123;&#123;field_name&#125;&#125; for dynamic values
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" /> Save Template
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? (
        <p>Loading templates...</p>
      ) : templates.length === 0 ? (
        <Card className="p-12 text-center">
          <Code className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No structured data templates yet</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {templates.map((template) => (
            <Card key={template.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{template.name}</h3>
                    <Badge>{template.type}</Badge>
                    {template.is_active && <Badge variant="default">Active</Badge>}
                  </div>
                </div>
                <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(template.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto">
                <pre>{JSON.stringify(template.schema_json, null, 2)}</pre>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StructuredDataManager;
