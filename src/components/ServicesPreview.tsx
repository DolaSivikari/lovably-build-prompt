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
  { bg: "bg-blue-500/10", icon: "text-blue-600", orb: "hsl(217 91% 60% / 0.2)" },
  { bg: "bg-orange-500/10", icon: "text-orange-600", orb: "hsl(25 95% 53% / 0.2)" },
  { bg: "bg-purple-500/10", icon: "text-purple-600", orb: "hsl(280 70% 60% / 0.2)" },
  { bg: "bg-green-500/10", icon: "text-green-600", orb: "hsl(142 71% 45% / 0.2)" },
  { bg: "bg-pink-500/10", icon: "text-pink-600", orb: "hsl(330 81% 60% / 0.2)" },
  { bg: "bg-cyan-500/10", icon: "text-cyan-600", orb: "hsl(189 94% 43% / 0.2)" },
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
    <section ref={sectionRef} className="py-20 bg-muted relative overflow-hidden">
      {/* Background floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30 blur-3xl animate-float" style={{ background: "var(--gradient-orb)" }} />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-20 blur-3xl animate-float" style={{ background: "radial-gradient(circle, hsl(var(--primary-light) / 0.3) 0%, transparent 70%)", animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Services</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Professional Construction Services
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Expert painting, exterior systems, and specialty construction for residential and commercial properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service, index) => {
            const Icon = service.icon_name ? iconMap[service.icon_name] : Building2;
            const colors = serviceColors[index % serviceColors.length];
            
            return (
              <Card 
                key={service.id} 
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary overflow-hidden relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Corner accent - reveals on hover */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-16 translate-x-16 group-hover:translate-y-0 group-hover:translate-x-0`} />
                
                {/* Floating orb effect */}
                <div 
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: colors.orb }}
                />

                <CardHeader className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.bg} rounded-xl mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    {Icon && <Icon className={`h-8 w-8 ${colors.icon}`} />}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base mb-4">{service.short_description}</CardDescription>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                  >
                    Learn More 
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button size="lg" asChild className="group hover:shadow-glow">
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
