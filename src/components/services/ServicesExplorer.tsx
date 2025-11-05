import { useState, useEffect, useMemo, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
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
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
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
    <section
      ref={sectionRef}
      className={`py-20 bg-gradient-to-b from-background to-muted/20 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover comprehensive construction solutions backed by decades of expertise
          </p>
        </div>

        {/* Stats Bar */}
        <ServiceStats serviceCount={services.filter(s => s.category !== "Construction Management").length} />

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilters={activeFilters}
            onFilterToggle={handleFilterToggle}
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex justify-center">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {visibleServices.length} of {filteredServices.length} services
            {activeFilterCount > 0 && (
              <span className="ml-2 text-primary">
                ({activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active)
              </span>
            )}
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse bg-muted rounded-lg"
              />
            ))}
          </div>
        ) : visibleServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleServices.map((service, index) => (
                <div
                  key={service.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleServices.length < filteredServices.length && (
              <div className="text-center mt-12">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  size="lg"
                  className="border-2"
                >
                  Load More Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No services found matching your criteria
            </p>
            <Button
              variant="outline"
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

        {/* Bottom CTAs */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="shadow-lg">
            <Link to="/estimate">
              Get Free Estimate
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-2">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
