import { useState, useMemo, useEffect } from "react";
import { megaMenuDataEnhanced } from "@/data/navigation-structure-enhanced";
import { useSearchAnalytics } from "./useSearchAnalytics";

interface SearchResult {
  name: string;
  link: string;
  category: string;
  section: string;
  badge?: "new" | "popular" | "important";
}

export function useNavigationSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const { trackSearch } = useSearchAnalytics();

  const allNavigationItems = useMemo(() => {
    const items: SearchResult[] = [];

    // Extract items from services
    megaMenuDataEnhanced.services.forEach((section) => {
      section.categories.forEach((category) => {
        if (category.subItems) {
          category.subItems.forEach((item) => {
            items.push({
              name: item.name,
              link: item.link,
              category: category.title,
              section: "Services",
              badge: item.badge as "new" | "popular" | "important" | undefined,
            });
          });
        }
      });
    });

    // Extract items from markets
    megaMenuDataEnhanced.markets.forEach((section) => {
      section.categories.forEach((category) => {
        if (category.subItems) {
          category.subItems.forEach((item) => {
            items.push({
              name: item.name,
              link: item.link,
              category: category.title,
              section: "Markets",
              badge: item.badge as "new" | "popular" | "important" | undefined,
            });
          });
        }
      });
    });

    // Extract items from projects
    megaMenuDataEnhanced.projects.forEach((section) => {
      section.categories.forEach((category) => {
        if (category.subItems) {
          category.subItems.forEach((item) => {
            items.push({
              name: item.name,
              link: item.link,
              category: "Projects",
              section: "Projects",
              badge: item.badge as "new" | "popular" | "important" | undefined,
            });
          });
        }
      });
    });

    // Extract items from company
    megaMenuDataEnhanced.company.forEach((section) => {
      section.categories.forEach((category) => {
        if (category.subItems) {
          category.subItems.forEach((item) => {
            items.push({
              name: item.name,
              link: item.link,
              category: section.sectionTitle,
              section: "Company",
              badge: item.badge as "new" | "popular" | "important" | undefined,
            });
          });
        }
      });
    });

    // Extract items from resources
    megaMenuDataEnhanced.resources.forEach((section) => {
      section.categories.forEach((category) => {
        if (category.subItems) {
          category.subItems.forEach((item) => {
            items.push({
              name: item.name,
              link: item.link,
              category: section.sectionTitle,
              section: "Resources",
              badge: item.badge as "new" | "popular" | "important" | undefined,
            });
          });
        }
      });
    });

    return items;
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return allNavigationItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, allNavigationItems]);

  // Track search analytics when results change
  useEffect(() => {
    if (searchQuery.trim() && filteredResults.length >= 0) {
      // Calculate section distribution
      const sectionDistribution = filteredResults.reduce((acc, result) => {
        acc[result.section] = (acc[result.section] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      trackSearch({
        search_query: searchQuery,
        results_count: filteredResults.length,
        section_distribution: sectionDistribution,
      });
    }
  }, [searchQuery, filteredResults, trackSearch]);

  return {
    searchQuery,
    setSearchQuery,
    filteredResults,
    isSearching: searchQuery.trim().length > 0,
  };
}
