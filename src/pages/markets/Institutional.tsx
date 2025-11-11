import { School, Shield, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import heroInstitutional from "@/assets/heroes/hero-institutional.jpg";

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
      
      <PageHeader
        title="Institutional Construction"
        description="Trusted partner for schools, healthcare facilities, and government buildings"
        backgroundImage={heroInstitutional}
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
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
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Institutional Construction Challenges</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Institutional Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Educational Facilities</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Government & Healthcare</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Ready to Discuss Your Institutional Project?</CardTitle>
                <CardDescription>Let's review your facility's needs and compliance requirements</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/contact">
                    Request Proposal
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/projects?client_type=Institutional">
                    View Institutional Projects
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

export default Institutional;
