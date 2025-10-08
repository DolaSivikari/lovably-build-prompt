import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building, CheckCircle2, Clock, Shield, Users, Paintbrush } from "lucide-react";

const CondoPainting = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Condo Painting Services | Multi-Unit Residential"
        description="Professional condo painting services for individual units, common areas, and building exteriors. Property management specialists serving the GTA."
        keywords="condo painting, apartment painting, multi-unit painting, property management painting, condo building painting, residential painting"
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Paintbrush className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">Condo & Apartment Painting</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Trusted by property managers and condo boards across the GTA. Professional painting for individual units, common areas, and building exteriors.
              </p>
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Get Property Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Complete Condo Painting Solutions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Individual Units",
                  description: "Turnkey unit painting and tenant turnovers",
                  features: ["Between-tenant refresh", "Owner-occupied units", "Move-in ready prep", "Flexible scheduling"]
                },
                {
                  title: "Common Areas",
                  description: "Lobbies, hallways, and amenity spaces",
                  features: ["Lobbies & hallways", "Amenity rooms", "Fitness centers", "Party rooms"]
                },
                {
                  title: "Building Exteriors",
                  description: "Balconies, walls, and exterior surfaces",
                  features: ["Balconies & railings", "Exterior walls", "Parkade ceilings", "Stairwells"]
                },
                {
                  title: "Volume Pricing",
                  description: "Competitive rates for multiple units",
                  features: ["Bulk unit discounts", "Annual programs", "Priority scheduling", "Consistent pricing"]
                },
                {
                  title: "Property Management",
                  description: "Specialized programs for property managers",
                  features: ["Scheduled maintenance", "Quick turnaround", "Tenant coordination", "Detailed reporting"]
                },
                {
                  title: "Emergency Services",
                  description: "Fast response for urgent needs",
                  features: ["Water damage repairs", "Smoke damage", "Quick touch-ups", "Same-week service"]
                }
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <span>{service.title}</span>
                    </CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Condo Painting Process</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "Coordination",
                  description: "Work with your schedule and communicate directly with residents when needed. Flexible timing to minimize disruption."
                },
                {
                  title: "Protection",
                  description: "Floors, fixtures, and furnishings carefully protected. Clean work area maintained throughout the project."
                },
                {
                  title: "Preparation",
                  description: "Patch holes, sand surfaces, and prime as needed for perfect adhesion and a flawless finish."
                },
                {
                  title: "Completion",
                  description: "Quality check, touch-ups, and complete cleanup. Ready for move-in or immediate use."
                }
              ].map((step, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Property Managers Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: "Fast Turnaround",
                  description: "2-3 day unit turnovers. Get units rent-ready quickly without compromising on quality."
                },
                {
                  icon: Shield,
                  title: "Fully Insured",
                  description: "$5M liability coverage. Certificate of insurance provided. WSIB compliant for your protection."
                },
                {
                  icon: Users,
                  title: "Tenant Friendly",
                  description: "Respectful crew, minimal disruption, clear communication. We treat every unit like our own home."
                }
              ].map((advantage, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <advantage.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                    <CardTitle>{advantage.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{advantage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Partner with Ascent Group</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the property managers who trust us for reliable, high-quality condo painting services.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" variant="secondary">Get a Free Estimate</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CondoPainting;