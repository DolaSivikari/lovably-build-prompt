import {
  Building2,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import heroCommercial from "@/assets/heroes/hero-commercial.jpg";

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
      description:
        "Weekend and evening scheduling to minimize impact on business operations and building tenants.",
      icon: Clock,
    },
    {
      title: "Fast-Track Delivery",
      description:
        "Expedited permitting, procurement, and construction to meet aggressive move-in dates.",
      icon: Building2,
    },
    {
      title: "Budget Certainty",
      description:
        "Fixed-price contracts with detailed allowances and comprehensive change order procedures.",
      icon: DollarSign,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Commercial Construction Toronto | Office Buildouts & Retail | Ascent Group"
        description="General contractor for commercial construction projects: office tenant improvements, retail buildouts, and mixed-use developments across the GTA."
      />
      <Navigation />

      <PageHeader
        title="Commercial Construction"
        description="Expert delivery of office buildings, tenant improvements, and retail spaces"
        backgroundImage={heroCommercial}
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Sector Overview */}
          <section className="mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We deliver commercial construction projects that meet aggressive
                timelines while maintaining the highest quality standards. From
                ground-up office buildings to tenant improvements and retail
                renovations, our team coordinates all trades to ensure on-time,
                on-budget delivery.
              </p>
            </div>
          </section>

          {/* Challenges */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Commercial Construction Challenges
            </h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Our Solutions */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              How We Deliver Success
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{solution.title}</CardTitle>
                      <CardDescription>{solution.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Services */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Commercial Services
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>New Construction</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">
                        Office building construction
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">
                        Mixed-use developments
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">
                        Retail plaza construction
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">
                        Ground-up commercial buildings
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tenant Improvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">
                        Office space buildouts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">
                        Retail fit-outs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">
                        Building renovations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">
                        Facade upgrades
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  Ready to Start Your Commercial Project?
                </CardTitle>
                <CardDescription>
                  Let's discuss your requirements and create a comprehensive
                  proposal
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
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
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Commercial;
