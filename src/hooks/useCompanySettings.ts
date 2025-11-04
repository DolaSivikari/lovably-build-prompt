import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CompanySettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  businessHours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  socialLinks: {
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
  };
  certifications: string[];
  metaTitle: string;
  metaDescription: string;
}

interface UseCompanySettingsResult {
  settings: CompanySettings | null;
  loading: boolean;
  error: Error | null;
}

export function useCompanySettings(): UseCompanySettingsResult {
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error: fetchError } = await supabase
          .from('site_settings')
          .select('*')
          .eq('is_active', true)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          const businessHours = data.business_hours as any;
          const socialLinks = data.social_links as any;
          
          setSettings({
            companyName: data.company_name || 'Ascent Group Construction',
            phone: data.phone || '647-528-6804',
            email: data.email || 'info@ascentgroupconstruction.com',
            address: data.address || '7895 Tranmere Drive, Unit #22, Mississauga, ON L5S 1V9',
            businessHours: {
              weekday: businessHours?.weekday || 'Mon-Fri: 8AM-6PM',
              saturday: businessHours?.saturday || 'Sat: 9AM-4PM',
              sunday: businessHours?.sunday || 'Closed',
            },
            socialLinks: {
              linkedin: socialLinks?.linkedin || '',
              facebook: socialLinks?.facebook || '',
              instagram: socialLinks?.instagram || '',
              twitter: socialLinks?.twitter || '',
            },
            certifications: (data.certifications as string[]) || [],
            metaTitle: data.meta_title || 'Ascent Group Construction - Professional Painting & Restoration',
            metaDescription: data.meta_description || 'Leading painting and exterior finishing services across the GTA',
          });
        }
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching company settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
}
