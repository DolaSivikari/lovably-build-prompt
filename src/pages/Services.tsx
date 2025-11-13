import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ClientLogosCarousel } from "@/components/shared/ClientLogosCarousel";
import { CertificationBadges } from "@/components/shared/CertificationBadges";
import { TestimonialRatings } from "@/components/shared/TestimonialRatings";
import { HeroIsometric3D } from "@/components/services/HeroIsometric3D";
import { ServiceCard3D } from "@/components/services/ServiceCard3D";
import { ParticleNetwork } from "@/components/services/ParticleNetwork";
import { VideoHoverCard } from "@/components/services/VideoHoverCard";
import { ScrollSceneTransition } from "@/components/services/ScrollSceneTransition";
import { CheckCircle2, Users, Building, Briefcase } from "lucide-react";

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  icon_name: string | null;
  category: string | null;
  featured?: boolean;
}

interface ServiceCategory {
  name: string;
  slug: string;
  description: string;
  services: Service[];
}

const Services = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('id, name, slug, short_description, icon_name, category, category_description, featured')
      .eq('publish_state', 'published')
      .order('featured', { ascending: false })
      .order('category', { ascending: true })
      .order('name', { ascending: true});

    if (data) {
      // Group services by category
      const grouped = data.reduce((acc, service) => {
        const cat = service.category || 'Other';
        if (!acc[cat]) {
          acc[cat] = {
            name: cat,
            slug: cat.toLowerCase().replace(/\s+/g, '-'),
            description: service.category_description || '',
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
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Services"
        description="Ascent Group Construction — Ontario's prime specialty contractor for building envelope & restoration. Self-performed façade remediation, parking garage restoration, EIFS, masonry repair, and waterproofing. Serving commercial, multi-family, and institutional projects across the GTA."
        keywords="specialty contractor services, building envelope contractor, facade restoration, parking garage restoration, EIFS contractor, masonry repair, waterproofing contractor, commercial construction"
        canonical="https://ascentgroupconstruction.com/services"
      />
      <Navigation />

      {/* Scroll-based background transitions */}
      <ScrollSceneTransition />

      {/* 3D Isometric Hero */}
      <HeroIsometric3D />
      
      <main className="flex-1 relative">
        {/* Particle Network Section */}
        <section className="py-20 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Interconnected Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how our services work together to deliver complete construction solutions
              </p>
            </div>
            <ParticleNetwork />
          </div>
        </section>

        {/* 3D Service Cards Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our specialized construction services with interactive 3D cards
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.slice(0, 6).flatMap(category => category.services.slice(0, 1)).map((service) => (
                <ServiceCard3D
                  key={service.id}
                  {...service}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Video Hover Cards Section */}
        <section className="py-20 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Services in Action
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hover to see our services come to life
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.slice(0, 3).flatMap(category => category.services.slice(0, 1)).map((service) => (
                <VideoHoverCard
                  key={service.id}
                  {...service}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-20 bg-gradient-to-b from-muted/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Who We Serve</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized construction services for diverse client needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { 
                  icon: Building, 
                  title: "Commercial Clients", 
                  description: "Retail, office, and industrial buildings",
                  link: "/commercial-clients"
                },
                { 
                  icon: Users, 
                  title: "Multi-Family Residential", 
                  description: "Condos, apartments, and housing complexes",
                  link: "/multi-family-residential"
                },
                { 
                  icon: CheckCircle2, 
                  title: "Institutional", 
                  description: "Schools, hospitals, and public facilities",
                  link: "/institutional-clients"
                },
                { 
                  icon: Briefcase, 
                  title: "General Contractors", 
                  description: "Professional trade partnerships",
                  link: "/commercial-clients"
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={index}
                    to={item.link}
                    className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Specialty Contractor Information */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Why Work with a Specialty Contractor?</h3>
              <p className="text-muted-foreground">
                Specialty contractors like Ascent Group bring focused expertise, specialized equipment, and proven methodologies to complex construction challenges. We self-perform our work, ensuring quality control and accountability on every project.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <CertificationBadges />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-b from-muted/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Ascent Group</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ontario's trusted specialty construction partner
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { title: "Self-Performed Work", description: "Direct control of quality and timeline" },
                { title: "Licensed & Insured", description: "Full compliance and protection" },
                { title: "Proven Track Record", description: "500+ successful projects" },
                { title: "Expert Craftsmen", description: "Skilled trades with deep expertise" }
              ].map((item, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let's discuss how our specialized services can bring your construction vision to life
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/contact">Request a Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/projects">View Our Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <TestimonialRatings />
          </div>
        </section>

        {/* Client Logos */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <ClientLogosCarousel />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
