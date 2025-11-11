import { Building2, CheckCircle2, ArrowRight, Clock, Shield, Wrench, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import heroImage from "@/assets/heroes/hero-facade-remediation.jpg";

const FacadeRemediation = () => {
  const whatWeDeliver = [
    {
      icon: AlertTriangle,
      title: "Structural Assessment",
      description: "Comprehensive facade condition surveys identifying deficiencies, safety hazards, and long-term maintenance requirements."
    },
    {
      icon: Wrench,
      title: "Engineered Solutions",
      description: "Code-compliant repair strategies with structural engineer certification and municipal permit coordination."
    },
    {
      icon: Shield,
      title: "Safety-First Execution",
      description: "Full pedestrian protection systems, certified fall arrest equipment, and daily safety audits throughout remediation."
    },
    {
      icon: Building2,
      title: "Building Envelope Integrity",
      description: "Waterproofing integration, thermal performance restoration, and air barrier continuity for long-term durability."
    }
  ];

  const howWeWork = [
    {
      phase: "Investigation",
      activities: [
        "Rope access and drone-assisted condition surveys",
        "Non-destructive testing and core sampling",
        "Structural engineering assessment and reporting",
        "Cost estimation and phasing recommendations"
      ]
    },
    {
      phase: "Remediation",
      activities: [
        "Engineered shoring and temporary support systems",
        "Concrete spall repair and structural steel restoration",
        "Masonry reconstruction and facade component replacement",
        "Waterproofing and air barrier system integration"
      ]
    },
    {
      phase: "Certification",
      activities: [
        "Third-party testing and quality verification",
        "Engineer sign-off and municipal inspection coordination",
        "As-built documentation and warranty activation",
        "Long-term maintenance planning and owner training"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Downtown High-Rise Restoration",
      location: "Toronto Financial District",
      size: "32-story tower",
      duration: "18 months",
      description: "Complete facade remediation including precast panel repair, window wall replacement, and balcony waterproofing."
    },
    {
      title: "Heritage Building Envelope Upgrade",
      location: "Old Toronto",
      size: "Historic 6-story masonry",
      duration: "12 months",
      description: "Sympathetic masonry restoration with concealed structural reinforcement and heritage-compliant window upgrades."
    },
    {
      title: "Mixed-Use Cladding Failure Repair",
      location: "Mississauga, ON",
      size: "22-story residential",
      duration: "24 months",
      description: "Emergency facade stabilization followed by systematic EIFS and masonry cladding replacement over occupied building."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Façade Remediation Toronto | Building Envelope Restoration Ontario"
        description="Comprehensive facade remediation services for high-rise buildings across Ontario. Structural assessment, engineered repairs, safety-first execution. 500+ buildings restored with zero structural failures."
        keywords="facade remediation Toronto, building envelope restoration, facade repair, high-rise restoration, structural facade repair, Toronto facade contractor"
      />
      <Navigation />
      
      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Façade Remediation" }
        ]} />
        <PageHero.Title>Façade Remediation Programs</PageHero.Title>
        <PageHero.Subtitle>
          Engineered facade restoration with structural certification and safety-first execution.
        </PageHero.Subtitle>
        <PageHero.Stats stats={[
          { value: "500+", label: "Buildings Restored" },
          { value: "25", label: "Years Experience" },
          { value: "$50M+", label: "Projects Completed" },
          { value: "0", label: "Structural Failures" }
        ]} />
        <PageHero.CTAs 
          primaryText="Request Assessment" 
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
                Comprehensive facade remediation services addressing structural deficiencies, water infiltration, and building code compliance.
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
                Our proven methodology ensures safe, code-compliant facade restoration with minimal disruption to building occupants.
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

        {/* Selected Case Studies */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">Selected Case Studies</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Recent facade remediation projects demonstrating our technical expertise across diverse building types.
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
            <h2 className="text-3xl font-bold mb-4">Concerned About Your Facade?</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Request a facade condition assessment and let our engineers develop a comprehensive remediation strategy for your building.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">
                  Request Assessment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/about">Talk to an Engineer</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FacadeRemediation;