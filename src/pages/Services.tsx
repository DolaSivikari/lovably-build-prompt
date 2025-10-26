import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import StarterPackages from "@/components/StarterPackages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Paintbrush, 
  Building2, 
  Home, 
  ArrowRight,
  CheckCircle2,
  Users,
  Building,
  Briefcase,
  Monitor,
  Cloud,
  FileText,
  Box,
  Layers,
  ChevronRight,
  Shield,
  Square,
  DoorOpen
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = {
  Paintbrush,
  PaintBrush: Paintbrush,
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

const Services = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadServices();
  }, []);

  // Handle URL hash and query parameters for auto-expanding categories
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const hash = window.location.hash.replace('#', '');
    
    if (categoryParam || hash) {
      const targetId = categoryParam || hash;
      setExpandedCategory(targetId);
      
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('id, name, slug, short_description, icon_name, category, category_description, category_icon, category_color')
      .eq('publish_state', 'published')
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

  const audiences = [
    {
      title: "Homeowners",
      description: "Personalized service for your most valuable investment",
      icon: Home,
      link: "/homeowners"
    },
    {
      title: "Property Managers",
      description: "Reliable service for multi-unit properties",
      icon: Building,
      link: "/property-managers"
    },
    {
      title: "Commercial Clients",
      description: "Professional solutions for businesses",
      icon: Briefcase,
      link: "/commercial-clients"
    }
  ];


  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Services"
        description="Professional painting, stucco, and construction services across the GTA. Expert craftsmanship for residential and commercial projects."
        keywords="painting services, stucco installation, EIFS, exterior painting, interior painting, commercial painting, residential construction"
        canonical="https://ascentgroupconstruction.com/services"
      />
      <Navigation />

      <PageHeader
        eyebrow="Our Services"
        title="Comprehensive Construction Solutions"
        description="Expert painting, exterior systems, and specialty construction for residential and commercial properties"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" }
        ]}
        variant="with-cta"
        cta={{
          label: "Get Free Estimate",
          href: "/estimate"
        }}
      />
      
      <main className="flex-1">

        {/* Main Services - Accordion View */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Browse our comprehensive range of construction services organized by specialty
                </p>
              </div>

              {/* Accordion Categories */}
              <Accordion 
                type="single" 
                collapsible
                value={expandedCategory}
                onValueChange={setExpandedCategory}
                className="space-y-6"
              >
                {categories.map((category) => {
                  const categorySlug = category.slug;
                  const CategoryIcon = iconMap[category.icon as keyof typeof iconMap] || Building;
                  const categoryColors = categoryColorMap[category.color] || categoryColorMap.primary;
                  
                  return (
                    <AccordionItem 
                      key={categorySlug}
                      value={categorySlug}
                      id={categorySlug}
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
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4">Who We Serve</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Tailored solutions for every type of client
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {audiences.map((audience, index) => (
                  <Link key={audience.title} to={audience.link}>
                    <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-2 group text-center animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <audience.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-secondary transition-colors">
                        {audience.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {audience.description}
                      </p>
                       <div className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                         Learn more about {audience.title} <ArrowRight className="w-4 h-4" />
                       </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Ascen Group</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Professional craftsmanship backed by comprehensive warranties and insurance
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Users,
                    title: "Experienced Team",
                    description: "15+ years of expertise with certified professionals"
                  },
                  {
                    icon: CheckCircle2,
                    title: "Quality Materials",
                    description: "Premium brands like Benjamin Moore and Sherwin-Williams"
                  },
                  {
                    icon: Briefcase,
                    title: "Licensed & Insured",
                    description: "Full licensing, WSIB coverage, and liability insurance"
                  }
                ].map((item, index) => (
                  <Card key={item.title} className="p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4">
                  Powered by Industry-Leading Technology
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  We leverage platforms like Procore, Autodesk Construction Cloud, and Bluebeam to provide real-time project insights, seamless collaboration, and digital documentation management.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
                {[
                  { name: "Procore", icon: Monitor },
                  { name: "Autodesk Construction Cloud", icon: Cloud },
                  { name: "Bluebeam", icon: FileText },
                  { name: "BIM 360", icon: Box },
                  { name: "Navisworks", icon: Layers }
                ].map((tech, index) => (
                  <div 
                    key={tech.name}
                    className="flex flex-col items-center justify-center p-6 bg-background rounded-lg border-2 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <tech.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-center text-foreground">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Starter Packages */}
        <StarterPackages />

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Get a free, detailed estimate with no obligation
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold">
                    Request Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
