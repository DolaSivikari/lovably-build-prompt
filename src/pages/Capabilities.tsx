import { Building2, Users, Hammer, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { useCompanyStats } from "@/hooks/useCompanyStats";

const Capabilities = () => {
  const { yearsInBusinessFormatted } = useCompanyStats();
  
  const deliveryMethods = [
    {
      title: "General Contracting",
      description: "Single-source accountability with fixed-price certainty",
      icon: Building2,
      details: ["Lump sum contracts", "Stipulated price delivery", "Complete project management", "95% on-time completion rate"],
    },
    {
      title: "Construction Management",
      description: "Professional CM services for complex projects",
      icon: Users,
      details: ["CM-at-Risk", "Agency CM", "Cost control & schedule management", "Multi-trade coordination"],
    },
    {
      title: "Design-Build",
      description: "Integrated project delivery from concept to completion",
      icon: Hammer,
      details: ["Single-source responsibility", "Value engineering", "Faster timelines", "Reduced change orders"],
    },
  ];

  const marketSectors = [
    {
      name: "Multi-Family Residential",
      services: ["New construction (wood-frame, concrete)", "Building repositioning", "Condo restorations", "Student housing"],
      link: "/markets/multi-family",
    },
    {
      name: "Commercial Real Estate",
      services: ["Office buildings", "Tenant improvements", "Retail spaces", "Mixed-use developments"],
      link: "/markets/commercial",
    },
    {
      name: "Institutional",
      services: ["Educational facilities", "Healthcare buildings", "Government projects", "Community centers"],
      link: "/markets/institutional",
    },
    {
      name: "Industrial",
      services: ["Warehouses & distribution", "Manufacturing facilities", "Light industrial", "Flex space"],
      link: "/markets/industrial",
    },
  ];

  const selfPerform = {
    envelope: ["Stucco & EIFS Systems", "Architectural painting", "Metal cladding installation", "Waterproofing systems", "Masonry repair"],
    interior: ["Commercial painting", "Interior buildouts", "High-performance coatings", "Parking garage restoration"],
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Capabilities | Project Delivery & Self-Perform Trades | Ascent Group"
        description="Comprehensive general contracting capabilities including GC, CM, design-build delivery with self-perform exterior envelope and interior trades across Ontario."
      />
      <Navigation />
      
      <PageHeader
        title="Our Capabilities"
        description="Comprehensive project delivery methods and self-perform trade expertise"
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Project Delivery */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Project Delivery Methods</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {deliveryMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {method.details.map((detail, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Market Sectors */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Markets We Serve</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {marketSectors.map((sector, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{sector.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {sector.services.map((service, i) => (
                        <li key={i} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={sector.link}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Self-Perform */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Self-Perform Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Exterior Envelope</CardTitle>
                  <CardDescription>Full building envelope systems and restoration</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selfPerform.envelope.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Interior & Specialty</CardTitle>
                  <CardDescription>Commercial interior construction and coatings</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selfPerform.interior.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Trade Coordination */}
          <section className="mb-16">
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Multi-Trade Coordination</CardTitle>
                <CardDescription>We coordinate 15+ specialty trades including</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4">
                    <p className="font-medium">Structural & Foundation</p>
                    <p className="text-sm text-muted-foreground">Concrete, steel, carpentry</p>
                  </div>
                  <div className="p-4">
                    <p className="font-medium">MEP Systems</p>
                    <p className="text-sm text-muted-foreground">Mechanical, electrical, plumbing</p>
                  </div>
                  <div className="p-4">
                    <p className="font-medium">Specialty Trades</p>
                    <p className="text-sm text-muted-foreground">Fire protection, roofing, glazing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Project Size */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Project Size & Capacity</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Typical Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">$100K - $5M</p>
                  <p className="text-sm text-muted-foreground">Most projects fall in this range</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Building2 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Largest Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">$15M+</p>
                  <p className="text-sm text-muted-foreground">Mixed-use development</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Available Bonding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">$5M</p>
                  <p className="text-sm text-muted-foreground">Single project capacity</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Capabilities;
