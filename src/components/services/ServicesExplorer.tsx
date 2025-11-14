import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { TieredServicesGrid } from "./TieredServicesGrid";

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
  service_tier?: string | null;
  challenge_tags?: string[] | null;
}

export const ServicesExplorer = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(50);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("id, name, slug, short_description, category, icon_name, featured, typical_timeline, project_types, service_tier, challenge_tags")
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

  // Filter services based on challenge, search, and filters
  const filteredServices = useMemo(() => {
    let filtered = services;

    // Challenge filter
    if (activeChallenge) {
      filtered = filtered.filter((s) =>
        s.challenge_tags?.includes(activeChallenge)
      );
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
  }, [services, activeChallenge, searchQuery, activeFilters]);

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

  const activeFilterCount = activeFilters.length + (searchQuery ? 1 : 0) + (activeChallenge ? 1 : 0);

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Section Header - Clean & Modern */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Services
          </h2>
          <p className="text-base text-muted-foreground">
            Design-build partnerships for new construction. Maintenance programs for occupied buildings. Lifecycle strategies that protect ROI. Whether you're building, managing, or owning—we deliver envelope solutions engineered for long-term performance.
          </p>
        </div>

        {/* Search & Filter Controls - Simplified */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-12 text-base"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Quick Filters - Minimalist */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {["residential", "commercial", "industrial"].map((filter) => (
              <Button
                key={filter}
                variant={activeFilters.includes(filter) ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterToggle(filter)}
                className="capitalize"
              >
                {filter}
              </Button>
            ))}
            {(activeFilters.length > 0 || searchQuery || activeChallenge) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilters([]);
                  setActiveChallenge(null);
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results Info */}
        {!loading && filteredServices.length > 0 && (
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
            </p>
          </div>
        )}

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <TieredServicesGrid services={visibleServices} />
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
                setActiveChallenge(null);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Bottom CTA - Clean */}
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="default">
            <Link to="/estimate" className="inline-flex items-center gap-2">
              Request Proposal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
