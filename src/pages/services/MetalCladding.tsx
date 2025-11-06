import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/ui/Button";
import { Card } from "@/components/ui/card";
import {
  Layers,
  Zap,
  Shield,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { createServiceSchema } from "@/utils/schema-injector";
import { breadcrumbSchema } from "@/utils/structured-data";
import heroImage from "@/assets/hero-metal-cladding.jpg";

const MetalCladding = () => {
  const serviceSchema = createServiceSchema({
    serviceType: "Metal Cladding Systems",
    areaServed: [
      "Toronto",
      "Mississauga",
      "Brampton",
      "Vaughan",
      "Markham",
      "Hamilton",
      "Burlington",
    ],
    priceRange: "$$$",
    subServices: [
      "Panel Systems",
      "Composite Panels",
      "Standing Seam",
      "Rainscreen Systems",
    ],
  });

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: "Home", url: "https://ascentgroupconstruction.com/" },
    { name: "Services", url: "https://ascentgroupconstruction.com/services" },
    {
      name: "Metal Cladding",
      url: "https://ascentgroupconstruction.com/services/metal-cladding",
    },
  ]);

  const stats = [
    { value: "750K+", label: "SF Installed" },
    { value: "50+ Years", label: "System Life" },
    { value: "250+", label: "Projects" },
    { value: "100%", label: "Warranty" },
  ];

  const deliverables = [
    {
      icon: Layers,
      title: "Metal Panel Systems",
      description:
        "Architectural metal panels in aluminum, steel, zinc, and copper with custom finishes and profiles.",
    },
    {
      icon: Zap,
      title: "Composite Metal Panels",
      description:
        "Insulated metal composite panels offering superior thermal performance and modern aesthetics.",
    },
    {
      icon: Shield,
      title: "Rainscreen Systems",
      description:
        "Advanced ventilated rainscreen assemblies providing maximum weather protection and durability.",
    },
    {
      icon: Wrench,
      title: "Standing Seam Roofing",
      description:
        "Long-lasting metal roofing systems with concealed fasteners and proven weather resistance.",
    },
  ];

  const process = [
    {
      phase: "System Design",
      description:
        "Engineering review, thermal modeling, and detail development ensuring performance and code compliance.",
    },
    {
      phase: "Substrate & Framing",
      description:
        "Precision framing installation with proper alignment, drainage planes, and attachment verification.",
    },
    {
      phase: "Panel Installation",
      description:
        "Expert panel fabrication and installation with quality control at every stage for lasting results.",
    },
  ];

  const advantages = [
    "Factory-certified installers for all major systems",
    "In-house fabrication capabilities for custom profiles",
    "Complete system warranties covering materials and labor",
    "BIM coordination and pre-installation mockups",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Metal Cladding & Panel Systems | Architectural Metal Installation"
        description="Professional metal cladding installation including composite panels, rainscreen systems, standing seam, and custom architectural metal facades."
        keywords="metal cladding, metal panels, composite panels, rainscreen systems, standing seam, architectural metal"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Metal Cladding" },
          ]}
        />
        <PageHero.Title>Metal Cladding Systems</PageHero.Title>
        <PageHero.Subtitle>
          Modern architectural metal facades combining aesthetics, performance,
          and longevity
        </PageHero.Subtitle>
        <PageHero.Stats stats={stats} />
        <PageHero.CTAs
          primaryText="Request Proposal"
          primaryHref="/contact"
          secondaryText="View Projects"
          secondaryHref="/projects"
        />
      </PageHero.Root>

      {/* What We Deliver */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Metal Cladding Solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              From architectural panels to high-performance rainscreen systems,
              we deliver metal cladding solutions that define modern building
              exteriors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {deliverables.map((item, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow"
              >
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Installation Process
            </h2>
            <p className="text-lg text-muted-foreground">
              Precision-engineered installation ensuring optimal performance and
              architectural vision
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.phase}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Perform Advantage */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why Self-Perform Metal Cladding
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Selected Metal Cladding Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Corporate Headquarters",
                detail: "85,000 SF composite metal panels, Vaughan",
              },
              {
                title: "Transit Station Renovation",
                detail: "Architectural zinc rainscreen, Downtown Toronto",
              },
              {
                title: "Industrial Facility",
                detail: "Standing seam roof and wall system, Hamilton",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.detail}</p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link to="/projects">
                    View Project <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transform Your Building with Metal Cladding
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Expert installation of high-performance architectural metal systems
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">
              Request Proposal <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MetalCladding;
