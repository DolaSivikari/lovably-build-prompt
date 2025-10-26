import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { generatePreviewToken } from "@/utils/routeHelpers";

const BlogPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewPost = id === "new";

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    category: "",
    tags: "",
    featured_image: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    read_time_minutes: 5,
    publish_state: "draft" as "draft" | "published" | "archived" | "scheduled",
  });

  useEffect(() => {
    checkAuth();
    if (!isNewPost) {
      loadPost();
    }
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const loadPost = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      });
      navigate("/admin/blog");
    } else if (data) {
      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        summary: data.summary || "",
        content: data.content || "",
        category: data.category || "",
        tags: data.tags?.join(", ") || "",
        featured_image: data.featured_image || "",
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        seo_keywords: data.seo_keywords?.join(", ") || "",
        read_time_minutes: data.read_time_minutes || 5,
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

    // Validate content length (client-side check before DB constraint)
    const MAX_CONTENT_LENGTH = 50000;
    const MAX_SUMMARY_LENGTH = 500;

    if (formData.content.length > MAX_CONTENT_LENGTH) {
      toast({
        title: "Content too long",
        description: `Content must be under ${MAX_CONTENT_LENGTH.toLocaleString()} characters. Current: ${formData.content.length.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }

    if (formData.summary.length > MAX_SUMMARY_LENGTH) {
      toast({
        title: "Summary too long",
        description: `Summary must be under ${MAX_SUMMARY_LENGTH} characters. Current: ${formData.summary.length}`,
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const postData = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      summary: formData.summary,
      content: formData.content,
      category: formData.category,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      featured_image: formData.featured_image,
      seo_title: formData.seo_title || formData.title,
      seo_description: formData.seo_description || formData.summary,
      seo_keywords: formData.seo_keywords.split(",").map(k => k.trim()).filter(Boolean),
      read_time_minutes: formData.read_time_minutes,
      publish_state: formData.publish_state,
      published_at: formData.publish_state === "published" ? new Date().toISOString() : null,
      ...(isNewPost ? { created_by: user.id } : { updated_by: user.id }),
    };

    const { error, data } = isNewPost
      ? await supabase.from("blog_posts").insert(postData).select().single()
      : await supabase.from("blog_posts").update(postData).eq("id", id).select().single();

    if (error) {
      toast({
        title: "Error",
        description: `Failed to ${isNewPost ? "create" : "update"} blog post`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Blog post ${isNewPost ? "created" : "updated"} successfully`,
      });
      
      if (data && formData.publish_state === "published") {
        toast({
          title: "Published!",
          description: "Blog post is now live on the site",
        });
      }
      
      navigate("/admin/blog");
    }
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
    if (id && !isNewPost) {
      await supabase
        .from("blog_posts")
        .update({ preview_token: token })
        .eq("id", id);
    }

    const previewUrl = `/blog/${formData.slug}?preview=true&token=${token}`;
    window.open(previewUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin/blog")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">
                {isNewPost ? "New Blog Post" : "Edit Blog Post"}
              </h1>
            </div>
            <div className="flex gap-2">
              {!isNewPost && (
                <Button variant="outline" onClick={handlePreview} type="button">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Draft
                </Button>
              )}
              <Button onClick={handleSubmit}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
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
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={3}
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.summary.length} / 500 characters
                  {formData.summary.length > 450 && (
                    <span className="text-warning ml-2">⚠️ Approaching limit</span>
                  )}
                </p>
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={15}
                  required
                  placeholder="Write your blog post content here..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.content.length.toLocaleString()} / 50,000 characters
                  {formData.content.length > 45000 && (
                    <span className="text-warning ml-2">⚠️ Approaching limit</span>
                  )}
                  {formData.content.length >= 50000 && (
                    <span className="text-destructive ml-2">⛔ Maximum reached</span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Painting, Construction"
                  />
                </div>

                <div>
                  <Label htmlFor="read_time">Read Time (minutes)</Label>
                  <Input
                    id="read_time"
                    type="number"
                    value={formData.read_time_minutes}
                    onChange={(e) => setFormData({ ...formData, read_time_minutes: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="painting, commercial, tips"
                />
              </div>

              <ImageUploadField
                value={formData.featured_image}
                onChange={(url) => setFormData({ ...formData, featured_image: url })}
                bucket="project-images"
                label="Featured Image"
              />

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
                  placeholder="Defaults to post title"
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
                  placeholder="painting services, commercial painting"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/blog")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {isNewPost ? "Create" : "Update"} Blog Post
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default BlogPostEditor;
