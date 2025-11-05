import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface ClientFormProps {
  clientId?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface ClientFormData {
  contact_name: string;
  email: string;
  phone: string;
  secondary_phone: string;
  company_name: string;
  client_type: 'residential' | 'commercial';
  address_line1: string;
  address_line2: string;
  city: string;
  province: string;
  postal_code: string;
  source: string;
  rating: number;
  notes: string;
}

const SOURCES = ['referral', 'website', 'social_media', 'advertisement', 'repeat_business', 'other'];
const PROVINCES = ['ON', 'QC', 'BC', 'AB', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'NT', 'YT', 'NU'];

export const ClientForm = ({ clientId, onSuccess, onCancel }: ClientFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ClientFormData>({
    contact_name: '',
    email: '',
    phone: '',
    secondary_phone: '',
    company_name: '',
    client_type: 'residential',
    address_line1: '',
    address_line2: '',
    city: '',
    province: 'ON',
    postal_code: '',
    source: 'website',
    rating: 3,
    notes: '',
  });

  useEffect(() => {
    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  const fetchClient = async () => {
    try {
      const { data, error } = await supabase
        .from('business_clients')
        .select('*')
        .eq('id', clientId)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          contact_name: data.contact_name || '',
          email: data.email || '',
          phone: data.phone || '',
          secondary_phone: data.secondary_phone || '',
          company_name: data.company_name || '',
          client_type: data.client_type || 'residential',
          address_line1: data.address_line1 || '',
          address_line2: data.address_line2 || '',
          city: data.city || '',
          province: data.province || 'ON',
          postal_code: data.postal_code || '',
          source: data.source || 'website',
          rating: data.rating || 3,
          notes: data.notes || '',
        });
      }
    } catch (error) {
      console.error('Error fetching client:', error);
      toast({
        title: 'Error',
        description: 'Failed to load client data',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (clientId) {
        const { error } = await supabase
          .from('business_clients')
          .update(formData)
          .eq('id', clientId);

        if (error) throw error;
        toast({ title: 'Success', description: 'Client updated successfully' });
      } else {
        const { error } = await supabase
          .from('business_clients')
          .insert([formData]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Client created successfully' });
      }
      onSuccess();
    } catch (error: any) {
      console.error('Error saving client:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save client',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof ClientFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact_name">
            Contact Name *
          </Label>
          <Input
            id="contact_name"
            required
            value={formData.contact_name}
            onChange={(e) => updateField('contact_name', e.target.value)}
            className="bg-slate-800 border-slate-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="bg-slate-800 border-slate-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone *
          </Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="bg-slate-800 border-slate-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondary_phone">
            Secondary Phone
          </Label>
          <Input
            id="secondary_phone"
            type="tel"
            value={formData.secondary_phone}
            onChange={(e) => updateField('secondary_phone', e.target.value)}
            className="bg-slate-800 border-slate-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company_name">
            Company Name
          </Label>
          <Input
            id="company_name"
            value={formData.company_name}
            onChange={(e) => updateField('company_name', e.target.value)}
            className="bg-slate-800 border-slate-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="client_type">
            Client Type *
          </Label>
          <Select
            value={formData.client_type}
            onValueChange={(value: any) => updateField('client_type', value)}
          >
            <SelectTrigger className="bg-slate-800 border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-[hsl(var(--bg))]">
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="source">
            Source
          </Label>
          <Select
            value={formData.source}
            onValueChange={(value) => updateField('source', value)}
          >
            <SelectTrigger className="bg-slate-800 border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-[hsl(var(--bg))]">
              {SOURCES.map(source => (
                <SelectItem key={source} value={source} className="capitalize">
                  {source.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">
            Rating (1-5)
          </Label>
          <Input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => updateField('rating', parseInt(e.target.value))}
            className="bg-slate-800 border-slate-700"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[hsl(var(--bg))]">Address</h3>
        
        <div className="space-y-2">
          <Label htmlFor="address_line1">
            Address Line 1
          </Label>
          <Input
            id="address_line1"
            value={formData.address_line1}
            onChange={(e) => updateField('address_line1', e.target.value)}
            className="bg-slate-800 border-slate-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address_line2">
            Address Line 2
          </Label>
          <Input
            id="address_line2"
            value={formData.address_line2}
            onChange={(e) => updateField('address_line2', e.target.value)}
            className="bg-slate-800 border-slate-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">
              City
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => updateField('city', e.target.value)}
              className="bg-slate-800 border-slate-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">
              Province
            </Label>
            <Select
              value={formData.province}
              onValueChange={(value) => updateField('province', value)}
            >
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-[hsl(var(--bg))]">
                {PROVINCES.map(prov => (
                  <SelectItem key={prov} value={prov}>
                    {prov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="postal_code">
              Postal Code
            </Label>
            <Input
              id="postal_code"
              value={formData.postal_code}
              onChange={(e) => updateField('postal_code', e.target.value.toUpperCase())}
              placeholder="A1A 1A1"
              className="bg-slate-800 border-slate-700"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">
          Notes
        </Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          rows={4}
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="border-slate-700 hover:bg-slate-700"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {clientId ? 'Update Client' : 'Create Client'}
        </Button>
      </div>
    </form>
  );
};
