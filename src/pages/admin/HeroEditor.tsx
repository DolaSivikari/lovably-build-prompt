import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const HeroEditor = () => {
  const { isLoading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroContent, setHeroContent] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setHeroContent(data);
    } catch (error: any) {
      toast.error("Failed to load hero content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('hero_content')
        .update({
          ...heroContent,
          updated_by: userId,
          updated_at: new Date().toISOString()
        })
        .eq('id', heroContent.id);

      if (error) throw error;

      toast.success("Hero content updated successfully");
      navigate('/admin');
    } catch (error: any) {
      toast.error("Failed to update hero content");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Edit Hero Section</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hero Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="headline">Headline *</Label>
              <Input
                id="headline"
                value={heroContent?.headline || ''}
                onChange={(e) => setHeroContent({ ...heroContent, headline: e.target.value })}
                placeholder="Building Excellence, Crafting Legacy"
                maxLength={100}
              />
            </div>

            <div>
              <Label htmlFor="subheadline">Subheadline *</Label>
              <Textarea
                id="subheadline"
                value={heroContent?.subheadline || ''}
                onChange={(e) => setHeroContent({ ...heroContent, subheadline: e.target.value })}
                placeholder="Your company description..."
                rows={4}
                maxLength={500}
              />
            </div>

            <div>
              <Label htmlFor="badge_text">Badge Text</Label>
              <Input
                id="badge_text"
                value={heroContent?.badge_text || ''}
                onChange={(e) => setHeroContent({ ...heroContent, badge_text: e.target.value })}
                placeholder="Trusted Excellence Since 2009"
                maxLength={50}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primary_cta_text">Primary Button Text *</Label>
                <Input
                  id="primary_cta_text"
                  value={heroContent?.primary_cta_text || ''}
                  onChange={(e) => setHeroContent({ ...heroContent, primary_cta_text: e.target.value })}
                  placeholder="Get Started"
                />
              </div>
              <div>
                <Label htmlFor="primary_cta_url">Primary Button URL *</Label>
                <Input
                  id="primary_cta_url"
                  value={heroContent?.primary_cta_url || ''}
                  onChange={(e) => setHeroContent({ ...heroContent, primary_cta_url: e.target.value })}
                  placeholder="/contact"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="secondary_cta_text">Secondary Button Text</Label>
                <Input
                  id="secondary_cta_text"
                  value={heroContent?.secondary_cta_text || ''}
                  onChange={(e) => setHeroContent({ ...heroContent, secondary_cta_text: e.target.value })}
                  placeholder="View Our Work"
                />
              </div>
              <div>
                <Label htmlFor="secondary_cta_url">Secondary Button URL</Label>
                <Input
                  id="secondary_cta_url"
                  value={heroContent?.secondary_cta_url || ''}
                  onChange={(e) => setHeroContent({ ...heroContent, secondary_cta_url: e.target.value })}
                  placeholder="/projects"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button variant="outline" onClick={() => navigate('/admin')}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroEditor;
