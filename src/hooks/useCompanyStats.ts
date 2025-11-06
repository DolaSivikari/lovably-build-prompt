import { useSettingsData } from './useSettingsData';

interface CompanyStats {
  yearsInBusiness: number;
  yearsInBusinessFormatted: string;
  totalProjects: number;
  totalProjectsFormatted: string;
  satisfactionRate: number;
  satisfactionRateFormatted: string;
  loading: boolean;
}

/**
 * Centralized hook for company statistics from about_page_settings
 * Use this instead of hardcoding values like "15+ years", "500+ projects", etc.
 * 
 * @example
 * const { yearsInBusinessFormatted, totalProjectsFormatted, satisfactionRateFormatted } = useCompanyStats();
 * // Returns: "15+", "500+", "98%"
 */
export function useCompanyStats(): CompanyStats {
  const { data: aboutSettings, loading } = useSettingsData<any>('about_page_settings');

  const yearsInBusiness = aboutSettings?.years_in_business || 15;
  const totalProjects = aboutSettings?.total_projects || 500;
  const satisfactionRate = aboutSettings?.satisfaction_rate || 98;

  return {
    yearsInBusiness,
    yearsInBusinessFormatted: `${yearsInBusiness}+`,
    totalProjects,
    totalProjectsFormatted: `${totalProjects}+`,
    satisfactionRate,
    satisfactionRateFormatted: `${satisfactionRate}%`,
    loading,
  };
}
