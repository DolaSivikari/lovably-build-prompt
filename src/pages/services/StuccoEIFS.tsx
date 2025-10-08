import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2, Shield, Zap, Droplets, Thermometer, Award, Layers } from "lucide-react";

const StuccoEIFS = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Expert EIFS & Stucco Installation | Energy-Efficient Exterior Systems"
        description="Professional EIFS and Stucco installation by certified contractors. Superior insulation (R5-R10+), advanced moisture management, and manufacturer-backed warranties. Serving GTA."
        keywords="EIFS installation, exterior insulation finish system, stucco contractor, StoPowerwall, DrainScreen, energy efficient cladding, EIFS repair"
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">EIFS & Stucco Systems</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Superior insulation, weather protection, and architectural beauty in one advanced exterior system. Certified EIFS installation specialists.
              </p>
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Get Free Estimate
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why EIFS is the Superior Choice</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Thermometer,
                  title: "Superior Insulation",
                  stat: "R5-R10+",
                  description: "Continuous insulation eliminates thermal bridging, reducing energy costs by 20-30%"
                },
                {
                  icon: Droplets,
                  title: "Moisture Management",
                  stat: "DrainScreen",
                  description: "Integrated drainage planes meet code requirements and prevent water damage"
                },
                {
                  icon: Shield,
                  title: "Impact Resistant",
                  stat: "Crack Defense",
                  description: "Flexible system with reinforcement resists cracking from building movement"
                },
                {
                  icon: Zap,
                  title: "Energy Savings",
                  stat: "20-30%",
                  description: "Reduced heating and cooling costs with continuous thermal envelope"
                }
              ].map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <benefit.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">{benefit.stat}</div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* System Details */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Multi-Layer Protection System</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Complete EIFS System Technology</CardTitle>
                  <CardDescription>
                    Certified installer of advanced EIFS systems including StoPowerwall - the industry leader in exterior insulation and finish systems.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        layer: "StoGuard® WRB",
                        description: "Air and water-resistive barrier - first line of defense against moisture infiltration"
                      },
                      {
                        layer: "Continuous Insulation",
                        description: "R5.0 to R10+ rigid foam board mechanically fastened for superior thermal performance"
                      },
                      {
                        layer: "Sto DrainScreen®",
                        description: "Drainage mat creating defined space for moisture management and code compliance"
                      },
                      {
                        layer: "Reinforced Base Coat",
                        description: "Polymer-modified cement with embedded mesh for impact resistance"
                      },
                      {
                        layer: "Sto Crack Defense",
                        description: "Optional high-tensile reinforcement controlling cracking at stress points"
                      },
                      {
                        layer: "Premium Finish",
                        description: "Textured or smooth finish in unlimited colors - including StoCast Brick, Wood, and Stone options"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-bold mb-1">{item.layer}</div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Comprehensive EIFS & Stucco Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Complete System Installation",
                  description: "Full EIFS systems from substrate to finish",
                  services: [
                    "New construction EIFS",
                    "Renovation over existing cladding",
                    "StoPowerwall ci systems",
                    "DrainScreen moisture management",
                    "Custom finish selection",
                    "Color consultation"
                  ]
                },
                {
                  title: "Repair & Restoration",
                  description: "Expert repair of existing EIFS and stucco",
                  services: [
                    "Crack repair and prevention",
                    "Water damage remediation",
                    "Impact damage repair",
                    "Flashing replacement",
                    "Texture matching",
                    "Finish restoration"
                  ]
                },
                {
                  title: "Specialty Applications",
                  description: "Advanced EIFS solutions",
                  services: [
                    "Sto Crack Defense fortification",
                    "Fire-resistant systems",
                    "Hurricane impact systems",
                    "Architectural details",
                    "Real masonry veneers",
                    "StoCast Brick & Wood"
                  ]
                }
              ].map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.services.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Ascent Group for EIFS</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Award,
                  title: "Certified Installers",
                  description: "Factory-trained in EIFS application with ongoing education on latest techniques and manufacturer partnerships."
                },
                {
                  icon: Shield,
                  title: "Building Science Expertise",
                  description: "Deep understanding of moisture management, thermal performance, and code compliance for lasting results."
                },
                {
                  icon: CheckCircle2,
                  title: "Quality Assurance",
                  description: "Multi-point quality control inspections, manufacturer specification compliance, and comprehensive warranty coverage."
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
            <h2 className="text-3xl font-bold mb-4">Superior Building Protection</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Invest in energy-efficient, weather-resistant EIFS systems. Get a comprehensive assessment and quote today.
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

export default StuccoEIFS;