import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const SiteSettings = () => {
  const { isLoading: authLoading } = useAdminAuth();
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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--primary-accent)' }} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="business-page-title" style={{ marginBottom: '2rem' }}>Site Settings</h1>

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="business-glass-card">
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: 'var(--text-primary)' 
          }}>
            Contact Information
          </h2>
          <div className="space-y-4">
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
          </div>
        </div>

        {/* Business Hours */}
        <div className="business-glass-card">
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: 'var(--text-primary)' 
          }}>
            Business Hours
          </h2>
          <div className="space-y-4">
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
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="business-glass-card">
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: 'var(--text-primary)' 
          }}>
            SEO Defaults
          </h2>
          <div className="space-y-4">
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
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem' }}>
          <button 
            className="business-btn business-btn-ghost"
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            className="business-btn business-btn-primary"
            onClick={handleSave} 
            disabled={saving}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;
