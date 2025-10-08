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
  ArrowRight
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const iconMap: Record<string, any> = {
  PaintBrush: Paintbrush,
  Building2,
  Building,
  Home,
  DoorOpen,
  Layers,
  Shield,
  Square,
};

const serviceColors = [
  { bg: "bg-primary/10", icon: "text-primary", border: "border-primary/20" },
  { bg: "bg-terracotta/10", icon: "text-terracotta", border: "border-terracotta/20" },
  { bg: "bg-sage/10", icon: "text-sage", border: "border-sage/20" },
  { bg: "bg-primary/10", icon: "text-primary", border: "border-primary/20" },
  { bg: "bg-terracotta/10", icon: "text-terracotta", border: "border-terracotta/20" },
  { bg: "bg-sage/10", icon: "text-sage", border: "border-sage/20" },
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-primary via-primary-dark to-charcoal relative overflow-hidden">
      {/* Subtle construction grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'linear-gradient(hsl(var(--cream)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--cream)) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 mb-6 px-5 py-2 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Sparkles className="h-4 w-4 text-cream" />
            <span className="text-cream font-bold text-sm tracking-widest uppercase">Our Services</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-5 text-white transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Expert Construction Services
          </h2>
          <p className={`text-lg text-cream/90 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Professional painting, exterior systems, and specialty construction delivered with precision and craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon_name ? iconMap[service.icon_name] : Building2;
            const colors = serviceColors[index % serviceColors.length];
            
            return (
              <Card 
                key={service.id} 
                className={`group bg-white/5 backdrop-blur-sm border-2 ${colors.border} hover:border-cream/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <CardHeader className="pb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${colors.bg} rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105`}>
                    {Icon && <Icon className={`h-7 w-7 ${colors.icon}`} />}
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-cream transition-colors">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent mb-4" />
                  <CardDescription className="text-base text-cream/80 mb-6 leading-relaxed">
                    {service.short_description}
                  </CardDescription>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cream hover:text-white transition-all group/link"
                  >
                    Learn More 
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button size="lg" asChild className="bg-cream text-charcoal hover:bg-white font-bold">
            <Link to="/services" className="flex items-center gap-2">
              Explore All Services
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
