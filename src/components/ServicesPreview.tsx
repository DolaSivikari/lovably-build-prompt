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
    <section ref={sectionRef} className="w-full py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Geometric blueprint elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-10 w-64 h-64 border border-primary rotate-45" />
        <div className="absolute bottom-20 right-20 w-80 h-80 border border-primary/50 rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-primary/30 rounded-full" />
      </div>

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/20 to-transparent blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-secondary/20 to-transparent blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className={`text-primary font-semibold mb-3 uppercase tracking-widest text-xs transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Our Services
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Expert Construction Services
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Professional painting and restoration services tailored to your project needs
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = (service.icon_name && iconMap[service.icon_name as keyof typeof iconMap]) || Building;
            const colorScheme = serviceColors[index % serviceColors.length];
            const isWide = index === 0 || index === 4; // First and fifth cards span 2 columns on large screens
            
            return (
              <Card 
                key={service.id}
                className={`group relative bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden ${
                  isWide ? 'lg:col-span-2' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Gradient sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Colored accent bar at bottom */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${colorScheme.border} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                <div className="p-8 relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
                  {/* Floating icon with glow */}
                  <div className="relative inline-flex mb-6">
                    <div className={`absolute inset-0 ${colorScheme.bg} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                    <div className={`relative p-4 rounded-2xl ${colorScheme.bg} ${colorScheme.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <IconComponent className="h-7 w-7" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors tracking-tight">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">{service.short_description}</p>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-semibold group-hover:gap-3 gap-2 transition-all"
                    aria-label={`Learn more about ${service.name} services`}
                  >
                    Explore {service.name}
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        <div className={`text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link to="/services">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all hover:scale-105">
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
