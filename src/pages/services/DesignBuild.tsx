import { Lightbulb, Layers, Zap, CheckCircle2, ArrowRight, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { generateServiceSchema, generateBreadcrumbSchema, SERVICE_SCHEMAS } from "@/utils/schemaGenerators";
import heroImage from "@/assets/heroes/hero-design-build.jpg";

const DesignBuild = () => {
  const whatWeDeliver = [
    { icon: Layers, title: "Single-Source Accountability", description: "One contract, one team, one point of contact for complete design and construction responsibility." },
    { icon: Zap, title: "Accelerated Schedules", description: "Overlapping design and construction phases reducing overall project duration by 30-40%." },
    { icon: Target, title: "Early Cost Certainty", description: "Fixed-price commitments during design development, eliminating bid-phase budget surprises." },
    { icon: Lightbulb, title: "Integrated Innovation", description: "Collaborative design-construction approach enabling value engineering and constructability optimization." }
  ];

  const howWeWork = [
    { phase: "Conceptual Design", activities: ["Program development and space planning", "Preliminary budgeting and feasibility studies", "Conceptual design and massing studies", "Guaranteed maximum price (GMP) development"] },
    { phase: "Design Development", activities: ["Detailed design with real-time cost tracking", "Value engineering and material selection", "Permit coordination and approvals", "Long-lead procurement and site mobilization"] },
    { phase: "Construction & Closeout", activities: ["Phased construction with design completion", "Quality control and progress monitoring", "Punch list and final inspections", "Warranty and owner training delivery"] }
  ];

  const caseStudies = [
    { title: "Mixed-Use Development", location: "Toronto, ON", size: "75,000 sq ft", duration: "18 months", description: "Design-build delivery of 5-story mixed-use building with retail, office, and residential components from concept to occupancy." },
    { title: "Corporate Office Buildout", location: "Mississauga, ON", size: "40,000 sq ft", duration: "10 months", description: "Fast-track design-build interior fit-out with custom millwork, data center, and executive amenities." },
    { title: "Industrial Warehouse", location: "Brampton, ON", size: "120,000 sq ft", duration: "14 months", description: "Design-build ground-up industrial facility with specialized HVAC, high-bay storage, and office component." }
  ];

  const serviceConfig = SERVICE_SCHEMAS["design-build"];
  const siteUrl = window.location.origin;
  
  const serviceSchema = generateServiceSchema({
    name: serviceConfig.name,
    description: serviceConfig.description,
    url: `${siteUrl}/services/design-build`,
    provider: "Ascent Group Construction",
    areaServed: serviceConfig.areaServed,
    serviceType: serviceConfig.serviceType
  });

  const breadcrumbSchemaData = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Services", url: `${siteUrl}/services` },
    { name: "Design-Build", url: `${siteUrl}/services/design-build` }
  ]);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Design-Build Services Ontario | Specialty Contractor Integrated Delivery" 
        description="Specialty contractor offering design-build delivery with self-performed envelope and restoration work. Single-source accountability from concept to completion for Ontario commercial and multi-family projects." 
        keywords="design-build, specialty contractor, integrated project delivery, Ontario design-build contractor, self-perform design-build"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />
      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Design-Build" }]} />
        <PageHero.Title>Design-Build</PageHero.Title>
        <PageHero.Subtitle>Single-source accountability from concept to completion.</PageHero.Subtitle>
        <PageHero.Stats stats={[{ value: "35%", label: "Faster Delivery" }, { value: "100%", label: "Cost Certainty" }, { value: "150+", label: "DB Projects" }, { value: "$800M+", label: "DB Value" }]} />
        <PageHero.CTAs primaryText="Request DB Proposal" primaryHref="/contact" secondaryText="View DB Projects" secondaryHref="/projects" />
      </PageHero.Root>
      <main>
        <section className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-foreground mb-4">Design-Build Advantages</h2><p className="text-lg text-muted-foreground max-w-3xl mx-auto">Integrated design-construction approach delivering projects faster, with greater cost certainty, and fewer change orders.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{whatWeDeliver.map((item, index) => { const Icon = item.icon; return (<Card key={index} className="hover:shadow-lg transition-shadow"><CardHeader><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"><Icon className="w-6 h-6 text-primary" /></div><CardTitle className="text-lg">{item.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{item.description}</p></CardContent></Card>);})}</div></div></section>
        <section className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-foreground mb-4">Our Design-Build Process</h2><p className="text-lg text-muted-foreground max-w-3xl mx-auto">Streamlined approach integrating design and construction for faster delivery and better outcomes.</p></div><div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">{howWeWork.map((phase, index) => (<Card key={index}><CardHeader><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{index + 1}</div><CardTitle className="text-xl">{phase.phase}</CardTitle></div></CardHeader><CardContent><ul className="space-y-2">{phase.activities.map((activity, actIndex) => (<li key={actIndex} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span className="text-sm text-muted-foreground">{activity}</span></li>))}</ul></CardContent></Card>))}</div></div></section>
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto text-center"><h2 className="text-foreground mb-6">Design-Build + Self-Perform</h2><p className="text-lg text-muted-foreground mb-8 leading-relaxed">Our self-perform capabilities enhance design-build delivery with faster design decisions, accurate early pricing, seamless coordination, and quality integration.</p></div></div></section>
        <section className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-foreground mb-4">Design-Build Portfolio</h2><p className="text-lg text-muted-foreground max-w-3xl mx-auto">Recent design-build projects showcasing our integrated delivery capabilities.</p></div><div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">{caseStudies.map((project, index) => (<Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1"><CardHeader><CardTitle className="text-lg">{project.title}</CardTitle><div className="flex flex-wrap gap-2 mt-2"><span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{project.location}</span><span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{project.size}</span></div></CardHeader><CardContent><p className="text-sm text-muted-foreground mb-3">{project.description}</p><div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="w-3 h-3" /><span>Delivered in {project.duration}</span></div></CardContent></Card>))}</div><div className="text-center mt-8"><Button asChild variant="outline" size="lg"><Link to="/projects">View All Design-Build Projects</Link></Button></div></div></section>
        <section className="py-16 bg-primary text-primary-foreground"><div className="container mx-auto px-4 text-center"><h2 className="text-3xl font-bold mb-4">Ready for Integrated Design-Build Delivery?</h2><p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">Request a design-build proposal and discover the advantages of single-source project delivery.</p><div className="flex flex-wrap gap-4 justify-center"><Button asChild size="lg" variant="secondary"><Link to="/contact">Request Proposal<ArrowRight className="ml-2 w-4 h-4" /></Link></Button><Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link to="/about">Talk to Our Team</Link></Button></div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default DesignBuild;
