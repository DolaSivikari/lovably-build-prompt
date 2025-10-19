import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Eye, Plus, X } from 'lucide-react';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { ADMIN_ROUTES } from '@/utils/routeHelpers';

const LandingEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [landingId, setLandingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    headline: 'Building Excellence Across the GTA',
    subheadline: 'Premium painting, restoration & finishing services for commercial, residential & industrial properties',
    cta_primary_text: 'Enter Site',
    cta_primary_url: '/home',
    cta_secondary_text: 'Get Free Estimate',
    cta_secondary_url: '/estimate',
    background_image: '',
    is_active: true,
    rotating_project_images: [] as string[]
  });
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    loadLandingPage();
  }, []);

  const loadLandingPage = async () => {
    const { data } = await supabase
      .from('landing_page')
      .select('*')
      .eq('is_active', true)
      .single();

    if (data) {
      setLandingId(data.id);
      setFormData({
        headline: data.headline,
        subheadline: data.subheadline,
        cta_primary_text: data.cta_primary_text,
        cta_primary_url: data.cta_primary_url,
        cta_secondary_text: data.cta_secondary_text || '',
        cta_secondary_url: data.cta_secondary_url || '',
        background_image: data.background_image || '',
        is_active: data.is_active ?? true,
        rotating_project_images: Array.isArray(data.rotating_project_images) 
          ? data.rotating_project_images as string[]
          : []
      });
    }
  };

  const validateUrl = (url: string) => {
    return url.startsWith('/') || url.startsWith('http');
  };

  const addRotatingImage = () => {
    if (newImageUrl.trim()) {
      setFormData({
        ...formData,
        rotating_project_images: [...formData.rotating_project_images, newImageUrl.trim()]
      });
      setNewImageUrl('');
    }
  };

  const removeRotatingImage = (index: number) => {
    setFormData({
      ...formData,
      rotating_project_images: formData.rotating_project_images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate URLs
    if (!validateUrl(formData.cta_primary_url)) {
      toast({
        title: 'Invalid URL',
        description: 'Primary CTA URL must start with / or http',
        variant: 'destructive',
      });
      return;
    }
    if (formData.cta_secondary_url && !validateUrl(formData.cta_secondary_url)) {
      toast({
        title: 'Invalid URL',
        description: 'Secondary CTA URL must start with / or http',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = landingId
        ? await supabase
            .from('landing_page')
            .update({
              ...formData,
              updated_at: new Date().toISOString()
            })
            .eq('id', landingId)
        : await supabase
            .from('landing_page')
            .insert({
              ...formData
            });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Landing page updated successfully'
      });

      navigate(ADMIN_ROUTES.dashboard);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(ADMIN_ROUTES.dashboard)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold">Edit Landing Page</h1>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => window.open('/', '_blank')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Landing Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="is_active" className="text-base font-semibold">Enable Landing Page</Label>
                  <p className="text-sm text-muted-foreground">When disabled, visitors go directly to /home</p>
                </div>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hero Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="headline">Headline *</Label>
                <Input
                  id="headline"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  required
                  placeholder="Building Excellence Across the GTA"
                />
              </div>

              <div>
                <Label htmlFor="subheadline">Subheadline *</Label>
                <Textarea
                  id="subheadline"
                  value={formData.subheadline}
                  onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                  required
                  rows={3}
                  placeholder="Premium painting, restoration & finishing services..."
                />
              </div>

              <ImageUploader
                value={formData.background_image}
                onChange={(url) => setFormData({ ...formData, background_image: url })}
                label="Background Image (Optional - ignored if rotating images added below)"
                folder="landing"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rotating Background Images (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add multiple images that will rotate every 5 seconds. Leave empty to use the single background image above.
              </p>
              
              <div className="flex gap-2">
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Enter image URL or path (e.g., /src/assets/project.jpg)"
                />
                <Button type="button" onClick={addRotatingImage} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>

              {formData.rotating_project_images.length > 0 && (
                <div className="space-y-2">
                  {formData.rotating_project_images.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="flex-1 truncate text-sm">{url}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRotatingImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Call to Action Buttons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta_primary_text">Primary Button Text *</Label>
                  <Input
                    id="cta_primary_text"
                    value={formData.cta_primary_text}
                    onChange={(e) => setFormData({ ...formData, cta_primary_text: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cta_primary_url">Primary Button URL *</Label>
                  <Input
                    id="cta_primary_url"
                    value={formData.cta_primary_url}
                    onChange={(e) => setFormData({ ...formData, cta_primary_url: e.target.value })}
                    required
                    placeholder="/home"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta_secondary_text">Secondary Button Text</Label>
                  <Input
                    id="cta_secondary_text"
                    value={formData.cta_secondary_text}
                    onChange={(e) => setFormData({ ...formData, cta_secondary_text: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="cta_secondary_url">Secondary Button URL</Label>
                  <Input
                    id="cta_secondary_url"
                    value={formData.cta_secondary_url}
                    onChange={(e) => setFormData({ ...formData, cta_secondary_url: e.target.value })}
                    placeholder="/estimate"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(ADMIN_ROUTES.dashboard)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Landing Page'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LandingEditor;
