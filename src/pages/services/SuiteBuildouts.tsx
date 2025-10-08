import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2, Home, Building2, Wrench, Hammer } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SuiteBuildouts = () => {
  const faqs = [
    {
      question: "How long does a typical suite buildout take?",
      answer: "Timeline varies based on scope and size. Small residential suites typically take 6-12 weeks, while commercial spaces may take 3-6 months. We provide detailed schedules during planning.",
    },
    {
      question: "Do you handle permits and approvals?",
      answer: "Yes, we manage the entire permit process including drawings, submissions, and inspections. We ensure all work meets building codes and regulations.",
    },
    {
      question: "Can you work within occupied buildings?",
      answer: "Absolutely. We specialize in minimizing disruption with careful scheduling, dust control, and noise management to keep your building operational.",
    },
    {
      question: "What's included in a suite buildout?",
      answer: "Full-service buildouts include demolition, framing, electrical, plumbing, HVAC, drywall, painting, flooring, millwork, and finishing. We coordinate all trades for a turnkey solution.",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Suite Buildouts | Commercial & Residential Construction"
        description="Professional suite buildout services for commercial offices, retail spaces, and residential units. Full-service construction from design to completion."
        keywords="suite buildouts, office buildouts, retail construction, commercial renovation, tenant improvements, interior construction, space planning"
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Hammer className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">Suite Buildouts & Interior Construction</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Transform empty spaces into functional, beautiful environments. Full-service buildouts for commercial offices, retail spaces, and residential suites.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Complete Buildout Solutions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Commercial Offices",
                  description: "Professional office spaces and work environments",
                  features: ["Open concept offices", "Meeting rooms", "Break rooms", "Reception areas"]
                },
                {
                  title: "Residential Suites",
                  description: "Basement apartments and in-law suites",
                  features: ["Basement suites", "In-law apartments", "Rental units", "Condo renovations"]
                },
                {
                  title: "Retail Spaces",
                  description: "Store buildouts and customer-facing spaces",
                  features: ["Store layouts", "Showrooms", "Sales floors", "Display areas"]
                },
                {
                  title: "Design & Planning",
                  description: "Space planning and design consultation",
                  features: ["Layout design", "Material selection", "Permit drawings", "3D visualization"]
                },
                {
                  title: "Construction Services",
                  description: "Complete interior construction",
                  features: ["Framing", "Electrical & plumbing", "HVAC", "Drywall & finishing"]
                },
                {
                  title: "Finishing Touches",
                  description: "Final details that complete your space",
                  features: ["Flooring", "Millwork", "Painting", "Fixtures & hardware"]
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
                  title: "Consultation & Design",
                  description: "We work with you to understand your vision, functional requirements, budget, and design preferences for your space."
                },
                {
                  title: "Planning & Permits",
                  description: "Complete project planning including architectural drawings, building permits, and detailed construction scheduling."
                },
                {
                  title: "Construction",
                  description: "Professional execution of all trades including framing, electrical, plumbing, HVAC, drywall, and finishing work."
                },
                {
                  title: "Final Inspection",
                  description: "Thorough walkthrough, quality checks, and ensuring everything meets your expectations and building codes."
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
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Buildout Services</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Building2,
                  title: "Turnkey Solutions",
                  description: "From design through completion, we coordinate all trades and manage every aspect of your buildout project."
                },
                {
                  icon: Wrench,
                  title: "Expert Craftsmanship",
                  description: "Experienced team skilled in all aspects of interior construction. Quality workmanship on every project."
                },
                {
                  icon: Home,
                  title: "On-Time Delivery",
                  description: "Detailed scheduling and project management ensures your space is completed on time and within budget."
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
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Vision?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your suite buildout project and create a space that works for you.
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

export default SuiteBuildouts;