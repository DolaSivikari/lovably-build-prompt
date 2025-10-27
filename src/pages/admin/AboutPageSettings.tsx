import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AboutPageSettings {
  id: string;
  years_in_business: number;
  total_projects: number;
  satisfaction_rate: number;
  story_headline: string;
  story_content: string[];
  story_image_url: string | null;
  story_promise_title: string;
  story_promise_text: string | null;
  values: Array<{ icon: string; title: string; description: string }>;
  sustainability_headline: string;
  sustainability_commitment: string | null;
  sustainability_initiatives: Array<{ title: string; description: string; impact: string }>;
  safety_headline: string;
  safety_commitment: string | null;
  safety_stats: Array<{ value: string; label: string }>;
  safety_programs: Array<{ title: string; description: string }>;
  cta_headline: string;
  cta_subheadline: string | null;
}

const AboutPageSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading: authLoading } = useAdminAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<AboutPageSettings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('about_page_settings')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) throw error;
      
      // Parse JSONB fields - cast data directly since types match
      setSettings(data as any);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "Failed to load About page settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('about_page_settings')
        .update({
          years_in_business: settings.years_in_business,
          total_projects: settings.total_projects,
          satisfaction_rate: settings.satisfaction_rate,
          story_headline: settings.story_headline,
          story_content: settings.story_content,
          story_image_url: settings.story_image_url,
          story_promise_title: settings.story_promise_title,
          story_promise_text: settings.story_promise_text,
          values: settings.values,
          sustainability_headline: settings.sustainability_headline,
          sustainability_commitment: settings.sustainability_commitment,
          sustainability_initiatives: settings.sustainability_initiatives,
          safety_headline: settings.safety_headline,
          safety_commitment: settings.safety_commitment,
          safety_stats: settings.safety_stats,
          safety_programs: settings.safety_programs,
          cta_headline: settings.cta_headline,
          cta_subheadline: settings.cta_subheadline,
          updated_at: new Date().toISOString(),
        })
        .eq('id', settings.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "About page settings updated successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="container mx-auto p-6">
        <p>No settings found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">About Page Settings</h1>
          <p className="text-muted-foreground">Manage content for the About Us page</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="ml-auto">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <Accordion type="single" collapsible defaultValue="header-stats" className="space-y-4">
        {/* Header Stats */}
        <AccordionItem value="header-stats">
          <AccordionTrigger className="text-lg font-semibold">Header Stats</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Years in Business</Label>
                    <Input
                      type="number"
                      value={settings.years_in_business}
                      onChange={(e) => setSettings({ ...settings, years_in_business: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Projects</Label>
                    <Input
                      type="number"
                      value={settings.total_projects}
                      onChange={(e) => setSettings({ ...settings, total_projects: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Satisfaction Rate (%)</Label>
                    <Input
                      type="number"
                      value={settings.satisfaction_rate}
                      onChange={(e) => setSettings({ ...settings, satisfaction_rate: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Company Story */}
        <AccordionItem value="story">
          <AccordionTrigger className="text-lg font-semibold">Company Story</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label>Story Headline</Label>
                  <Input
                    value={settings.story_headline}
                    onChange={(e) => setSettings({ ...settings, story_headline: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Story Paragraphs (one per line)</Label>
                  <Textarea
                    rows={6}
                    value={settings.story_content.join('\n\n')}
                    onChange={(e) => setSettings({ ...settings, story_content: e.target.value.split('\n\n') })}
                  />
                </div>
                <div>
                  <Label>Promise Title</Label>
                  <Input
                    value={settings.story_promise_title}
                    onChange={(e) => setSettings({ ...settings, story_promise_title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Promise Text</Label>
                  <Input
                    value={settings.story_promise_text || ''}
                    onChange={(e) => setSettings({ ...settings, story_promise_text: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* CTA Section */}
        <AccordionItem value="cta">
          <AccordionTrigger className="text-lg font-semibold">Call-to-Action Section</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label>CTA Headline</Label>
                  <Input
                    value={settings.cta_headline}
                    onChange={(e) => setSettings({ ...settings, cta_headline: e.target.value })}
                  />
                </div>
                <div>
                  <Label>CTA Subheadline</Label>
                  <Input
                    value={settings.cta_subheadline || ''}
                    onChange={(e) => setSettings({ ...settings, cta_subheadline: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AboutPageSettings;