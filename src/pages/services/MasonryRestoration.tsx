import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/ui/Button";
import { Card } from "@/components/ui/card";
import {
  Building2,
  Hammer,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { createServiceSchema } from "@/utils/schema-injector";
import { breadcrumbSchema } from "@/utils/structured-data";
import heroImage from "@/assets/hero-masonry-restoration.jpg";

const MasonryRestoration = () => {
  const serviceSchema = createServiceSchema({
    serviceType: "Masonry Restoration & Repair",
    areaServed: [
      "Toronto",
      "Mississauga",
      "Brampton",
      "Vaughan",
      "Markham",
      "Hamilton",
      "Burlington",
    ],
    priceRange: "$$-$$$",
    subServices: [
      "Brick Repair",
      "Stone Restoration",
      "Tuckpointing",
      "Structural Repairs",
    ],
  });

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: "Home", url: "https://ascentgroupconstruction.com/" },
    { name: "Services", url: "https://ascentgroupconstruction.com/services" },
    {
      name: "Masonry Restoration",
      url: "https://ascentgroupconstruction.com/services/masonry-restoration",
    },
  ]);

  const stats = [
    { value: "50+", label: "Heritage Projects" },
    { value: "100%", label: "Code Compliance" },
    { value: "35 Years", label: "Experience" },
    { value: "1M+", label: "SF Restored" },
  ];

  const deliverables = [
    {
      icon: Building2,
      title: "Brick & Stone Restoration",
      description:
        "Historic preservation and modern masonry repairs using authentic materials and traditional techniques.",
    },
    {
      icon: Hammer,
      title: "Tuckpointing & Repointing",
      description:
        "Expert mortar replacement matching original composition, color, and profile for seamless integration.",
    },
    {
      icon: Shield,
      title: "Structural Masonry Repairs",
      description:
        "Engineering-backed solutions for cracked walls, failed lintels, and deteriorated structural masonry.",
    },
    {
      icon: Clock,
      title: "Heritage Building Conservation",
      description:
        "Specialized restoration services meeting heritage standards and municipal preservation requirements.",
    },
  ];

  const process = [
    {
      phase: "Assessment & Testing",
      description:
        "Detailed condition assessment, mortar analysis, and structural engineering review to determine repair scope.",
    },
    {
      phase: "Material Matching",
      description:
        "Custom mortar formulation and brick/stone sourcing to match existing materials in composition and appearance.",
    },
    {
      phase: "Restoration Execution",
      description:
        "Skilled craftsmen execute repairs using traditional methods with modern engineering support and quality control.",
    },
  ];

  const advantages = [
    "Master masons with heritage restoration certifications",
    "In-house mortar lab for precise material matching",
    "Engineering support for structural repairs",
    "Experience with municipal heritage approvals",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Masonry Restoration & Brick Repair | Heritage Building Conservation"
        description="Professional masonry restoration services including brick repair, tuckpointing, stone conservation, and heritage building restoration with expert craftsmanship."
        keywords="masonry restoration, brick repair, tuckpointing, stone restoration, heritage conservation, structural masonry"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Masonry Restoration" },
          ]}
        />
        <PageHero.Title>Masonry Restoration & Repair</PageHero.Title>
        <PageHero.Subtitle>
          Expert restoration of historic and modern masonry with uncompromising
          craftsmanship
        </PageHero.Subtitle>
        <PageHero.Stats stats={stats} />
        <PageHero.CTAs
          primaryText="Request Assessment"
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
              Comprehensive Masonry Solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              From heritage conservation to modern repairs, we restore and
              preserve masonry structures with authentic materials and proven
              techniques.
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
              Our Restoration Process
            </h2>
            <p className="text-lg text-muted-foreground">
              Methodical approach combining traditional craftsmanship with
              modern engineering
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
              Why Self-Perform Masonry Restoration
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
            Selected Restoration Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Historic Library Restoration",
                detail: "Complete brick restoration, Heritage Toronto approved",
              },
              {
                title: "Cathedral Masonry Repair",
                detail: "Stone conservation and structural stabilization",
              },
              {
                title: "Century Building Tuckpointing",
                detail: "40,000 SF heritage-compliant repointing",
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
            Preserve Your Historic Masonry
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Expert restoration services backed by decades of heritage
            conservation experience
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">
              Request Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MasonryRestoration;
