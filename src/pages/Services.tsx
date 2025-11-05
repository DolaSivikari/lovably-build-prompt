import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
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
  HardHat,
  Wrench,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

// Icon map for dynamic service icons
const iconMap: Record<string, any> = {
  Paintbrush,
  PaintBrush: Paintbrush,
  Building2,
  Building,
  Home,
  HardHat,
  Wrench
};

// Category configuration with Lucide icons
const categoryIcons: Record<string, any> = {
  "Construction Services": Paintbrush,
  "Exterior Systems": Building2,
  "Construction Management": HardHat,
  "Specialty Services": Wrench
};

// Category color map
const categoryColorMap: Record<string, {
  bg: string;
  iconBg: string;
  iconColor: string;
  border: string;
  hoverBg: string;
}> = {
  primary: {
    bg: "bg-primary/10",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    border: "border-primary/30",
    hoverBg: "hover:bg-primary/5"
  },
  terracotta: {
    bg: "bg-terracotta/10",
    iconBg: "bg-terracotta/20",
    iconColor: "text-terracotta",
    border: "border-terracotta/30",
    hoverBg: "hover:bg-terracotta/5"
  },
  sage: {
    bg: "bg-sage/10",
    iconBg: "bg-sage/20",
    iconColor: "text-sage",
    border: "border-sage/30",
    hoverBg: "hover:bg-sage/5"
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const expandedSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('id, name, slug, short_description, icon_name, category, category_description, category_icon, category_color')
      .eq('publish_state', 'published')
      .order('featured', { ascending: false })
      .order('category', { ascending: true })
      .order('name', { ascending: true });

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

  const handleCategoryClick = (categorySlug: string) => {
    if (expandedCategory === categorySlug) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categorySlug);
      // Smooth scroll to expanded section after state update
      setTimeout(() => {
        expandedSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  const audiences = [
    {
      title: "Property Owners",
      description: "Multi-family and residential property solutions",
      icon: Building2,
      link: "/markets/multi-family"
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
        description="Professional general contracting, construction management, and building envelope services across the GTA. Expert craftsmanship for commercial and institutional projects."
        keywords="general contracting services, construction management, building envelope, exterior systems, commercial construction, institutional construction"
        canonical="https://ascentgroupconstruction.com/services"
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-24 pb-0 bg-background">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Services" }
          ]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-muted-foreground/80 z-10" />
        
        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 text-center text-primary-foreground py-16 md:py-20 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Complete Construction Solutions
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 text-primary-foreground/90">
              From concept to completion, we deliver excellence across Ontario
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
                className="w-full sm:w-auto min-w-[200px] text-base md:text-lg"
              >
                <Link to="/contact">Request Proposal</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
                className="w-full sm:w-auto min-w-[200px] text-base md:text-lg border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary-foreground" />
        </div>
      </section>
      
      <main className="flex-1">

        {/* Categories Grid Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Service Categories
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive solutions for every construction need
                </p>
              </div>

              {/* Interactive Category Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => {
                  const CategoryIcon = categoryIcons[category.name] || Building2;
                  const categoryColors = categoryColorMap[category.color] || categoryColorMap.primary;
                  const isExpanded = expandedCategory === category.slug;
                  
                  return (
                    <button
                      key={category.slug}
                      onClick={() => handleCategoryClick(category.slug)}
                      className={cn(
                        "group relative bg-card rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300",
                        "hover:shadow-2xl hover:-translate-y-2 border-2",
                        isExpanded ? "ring-4 ring-primary/50 shadow-xl" : "border-border",
                        "text-left w-full"
                      )}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Icon */}
                      <div className={cn(
                        "w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-6 transition-all duration-300",
                        categoryColors.iconBg,
                        "group-hover:scale-110"
                      )}>
                        <CategoryIcon className={cn("w-7 h-7 md:w-8 md:h-8", categoryColors.iconColor)} />
                      </div>
                      
                      {/* Category Name */}
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3">
                        {category.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 line-clamp-2">
                        {category.description}
                      </p>
                      
                      {/* Service Count */}
                      <div className="flex items-center text-primary font-semibold text-sm md:text-base">
                        <span>{category.services.length} Services</span>
                        <ChevronRight className={cn(
                          "w-5 h-5 ml-2 transition-transform duration-300",
                          isExpanded && "rotate-90"
                        )} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Expanded Category Services Section */}
        {expandedCategory && (
          <section 
            ref={expandedSectionRef}
            className="py-12 md:py-16 bg-muted/30 animate-fade-in scroll-mt-20"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {categories
                  .filter(cat => cat.slug === expandedCategory)
                  .map((category) => {
                    const categoryColors = categoryColorMap[category.color] || categoryColorMap.primary;
                    
                    return (
                      <div key={category.slug}>
                        {/* Expanded Section Header */}
                        <div className="mb-8 md:mb-12">
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            {category.name}
                          </h3>
                          <p className="text-base md:text-lg text-muted-foreground">
                            {category.description}
                          </p>
                        </div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          {category.services.map((service, index) => {
                            const ServiceIcon = (service.icon_name && iconMap[service.icon_name]) || Building;
                            
                            return (
                              <Link
                                key={service.id}
                                to={`/services/${service.slug}`}
                                className="group block animate-fade-in"
                                style={{
                                  animationDelay: `${index * 50}ms`
                                }}
                              >
                                <Card className={cn(
                                  "h-full border-2 transition-all duration-300",
                                  "hover:shadow-xl hover:border-primary/30"
                                )}>
                                  <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                      {/* Service Info */}
                                      <div className="flex-1">
                                        {/* Service Icon */}
                                        <div className={cn(
                                          "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                                          categoryColors.bg
                                        )}>
                                          <ServiceIcon className={cn("w-6 h-6", categoryColors.iconColor)} />
                                        </div>
                                        
                                        {/* Service Name */}
                                        <h4 className="text-lg md:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                          {service.name}
                                        </h4>
                                        
                                        {/* Service Description */}
                                        <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">
                                          {service.short_description}
                                        </p>
                                      </div>

                                      {/* Arrow Icon */}
                                      <ArrowRight className="w-6 h-6 text-primary transform group-hover:translate-x-2 transition-transform flex-shrink-0 ml-4" />
                                    </div>
                                  </CardContent>
                                </Card>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {/* Who We Serve Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Who We Serve
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Tailored solutions for every type of client
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {audiences.map((audience, index) => (
                  <Link 
                    key={audience.title} 
                    to={audience.link}
                    className="group"
                  >
                    <Card className={cn(
                      "p-6 md:p-8 h-full transition-all duration-300 border-2",
                      "hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2",
                      "text-center animate-fade-in"
                    )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <audience.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {audience.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground mb-4">
                        {audience.description}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-primary font-semibold text-sm md:text-base group-hover:gap-3 transition-all">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Dark Background */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Choose Ascent Group Construction
                </h2>
                <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                  Professional craftsmanship backed by comprehensive warranties and insurance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
                  <div 
                    key={item.title} 
                    className={cn(
                      "text-center p-6 md:p-8 rounded-2xl transition-all duration-300",
                      "bg-primary-foreground/10 backdrop-blur-sm",
                      "hover:bg-primary-foreground/20 hover:-translate-y-2",
                      "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-primary-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-primary-foreground/80">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10">
                Let's discuss how we can bring your construction vision to life
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  asChild
                  className="w-full sm:w-auto min-w-[220px] text-base md:text-lg"
                >
                  <Link to="/contact">Request Free Consultation</Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto min-w-[220px] text-base md:text-lg border-2"
                >
                  <Link to="/projects">View Our Projects</Link>
                </Button>
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