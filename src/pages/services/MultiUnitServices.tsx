/**
 * Multi-Unit Services Hub - Phase 4 (CRITICAL)
 * THE page that attracts developers
 */
import { Building2, CheckCircle, Download, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MultiUnitServices = () => {
  const capabilities = [
    "1,000+ Units Completed Annually",
    "Up to 15 Concurrent Projects",
    "$5M Bonding Capacity",
    "RFP Response Within 48 Hours",
    "35+ Full-Time Professionals",
    "Owned Equipment & Scaffolding",
  ];

  const services = [
    {
      title: "Multi-Unit Painting",
      description: "Interior and exterior painting for apartment buildings, condominiums, and townhouse complexes",
      features: ["High-rise towers (up to 30 stories)", "200+ units per month capacity", "Minimal tenant disruption"],
    },
    {
      title: "New Construction Services",
      description: "Builder partnerships for complete paint schedules from drywall to final coat",
      features: ["Volume pricing available", "Dedicated project managers", "Fast turnaround times"],
    },
    {
      title: "Large-Scale Stucco",
      description: "Multi-home developments and commercial building envelope systems",
      features: ["50,000 sq ft/month capacity", "EIFS installation", "Waterproofing systems"],
    },
    {
      title: "Building Restoration",
      description: "Historic restoration, facade renovation, and complete envelope repair",
      features: ["Heritage building expertise", "Structural repairs", "Code compliance"],
    },
  ];

  const whyChooseUs = [
    "Proven track record with 1,000+ units",
    "Bonding capacity for large projects",
    "Dedicated commercial estimator",
    "Fast RFP response (48 hours)",
    "Safety-first culture (COR certified)",
    "Quality control processes",
    "Volume pricing available",
    "Single point of contact",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Multi-Unit Services - Large-Scale Development Solutions | Ascent Group"
        description="Large-scale construction services for Ontario developers. 1,000+ units annually, $5M bonding capacity, 48-hour RFP response. Specialized in multi-unit developments."
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-charcoal text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 to-charcoal/70 z-0" />
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Large-Scale Construction Services<br />for Ontario Developers
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {capabilities.map((cap, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/resources/contractor-portal">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Download Contractor Package
              </Button>
            </Link>
            <Link to="/contact?type=commercial">
              <Button size="lg" variant="secondary">
                Request Proposal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Services for Large-Scale Projects</h2>
              <p className="text-muted-foreground">
                Comprehensive solutions for multi-unit developments
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Developers Choose Ascent</h2>
              <p className="text-muted-foreground">
                Proven capacity and reliability for large-scale projects
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {whyChooseUs.map((reason, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{reason}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Bid?</h2>
              <p className="text-muted-foreground mb-8">
                Get our complete contractor package or speak directly with our commercial estimator
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-8 text-center">
                  <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Contractor Portal</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download pre-qualification documents, capabilities statement, and insurance certificates
                  </p>
                  <Link to="/resources/contractor-portal">
                    <Button className="w-full">Access Portal</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Commercial Estimator</h3>
                  <p className="text-sm text-muted-foreground mb-2">Robert Anderson</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Direct: (905) 555-COMM<br />
                    Email: estimating@ascentgroup.com
                  </p>
                  <Link to="/contact?type=commercial">
                    <Button variant="outline" className="w-full">Request Proposal</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MultiUnitServices;
