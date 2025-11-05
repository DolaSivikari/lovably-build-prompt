import { Building2, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const GeneralContracting = () => {
  const benefits = [
    "Single-source accountability—one contract, one point of contact",
    "Fixed-price certainty with comprehensive scope documentation",
    "Proven track record with 95% on-time completion rate",
    "Comprehensive warranties and quality guarantees",
    "Self-perform capabilities reduce costs and improve schedule control",
    "Experienced project managers and superintendents",
  ];

  const idealProjects = [
    "New commercial building construction ($500K - $5M)",
    "Multi-family residential projects (4+ stories)",
    "Major renovations and repositioning projects",
    "Tenant improvements and buildouts",
    "Mixed-use developments",
  ];

  const process = [
    {
      step: 1,
      title: "Preconstruction Planning",
      description: "We review drawings, identify potential issues, develop detailed schedules, and provide value engineering recommendations to optimize cost and quality."
    },
    {
      step: 2,
      title: "Permits & Approvals",
      description: "Our team manages all municipal permits, building approvals, and coordination with authorities having jurisdiction."
    },
    {
      step: 3,
      title: "Trade Coordination",
      description: "We prequalify, contract, schedule, and supervise all specialty trades to ensure quality work and on-schedule delivery."
    },
    {
      step: 4,
      title: "Quality Control",
      description: "Daily site supervision, regular inspections, punch list management, and comprehensive photo documentation throughout construction."
    },
    {
      step: 5,
      title: "Project Closeout",
      description: "Complete turnover package including as-built drawings, warranties, operations manuals, and training for your facility team."
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="General Contracting Services Toronto | GC for Commercial & Multi-Family"
        description="Full-service general contracting from permits to turnkey delivery. Fixed-price certainty, 95% on-time completion, comprehensive warranties. Serving Greater Toronto Area."
      />
      <Navigation />
      
      <PageHeader
        title="General Contracting Services"
        description="Comprehensive project management from permits to turnkey delivery"
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Overview */}
          <section className="mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We serve as the single point of contact for your project, managing all aspects from preconstruction planning 
                through final turnover. Our team coordinates all trades, manages schedules and budgets, and ensures quality 
                standards are met at every phase.
              </p>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us as Your General Contractor</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Ideal Project Types</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {idealProjects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground">{project}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our 5-Step Process</h2>
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
                <CardTitle className="text-2xl text-center">Why Choose Ascent Group</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center max-w-3xl mx-auto">
                  Our self-perform capabilities give us superior control over schedules and quality compared to general 
                  contractors who subcontract all work. We directly employ skilled tradespeople for exterior envelope, 
                  painting, and specialty systems—ensuring accountability and faster issue resolution.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <section>
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Ready to Start Your Project?</CardTitle>
                <CardDescription>Request a proposal and let's discuss your construction needs</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/contact">
                    Request Proposal
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/projects">View Our Projects</Link>
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

export default GeneralContracting;
