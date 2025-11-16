import { Building2, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/sections/Section";
import { UnifiedCard } from "@/components/shared/UnifiedCard";
import { Button } from "@/ui/Button";
import SEO from "@/components/SEO";
import { CTA_TEXT } from "@/design-system/constants";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const MultiFamily = () => {
  const challenges = [
    "Coordinating work in occupied buildings without disrupting residents",
    "Meeting strict reserve fund budgets and approval processes",
    "Scheduling around seasonal weather constraints for exterior work",
    "Managing multiple stakeholder expectations (condo boards, property managers, residents)",
    "Ensuring compliance with building codes and condominium act requirements",
  ];

  const solutions = [
    {
      title: "Phased Approach",
      description: "Break projects into manageable phases that minimize disruption to residents while maintaining progress.",
      icon: TrendingUp,
    },
    {
      title: "Resident Communication",
      description: "Comprehensive communication plans including notices, newsletters, and dedicated contact persons.",
      icon: Users,
    },
    {
      title: "Value Engineering",
      description: "Identify cost-saving alternatives without compromising quality to stay within reserve fund budgets.",
      icon: Building2,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Multi-Family Residential Construction | Condo Restoration GTA | Ascent Group"
        description="Specialized general contracting services for multi-family residential projects: condo restorations, apartment building renovations, and student housing construction across Ontario."
      />
      <Navigation />
      
      <PageHeader
        title="Multi-Family Residential Construction"
        description="Specialized expertise in condos, apartments, and multi-unit residential buildings"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/markets/commercial" },
          { label: "Multi-Family" }
        ]}
        cta={{ label: CTA_TEXT.primary, href: "/contact" }}
      />

      <main>
          {/* Sector Overview */}
          <section className="mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 15 years serving the multi-family residential market, we understand the unique challenges 
                of working in occupied buildings. From condo reserve fund projects to complete building repositioning, 
                our team coordinates complex renovations while minimizing disruption to residents and maintaining strict 
                budget compliance.
              </p>
            </div>
          </section>

          {/* Challenges */}
          <Section size="major">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Multi-Family Construction Challenges</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Multi-Family Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <UnifiedCard variant="elevated">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">Building Envelope</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Balcony restoration and waterproofing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Window and door replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Exterior cladding and EIFS repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Roofing and flashing upgrades</span>
                  </li>
                </ul>
              </UnifiedCard>

              <UnifiedCard variant="elevated">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">Interior Renovations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Corridor and lobby upgrades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Common area renovations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Parking garage restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Suite turnover and upgrades</span>
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

export default MultiFamily;
