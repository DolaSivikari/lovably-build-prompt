import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminPageLayout } from '@/components/admin/AdminPageLayout';

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const { isLoading: authLoading } = useAdminAuth();

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

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSettings(data);
      } else {
        setSettings({
          company_name: '',
          phone: '',
          email: '',
          address: '',
          weekday_hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
          saturday_hours: 'Sat: 9:00 AM - 4:00 PM',
          seo_default_title: '',
          seo_default_description: '',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load settings',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'User not authenticated',
      });
      return;
    }

    try {
      setSaving(true);

      // First, deactivate all existing active rows
      await supabase
        .from('site_settings')
        .update({ is_active: false })
        .eq('is_active', true);

      const settingsData = {
        ...settings,
        updated_by: userId,
        updated_at: new Date().toISOString(),
        is_active: true,
      };

      if (settings.id) {
        const { error } = await supabase
          .from('site_settings')
          .update(settingsData)
          .eq('id', settings.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('site_settings')
          .insert([{ ...settingsData, created_by: userId }])
          .select()
          .single();
        if (error) throw error;
        setSettings(data);
      }

      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save settings',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPageLayout
      title="Site Settings"
      description="Manage global site-wide configuration"
      loading={authLoading || loading}
      actions={
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      }
    >
      {settings && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Basic company contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  value={settings.company_name || ''}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                  placeholder="Ascent Group Construction"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    value={settings.phone || ''}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    placeholder="(416) 555-1234"
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={settings.email || ''}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    placeholder="info@company.com"
                  />
                </div>
              </div>
              <div>
                <Label>Office Address</Label>
                <Input
                  value={settings.address || ''}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  placeholder="Greater Toronto Area, Ontario"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Operating hours displayed across the site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Weekday Hours</Label>
                <Input
                  value={settings.weekday_hours || ''}
                  onChange={(e) => setSettings({ ...settings, weekday_hours: e.target.value })}
                  placeholder="Mon-Fri: 8:00 AM - 6:00 PM"
                />
              </div>
              <div>
                <Label>Saturday Hours</Label>
                <Input
                  value={settings.saturday_hours || ''}
                  onChange={(e) => setSettings({ ...settings, saturday_hours: e.target.value })}
                  placeholder="Sat: 9:00 AM - 4:00 PM"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Defaults</CardTitle>
              <CardDescription>Default meta tags for pages without custom SEO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Meta Title</Label>
                <Input
                  value={settings.seo_default_title || ''}
                  onChange={(e) => setSettings({ ...settings, seo_default_title: e.target.value })}
                  placeholder="Ascent Group Construction - Professional Construction Services"
                />
              </div>
              <div>
                <Label>Default Meta Description</Label>
                <Input
                  value={settings.seo_default_description || ''}
                  onChange={(e) => setSettings({ ...settings, seo_default_description: e.target.value })}
                  placeholder="Professional painting, restoration & finishing services..."
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </AdminPageLayout>
  );
}
