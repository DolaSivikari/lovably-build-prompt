import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2, HardHat, Ruler, Shield, LucideIcon } from "lucide-react";

export interface PopularService {
  name: string;
  link: string;
  icon: LucideIcon;
  searchCount?: number;
}

// Default curated GC services
const DEFAULT_SERVICES: PopularService[] = [
  {
    name: "General Contracting",
    link: "/services/general-contracting",
    icon: Building2,
  },
  {
    name: "Construction Management",
    link: "/services/construction-management",
    icon: HardHat,
  },
  {
    name: "Design-Build",
    link: "/services/design-build",
    icon: Ruler,
  },
  {
    name: "Building Envelope",
    link: "/services/building-envelope",
    icon: Shield,
  },
];

// Map service names to icons
const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  "general contracting": Building2,
  "construction management": HardHat,
  "design-build": Ruler,
  "building envelope": Shield,
  "waterproofing": Shield,
  "masonry restoration": Building2,
  "parking rehabilitation": HardHat,
  "interior buildouts": Ruler,
};

const getIconForService = (serviceName: string): LucideIcon => {
  const normalizedName = serviceName.toLowerCase();
  return SERVICE_ICON_MAP[normalizedName] || Building2;
};

export function usePopularServices() {
  return useQuery({
    queryKey: ["popular-services"],
    queryFn: async () => {
      // Query analytics for most clicked/searched services
      const { data, error } = await supabase
        .from("search_analytics")
        .select("clicked_result_name, clicked_result_link")
        .not("clicked_result_name", "is", null)
        .not("clicked_result_link", "is", null);

      if (error) {
        console.debug("Analytics query failed, using defaults:", error);
        return DEFAULT_SERVICES;
      }

      // Count occurrences of each service
      const serviceCounts = new Map<string, { link: string; count: number }>();
      
      data.forEach((row) => {
        const name = row.clicked_result_name!;
        const link = row.clicked_result_link!;
        const current = serviceCounts.get(name) || { link, count: 0 };
        serviceCounts.set(name, { link, count: current.count + 1 });
      });

      // Convert to array and sort by count
      const sortedServices = Array.from(serviceCounts.entries())
        .map(([name, { link, count }]) => ({
          name,
          link,
          icon: getIconForService(name),
          searchCount: count,
        }))
        .sort((a, b) => b.searchCount! - a.searchCount!)
        .slice(0, 4);

      // Use analytics data if we have enough searches (50+), otherwise use defaults
      const totalSearches = data.length;
      if (totalSearches < 50) {
        return DEFAULT_SERVICES;
      }

      return sortedServices.length > 0 ? sortedServices : DEFAULT_SERVICES;
    },
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });
}
