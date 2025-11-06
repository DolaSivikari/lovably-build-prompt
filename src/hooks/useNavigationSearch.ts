import { useState, useMemo } from "react";
import { megaMenuDataEnhanced } from "@/data/navigation-structure-enhanced";

interface SearchResult {
  name: string;
  link: string;
  category: string;
  section: string;
  badge?: "new" | "popular" | "important";
}

export function useNavigationSearch() {
  const [searchQuery, setSearchQuery] = useState("");

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

  return {
    searchQuery,
    setSearchQuery,
    filteredResults,
    isSearching: searchQuery.trim().length > 0,
  };
}
