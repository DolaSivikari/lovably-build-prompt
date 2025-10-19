import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Paintbrush,
  Building2,
  Building,
  Home,
  DoorOpen,
  Layers,
  Shield,
  Square,
  Sparkles,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const iconMap: Record<string, any> = {
  Paintbrush: Paintbrush,
  PaintBrush: Paintbrush, // Legacy support
  Building2,
  Building,
  Home,
  DoorOpen,
  Layers,
  Shield,
  Square,
};

const serviceColors = [
  { bg: "bg-primary/10", iconColor: "text-primary", border: "border-primary" },
  { bg: "bg-terracotta/10", iconColor: "text-terracotta", border: "border-terracotta" },
  { bg: "bg-sage/10", iconColor: "text-sage", border: "border-sage" },
  { bg: "bg-primary/10", iconColor: "text-primary", border: "border-primary" },
  { bg: "bg-terracotta/10", iconColor: "text-terracotta", border: "border-terracotta" },
  { bg: "bg-sage/10", iconColor: "text-sage", border: "border-sage" },
];

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  icon_name: string | null;
}

const ServicesPreview = () => {
  const [services, setServices] = useState<Service[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('id, name, slug, short_description, icon_name')
      .eq('publish_state', 'published')
      .order('created_at', { ascending: true })
      .limit(6);

    if (data) {
      setServices(data);
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Expert Construction Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional painting and restoration services tailored to your project needs
          </p>
        </div>

        {/* Standard 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = (service.icon_name && iconMap[service.icon_name as keyof typeof iconMap]) || Building;
            
            return (
              <Card 
                key={service.id}
                className="group bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{service.short_description}</p>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-semibold gap-1 transition-colors"
                    aria-label={`Learn more about ${service.name}`}
                  >
                    Learn more
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/services">
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
