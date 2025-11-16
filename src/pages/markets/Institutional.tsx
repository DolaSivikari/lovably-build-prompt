import { School, Shield, Users, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { UnifiedPageHero } from "@/components/sections/UnifiedPageHero";
import { Section } from "@/components/sections/Section";
import { UnifiedCard } from "@/components/shared/UnifiedCard";
import { Button } from "@/ui/Button";
import SEO from "@/components/SEO";
import { CTA_TEXT } from "@/design-system/constants";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const Institutional = () => {
  const challenges = [
    "Working in occupied facilities (schools, hospitals) with strict hours and access",
    "Meeting stringent government procurement and compliance requirements",
    "Managing public sector approval processes and stakeholder coordination",
    "Ensuring accessibility compliance and life safety code adherence",
    "Coordinating around academic schedules or patient care operations",
  ];

  const solutions = [
    {
      title: "Summer Scheduling",
      description: "Plan major work during school breaks or low-occupancy periods to minimize operational impact.",
      icon: School,
    },
    {
      title: "Safety Excellence",
      description: "Enhanced safety protocols for working around vulnerable populations (students, patients).",
      icon: Shield,
    },
    {
      title: "Stakeholder Management",
      description: "Comprehensive communication with boards, administrators, staff, and community members.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Institutional Construction | Schools & Healthcare | Ascent Group Ontario"
        description="Envelope & restoration contractor for institutional buildings: schools, hospitals, government buildings, and community centers across Ontario. Experienced with public sector procurement."
      />
      <Navigation />
      
      <UnifiedPageHero
        title="Institutional Construction"
        description="Trusted partner for schools, healthcare facilities, and government buildings"
        primaryCTA={{ text: CTA_TEXT.primary, href: "/contact" }}
        secondaryCTA={{ text: CTA_TEXT.viewProjects, href: "/projects" }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/markets/commercial" },
          { label: "Institutional" }
        ]}
      />

      <main>
          {/* Sector Overview */}
          <section className="mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We understand the unique demands of institutional construction—from working around academic calendars to 
                meeting stringent accessibility and safety codes. Our team has delivered numerous projects for schools, 
                healthcare facilities, and government buildings while maintaining full operations.
              </p>
            </div>
          </section>

          {/* Challenges */}
          <Section size="major">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Institutional Construction Challenges</h2>
            <UnifiedCard variant="elevated" className="p-6">
              <ul className="space-y-4">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-muted-foreground">{challenge}</span>
                  </li>
                ))}
              </ul>
            </UnifiedCard>
          </Section>

          {/* Our Solutions */}
          <Section size="major">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">How We Deliver Success</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <UnifiedCard key={index} variant="elevated">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{solution.title}</h3>
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                  </UnifiedCard>
                );
              })}
            </div>
          </Section>

          {/* Services */}
          <Section size="major">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Institutional Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <UnifiedCard variant="elevated">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">Educational Facilities</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Classroom renovations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Cafeteria and gymnasium upgrades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Accessibility improvements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Building envelope repairs</span>
                  </li>
                </ul>
              </UnifiedCard>

              <UnifiedCard variant="elevated">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">Government & Healthcare</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Community center renovations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Municipal building upgrades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Healthcare facility improvements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Life safety code compliance</span>
                  </li>
                </ul>
              </UnifiedCard>
            </div>
          </Section>

          {/* CTA */}
          {/* Already handled above in Services section - removed duplicate */}
        </main>
        
        <Footer />
      </div>
    );
};

export default Institutional;
