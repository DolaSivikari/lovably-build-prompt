import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";

interface HomepageSettings {
  id: string;
  headline: string;
  subheadline: string;
  hero_description: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text: string;
  cta_secondary_url: string;
  cta_tertiary_text: string;
  cta_tertiary_url: string;
  value_prop_1: string;
  value_prop_2: string;
  value_prop_3: string;
}

const HomepageSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<HomepageSettings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("homepage_settings")
        .select("*")
        .eq("is_active", true)
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error("Error loading homepage settings:", error);
      toast({
        title: "Error",
        description: "Failed to load homepage settings",
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Deactivate all existing active rows
      await supabase
        .from("homepage_settings")
        .update({ is_active: false })
        .eq("is_active", true);

      const settingsData = {
        headline: settings.headline,
        subheadline: settings.subheadline,
        hero_description: settings.hero_description,
        cta_primary_text: settings.cta_primary_text,
        cta_primary_url: settings.cta_primary_url,
        cta_secondary_text: settings.cta_secondary_text,
        cta_secondary_url: settings.cta_secondary_url,
        cta_tertiary_text: settings.cta_tertiary_text,
        cta_tertiary_url: settings.cta_tertiary_url,
        value_prop_1: settings.value_prop_1,
        value_prop_2: settings.value_prop_2,
        value_prop_3: settings.value_prop_3,
        updated_by: user?.id,
        updated_at: new Date().toISOString(),
        is_active: true,
      };

      if (settings.id) {
        const { error } = await supabase
          .from("homepage_settings")
          .update(settingsData)
          .eq("id", settings.id);
        if (error) throw error;
      } else {
        // Create if doesn't exist
        const { error } = await supabase
          .from("homepage_settings")
          .insert([{ ...settingsData, created_by: user?.id }]);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Homepage settings updated successfully",
      });
      loadSettings(); // Reload to get updated data
    } catch (error) {
      console.error("Error saving homepage settings:", error);
      toast({
        title: "Error",
        description: "Failed to save homepage settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminPageLayout title="Homepage Settings" description="Loading...">
        <div>Loading...</div>
      </AdminPageLayout>
    );
  }

  if (!settings) {
    return (
      <AdminPageLayout
        title="Homepage Settings"
        description="No settings found"
      >
        <div>No homepage settings found</div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Homepage Settings"
      description="Manage homepage hero section content and CTAs"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Main headline and description visible on homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  value={settings.headline}
                  onChange={(e) =>
                    setSettings({ ...settings, headline: e.target.value })
                  }
                  placeholder="Ontario's Trusted General Contractor"
                />
              </div>

              <div>
                <Label htmlFor="subheadline">Subheadline</Label>
                <Textarea
                  id="subheadline"
                  value={settings.subheadline}
                  onChange={(e) =>
                    setSettings({ ...settings, subheadline: e.target.value })
                  }
                  placeholder="Brief description under the headline"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="hero_description">Hero Description</Label>
                <Textarea
                  id="hero_description"
                  value={settings.hero_description}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero_description: e.target.value,
                    })
                  }
                  placeholder="Detailed description of services and expertise"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Call-to-Action Buttons</CardTitle>
              <CardDescription>
                Configure the main CTA buttons on the homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Primary CTA</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cta_primary_text">Button Text</Label>
                    <Input
                      id="cta_primary_text"
                      value={settings.cta_primary_text}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          cta_primary_text: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta_primary_url">Button URL</Label>
                    <Input
                      id="cta_primary_url"
                      value={settings.cta_primary_url}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          cta_primary_url: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Secondary CTA</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cta_secondary_text">Button Text</Label>
                    <Input
                      id="cta_secondary_text"
                      value={settings.cta_secondary_text}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          cta_secondary_text: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta_secondary_url">Button URL</Label>
                    <Input
                      id="cta_secondary_url"
                      value={settings.cta_secondary_url}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          cta_secondary_url: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Tertiary CTA</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cta_tertiary_text">Button Text</Label>
                    <Input
                      id="cta_tertiary_text"
                      value={settings.cta_tertiary_text}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          cta_tertiary_text: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta_tertiary_url">Button URL</Label>
                    <Input
                      id="cta_tertiary_url"
                      value={settings.cta_tertiary_url}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          cta_tertiary_url: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trust Indicators</CardTitle>
              <CardDescription>
                Quick value propositions displayed below hero
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="value_prop_1">Value Proposition 1</Label>
                <Input
                  id="value_prop_1"
                  value={settings.value_prop_1}
                  onChange={(e) =>
                    setSettings({ ...settings, value_prop_1: e.target.value })
                  }
                  placeholder="Licensed & Bonded"
                />
              </div>
              <div>
                <Label htmlFor="value_prop_2">Value Proposition 2</Label>
                <Input
                  id="value_prop_2"
                  value={settings.value_prop_2}
                  onChange={(e) =>
                    setSettings({ ...settings, value_prop_2: e.target.value })
                  }
                  placeholder="500+ Projects Completed"
                />
              </div>
              <div>
                <Label htmlFor="value_prop_3">Value Proposition 3</Label>
                <Input
                  id="value_prop_3"
                  value={settings.value_prop_3}
                  onChange={(e) =>
                    setSettings({ ...settings, value_prop_3: e.target.value })
                  }
                  placeholder="98% Client Satisfaction"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default HomepageSettings;
