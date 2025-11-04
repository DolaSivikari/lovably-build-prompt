import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminPageLayout } from '@/components/admin/AdminPageLayout';
import { FieldPreviewButton } from '@/components/admin/FieldPreviewButton';
import { FieldPreviewDialog } from '@/components/admin/FieldPreviewDialog';
import { ChangesDiffDialog } from '@/components/admin/ChangesDiffDialog';
import { useSettingsValidation } from '@/hooks/useSettingsValidation';
import { contactPageSettingsSchema } from '@/schemas/settings-validation';

export default function ContactPageSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [originalSettings, setOriginalSettings] = useState<any>(null);
  const [settings, setSettings] = useState<any>({
    office_address: '',
    office_phone: '',
    office_email: '',
    emergency_phone: '',
    careers_email: '',
    business_hours: '',
    map_embed_url: ''
  });
  
  const { toast } = useToast();
  const { isLoading: authLoading } = useAdminAuth();
  const { errors, validate, getFieldError } = useSettingsValidation(contactPageSettingsSchema);
  
  // Preview dialog state
  const [previewDialog, setPreviewDialog] = useState({
    open: false,
    fieldName: '',
    previewUrl: '',
    description: '',
  });
  
  // Changes diff dialog state
  const [showDiffDialog, setShowDiffDialog] = useState(false);

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
        const loadedSettings = {
          office_address: data.office_address || '',
          office_phone: data.main_phone || '',
          office_email: data.general_email || '',
          emergency_phone: data.toll_free_phone || '',
          careers_email: data.careers_email || '',
          business_hours: [data.weekday_hours, data.saturday_hours, data.sunday_hours].filter(Boolean).join('\n') || '',
          map_embed_url: data.map_embed_url || '',
        };
        setSettings(loadedSettings);
        setOriginalSettings(loadedSettings);
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

  const handlePreviewClick = () => {
    // Validate before showing diff
    if (!validate(settings)) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors before saving",
      });
      return;
    }
    setShowDiffDialog(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();

      // Map our field names to database column names
      const settingsData = {
        office_address: settings.office_address,
        main_phone: settings.office_phone,
        toll_free_phone: settings.emergency_phone,
        general_email: settings.office_email,
        careers_email: settings.careers_email,
        weekday_hours: settings.business_hours.split('\n')[0] || '',
        saturday_hours: settings.business_hours.split('\n')[1] || '',
        sunday_hours: settings.business_hours.split('\n')[2] || '',
        map_embed_url: settings.map_embed_url,
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
      
      setShowDiffDialog(false);
      loadContactSettings();
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

  const openPreview = (fieldName: string, previewUrl: string, description: string) => {
    setPreviewDialog({ open: true, fieldName, previewUrl, description });
  };

  return (
    <>
      <AdminPageLayout
        title="Contact Page Settings"
        description="Manage contact information displayed on the contact page"
        loading={authLoading || loading}
        actions={
          <Button onClick={handlePreviewClick} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            Preview & Save Changes
          </Button>
        }
      >
        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the following errors before saving:
              <ul className="list-disc list-inside mt-2">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field} className="text-sm">{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Office Location</CardTitle>
            <CardDescription>Primary office address</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex items-center">
                <Label>Office Address</Label>
                <FieldPreviewButton
                  onClick={() => openPreview(
                    'Office Address',
                    '/contact',
                    'This address appears in the contact information section'
                  )}
                />
              </div>
              <Textarea
                value={settings.office_address}
                onChange={(e) => updateField('office_address', e.target.value)}
                placeholder="123 Industrial Parkway, Suite 200&#10;Mississauga, ON M1B 2K9"
                rows={3}
                className={getFieldError('office_address') ? 'border-destructive' : ''}
              />
              {getFieldError('office_address') && (
                <p className="text-sm text-destructive mt-1">{getFieldError('office_address')}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phone Numbers</CardTitle>
            <CardDescription>Main and emergency contact numbers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center">
                <Label>Office Phone</Label>
                <FieldPreviewButton
                  onClick={() => openPreview('Office Phone', '/contact', 'Main phone number in contact section')}
                />
              </div>
              <Input
                value={settings.office_phone}
                onChange={(e) => updateField('office_phone', e.target.value)}
                placeholder="(416) 555-PAINT"
                className={getFieldError('office_phone') ? 'border-destructive' : ''}
              />
              {getFieldError('office_phone') && (
                <p className="text-sm text-destructive mt-1">{getFieldError('office_phone')}</p>
              )}
            </div>
            <div>
              <div className="flex items-center">
                <Label>Emergency Phone (Optional)</Label>
                <FieldPreviewButton
                  onClick={() => openPreview('Emergency Phone', '/contact', 'Emergency contact number')}
                />
              </div>
              <Input
                value={settings.emergency_phone}
                onChange={(e) => updateField('emergency_phone', e.target.value)}
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
              <div className="flex items-center">
                <Label>Office Email</Label>
                <FieldPreviewButton
                  onClick={() => openPreview('Office Email', '/contact', 'Main email in contact section')}
                />
              </div>
              <Input
                type="email"
                value={settings.office_email}
                onChange={(e) => updateField('office_email', e.target.value)}
                placeholder="info@ascentgroupconstruction.com"
                className={getFieldError('office_email') ? 'border-destructive' : ''}
              />
              {getFieldError('office_email') && (
                <p className="text-sm text-destructive mt-1">{getFieldError('office_email')}</p>
              )}
            </div>
            <div>
              <div className="flex items-center">
                <Label>Careers Email (Optional)</Label>
                <FieldPreviewButton
                  onClick={() => openPreview('Careers Email', '/careers', 'Email for job applications')}
                />
              </div>
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
          <CardContent>
            <div>
              <div className="flex items-center">
                <Label>Business Hours</Label>
                <FieldPreviewButton
                  onClick={() => openPreview('Business Hours', '/contact', 'Hours of operation displayed')}
                />
              </div>
              <Textarea
                value={settings.business_hours}
                onChange={(e) => updateField('business_hours', e.target.value)}
                placeholder="Monday - Friday: 8:00 AM - 6:00 PM&#10;Saturday: 9:00 AM - 2:00 PM&#10;Sunday: Closed"
                rows={4}
                className={getFieldError('business_hours') ? 'border-destructive' : ''}
              />
              {getFieldError('business_hours') && (
                <p className="text-sm text-destructive mt-1">{getFieldError('business_hours')}</p>
              )}
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
              <div className="flex items-center">
                <Label>Map Embed URL (Optional)</Label>
                <FieldPreviewButton
                  onClick={() => openPreview('Map', '/contact', 'Embedded map on contact page')}
                />
              </div>
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

      <FieldPreviewDialog
        open={previewDialog.open}
        onOpenChange={(open) => setPreviewDialog({ ...previewDialog, open })}
        fieldName={previewDialog.fieldName}
        previewUrl={previewDialog.previewUrl}
        description={previewDialog.description}
      />

      <ChangesDiffDialog
        open={showDiffDialog}
        onOpenChange={setShowDiffDialog}
        originalData={originalSettings || {}}
        modifiedData={settings}
        onConfirm={handleSave}
        loading={saving}
      />
    </>
  );
}
