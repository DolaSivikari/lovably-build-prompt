import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";

interface FooterLink {
  label: string;
  href: string;
}

interface TrustBarItem {
  label: string;
  value: string;
}

const FooterSettings = () => {
  const { isLoading: authLoading } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [quickLinks, setQuickLinks] = useState<FooterLink[]>([]);
  const [sectorsLinks, setSectorsLinks] = useState<FooterLink[]>([]);
  const [contactInfo, setContactInfo] = useState({ address: "", phone: "", email: "" });
  const [socialMedia, setSocialMedia] = useState({ linkedin: "", facebook: "", twitter: "", instagram: "" });
  const [trustBarItems, setTrustBarItems] = useState<TrustBarItem[]>([]);

  useEffect(() => {
    loadFooterSettings();
  }, []);

  const loadFooterSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('footer_settings')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSettingsId(data.id);
        setQuickLinks((data.quick_links as any) || []);
        setSectorsLinks((data.sectors_links as any) || []);
        setContactInfo((data.contact_info as any) || { address: "", phone: "", email: "" });
        setSocialMedia((data.social_media as any) || { linkedin: "", facebook: "", twitter: "", instagram: "" });
        setTrustBarItems((data.trust_bar_items as any) || []);
      }
    } catch (error: any) {
      toast.error("Failed to load footer settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();

      const settingsData = {
        quick_links: quickLinks as any,
        sectors_links: sectorsLinks as any,
        contact_info: contactInfo as any,
        social_media: socialMedia as any,
        trust_bar_items: trustBarItems as any,
        updated_by: user?.id,
        updated_at: new Date().toISOString()
      };

      if (settingsId) {
        const { error } = await supabase
          .from('footer_settings')
          .update(settingsData)
          .eq('id', settingsId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('footer_settings')
          .insert([{ ...settingsData, created_by: user?.id }])
          .select()
          .single();
        if (error) throw error;
        setSettingsId(data.id);
      }

      toast.success("Footer settings saved successfully");
    } catch (error: any) {
      toast.error("Failed to save footer settings");
    } finally {
      setSaving(false);
    }
  };

  const addQuickLink = () => setQuickLinks([...quickLinks, { label: "", href: "" }]);
  const removeQuickLink = (index: number) => setQuickLinks(quickLinks.filter((_, i) => i !== index));
  const updateQuickLink = (index: number, field: keyof FooterLink, value: string) => {
    const updated = [...quickLinks];
    updated[index][field] = value;
    setQuickLinks(updated);
  };

  const addSectorLink = () => setSectorsLinks([...sectorsLinks, { label: "", href: "" }]);
  const removeSectorLink = (index: number) => setSectorsLinks(sectorsLinks.filter((_, i) => i !== index));
  const updateSectorLink = (index: number, field: keyof FooterLink, value: string) => {
    const updated = [...sectorsLinks];
    updated[index][field] = value;
    setSectorsLinks(updated);
  };

  const addTrustBarItem = () => setTrustBarItems([...trustBarItems, { label: "", value: "" }]);
  const removeTrustBarItem = (index: number) => setTrustBarItems(trustBarItems.filter((_, i) => i !== index));
  const updateTrustBarItem = (index: number, field: keyof TrustBarItem, value: string) => {
    const updated = [...trustBarItems];
    updated[index][field] = value;
    setTrustBarItems(updated);
  };

  return (
    <AdminPageLayout
      title="Footer Settings"
      description="Manage footer links, contact information, and social media"
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
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Manage footer navigation links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickLinks.map((link, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Label"
                value={link.label}
                onChange={(e) => updateQuickLink(index, 'label', e.target.value)}
              />
              <Input
                placeholder="URL (e.g., /services)"
                value={link.href}
                onChange={(e) => updateQuickLink(index, 'href', e.target.value)}
              />
              <Button variant="ghost" size="icon" onClick={() => removeQuickLink(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addQuickLink}>
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sectors / Client Types</CardTitle>
          <CardDescription>Links to different client segment pages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sectorsLinks.map((link, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Label"
                value={link.label}
                onChange={(e) => updateSectorLink(index, 'label', e.target.value)}
              />
              <Input
                placeholder="URL"
                value={link.href}
                onChange={(e) => updateSectorLink(index, 'href', e.target.value)}
              />
              <Button variant="ghost" size="icon" onClick={() => removeSectorLink(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addSectorLink}>
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Company contact details displayed in footer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Office Address</Label>
            <Input
              value={contactInfo.address}
              onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
              placeholder="Street address, city, province, postal code"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone Number</Label>
              <Input
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="(123) 456-7890"
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                placeholder="info@company.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>Connect your social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>LinkedIn URL</Label>
              <Input
                value={socialMedia.linkedin}
                onChange={(e) => setSocialMedia({ ...socialMedia, linkedin: e.target.value })}
                placeholder="https://linkedin.com/company/..."
              />
            </div>
            <div>
              <Label>Facebook URL</Label>
              <Input
                value={socialMedia.facebook}
                onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <Label>Twitter URL</Label>
              <Input
                value={socialMedia.twitter}
                onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
                placeholder="https://twitter.com/..."
              />
            </div>
            <div>
              <Label>Instagram URL</Label>
              <Input
                value={socialMedia.instagram}
                onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trust Bar / Credentials</CardTitle>
          <CardDescription>Display company credentials and certifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {trustBarItems.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Label (e.g., WSIB Certified)"
                value={item.label}
                onChange={(e) => updateTrustBarItem(index, 'label', e.target.value)}
              />
              <Input
                placeholder="Value (e.g., Certified)"
                value={item.value}
                onChange={(e) => updateTrustBarItem(index, 'value', e.target.value)}
              />
              <Button variant="ghost" size="icon" onClick={() => removeTrustBarItem(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addTrustBarItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Credential
          </Button>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default FooterSettings;
