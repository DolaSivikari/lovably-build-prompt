import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CaseStudyEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    summary: "",
    description: "",
    client_name: "",
    location: "",
    category: "",
    tags: "",
    featured_image: "",
    project_size: "",
    budget_range: "",
    project_status: "completed",
    start_date: "",
    completion_date: "",
    process_notes: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    publish_state: "draft" as "draft" | "published" | "archived" | "scheduled",
  });

  useEffect(() => {
    checkAuth();
    if (!isNew) {
      loadCaseStudy();
    }
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const loadCaseStudy = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load case study",
        variant: "destructive",
      });
      navigate("/admin/case-studies");
    } else if (data) {
      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        subtitle: data.subtitle || "",
        summary: data.summary || "",
        description: data.description || "",
        client_name: data.client_name || "",
        location: data.location || "",
        category: data.category || "",
        tags: data.tags?.join(", ") || "",
        featured_image: data.featured_image || "",
        project_size: data.project_size || "",
        budget_range: data.budget_range || "",
        project_status: data.project_status || "completed",
        start_date: data.start_date || "",
        completion_date: data.completion_date || "",
        process_notes: data.process_notes || "",
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        seo_keywords: data.seo_keywords?.join(", ") || "",
        publish_state: data.publish_state || "draft",
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const projectData = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      subtitle: formData.subtitle,
      summary: formData.summary,
      description: formData.description,
      client_name: formData.client_name,
      location: formData.location,
      category: formData.category,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      featured_image: formData.featured_image,
      project_size: formData.project_size,
      budget_range: formData.budget_range,
      project_status: formData.project_status,
      start_date: formData.start_date || null,
      completion_date: formData.completion_date || null,
      process_notes: formData.process_notes,
      seo_title: formData.seo_title || formData.title,
      seo_description: formData.seo_description || formData.summary,
      seo_keywords: formData.seo_keywords.split(",").map(k => k.trim()).filter(Boolean),
      publish_state: formData.publish_state,
      ...(isNew ? { created_by: user.id } : { updated_by: user.id }),
    };

    const { error } = isNew
      ? await supabase.from("projects").insert(projectData)
      : await supabase.from("projects").update(projectData).eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: `Failed to ${isNew ? "create" : "update"} case study`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Case study ${isNew ? "created" : "updated"} successfully`,
      });
      navigate("/admin/case-studies");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin/case-studies")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">
                {isNew ? "New Case Study" : "Edit Case Study"}
              </h1>
            </div>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Auto-generated from title"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={10}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Client Name</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Commercial, Residential"
                  />
                </div>

                <div>
                  <Label htmlFor="project_status">Project Status</Label>
                  <Input
                    id="project_status"
                    value={formData.project_status}
                    onChange={(e) => setFormData({ ...formData, project_status: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="painting, restoration, commercial"
                />
              </div>

              <div>
                <Label htmlFor="featured_image">Featured Image</Label>
                <ImageUploadField
                  bucket="project-images"
                  value={formData.featured_image}
                  onChange={(url) => setFormData({ ...formData, featured_image: url })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project_size">Project Size</Label>
                  <Input
                    id="project_size"
                    value={formData.project_size}
                    onChange={(e) => setFormData({ ...formData, project_size: e.target.value })}
                    placeholder="e.g., 10,000 sq ft"
                  />
                </div>

                <div>
                  <Label htmlFor="budget_range">Budget Range</Label>
                  <Input
                    id="budget_range"
                    value={formData.budget_range}
                    onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                    placeholder="e.g., $50,000 - $75,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="completion_date">Completion Date</Label>
                  <Input
                    id="completion_date"
                    type="date"
                    value={formData.completion_date}
                    onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="process_notes">Process Notes</Label>
                <Textarea
                  id="process_notes"
                  value={formData.process_notes}
                  onChange={(e) => setFormData({ ...formData, process_notes: e.target.value })}
                  rows={5}
                  placeholder="Describe the process, challenges, and solutions"
                />
              </div>

              <div>
                <Label htmlFor="publish_state">Publish State</Label>
                <Select 
                  value={formData.publish_state} 
                  onValueChange={(value: any) => setFormData({ ...formData, publish_state: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  id="seo_title"
                  value={formData.seo_title}
                  onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  placeholder="Defaults to title"
                />
              </div>

              <div>
                <Label htmlFor="seo_description">SEO Description</Label>
                <Textarea
                  id="seo_description"
                  value={formData.seo_description}
                  onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                  rows={2}
                  placeholder="Defaults to summary"
                />
              </div>

              <div>
                <Label htmlFor="seo_keywords">SEO Keywords (comma-separated)</Label>
                <Input
                  id="seo_keywords"
                  value={formData.seo_keywords}
                  onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                  placeholder="case study, commercial painting, restoration"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/case-studies")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {isNew ? "Create" : "Update"} Case Study
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CaseStudyEditor;
