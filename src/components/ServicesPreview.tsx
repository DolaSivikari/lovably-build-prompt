import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import * as LucideIcons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  category: string | null;
  icon_name: string | null;
}

interface CategoryConfig {
  name: string;
  slug: string;
  icon: keyof typeof LucideIcons;
  color: string;
  description: string;
  image: string;
}

const categoryConfig: Record<string, CategoryConfig> = {
  "Painting Services": {
    name: "Painting Services",
    slug: "painting-services",
    icon: "Paintbrush",
    color: "primary",
    description: "Professional interior and exterior painting for all property types",
    image: "/src/assets/project-commercial.jpg"
  },
  "Exterior Systems": {
    name: "Exterior Systems",
    slug: "exterior-systems",
    icon: "Building2",
    color: "terracotta",
    description: "Comprehensive building envelope solutions and restoration",
    image: "/src/assets/project-industrial.jpg"
  },
  "Specialty Services": {
    name: "Specialty Services",
    slug: "specialty-services",
    icon: "Layers",
    color: "sage",
    description: "Specialized construction and restoration services",
    image: "/src/assets/project-institutional.jpg"
  }
};

const ServicesPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("id, name, slug, short_description, category, icon_name")
      .eq("publish_state", "published")
      .order("name");

    if (error) {
      console.error("Error loading services:", error);
      setLoading(false);
      return;
    }

    setServices(data || []);
    setLoading(false);
  };

  // Group services by category (exclude Construction Management from homepage)
  const groupedServices = services
    .filter(service => service.category && service.category !== "Construction Management")
    .reduce((acc, service) => {
      const category = service.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(service);
      return acc;
    }, {} as Record<string, Service[]>);

  // Get top 4 services for each category
  const getCategoryServices = (category: string) => {
    return (groupedServices[category] || []).slice(0, 4);
  };

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-gradient-to-b from-background to-muted/20 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive construction solutions backed by decades of experience
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-[500px] animate-pulse bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(categoryConfig).map(([categoryName, config]) => {
              const IconComponent = LucideIcons[config.icon] as React.ComponentType<{ className?: string }>;
              const categoryServices = getCategoryServices(categoryName);

              return (
                <Card
                  key={config.slug}
                  className="group overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={config.image}
                      alt={`${config.name} hero image`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={600}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
                    
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-background/80 backdrop-blur-sm border-2 border-primary/20">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {config.name}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col h-[calc(100%-12rem)]">
                    <p className="text-muted-foreground mb-6">
                      {config.description}
                    </p>

                    <div className="space-y-2 mb-6 flex-grow">
                      {categoryServices.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.slug}`}
                          className="flex items-start gap-2 text-sm hover:text-primary transition-colors group/item"
                        >
                          <CheckCircle className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                          <span className="group-hover/item:underline">{service.name}</span>
                        </Link>
                      ))}
                      {categoryServices.length === 0 && (
                        <p className="text-sm text-muted-foreground italic">
                          Services coming soon
                        </p>
                      )}
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full group/btn border-2 hover:border-primary"
                    >
                      <Link to={`/services#${config.slug}`}>
                        View All Services
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg" className="shadow-lg">
            <Link to="/services">
              Explore All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
