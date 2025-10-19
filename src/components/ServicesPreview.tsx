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
    <section ref={sectionRef} className="w-full py-24 bg-white relative">
      {/* Minimal grid pattern - PCL style */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className={`text-primary font-bold mb-2 uppercase tracking-wider text-xs transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Our Services
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-foreground transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Expert Construction Services
          </h2>
          <p className={`text-base text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
                className={`group relative bg-white border border-border hover:border-primary transition-all duration-300 hover:shadow-lg overflow-hidden ${
                  isWide ? 'lg:col-span-2' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Simple border accent on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                <div className="p-6 relative">
                  {/* Clean icon presentation */}
                  <div className={`inline-flex p-3 rounded-lg ${colorScheme.bg} ${colorScheme.iconColor} mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{service.short_description}</p>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-secondary hover:text-secondary/80 text-sm font-medium gap-1 transition-colors"
                    aria-label={`Learn more about ${service.name}`}
                  >
                    Learn more
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
