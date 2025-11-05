import { Users, TrendingUp, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const ConstructionManagement = () => {
  const benefits = [
    "Cost control through detailed budgeting and change order management",
    "Schedule optimization with critical path analysis and recovery plans",
    "Trade contractor prequalification and bid leveling",
    "Independent quality assurance and testing coordination",
    "Risk management and claims avoidance strategies",
    "Real-time reporting and budget tracking",
  ];

  const idealProjects = [
    "Complex multi-phase projects requiring specialized oversight",
    "Fast-track schedules with overlapping design and construction",
    "Projects requiring detailed cost reporting and value engineering",
    "Public sector projects with stringent compliance requirements",
    "Design-assist and early contractor involvement projects",
  ];

  const process = [
    {
      step: 1,
      title: "Project Setup",
      description: "Establish project controls, budgets, schedules, quality standards, and communication protocols with all stakeholders."
    },
    {
      step: 2,
      title: "Contractor Procurement",
      description: "Prequalify contractors, issue bid packages, conduct bid reviews, and recommend contract awards based on value, not just price."
    },
    {
      step: 3,
      title: "Construction Oversight",
      description: "Daily site supervision, progress tracking, schedule monitoring, quality inspections, and safety compliance verification."
    },
    {
      step: 4,
      title: "Cost Management",
      description: "Track committed costs, review change orders, process payment applications, and provide detailed monthly cost reports."
    },
    {
      step: 5,
      title: "Closeout & Turnover",
      description: "Coordinate final inspections, substantial completion, punch list resolution, and complete warranty documentation."
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Construction Management Services Toronto | CM-at-Risk & Agency CM"
        description="Professional construction management services: cost control, schedule management, quality assurance. Transparent CM approach with detailed reporting."
      />
      <Navigation />
      
      <PageHeader
        title="Construction Management Services"
        description="Professional CM services for complex projects requiring expert oversight"
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Overview */}
          <section className="mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                As your Construction Manager, we act as your advocate throughout the project—providing cost control, 
                schedule management, quality assurance, and trade coordination. We bring transparency and accountability 
                to every phase, whether as CM-at-Risk or Agency CM.
              </p>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Construction Management Benefits</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Ideal Projects */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Ideal for These Project Types</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {idealProjects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground">{project}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our CM Process</h2>
            <div className="space-y-6">
              {process.map((step) => (
                <Card key={step.step}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                      <div>
                        <CardTitle>{step.title}</CardTitle>
                        <CardDescription className="mt-2">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Why Choose Our CM Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center max-w-3xl mx-auto">
                  Unlike traditional general contractors who mark up all trades, our CM approach provides complete cost 
                  transparency. You see actual trade costs, our fee is fixed, and we're incentivized to save you money. 
                  Our self-perform capabilities also allow us to supplement trade work when needed to keep projects on schedule.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <section>
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Discuss Your CM Needs</CardTitle>
                <CardDescription>Let's review your project requirements and CM approach</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/contact">
                    Request Proposal
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/capabilities">View Our Capabilities</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConstructionManagement;
