import { Building2, Clock, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { UnifiedCard } from "@/components/shared/UnifiedCard";
import { Section } from "@/components/sections/Section";
import { Button } from "@/ui/Button";
import SEO from "@/components/SEO";
import { UnifiedPageHero } from "@/components/sections/UnifiedPageHero";
import { CTA_TEXT } from "@/design-system/constants";

const Commercial = () => {
  const challenges = [
    "Minimizing business disruption during tenant improvements",
    "Fast-track schedules to meet lease commencement dates",
    "Coordinating with base building management and other tenants",
    "Managing occupied building logistics (loading docks, elevators, working hours)",
    "Ensuring code compliance for commercial occupancy",
  ];

  const solutions = [
    {
      title: "Off-Hours Work",
      description: "Weekend and evening scheduling to minimize impact on business operations and building tenants.",
      icon: Clock,
    },
    {
      title: "Fast-Track Delivery",
      description: "Expedited permitting, procurement, and construction to meet aggressive move-in dates.",
      icon: Building2,
    },
    {
      title: "Budget Certainty",
      description: "Fixed-price contracts with detailed allowances and comprehensive change order procedures.",
      icon: DollarSign,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Commercial Construction Toronto | Office Buildouts & Retail | Ascent Group"
        description="Envelope & restoration contractor for commercial building projects: building envelope remediation, façade restoration, and parking structure rehabilitation across the GTA."
      />
      <Navigation />
      
      <UnifiedPageHero
        title="Commercial Construction"
        description="Expert delivery of office buildings, tenant improvements, and retail spaces"
        primaryCTA={{ text: CTA_TEXT.project, href: "/estimate" }}
        secondaryCTA={{ text: CTA_TEXT.viewProjects, href: "/projects?client_type=Commercial" }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/markets" },
          { label: "Commercial" }
        ]}
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Sector Overview */}
          <section className="mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We deliver commercial construction projects that meet aggressive timelines while maintaining the highest 
                quality standards. From ground-up office buildings to tenant improvements and retail renovations, our team 
                coordinates all trades to ensure on-time, on-budget delivery.
              </p>
            </div>
          </section>

          {/* Challenges */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Commercial Construction Challenges</h2>
            <UnifiedCard variant="elevated">
              <ul className="space-y-4">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-muted-foreground">{challenge}</span>
                  </li>
                ))}
              </ul>
            </UnifiedCard>
          </section>

          {/* Our Solutions */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">How We Deliver Success</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <UnifiedCard key={index} variant="elevated">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </UnifiedCard>
                );
              })}
            </div>
          </section>

          {/* Services */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Commercial Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <UnifiedCard variant="elevated">
                <h3 className="text-xl font-semibold mb-4">New Construction</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Office building construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Mixed-use developments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Retail plaza construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Ground-up commercial buildings</span>
                  </li>
                </ul>
              </UnifiedCard>

              <UnifiedCard variant="elevated">
                <h3 className="text-xl font-semibold mb-4">Tenant Improvements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Office space buildouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Retail fit-outs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Building renovations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Facade upgrades</span>
                  </li>
                </ul>
              </UnifiedCard>
            </div>
          </section>

          {/* CTA */}
          <section>
            <UnifiedCard variant="elevated" className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent text-center">
              <h3 className="text-2xl font-semibold mb-2">Ready to Start Your Commercial Project?</h3>
              <p className="text-muted-foreground mb-6">Let's discuss your requirements and create a comprehensive proposal</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/submit-rfp">
                    Submit RFP
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/projects?client_type=Commercial">
                    View Commercial Projects
                  </Link>
                </Button>
              </div>
            </UnifiedCard>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Commercial;
