import { Car, CheckCircle2, ArrowRight, Clock, Shield, Layers, Hammer } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import heroImage from "@/assets/heroes/hero-parking-garage.jpg";
import { ServiceCitySection } from "@/components/services/ServiceCitySection";

const ParkingGarageRestoration = () => {
  const whatWeDeliver = [
    {
      icon: Hammer,
      title: "Concrete Spall Repair",
      description: "Structural concrete restoration with corrosion-inhibiting primers, epoxy patching, and rebar replacement where required."
    },
    {
      icon: Layers,
      title: "Traffic Coating Systems",
      description: "High-performance polyurethane and epoxy coatings designed for vehicle traffic, de-icing salts, and thermal cycling."
    },
    {
      icon: Shield,
      title: "Joint System Renewal",
      description: "Expansion joint replacement, control joint sealing, and crack injection preventing further water intrusion and deterioration."
    },
    {
      icon: Car,
      title: "Minimal Disruption",
      description: "Phased work scheduling maintaining parking availability, with rapid-cure materials minimizing downtime per level."
    }
  ];

  const howWeWork = [
    {
      phase: "Assessment",
      activities: [
        "Delamination survey and concrete core testing",
        "Structural engineering evaluation of spalled areas",
        "Coating adhesion testing and substrate moisture analysis",
        "Phasing plan and cost estimate development"
      ]
    },
    {
      phase: "Restoration",
      activities: [
        "Concrete removal to sound substrate and rebar exposure",
        "Corrosion-inhibiting primer and structural repair mortar",
        "Shotblasting and surface preparation for coating adhesion",
        "Traffic coating system application with proper cure times"
      ]
    },
    {
      phase: "Protection",
      activities: [
        "Expansion joint system installation with traffic-rated covers",
        "Control joint sealing and crack injection programs",
        "Line striping and traffic flow restoration",
        "Long-term maintenance planning and warranty activation"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Multi-Level Parkade Restoration",
      location: "North York, ON",
      size: "500 parking spaces",
      duration: "12 months",
      description: "Complete concrete spall repair and traffic coating system for 6-level underground parking structure."
    },
    {
      title: "Condo Parking Rehabilitation",
      location: "Mississauga, ON",
      size: "300 spaces / 4 levels",
      duration: "8 months",
      description: "Phased restoration maintaining resident access while repairing concrete deterioration and installing polyurethane coatings."
    },
    {
      title: "Commercial Office Parkade",
      location: "Downtown Toronto",
      size: "800 spaces / 3 levels",
      duration: "10 months",
      description: "Structural concrete repair, expansion joint replacement, and high-traffic epoxy coating system for busy office complex."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Parking Garage Restoration Toronto | Parkade Repair Ontario"
        description="Professional parking garage restoration services across Ontario. Concrete spall repair, traffic coatings, joint systems. 150+ garages restored with 5M+ sq ft of protective coatings applied."
        keywords="parking garage restoration Toronto, parkade repair, concrete spall repair, parking structure waterproofing, traffic coating Toronto, garage restoration Ontario"
      />
      <Navigation />
      
      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Parking Garage Restoration" }
        ]} />
        <PageHero.Title>Parking Garage Restoration</PageHero.Title>
        <PageHero.Subtitle>
          Comprehensive parkade rehabilitation with structural concrete repair, traffic coatings, and waterproofing systems.
        </PageHero.Subtitle>
        <PageHero.Stats stats={[
          { value: "150+", label: "Garages Restored" },
          { value: "5M+", label: "Sq Ft Coated" },
          { value: "20", label: "Years Experience" },
          { value: "100%", label: "Safety Record" }
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
                Complete parking structure rehabilitation addressing concrete deterioration, waterproofing failures, and traffic surface degradation.
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
                Our proven methodology ensures durable concrete restoration and long-lasting traffic coating performance with minimal disruption.
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
                Recent parking garage restoration projects demonstrating our technical expertise and phasing capabilities.
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
      
      {/* Specialty Contractor Advantage */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Specialty Contractor Difference</h2>
            <p className="text-lg text-muted-foreground mb-6">
              As a specialty contractor focused on building envelope, we self-perform parking garage restoration with structural and waterproofing expertise—not subcontractors. This means integrated solutions, faster emergency response, comprehensive warranties, and direct accountability from our team to yours.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/why-specialty-contractor">
                Why Choose a Specialty Contractor? <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* City-Specific SEO Section */}
      <ServiceCitySection
        serviceName="Parking Garage Restoration"
        serviceSlug="parking-garage-restoration"
        recentProjects={[
          {
            title: "6-Level Underground Parkade Restoration",
            location: "North York Condo Tower",
            description: "Complete concrete spall repair and polyurethane traffic coating system for 500-space underground parking structure with phased work maintaining resident access."
          },
          {
            title: "Commercial Office Parkade Rehabilitation",
            location: "Downtown Toronto Financial District",
            description: "Structural concrete repair, expansion joint replacement, and high-traffic epoxy coating system for 800-space, 3-level parking facility serving busy office complex."
          },
          {
            title: "Multi-Family Parking Restoration",
            location: "Mississauga Condominium",
            description: "Concrete deterioration repair and traffic coating installation for 300-space, 4-level parkade with rapid-cure materials minimizing disruption to residents."
          }
        ]}
        faqs={[
          {
            question: "How much does parking garage restoration cost in Toronto?",
            answer: "Parking garage restoration costs in Toronto typically range from $15-$45 per square foot depending on deterioration severity, coating system selected, and access complexity. Concrete spall repair averages $200-$400 per repair location. We provide detailed assessments and phased cost estimates."
          },
          {
            question: "How long does parkade restoration take?",
            answer: "Most parking garage restoration projects in the GTA take 8-18 months depending on size and deterioration extent. We work in phases to maintain parking availability—typically 1-2 levels at a time. Rapid-cure coatings allow 24-48 hour cure times per section."
          },
          {
            question: "Can residents continue parking during restoration?",
            answer: "Yes, we specialize in phased parking garage work maintaining resident and tenant access. Our approach typically keeps 70-85% of spaces available throughout the project, with rotating closures as work progresses through different levels and zones."
          }
        ]}
      />

      {/* CTA Band */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Parkade Showing Deterioration?</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Request a condition assessment and let our engineers develop a comprehensive restoration plan for your parking structure.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">
                  Request Assessment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/about">Talk to a Specialist</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ParkingGarageRestoration;