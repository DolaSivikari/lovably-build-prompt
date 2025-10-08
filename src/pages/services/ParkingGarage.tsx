import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ParkingSquare, CheckCircle2, Shield, AlertTriangle, Wrench, Clock } from "lucide-react";

const ParkingGarage = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Parking Garage Painting Services"
        description="Professional parking garage painting and coating services. Traffic coatings, line striping, waterproofing, and concrete restoration for underground and above-ground parking structures."
        keywords="parking garage painting, parkade coating, traffic coatings, line striping, concrete sealing, parking structure restoration"
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <ParkingSquare className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">Parking Garage Coating</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Professional coating systems for underground and above-ground parking structures. Protect your investment with durable, safe, compliant solutions.
              </p>
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Get Parking Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Complete Parking Structure Solutions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: ParkingSquare,
                  title: "Traffic Deck Coatings",
                  description: "Heavy-duty epoxy and polyurethane for vehicle traffic",
                  features: ["Chemical resistant", "Abrasion resistant", "Waterproof membranes", "Anti-slip surfaces"]
                },
                {
                  icon: AlertTriangle,
                  title: "Safety Line Striping",
                  description: "High-visibility traffic markings and directional signage",
                  features: ["Parking stalls", "Traffic lanes", "Safety zones", "Handicap spaces"]
                },
                {
                  icon: Shield,
                  title: "Concrete Sealing",
                  description: "Protective sealers to prevent water infiltration",
                  features: ["Crack prevention", "Chloride protection", "Freeze-thaw resistance", "Extended lifespan"]
                },
                {
                  icon: Wrench,
                  title: "Structural Repairs",
                  description: "Concrete restoration before coating application",
                  features: ["Spall repair", "Crack filling", "Joint sealing", "Surface leveling"]
                },
                {
                  icon: CheckCircle2,
                  title: "Ceiling & Wall Coating",
                  description: "Protective coatings for exposed concrete",
                  features: ["Moisture barriers", "Mold prevention", "Bright reflective", "Easy maintenance"]
                },
                {
                  icon: Clock,
                  title: "Maintenance Programs",
                  description: "Scheduled maintenance to extend coating life",
                  features: ["Regular inspections", "Touch-up services", "Re-striping", "Preventive care"]
                }
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <service.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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

        {/* Coating Systems */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Premium Coating Systems</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "Epoxy Traffic Coatings",
                  description: "Heavy-duty epoxy systems for high-traffic areas. Chemical resistant, abrasion resistant, and long-lasting. Ideal for main drive lanes and ramps."
                },
                {
                  title: "Polyurethane Topcoats",
                  description: "UV-stable topcoats for exposed areas. Flexible, weather-resistant, and maintains color. Perfect for exterior levels and roof decks."
                },
                {
                  title: "Waterproof Membranes",
                  description: "Seamless waterproofing systems to prevent water infiltration and protect structural concrete. Essential for occupied spaces below."
                },
                {
                  title: "Anti-Slip Additives",
                  description: "Textured finishes providing excellent traction in wet conditions for safety compliance. Required for ramps and pedestrian areas."
                }
              ].map((system, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{system.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{system.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Professional Approach</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Wrench,
                  title: "Preparation Excellence",
                  description: "Surface preparation determines coating success. We thoroughly prepare every surface with proper cleaning, repairs, and profiling."
                },
                {
                  icon: Clock,
                  title: "Minimal Disruption",
                  description: "Phased approach by level or zone. Night and weekend scheduling. Quick-cure coatings minimize downtime."
                },
                {
                  icon: Shield,
                  title: "Quality Assurance",
                  description: "Industry-leading coating systems with manufacturer warranties. Regular inspections and quality control throughout."
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
            <h2 className="text-3xl font-bold mb-4">Protect Your Parking Investment</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Professional parking garage coating extends structure life by decades. Get a comprehensive assessment and quote today.
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

export default ParkingGarage;