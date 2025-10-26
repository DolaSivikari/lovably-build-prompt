import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Shield, FileText, Clock, Award, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const DeveloperServices = () => {
  const capabilities = [
    { metric: "1,000+", label: "Units Simultaneously", icon: Building2 },
    { metric: "$10M", label: "Bonding Capacity", icon: Shield },
    { metric: "15", label: "Concurrent Projects", icon: TrendingUp },
    { metric: "48hr", label: "RFP Response Time", icon: Clock }
  ];

  const caseStudies = [
    {
      project: "Waterfront Condo Tower",
      units: "350 units",
      value: "$1.2M",
      completion: "3 months",
      client: "Major GTA Developer"
    },
    {
      project: "Mixed-Use Development",
      units: "500 units",
      value: "$1.8M",
      completion: "4 months",
      client: "National Developer"
    },
    {
      project: "Townhouse Community",
      units: "120 units",
      value: "$450K",
      completion: "6 weeks",
      client: "Regional Builder"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Developer & General Contractor Services | Ascent Group"
        description="Trusted by Ontario's leading developers. Capacity for 1,000+ unit projects, $10M bonding, 48-hour RFP response. Download our contractor package."
        canonical="https://ascentgroupconstruction.com/developer-services"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white">For Developers & General Contractors</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Ontario's Leading Developers
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Large-scale painting and finishing services with proven capacity for 1,000+ unit projects
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/resources/contractor-portal">
                  <FileText className="mr-2 h-5 w-5" />
                  Download Contractor Package
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20" asChild>
                <Link to="/contact">Request Proposal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capability Metrics */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Capacity</h2>
            <p className="text-muted-foreground">Enterprise-level capability with personalized service</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <Card key={cap.label} className="text-center">
                  <CardContent className="pt-6">
                    <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
                    <div className="text-4xl font-bold text-primary mb-2">{cap.metric}</div>
                    <p className="text-sm text-muted-foreground">{cap.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Large-Scale Projects</h2>
            <p className="text-muted-foreground">Proven track record with Ontario's top developers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {caseStudies.map((study) => (
              <Card key={study.project}>
                <CardHeader>
                  <CardTitle className="text-lg">{study.project}</CardTitle>
                  <p className="text-sm text-muted-foreground">{study.client}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Scale:</span>
                      <span className="font-semibold">{study.units}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Value:</span>
                      <span className="font-semibold">{study.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span className="font-semibold">{study.completion}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Developers Choose Ascent Group</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">Multi-Phase Expertise</h3>
                    <p className="text-sm text-muted-foreground">Experienced in phased deliveries and coordinating with construction schedules</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">Volume Pricing</h3>
                    <p className="text-sm text-muted-foreground">Competitive pricing structure for large-scale projects without compromising quality</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">Fast RFP Response</h3>
                    <p className="text-sm text-muted-foreground">Dedicated commercial estimator responds to RFPs within 48 hours</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">Full Documentation</h3>
                    <p className="text-sm text-muted-foreground">Insurance certificates, WSIB clearance, safety records, and references readily available</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">Scalable Workforce</h3>
                    <p className="text-sm text-muted-foreground">50+ field personnel with ability to scale quickly for project demands</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">Long-Term Partnerships</h3>
                    <p className="text-sm text-muted-foreground">15+ years serving repeat developer clients across the GTA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Fully Credentialed & Insured</h2>
            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div>
                <div className="text-3xl font-bold mb-2">$5M</div>
                <p className="text-primary-foreground/80">Liability Coverage</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">$10M</div>
                <p className="text-primary-foreground/80">Bonding Capacity</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">COR™</div>
                <p className="text-primary-foreground/80">Safety Certified</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">WSIB</div>
                <p className="text-primary-foreground/80">Compliant</p>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link to="/company/certifications-insurance">View All Certifications</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h2>
            <p className="text-muted-foreground mb-8">
              Get our complete contractor package or speak directly with our commercial estimator
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link to="/resources/contractor-portal">Download Contractor Package</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Commercial Team</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Direct line: <a href="tel:+14165551234" className="text-primary hover:underline">(416) 555-1234 ext. 2</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeveloperServices;