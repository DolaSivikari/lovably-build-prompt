import { Factory, Zap, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/Button";
import SEO from "@/components/SEO";
import heroIndustrial from "@/assets/heroes/hero-industrial.jpg";

const Industrial = () => {
  const challenges = [
    "Working in active manufacturing or warehouse operations without halting production",
    "Meeting specialized coating and surface preparation requirements for industrial environments",
    "Coordinating around heavy equipment, forklifts, and material handling",
    "Ensuring compliance with OSHA and industrial safety standards",
    "Managing tight maintenance windows and shutdown schedules",
  ];

  const solutions = [
    {
      title: "Shutdown Coordination",
      description: "Maximize productivity during planned shutdowns with detailed pre-planning and crew mobilization.",
      icon: Factory,
    },
    {
      title: "Specialized Systems",
      description: "Expert application of high-performance coatings, epoxy floors, and industrial-grade systems.",
      icon: Wrench,
    },
    {
      title: "24/7 Availability",
      description: "Flexible scheduling including nights, weekends, and holiday periods to match your operations.",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Industrial Construction | Warehouse & Manufacturing | Ascent Group GTA"
        description="Envelope & restoration contractor for industrial facilities: building envelope restoration, protective coatings, and waterproofing systems across the Greater Toronto Area."
      />
      <Navigation />
      
      <PageHeader
        title="Industrial Construction"
        description="Specialized expertise in warehouses, manufacturing facilities, and industrial buildings"
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Sector Overview */}
          <section className="mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We deliver industrial construction projects that minimize downtime while meeting the demanding performance 
                requirements of manufacturing and warehouse environments. From new construction to facility upgrades, our team 
                coordinates all work to keep your operations running smoothly.
              </p>
            </div>
          </section>

          {/* Challenges */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Industrial Construction Challenges</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">How We Deliver Success</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Industrial Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>New Construction</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">Warehouse construction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">Manufacturing facility buildouts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">Distribution centers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">Light industrial facilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Facility Upgrades</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">High-performance epoxy flooring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">Industrial coatings and linings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">Structural steel repairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">Loading dock renovations</span>
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
                <CardTitle className="text-2xl">Ready to Upgrade Your Industrial Facility?</CardTitle>
                <CardDescription>Let's discuss your maintenance schedule and performance requirements</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/contact">
                    Request Proposal
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/projects?client_type=Industrial">
                    View Industrial Projects
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

export default Industrial;
