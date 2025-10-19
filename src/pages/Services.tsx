import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import StarterPackages from "@/components/StarterPackages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Paintbrush, 
  Building2, 
  Home, 
  Wrench, 
  ArrowRight,
  CheckCircle2,
  Users,
  Building,
  Briefcase,
  Monitor,
  Cloud,
  FileText,
  Box,
  Layers
} from "lucide-react";

const Services = () => {
  const paintingServices = [
    {
      title: "Residential Painting",
      description: "Transform your home with expert interior and exterior painting services",
      link: "/services/painting",
      features: ["Color Consultation", "Premium Finishes", "Full Surface Prep", "Clean Workspace"]
    },
    {
      title: "Commercial Painting",
      description: "Professional painting for offices, retail, and industrial spaces",
      link: "/services/commercial",
      features: ["After-Hours Work", "Minimal Disruption", "Large-Scale Projects", "Fast Turnaround"]
    },
    {
      title: "Condo & Multi-Unit",
      description: "Specialized painting for property managers and condo boards",
      link: "/services/condo",
      features: ["Volume Pricing", "Tenant Coordination", "Board Presentations", "Phased Scheduling"]
    }
  ];

  const exteriorServices = [
    {
      title: "Stucco & EIFS",
      description: "Complete installation, repair, and restoration of exterior cladding systems",
      link: "/services/stucco",
      features: ["New Installation", "Crack Repair", "Water Damage", "Energy Efficient"]
    },
    {
      title: "Metal Cladding & Panels",
      description: "Modern building facades with architectural metal systems",
      link: "/services/metal-cladding",
      features: ["ACM Panels", "Standing Seam", "Rainscreen Systems", "Custom Fabrication"]
    },
    {
      title: "Sealants & Caulking",
      description: "Professional weatherproofing and building envelope protection",
      link: "/services/sealants",
      features: ["Waterproofing", "Air Sealing", "Joint Sealing", "Building Envelope"]
    },
    {
      title: "Masonry",
      description: "Brick, block, and stone construction and restoration services",
      link: "/services/masonry",
      features: ["Structural Work", "Tuckpointing", "Stone Veneer", "Chimney Repair"]
    }
  ];

  const specialtyServices = [
    {
      title: "Parking Garage Coating",
      description: "Heavy-duty protective coatings for parking structures",
      link: "/services/parking-garage",
      features: ["Traffic Coatings", "Line Striping", "Waterproofing", "Concrete Repair"]
    },
    {
      title: "Suite Buildouts",
      description: "Complete interior construction and tenant improvements",
      link: "/services/suite-buildouts",
      features: ["Office Buildouts", "Retail Fit-Outs", "Medical Suites", "Turnkey Solutions"]
    },
    {
      title: "Tile & Flooring",
      description: "Expert installation of tile and resilient flooring",
      link: "/services/tile-flooring",
      features: ["Ceramic & Porcelain", "Natural Stone", "LVT/LVP", "Commercial Grade"]
    }
  ];

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

  const ServiceCard = ({ service }: { service: any }) => (
    <Link to={service.link}>
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 group overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-secondary transition-colors">
            {service.title}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            {service.description}
          </p>
          <ul className="space-y-2 mb-4">
            {service.features.map((feature: string) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
            Learn more about {service.title} <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );

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

        {/* Main Services - Tabbed View */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Browse our comprehensive range of construction services organized by specialty
                </p>
              </div>

              <Tabs defaultValue="painting" className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-12 h-auto">
                  <TabsTrigger value="painting" className="text-base py-4 gap-2">
                    <Paintbrush className="w-5 h-5" />
                    Painting Services
                  </TabsTrigger>
                  <TabsTrigger value="exterior" className="text-base py-4 gap-2">
                    <Building2 className="w-5 h-5" />
                    Exterior Systems
                  </TabsTrigger>
                  <TabsTrigger value="specialty" className="text-base py-4 gap-2">
                    <Wrench className="w-5 h-5" />
                    Specialty Services
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="painting" className="mt-0">
                  <div className="grid md:grid-cols-3 gap-6">
                    {paintingServices.map((service) => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="exterior" className="mt-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {exteriorServices.map((service) => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="specialty" className="mt-0">
                  <div className="grid md:grid-cols-3 gap-6">
                    {specialtyServices.map((service) => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
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
