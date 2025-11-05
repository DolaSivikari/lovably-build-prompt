import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceCard } from "./ServiceCard";
import { CategoryTabs } from "./CategoryTabs";
import { SearchBar } from "./SearchBar";
import { ServiceStats } from "./ServiceStats";

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  category: string | null;
  icon_name: string | null;
  featured?: boolean;
  typical_timeline?: string | null;
  project_types?: string[] | null;
}

const categories = [
  { label: "All Services", value: "all" },
  { label: "Construction Services", value: "Painting Services" },
  { label: "Exterior Systems", value: "Exterior Systems" },
  { label: "Specialty Services", value: "Specialty Services" },
];

export const ServicesExplorer = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showCount, setShowCount] = useState(12);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("id, name, slug, short_description, category, icon_name, featured, typical_timeline, project_types")
      .eq("publish_state", "published")
      .order("featured", { ascending: false })
      .order("name");

    if (error) {
      console.error("Error loading services:", error);
      setLoading(false);
      return;
    }

    setServices(data || []);
    setLoading(false);
  };

  // Filter services based on category, search, and filters
  const filteredServices = useMemo(() => {
    let filtered = services;

    // Category filter (exclude Construction Management)
    if (activeCategory !== "all") {
      filtered = filtered.filter((s) => s.category === activeCategory);
    } else {
      filtered = filtered.filter((s) => s.category !== "Construction Management");
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.short_description?.toLowerCase().includes(query) ||
          s.category?.toLowerCase().includes(query)
      );
    }

    // Project type filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((s) =>
        s.project_types?.some((type) => activeFilters.includes(type))
      );
    }

    return filtered;
  }, [services, activeCategory, searchQuery, activeFilters]);

  const visibleServices = filteredServices.slice(0, showCount);

  const handleFilterToggle = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleLoadMore = () => {
    setShowCount((prev) => prev + 12);
  };

  const activeFilterCount = activeFilters.length + (searchQuery ? 1 : 0);

  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        
        {/* Section Header - Enterprise Style */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Construction Services & Capabilities
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Comprehensive construction solutions delivered by licensed professionals with proven expertise across commercial, institutional, and multi-unit residential projects.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mb-12">
          <ServiceStats serviceCount={services.filter(s => s.category !== "Construction Management").length} />
        </div>

        {/* Search & Filter Controls */}
        <div className="mb-8 pb-8 border-b border-border">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilters={activeFilters}
            onFilterToggle={handleFilterToggle}
          />
        </div>

        {/* Category Tabs - Clean Design */}
        <div className="mb-12">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">
              Showing {visibleServices.length} of {filteredServices.length} services
              {activeFilterCount > 0 && (
                <span className="ml-2 text-steel-blue font-semibold">
                  ({activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active)
                </span>
              )}
            </p>
          </div>
        )}

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-muted rounded-lg"
              />
            ))}
          </div>
        ) : visibleServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {visibleServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>

            {/* Load More Button */}
            {visibleServices.length < filteredServices.length && (
              <div className="text-center mt-12 mb-12">
                <Button
                  onClick={handleLoadMore}
                  variant="secondary"
                  size="lg"
                  className="min-w-[200px]"
                >
                  Load More Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 mb-12">
            <p className="text-lg text-muted-foreground mb-6">
              No services found matching your criteria
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery("");
                setActiveFilters([]);
                setActiveCategory("all");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Bottom CTAs - Professional Design */}
        <div className="pt-12 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="primary" className="min-w-[220px]">
              <Link to="/estimate" className="inline-flex items-center gap-2">
                Request Proposal
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="min-w-[220px]">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
