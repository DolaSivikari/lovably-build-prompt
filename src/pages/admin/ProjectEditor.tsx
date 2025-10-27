import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiImageUpload, GalleryImage } from "@/components/admin/MultiImageUpload";
import { ProcessStepsEditor, ProcessStep } from "@/components/admin/ProcessStepsEditor";
import { generatePreviewToken } from "@/utils/routeHelpers";
import { resolveImagePath } from "@/utils/imageResolver";
import { Card } from "@/components/ui/card";

const ProjectEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    slug: "",
    title: "",
    subtitle: "",
    summary: "",
    description: "",
    featured_image: "",
    client_name: "",
    location: "",
    category: "",
    project_size: "",
    duration: "",
    year: "",
    budget_range: "",
    start_date: "",
    completion_date: "",
    project_status: "Completed",
    process_notes: "",
    featured: false,
    publish_state: "draft",
    seo_title: "",
    seo_description: "",
    before_images: [],
    after_images: [],
    content_blocks: [],
  });

  useEffect(() => {
    if (id && id !== "new") {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load project",
        variant: "destructive",
      });
    } else if (data) {
      setFormData({
        slug: data.slug || "",
        title: data.title || "",
        subtitle: data.subtitle || "",
        summary: data.summary || "",
        description: data.description || "",
        featured_image: data.featured_image || "",
        client_name: data.client_name || "",
        location: data.location || "",
        category: data.category || "",
        project_size: data.project_size || "",
        duration: data.duration || "",
        year: data.year || "",
        budget_range: data.budget_range || "",
        start_date: data.start_date || "",
        completion_date: data.completion_date || "",
        project_status: data.project_status || "Completed",
        process_notes: data.process_notes || "",
        featured: data.featured || false,
        publish_state: data.publish_state || "draft",
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        before_images: data.before_images || [],
        after_images: data.after_images || [],
        content_blocks: data.content_blocks || [],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    // Auto-generate complete gallery from all sections
    const completeGallery = [
      ...formData.before_images.map((img: GalleryImage, idx: number) => ({ 
        ...img, 
        category: 'before',
        order: idx 
      })),
      ...formData.content_blocks
        .filter((step: ProcessStep) => step.image_url)
        .map((step: ProcessStep, idx: number) => ({
          url: step.image_url!,
          caption: step.title,
          alt: step.image_alt || step.title,
          order: formData.before_images.length + idx,
          category: 'process'
        })),
      ...formData.after_images.map((img: GalleryImage, idx: number) => ({
        ...img,
        order: formData.before_images.length + formData.content_blocks.length + idx,
        category: 'after'
      }))
    ];
    
    const projectData: any = {
      ...formData,
      gallery: completeGallery,
      updated_by: user?.id,
      ...(id === "new" && { created_by: user?.id }),
    };

    const { error, data } = id === "new"
      ? await supabase.from("projects").insert([projectData]).select().single()
      : await supabase.from("projects").update(projectData).eq("id", id).select().single();

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Project ${id === "new" ? "created" : "updated"} successfully`,
      });
      
      if (data && formData.publish_state === "published") {
        toast({
          title: "Live!",
          description: "Project is now visible on the public site",
        });
      }
      
      navigate("/admin/projects");
    }
    setIsLoading(false);
  };

  const handlePreview = async () => {
    if (!formData.slug) {
      toast({
        title: "Slug required",
        description: "Please add a slug before previewing",
        variant: "destructive",
      });
      return;
    }

    const token = generatePreviewToken();
    
    // Save preview token to database
    if (id && id !== "new") {
      await supabase
        .from("projects")
        .update({ preview_token: token })
        .eq("id", id);
    }

    const previewUrl = `/projects/${formData.slug}?preview=true&token=${token}`;
    window.open(previewUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/projects")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
            <h1 className="text-2xl font-bold">
              {id === "new" ? "New Project" : "Edit Project"}
            </h1>
          </div>
          <div className="flex gap-2">
            {id !== "new" && (
              <Button variant="outline" onClick={handlePreview} type="button">
                <Eye className="h-4 w-4 mr-2" />
                Preview Draft
              </Button>
            )}
            <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Story & Scope</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={8}
              placeholder="Tell the story: What was the challenge? What did the client need?"
            />
          </div>

          <ImageUploadField
            value={formData.featured_image}
            onChange={(url) => setFormData({ ...formData, featured_image: url })}
            bucket="project-images"
            label="Featured Image (Main hero image for cards)"
          />

          {/* Before Images Section */}
          <Card className="p-6">
            <MultiImageUpload
              images={formData.before_images}
              onChange={(images) => setFormData({ ...formData, before_images: images })}
              title="Before Images"
              maxImages={10}
              bucket="project-images"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Upload 3-5 images showing the original state before work began
            </p>
          </Card>

          {/* Process Steps Section */}
          <Card className="p-6">
            <ProcessStepsEditor
              steps={formData.content_blocks}
              onChange={(steps) => setFormData({ ...formData, content_blocks: steps })}
            />
          </Card>

          {/* After Images Section */}
          <Card className="p-6">
            <MultiImageUpload
              images={formData.after_images}
              onChange={(images) => setFormData({ ...formData, after_images: images })}
              title="After Images"
              maxImages={10}
              bucket="project-images"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Upload 3-5 images showing the completed project from various angles
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Toronto, ON"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Industrial">Industrial</SelectItem>
                  <SelectItem value="Institutional">Institutional</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project_size">Project Size</Label>
              <Input
                id="project_size"
                value={formData.project_size}
                onChange={(e) => setFormData({ ...formData, project_size: e.target.value })}
                placeholder="e.g., 50,000 sq ft"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget_range">Budget Range</Label>
              <Input
                id="budget_range"
                value={formData.budget_range}
                onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                placeholder="e.g., $5M-$8M"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g., 2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 6 months"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured">Featured Project</Label>
              <Select
                value={formData.featured ? "true" : "false"}
                onValueChange={(value) => setFormData({ ...formData, featured: value === "true" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No</SelectItem>
                  <SelectItem value="true">Yes (Show in Spotlight)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="completion_date">Completion Date</Label>
              <Input
                id="completion_date"
                type="date"
                value={formData.completion_date}
                onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="seo_title">SEO Title</Label>
              <Input
                id="seo_title"
                value={formData.seo_title}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publish_state">Status</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_description">SEO Description</Label>
            <Textarea
              id="seo_description"
              value={formData.seo_description}
              onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Project"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin/projects")}>
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProjectEditor;
