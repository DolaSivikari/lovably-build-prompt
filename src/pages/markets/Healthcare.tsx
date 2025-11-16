import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { UnifiedPageHero } from "@/components/sections/UnifiedPageHero";
import { Section } from "@/components/sections/Section";
import { UnifiedCard } from "@/components/shared/UnifiedCard";
import { Button } from "@/ui/Button";
import { CheckCircle2, Shield, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { CTA_TEXT } from "@/design-system/constants";

const Healthcare = () => {
  const valuePropositions = [
    {
      icon: Shield,
      title: "Infection Control Protocols",
      description: "Advanced containment measures and HEPA filtration to maintain sterile environments during renovations"
    },
    {
      icon: Clock,
      title: "24/7 Scheduling Flexibility",
      description: "Work around patient care schedules with minimal disruption to healthcare operations"
    },
    {
      icon: Award,
      title: "Healthcare Compliance",
      description: "Full adherence to health authority regulations, Joint Commission standards, and infection prevention protocols"
    }
  ];

  const healthcareProjects = [
    {
      name: "Toronto General Hospital ICU Renovation",
      description: "Complete renovation of 12,000 sq ft ICU unit with antimicrobial surfaces and advanced HVAC isolation",
      metrics: "Zero service interruptions, 100% infection control compliance",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop"
    },
    {
      name: "Medical Clinic Expansion",
      description: "Built 8 new patient care rooms with medical gas systems and specialized imaging infrastructure",
      metrics: "Completed in 6 weeks, operational on schedule",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop"
    },
    {
      name: "Long-Term Care Facility Modernization",
      description: "Full interior renovation of 150-bed facility with resident-centered design and safety upgrades",
      metrics: "$4.2M project, zero safety incidents",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop"
    }
  ];

  const capabilities = [
    "Operating room and surgical suite construction",
    "Medical gas and vacuum system installation",
    "Radiology and imaging room shielding",
    "Cleanroom and laboratory environments",
    "Antimicrobial surface installation",
    "HVAC pressure differential systems",
    "Emergency power and backup systems",
    "Compliance documentation and certifications"
  ];

  return (
    <>
      <SEO 
        title="Healthcare Construction Services | Hospitals & Medical Facilities"
        description="Specialized healthcare construction and renovation services for hospitals, clinics, and long-term care facilities. Infection control protocols, 24/7 scheduling, full regulatory compliance across the GTA."
        canonical="/markets/healthcare"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main id="main-content">
          <UnifiedPageHero
            title="Building Healing Environments"
            description="Expert construction services for hospitals, clinics, and care facilities with uncompromising infection control and zero-disruption protocols"
            primaryCTA={{ text: CTA_TEXT.primary, href: "/contact" }}
            secondaryCTA={{ text: CTA_TEXT.viewProjects, href: "/projects" }}
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Markets", href: "/markets/commercial" },
              { label: "Healthcare" }
            ]}
          />

          {/* Value Propositions */}
          <Section size="major">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Healthcare Providers Choose Ascent</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {valuePropositions.map((prop, index) => (
                <UnifiedCard key={index} variant="elevated" className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <prop.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{prop.title}</h3>
                  <p className="text-muted-foreground">{prop.description}</p>
                </UnifiedCard>
              ))}
            </div>
          </Section>

          {/* Healthcare Projects Gallery */}
          <Section size="major" className="bg-muted/30">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Healthcare Project Portfolio</h2>
              <p className="text-lg text-muted-foreground">Proven track record in complex medical environments</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {healthcareProjects.map((project, index) => (
                <UnifiedCard key={index} variant="elevated" className="overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 mt-6">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="pt-3 border-t">
                    <p className="text-xs font-semibold text-primary">{project.metrics}</p>
                  </div>
                </UnifiedCard>
              ))}
            </div>
          </Section>

          {/* Healthcare Capabilities */}
          <Section size="major">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Healthcare-Specific Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{capability}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* CTA Section */}
          <Section size="major" className="bg-gradient-to-br from-primary/10 via-background to-background">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discuss Your Healthcare Project?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's talk about how we can support your facility's renovation or expansion with minimal disruption to patient care.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" variant="primary" asChild>
                  <Link to="/contact">{CTA_TEXT.primary}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/projects">{CTA_TEXT.viewProjects}</Link>
                </Button>
              </div>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Healthcare;
