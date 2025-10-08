import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2, Shield, Clock, Award, Droplets } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sealants = () => {
  const faqs = [
    {
      question: "How often should building sealants be replaced?",
      answer: "Typically every 10-20 years depending on exposure, climate, and sealant quality. Regular inspections help identify deterioration early.",
    },
    {
      question: "What types of sealants do you use?",
      answer: "We use high-performance silicone, polyurethane, and hybrid sealants selected based on your specific application, substrate, and environmental conditions.",
    },
    {
      question: "Can sealant work be done in winter?",
      answer: "Yes, with proper planning and the right products. We use specialized cold-weather sealants and techniques to ensure quality results year-round.",
    },
    {
      question: "How do I know if my building needs new sealant?",
      answer: "Signs include visible cracks, gaps, water infiltration, drafts, or sealant that's hard, brittle, or pulling away from surfaces. We offer free assessments.",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Sealants & Caulking Services | Professional Waterproofing"
        description="Expert sealant and caulking services for commercial and residential buildings. Prevent water damage and improve energy efficiency with our professional waterproofing solutions."
        keywords="sealants, caulking, waterproofing, building envelope, weather sealing, joint sealing, commercial sealants, residential caulking"
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">Sealants & Caulking Services</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Professional waterproofing solutions that protect your building envelope, prevent water damage, and improve energy efficiency.
              </p>
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Get Free Estimate
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Building Envelope Protection</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Window & Door Sealing",
                  description: "Perimeter sealing for air and water tightness",
                  features: ["Window perimeters", "Door frames", "Glazing systems", "Curtain walls"]
                },
                {
                  title: "Expansion Joints",
                  description: "Movement joints in concrete and masonry",
                  features: ["Building expansion joints", "Control joints", "Seismic joints", "Parking decks"]
                },
                {
                  title: "Concrete & Masonry",
                  description: "Cracks, joints, and penetration sealing",
                  features: ["Crack repair", "Mortar joints", "Foundation sealing", "Balcony repairs"]
                },
                {
                  title: "Metal & Cladding",
                  description: "Metal panel joints and transitions",
                  features: ["Panel joints", "Trim connections", "Flashing details", "Roof-to-wall"]
                },
                {
                  title: "Interior Applications",
                  description: "Interior sealing for various surfaces",
                  features: ["Countertops", "Bathrooms & kitchens", "Baseboards", "Trim work"]
                },
                {
                  title: "Penetration Sealing",
                  description: "Utilities and service penetrations",
                  features: ["Pipe penetrations", "Cable entries", "HVAC openings", "Electrical boxes"]
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "Surface Assessment",
                  description: "Thorough inspection of joints, gaps, and existing sealant condition to determine the best approach and materials."
                },
                {
                  title: "Surface Preparation",
                  description: "Complete removal of old sealant, cleaning, and preparation of surfaces for optimal adhesion and performance."
                },
                {
                  title: "Professional Application",
                  description: "Expert application of premium sealants using industry-leading techniques, tools, and quality control."
                },
                {
                  title: "Quality Inspection",
                  description: "Comprehensive review ensuring proper adhesion, finish quality, weather resistance, and long-term performance."
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
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Sealant Services</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: "Water Protection",
                  description: "Prevent water infiltration and structural damage with properly selected and applied high-performance sealants."
                },
                {
                  icon: Clock,
                  title: "Long-lasting Results",
                  description: "Premium materials and expert application ensure durability and performance that lasts for years."
                },
                {
                  icon: Award,
                  title: "Expert Application",
                  description: "Certified technicians with specialized training in building envelope sealing and waterproofing systems."
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

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-background">
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Protect Your Building Investment</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don't wait for water damage. Get expert sealant and caulking services today.
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

export default Sealants;