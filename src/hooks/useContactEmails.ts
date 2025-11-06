import { useSettingsData } from './useSettingsData';

export const useContactEmails = () => {
  const { data: contactSettings, loading } = useSettingsData('contact_page_settings');
  
  return {
    generalEmail: contactSettings?.general_email || 'info@ascentgroupconstruction.com',
    projectsEmail: contactSettings?.projects_email || 'projects@ascentgroupconstruction.com',
    careersEmail: contactSettings?.careers_email || 'careers@ascentgroupconstruction.com',
    rfpEmail: contactSettings?.rfp_email || 'rfp@ascentgroupconstruction.com',
    loading
  };
};
