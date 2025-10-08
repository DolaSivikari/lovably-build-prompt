import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CheckCircle2
} from "lucide-react";

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

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  icon_name: string | null;
  pricing_range_min: number | null;
  pricing_range_max: number | null;
  estimated_timeline: string | null;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('publish_state', 'published')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading services:', error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const paintingServices = services.filter(s => 
    s.slug.includes('painting')
  );

  const exteriorServices = services.filter(s => 
    ['exterior-siding', 'windows-doors', 'roofing', 'stucco-eifs'].includes(s.slug)
  );

  const specialtyServices = services.filter(s => 
    ['waterproofing', 'drywall-finishing'].includes(s.slug)
  );

  const renderServiceCard = (service: Service, index: number) => {
    const Icon = service.icon_name ? iconMap[service.icon_name] : Building2;
    const features = service.short_description?.split('.').filter(s => s.trim()).slice(0, 4) || [];

    return (
      <Card 
        key={service.id}
        className="hover:shadow-lg transition-all animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader>
          {Icon && <Icon className="h-10 w-10 text-primary mb-3" />}
          <CardTitle className="text-xl">{service.name}</CardTitle>
          <CardDescription className="text-base pt-2">
            {service.short_description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {features.length > 0 && (
            <ul className="space-y-2 mb-4">
              {features.map((feature, i) => (
                <li key={i} className="text-sm flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature.trim()}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Professional Construction Services | Ascen Group"
        description="Expert painting, exterior systems, and specialty construction for residential and commercial properties. Licensed, insured, and warranty-backed services."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Professional Construction Services</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Expert painting, exterior systems, and specialty construction for residential and commercial properties
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Get Free Estimate</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30" asChild>
                <Link to="/about">Our Process</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our comprehensive range of construction services organized by specialty
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : (
            <Tabs defaultValue="painting" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="painting">Painting Services</TabsTrigger>
                <TabsTrigger value="exterior">Exterior Systems</TabsTrigger>
                <TabsTrigger value="specialty">Specialty Services</TabsTrigger>
              </TabsList>
              
              <TabsContent value="painting" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paintingServices.map((service, index) => renderServiceCard(service, index))}
                </div>
              </TabsContent>
              
              <TabsContent value="exterior" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exteriorServices.map((service, index) => renderServiceCard(service, index))}
                </div>
              </TabsContent>
              
              <TabsContent value="specialty" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {specialtyServices.map((service, index) => renderServiceCard(service, index))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Serve</h2>
            <p className="text-lg text-muted-foreground">
              Tailored solutions for every type of client
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Home className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Homeowners</CardTitle>
                <CardDescription className="text-base pt-2">
                  Personalized service for your most valuable investment
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Property Managers</CardTitle>
                <CardDescription className="text-base pt-2">
                  Reliable service for multi-unit properties
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Commercial Clients</CardTitle>
                <CardDescription className="text-base pt-2">
                  Professional solutions for businesses
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* The Ascent Advantage */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Ascen Advantage</h2>
            <p className="text-lg text-muted-foreground">
              What sets us apart from the competition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Licensed & Insured",
                description: "Full licensing, WSIB coverage, and comprehensive liability insurance"
              },
              {
                title: "Quality Materials",
                description: "Premium brands like Benjamin Moore and Sherwin-Williams"
              },
              {
                title: "Experienced Team",
                description: "15+ years of expertise with certified professionals"
              },
              {
                title: "Project Management",
                description: "Dedicated coordinator for every project from start to finish"
              },
              {
                title: "Transparent Pricing",
                description: "Clear estimates with detailed breakdowns and no hidden fees"
              },
              {
                title: "Warranty Backed",
                description: "Comprehensive workmanship warranty on all projects"
              }
            ].map((advantage, index) => (
              <Card key={advantage.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                  <CardTitle className="text-lg">{advantage.title}</CardTitle>
                  <CardDescription className="text-base pt-2">
                    {advantage.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  Request Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
