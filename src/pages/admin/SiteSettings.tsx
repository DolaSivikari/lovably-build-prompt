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

const SiteSettings = () => {
  const { isLoading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error: any) {
      toast.error("Failed to load site settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          ...settings,
          updated_by: userId,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.id);

      if (error) throw error;

      toast.success("Site settings updated successfully");
    } catch (error: any) {
      toast.error("Failed to update site settings");
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
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Site Settings</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  value={settings?.company_name || ''}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={settings?.phone || ''}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    placeholder="(416) 555-1234"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings?.email || ''}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    placeholder="info@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={settings?.address || ''}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  placeholder="Greater Toronto Area, Ontario"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weekday_hours">Weekday Hours</Label>
                  <Input
                    id="weekday_hours"
                    value={settings?.business_hours?.weekday || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      business_hours: { ...settings?.business_hours, weekday: e.target.value }
                    })}
                    placeholder="Mon-Fri: 8AM-6PM"
                  />
                </div>
                <div>
                  <Label htmlFor="saturday_hours">Saturday Hours</Label>
                  <Input
                    id="saturday_hours"
                    value={settings?.business_hours?.saturday || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      business_hours: { ...settings?.business_hours, saturday: e.target.value }
                    })}
                    placeholder="Sat: 9AM-4PM"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Defaults</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_title">Default Meta Title</Label>
                <Input
                  id="meta_title"
                  value={settings?.meta_title || ''}
                  onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                  maxLength={60}
                />
              </div>

              <div>
                <Label htmlFor="meta_description">Default Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={settings?.meta_description || ''}
                  onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                  rows={3}
                  maxLength={160}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;
