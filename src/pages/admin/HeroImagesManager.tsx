import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Image, Upload, Eye, Edit, Trash2, Plus, ExternalLink } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

interface HeroImage {
  id: string;
  page_path: string;
  page_title: string;
  image_url: string;
  alt_text: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const HeroImagesManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    page_path: "",
    page_title: "",
    image_url: "",
    alt_text: "",
    is_active: true
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/auth');
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchHeroImages();
    }
  }, [isAdmin]);

  const fetchHeroImages = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_images')
        .select('*')
        .order('page_path', { ascending: true });

      if (error) throw error;
      setHeroImages(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching hero images",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingImage) {
        const { error } = await supabase
          .from('hero_images')
          .update({
            page_path: formData.page_path,
            page_title: formData.page_title,
            image_url: formData.image_url,
            alt_text: formData.alt_text || null,
            is_active: formData.is_active
          })
          .eq('id', editingImage.id);

        if (error) throw error;

        toast({
          title: "Hero image updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('hero_images')
          .insert([{
            page_path: formData.page_path,
            page_title: formData.page_title,
            image_url: formData.image_url,
            alt_text: formData.alt_text || null,
            is_active: formData.is_active
          }]);

        if (error) throw error;

        toast({
          title: "Hero image created successfully",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchHeroImages();
    } catch (error: any) {
      toast({
        title: "Error saving hero image",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (image: HeroImage) => {
    setEditingImage(image);
    setFormData({
      page_path: image.page_path,
      page_title: image.page_title,
      image_url: image.image_url,
      alt_text: image.alt_text || "",
      is_active: image.is_active
    });
    setIsDialogOpen(true);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setImageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;

    try {
      const { error } = await supabase
        .from('hero_images')
        .delete()
        .eq('id', imageToDelete);

      if (error) throw error;

      toast({
        title: "Hero image deleted successfully",
      });

      fetchHeroImages();
    } catch (error: any) {
      toast({
        title: "Error deleting hero image",
        description: error.message,
        variant: "destructive",
      });
    }
    setDeleteDialogOpen(false);
    setImageToDelete(null);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('hero_images')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: `Hero image ${!currentStatus ? 'activated' : 'deactivated'}`,
      });

      fetchHeroImages();
    } catch (error: any) {
      toast({
        title: "Error updating hero image status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      page_path: "",
      page_title: "",
      image_url: "",
      alt_text: "",
      is_active: true
    });
    setEditingImage(null);
  };

  if (authLoading || loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="Hero Images Manager"
        description="Manage hero images for page headers across the website"
        actions={
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Hero Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingImage ? 'Edit Hero Image' : 'Add New Hero Image'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="page_path">Page Path *</Label>
                    <Input
                      id="page_path"
                      value={formData.page_path}
                      onChange={(e) => setFormData({ ...formData, page_path: e.target.value })}
                      placeholder="/about"
                      required
                    />
                    <p className="text-xs text-muted-foreground">e.g., /about, /services, /contact</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="page_title">Page Title *</Label>
                    <Input
                      id="page_title"
                      value={formData.page_title}
                      onChange={(e) => setFormData({ ...formData, page_title: e.target.value })}
                      placeholder="About Us"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL *</Label>
                  <ImageUploadField
                    value={formData.image_url}
                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                    bucket="hero-images"
                    label="Upload Hero Image"
                  />
                  <p className="text-xs text-muted-foreground">Recommended size: 1920x1088px (16:9 ratio)</p>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="/src/assets/heroes/hero-page.jpg"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground">Or paste an image URL directly</p>
                </div>

                {formData.image_url && (
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border bg-muted">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/1920x1088/e2e8f0/64748b?text=Image+Not+Found';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 flex items-center justify-center">
                        <p className="text-white text-lg font-semibold">Preview with Dark Overlay</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="alt_text">Alt Text</Label>
                  <Textarea
                    id="alt_text"
                    value={formData.alt_text}
                    onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                    placeholder="Describe the image for accessibility"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">Descriptive text for screen readers and SEO</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active (Display on website)</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingImage ? 'Update' : 'Create'} Hero Image
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Hero Images ({heroImages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {heroImages.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <div className="relative w-20 h-12 rounded overflow-hidden border border-border bg-muted cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                        onClick={() => setPreviewImage(image.image_url)}
                      >
                        <img
                          src={image.image_url}
                          alt={image.alt_text || image.page_title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/400x240/e2e8f0/64748b?text=404';
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{image.page_title}</div>
                        {image.alt_text && (
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {image.alt_text}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {image.page_path}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge variant={image.is_active ? "default" : "secondary"}>
                        {image.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(image.updated_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewImage(image.image_url)}
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleActive(image.id, image.is_active)}
                          title={image.is_active ? "Deactivate" : "Activate"}
                        >
                          <Image className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(image)}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(image.id)}
                          title="Delete"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {heroImages.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Image className="w-12 h-12 opacity-50" />
                        <p>No hero images found</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsDialogOpen(true)}
                        >
                          Add Your First Hero Image
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
          <DialogContent className="max-w-6xl">
            <DialogHeader>
              <DialogTitle>Hero Image Preview</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
              {previewImage && (
                <>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                      <h1 className="text-5xl font-bold mb-4">Example Page Title</h1>
                      <p className="text-xl text-white/90 mb-6">This is how the hero section will appear with the dark overlay</p>
                      <div className="flex gap-4 justify-center">
                        <Button size="lg" variant="secondary">Primary CTA</Button>
                        <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">Secondary CTA</Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDelete}
          title="Delete Hero Image"
          description="Are you sure you want to delete this hero image? This action cannot be undone."
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </>
  );
};

export default HeroImagesManager;
