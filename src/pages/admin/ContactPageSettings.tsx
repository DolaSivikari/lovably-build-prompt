import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const ContactPageSettings = () => {
  const { isLoading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    office_address: "",
    main_phone: "",
    toll_free_phone: "",
    general_email: "",
    projects_email: "",
    careers_email: "",
    weekday_hours: "",
    saturday_hours: "",
    sunday_hours: "",
    map_embed_url: ""
  });

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
        setSettings({
          office_address: data.office_address || "",
          main_phone: data.main_phone || "",
          toll_free_phone: data.toll_free_phone || "",
          general_email: data.general_email || "",
          projects_email: data.projects_email || "",
          careers_email: data.careers_email || "",
          weekday_hours: data.weekday_hours || "",
          saturday_hours: data.saturday_hours || "",
          sunday_hours: data.sunday_hours || "",
          map_embed_url: data.map_embed_url || ""
        });
      }
    } catch (error: any) {
      toast.error("Failed to load contact page settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const settingsData = {
        ...settings,
        updated_by: user?.id,
        updated_at: new Date().toISOString()
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
          .insert({ ...settingsData, created_by: user?.id })
          .select()
          .single();
        if (error) throw error;
        setSettingsId(data.id);
      }

      toast.success("Contact page settings saved successfully");
    } catch (error: any) {
      toast.error("Failed to save contact page settings");
    }
  };

  const updateField = (field: string, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  if (authLoading || loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Contact Page Settings</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/admin')}>
              Back to Dashboard
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Office Location */}
          <Card>
            <CardHeader>
              <CardTitle>Office Location</CardTitle>
              <CardDescription>Main office address and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Office Address</Label>
                <Textarea
                  value={settings.office_address}
                  onChange={(e) => updateField('office_address', e.target.value)}
                  placeholder="Full office address including unit, street, city, province, postal code"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Phone Numbers */}
          <Card>
            <CardHeader>
              <CardTitle>Phone Numbers</CardTitle>
              <CardDescription>Contact phone numbers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Main Phone</Label>
                  <Input
                    value={settings.main_phone}
                    onChange={(e) => updateField('main_phone', e.target.value)}
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <Label>Toll-Free Phone</Label>
                  <Input
                    value={settings.toll_free_phone}
                    onChange={(e) => updateField('toll_free_phone', e.target.value)}
                    placeholder="1-800-XXX-XXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Addresses */}
          <Card>
            <CardHeader>
              <CardTitle>Email Addresses</CardTitle>
              <CardDescription>Contact email addresses for different departments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>General Inquiries Email</Label>
                <Input
                  type="email"
                  value={settings.general_email}
                  onChange={(e) => updateField('general_email', e.target.value)}
                  placeholder="info@company.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Projects Email</Label>
                  <Input
                    type="email"
                    value={settings.projects_email}
                    onChange={(e) => updateField('projects_email', e.target.value)}
                    placeholder="projects@company.com"
                  />
                </div>
                <div>
                  <Label>Careers Email</Label>
                  <Input
                    type="email"
                    value={settings.careers_email}
                    onChange={(e) => updateField('careers_email', e.target.value)}
                    placeholder="careers@company.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Office operating hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Weekday Hours (Mon-Fri)</Label>
                <Input
                  value={settings.weekday_hours}
                  onChange={(e) => updateField('weekday_hours', e.target.value)}
                  placeholder="Monday - Friday: 8:00 AM - 6:00 PM"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Saturday Hours</Label>
                  <Input
                    value={settings.saturday_hours}
                    onChange={(e) => updateField('saturday_hours', e.target.value)}
                    placeholder="Saturday: 9:00 AM - 4:00 PM"
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
              </div>
            </CardContent>
          </Card>

          {/* Map Embed */}
          <Card>
            <CardHeader>
              <CardTitle>Google Maps Integration</CardTitle>
              <CardDescription>Embedded map showing office location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Map Embed URL</Label>
                <Textarea
                  value={settings.map_embed_url}
                  onChange={(e) => updateField('map_embed_url', e.target.value)}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Go to Google Maps, find your location, click "Share", then "Embed a map", and copy the iframe src URL
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPageSettings;
