import { Building2, CheckCircle2, ArrowRight, Clock, Shield, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import heroImage from "@/assets/hero-general-contracting.jpg";

const GeneralContracting = () => {
  const whatWeDeliver = [
    {
      icon: Building2,
      title: "Single-Source Accountability",
      description: "One contract, one point of contact, one team responsible for delivering your project on time and on budget."
    },
    {
      icon: TrendingUp,
      title: "Budget Stewardship",
      description: "Fixed-price certainty with transparent cost breakdowns, value engineering, and proactive budget management."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive insurance, safety protocols, quality controls, and warranty coverage protecting your investment."
    },
    {
      icon: Users,
      title: "Multi-Trade Coordination",
      description: "Seamless management of all specialty trades with proven subcontractor networks and schedule optimization."
    }
  ];

  const howWeWork = [
    {
      phase: "Pre-Construction",
      activities: [
        "Detailed scope review and cost estimation",
        "Value engineering and constructability analysis",
        "Permit coordination and municipal approvals",
        "Preconstruction schedule and logistics planning"
      ]
    },
    {
      phase: "Execution",
      activities: [
        "Daily on-site supervision and quality control",
        "Trade coordination and schedule management",
        "Weekly progress reporting and budget tracking",
        "Proactive issue resolution and RFI management"
      ]
    },
    {
      phase: "Closeout",
      activities: [
        "Comprehensive punch list completion",
        "As-built documentation and warranty packages",
        "Owner training and facility turnover",
        "Post-occupancy support and warranty service"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Mixed-Use Commercial Development",
      location: "Toronto, ON",
      size: "45,000 sq ft",
      duration: "14 months",
      description: "Ground-up construction of 3-story mixed-use building with retail main floor and office space above."
    },
    {
      title: "Multi-Family Renovation",
      location: "Mississauga, ON",
      size: "120 units",
      duration: "8 months",
      description: "Complete exterior envelope restoration and interior suite upgrades for 12-story residential tower."
    },
    {
      title: "Institutional Addition",
      location: "Brampton, ON",
      size: "22,000 sq ft",
      duration: "10 months",
      description: "New wing addition to existing educational facility with specialized mechanical and accessibility features."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="General Contracting Toronto | Commercial GC Services Ontario"
        description="Full-service general contracting with single-source accountability, fixed-price certainty, and 95% on-time delivery. Serving commercial, multi-family, and institutional clients across the GTA."
        keywords="general contractor Toronto, commercial GC, construction management, Toronto general contracting, GTA contractor"
      />
      <Navigation />
      
      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "General Contracting" }
        ]} />
        <PageHero.Title>General Contracting</PageHero.Title>
        <PageHero.Subtitle>
          Turnkey delivery with quality, safety, and schedule certainty.
        </PageHero.Subtitle>
        <PageHero.Stats stats={[
          { value: "95%", label: "On-Time Delivery" },
          { value: "0", label: "Lost-Time Incidents" },
          { value: "500+", label: "Projects Completed" },
          { value: "$2B+", label: "Total Value" }
        ]} />
        <PageHero.CTAs 
          primaryText="Request Proposal" 
          primaryHref="/contact"
          secondaryText="View Projects"
          secondaryHref="/projects"
        />
      </PageHero.Root>

      <main>
        {/* What We Deliver */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">What We Deliver</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                As your general contractor, we provide comprehensive project management from preconstruction through final turnover.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whatWeDeliver.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">How We Work</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our proven three-phase approach ensures quality outcomes and transparent communication throughout your project.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {howWeWork.map((phase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">{phase.phase}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Self-Perform Advantage */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-foreground mb-6">The Self-Perform Advantage</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Unlike traditional GCs who subcontract all work, we self-perform critical trades including 
                EIFS/stucco, masonry restoration, metal cladding, waterproofing, parking garage coatings, and specialty painting. This means:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Schedule Certainty
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Direct control over key trades eliminates subcontractor delays and availability conflicts.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Cost Control
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Eliminating subcontractor markup means better value without compromising quality.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Quality Assurance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our crews follow consistent quality standards with direct accountability to project managers.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Faster Issue Resolution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      When issues arise, we resolve them immediately without waiting for subcontractor callbacks.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Case Studies */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">Selected Case Studies</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Recent projects demonstrating our general contracting expertise across diverse building types.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {caseStudies.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {project.location}
                      </span>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                        {project.size}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Completed in {project.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Request a proposal and let's discuss how our general contracting services can deliver your project on time and on budget.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">
                  Request Proposal
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/about">Talk to a PM</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GeneralContracting;
