import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface OverviewSection {
  id: string;
  section_type: "approach" | "values" | "promise";
  title: string;
}

interface OverviewItem {
  id: string;
  section_id: string;
  title: string | null;
  content: string;
  icon_name: string | null;
  display_order: number;
}

export const useCompanyOverview = () => {
  const { data: sections = [] } = useQuery({
    queryKey: ["company-overview-sections-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_overview_sections")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      
      if (error) throw error;
      return data as OverviewSection[];
    },
  });

  const { data: items = [] } = useQuery({
    queryKey: ["company-overview-items-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_overview_items")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      
      if (error) throw error;
      return data as OverviewItem[];
    },
  });

  return { sections, items };
};
