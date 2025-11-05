import { Lightbulb, Zap, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const DesignBuild = () => {
  const benefits = [
    "Single-source accountability—one contract, one team",
    "Faster project delivery through overlapping design and construction",
    "Early cost certainty with fixed-price proposals at concept stage",
    "Value engineering built into the design process",
    "Reduced change orders and claims through collaborative approach",
    "Streamlined communication and faster decision-making",
  ];

  const idealProjects = [
    "Fast-track projects with aggressive completion dates",
    "Projects where design flexibility and cost optimization are priorities",
    "Buildings requiring specialized construction expertise early in design",
    "Owners seeking simplified project delivery and reduced risk",
    "Projects benefiting from contractor input during planning",
  ];

  const process = [
    {
      step: 1,
      title: "Concept Development",
      description: "Work with you to define program requirements, budget parameters, and schedule goals. Develop conceptual designs with preliminary cost estimates."
    },
    {
      step: 2,
      title: "Design Phase",
      description: "Our architect and construction team refine the design together, identifying value engineering opportunities and ensuring constructability."
    },
    {
      step: 3,
      title: "Preconstruction",
      description: "Finalize design, lock in pricing, confirm schedule, and secure permits—all before breaking ground. Fixed-price contract is signed."
    },
    {
      step: 4,
      title: "Construction",
      description: "Build the project with the same team that designed it. Any field issues are resolved quickly through direct designer-builder collaboration."
    },
    {
      step: 5,
      title: "Turnover",
      description: "Complete commissioning, warranty documentation, and training. Your facility is delivered ready for occupancy with full support."
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Design-Build Services Toronto | Integrated Project Delivery"
        description="Design-build construction services: single-source accountability, faster delivery, early cost certainty. Collaborative approach from concept to completion."
      />
      <Navigation />
      
      <PageHeader
        title="Design-Build Services"
        description="Integrated project delivery from concept to completion"
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Overview */}
          <section className="mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Design-Build eliminates the traditional adversarial relationship between designer and builder. Our integrated 
                team of architects, engineers, and construction professionals work together from day one to deliver your project 
                faster, with fewer change orders, and better value.
              </p>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Design-Build Advantages</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Best Suited For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {idealProjects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground">{project}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Design-Build Process</h2>
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
                <CardTitle className="text-2xl text-center">Why Choose Our Design-Build Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center max-w-3xl mx-auto">
                  Our established relationships with leading architectural and engineering firms in Ontario, combined with our 
                  self-perform capabilities, allow us to deliver design-build projects more efficiently than firms who outsource 
                  all work. We've delivered dozens of design-build projects on-time and within budget.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <section>
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Explore Design-Build for Your Project</CardTitle>
                <CardDescription>Let's discuss how integrated delivery can benefit your project</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/contact">
                    Request Proposal
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/projects">View Design-Build Projects</Link>
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

export default DesignBuild;
