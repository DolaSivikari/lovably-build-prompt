import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminPageLayout } from '@/components/admin/AdminPageLayout';

export default function ContactPageSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [settings, setSettings] = useState<any>({
    office_address: '',
    main_phone: '',
    toll_free_phone: '',
    general_email: '',
    projects_email: '',
    careers_email: '',
    weekday_hours: '',
    saturday_hours: '',
    sunday_hours: '',
    map_embed_url: ''
  });
  const { toast } = useToast();
  const { isLoading: authLoading } = useAdminAuth();

  useEffect(() => {
    loadContactSettings();
  }, []);

  const loadContactSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_page_settings')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSettingsId(data.id);
        setSettings(data);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load contact settings',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();

      const settingsData = {
        ...settings,
        updated_by: user?.id,
        updated_at: new Date().toISOString(),
        is_active: true,
      };

      if (settingsId) {
        const { error } = await supabase
          .from('contact_page_settings')
          .update(settingsData)
          .eq('id', settingsId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('contact_page_settings')
          .insert([{ ...settingsData, created_by: user?.id }])
          .select()
          .single();
        if (error) throw error;
        setSettingsId(data.id);
      }

      toast({
        title: 'Success',
        description: 'Contact settings saved successfully',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save contact settings',
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <AdminPageLayout
      title="Contact Page Settings"
      description="Manage contact information displayed on the contact page"
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
      <Card>
        <CardHeader>
          <CardTitle>Office Location</CardTitle>
          <CardDescription>Primary office address</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Office Address</Label>
            <Textarea
              value={settings.office_address}
              onChange={(e) => updateField('office_address', e.target.value)}
              placeholder="123 Industrial Parkway, Suite 200&#10;Mississauga, ON M1B 2K9"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phone Numbers</CardTitle>
          <CardDescription>Main and toll-free contact numbers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Main Phone</Label>
            <Input
              value={settings.main_phone}
              onChange={(e) => updateField('main_phone', e.target.value)}
              placeholder="(416) 555-PAINT"
            />
          </div>
          <div>
            <Label>Toll-Free Phone</Label>
            <Input
              value={settings.toll_free_phone}
              onChange={(e) => updateField('toll_free_phone', e.target.value)}
              placeholder="1-800-555-ASCENT"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Addresses</CardTitle>
          <CardDescription>Department email addresses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>General Email</Label>
            <Input
              type="email"
              value={settings.general_email}
              onChange={(e) => updateField('general_email', e.target.value)}
              placeholder="info@ascentgroupconstruction.com"
            />
          </div>
          <div>
            <Label>Projects Email</Label>
            <Input
              type="email"
              value={settings.projects_email}
              onChange={(e) => updateField('projects_email', e.target.value)}
              placeholder="projects@ascentgroupconstruction.com"
            />
          </div>
          <div>
            <Label>Careers Email</Label>
            <Input
              type="email"
              value={settings.careers_email}
              onChange={(e) => updateField('careers_email', e.target.value)}
              placeholder="careers@ascentgroupconstruction.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>Operating hours displayed on contact page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Weekday Hours</Label>
            <Input
              value={settings.weekday_hours}
              onChange={(e) => updateField('weekday_hours', e.target.value)}
              placeholder="Monday - Friday: 8:00 AM - 6:00 PM"
            />
          </div>
          <div>
            <Label>Saturday Hours</Label>
            <Input
              value={settings.saturday_hours}
              onChange={(e) => updateField('saturday_hours', e.target.value)}
              placeholder="Saturday: 9:00 AM - 2:00 PM"
            />
          </div>
          <div>
            <Label>Sunday Hours</Label>
            <Input
              value={settings.sunday_hours}
              onChange={(e) => updateField('sunday_hours', e.target.value)}
              placeholder="Sunday: Closed"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Map Embed</CardTitle>
          <CardDescription>Google Maps iframe embed URL</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Map Embed URL</Label>
            <Textarea
              value={settings.map_embed_url}
              onChange={(e) => updateField('map_embed_url', e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Get embed URL from Google Maps → Share → Embed a map
            </p>
          </div>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
}
