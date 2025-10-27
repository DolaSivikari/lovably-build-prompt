import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

const HomepageSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    headline: "",
    subheadline: "",
    hero_description: "",
    why_choose_content: "",
    services_intro: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("homepage_settings" as any)
        .select("*")
        .eq("is_active", true)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data !== null && typeof data === 'object') {
        const record = data as any;
        if ('id' in record) {
        setSettingsId(record.id);
        setSettings({
          headline: record.headline || "",
          subheadline: record.subheadline || "",
          hero_description: record.hero_description || "",
          why_choose_content: record.why_choose_content || "",
          services_intro: record.services_intro || "",
        });
        }
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const payload = {
        ...settings,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      };

      if (settingsId) {
        const { error } = await supabase
          .from("homepage_settings" as any)
          .update(payload)
          .eq("id", settingsId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("homepage_settings" as any)
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        if (data !== null && typeof data === 'object') {
          const record = data as any;
          if ('id' in record) {
            setSettingsId(record.id);
          }
        }
      }

      toast({
        title: "Success",
        description: "Homepage settings saved successfully",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/admin")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Homepage Settings</h1>
          <p className="text-muted-foreground">Customize the homepage content</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={settings.headline}
              onChange={(e) => setSettings({ ...settings, headline: e.target.value })}
              placeholder="Building Excellence Across the GTA"
            />
          </div>
          <div>
            <Label htmlFor="subheadline">Subheadline</Label>
            <Input
              id="subheadline"
              value={settings.subheadline}
              onChange={(e) => setSettings({ ...settings, subheadline: e.target.value })}
              placeholder="Premium painting, restoration & finishing services"
            />
          </div>
          <div>
            <Label htmlFor="hero_description">Hero Description</Label>
            <Textarea
              id="hero_description"
              value={settings.hero_description}
              onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
              placeholder="Additional hero section content"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Choose Us Section</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="why_choose_content">Content</Label>
          <Textarea
            id="why_choose_content"
            value={settings.why_choose_content}
            onChange={(e) => setSettings({ ...settings, why_choose_content: e.target.value })}
            placeholder="Why choose us section content"
            rows={6}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services Section</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="services_intro">Introduction Text</Label>
          <Textarea
            id="services_intro"
            value={settings.services_intro}
            onChange={(e) => setSettings({ ...settings, services_intro: e.target.value })}
            placeholder="Services section introduction"
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={() => navigate("/admin")}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default HomepageSettings;
