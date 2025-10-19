import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "./ui/card";
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
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { cn } from "@/lib/utils";

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

const categoryColorMap: Record<string, {
  bg: string;
  iconBg: string;
  iconColor: string;
  border: string;
  accent: string;
}> = {
  primary: {
    bg: "bg-primary/10",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    border: "border-primary/30",
    accent: "bg-primary/5"
  },
  terracotta: {
    bg: "bg-terracotta/10",
    iconBg: "bg-terracotta/20",
    iconColor: "text-terracotta",
    border: "border-terracotta/30",
    accent: "bg-terracotta/5"
  },
  sage: {
    bg: "bg-sage/10",
    iconBg: "bg-sage/20",
    iconColor: "text-sage",
    border: "border-sage/30",
    accent: "bg-sage/5"
  }
};

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  icon_name: string | null;
  category: string | null;
  category_description: string | null;
  category_icon: string | null;
  category_color: string | null;
}

interface ServiceCategory {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  services: Service[];
}

const ServicesPreview = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('id, name, slug, short_description, icon_name, category, category_description, category_icon, category_color')
      .eq('publish_state', 'published')
      .neq('category', 'Construction Management') // Hide Construction Management from homepage
      .order('category', { ascending: true })
      .order('created_at', { ascending: true });

    if (data) {
      // Group services by category
      const grouped = data.reduce((acc, service) => {
        const cat = service.category || 'Other';
        if (!acc[cat]) {
          acc[cat] = {
            name: cat,
            slug: cat.toLowerCase().replace(/\s+/g, '-'),
            description: service.category_description || '',
            icon: service.category_icon || 'Building',
            color: service.category_color || 'primary',
            services: []
          };
        }
        acc[cat].services.push(service);
        return acc;
      }, {} as Record<string, ServiceCategory>);
      
      setCategories(Object.values(grouped));
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Expert Construction Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions for every aspect of your construction project
          </p>
        </div>

        {/* Accordion Categories */}
        <Accordion 
          type="multiple" 
          defaultValue={categories.map(cat => cat.slug)}
          className="space-y-6 mb-12"
        >
          {categories.map((category) => {
            const CategoryIcon = iconMap[category.icon as keyof typeof iconMap] || Building;
            const categoryColors = categoryColorMap[category.color] || categoryColorMap.primary;
            
            return (
              <AccordionItem 
                key={category.slug}
                value={category.slug}
                className={cn(
                  "border-2 rounded-lg overflow-hidden bg-card",
                  categoryColors.border
                )}
              >
                {/* Category Header */}
                <AccordionTrigger className="px-6 md:px-8 py-6 hover:no-underline hover:bg-accent/30 data-[state=open]:bg-accent/20 transition-all duration-300">
                  <div className="flex items-center gap-4 w-full">
                    {/* Category Icon */}
                    <div className={cn(
                      "w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center flex-shrink-0",
                      categoryColors.iconBg
                    )}>
                      <CategoryIcon className={cn("w-6 h-6 md:w-7 md:h-7", categoryColors.iconColor)} />
                    </div>
                    
                    {/* Category Title & Description */}
                    <div className="flex-1 text-left">
                      <h3 className="text-lg md:text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">{category.description}</p>
                    </div>
                    
                    {/* Service Count Badge */}
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium flex-shrink-0",
                      categoryColors.bg,
                      categoryColors.iconColor
                    )}>
                      {category.services.length}
                    </div>
                  </div>
                </AccordionTrigger>

                {/* Category Content - Services Grid */}
                <AccordionContent className="px-6 md:px-8 pb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4">
                    {category.services.map((service) => {
                      const ServiceIcon = (service.icon_name && iconMap[service.icon_name as keyof typeof iconMap]) || Building;
                      
                      return (
                        <Link 
                          key={service.id}
                          to={`/services/${service.slug}`}
                          className="group"
                        >
                          <Card className="h-full border-2 border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6">
                              {/* Service Icon */}
                              <div className={cn(
                                "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                                categoryColors.bg
                              )}>
                                <ServiceIcon className={cn("w-6 h-6", categoryColors.iconColor)} />
                              </div>
                              
                              {/* Service Name */}
                              <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                {service.name}
                              </h4>
                              
                              {/* Service Description */}
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {service.short_description}
                              </p>
                              
                              {/* Learn More Link */}
                              <div className="flex items-center text-sm font-semibold text-primary">
                                Learn more
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* View All Services CTA */}
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
