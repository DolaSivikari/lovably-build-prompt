import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, Store, Factory, CheckCircle2, Paintbrush, Clock, Shield, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateFAQSchema, generateServiceSchema } from "@/utils/faq-schema";

const CommercialPainting = () => {
  const faqs = [
    {
      question: "How long does commercial painting take?",
      answer: "Project timelines vary based on square footage and scope. A typical office space (5,000-10,000 sq ft) takes 5-7 business days. We work nights and weekends to minimize business disruption."
    },
    {
      question: "Do you work after hours or on weekends?",
      answer: "Yes! We understand that minimizing downtime is critical for businesses. We offer flexible scheduling including nights, weekends, and phased approaches to keep your business operational."
    },
    {
      question: "What is your commercial painting pricing?",
      answer: "Commercial painting typically ranges from $2-4 per square foot depending on surface type, prep work needed, and paint specifications. We provide detailed written quotes with no hidden fees."
    },
    {
      question: "Are you licensed and insured for commercial work?",
      answer: "Yes, we are fully licensed, bonded, and insured with $5M liability coverage. We are WSIB compliant and provide certificates of insurance for all projects."
    },
    {
      question: "Do you offer warranties on commercial painting?",
      answer: "Yes, we provide comprehensive warranties on all labor and materials. Typical warranties are 2-5 years depending on the project scope and environmental conditions."
    }
  ];

  const faqSchema = generateFAQSchema(faqs);
  const serviceSchema = generateServiceSchema({
    name: "Commercial Painting Services",
    description: "Professional interior and exterior commercial painting for offices, retail, industrial facilities, and multi-unit residential properties across the Greater Toronto Area.",
    areaServed: ["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham"],
    url: "https://ascentgroupconstruction.com/services/commercial-painting"
  });

  return (
    <div className="min-h-screen">
      <SEO 
        title="Commercial Painting Services GTA - Office, Retail & Industrial Painters"
        description="Professional commercial painting services for businesses across the GTA. Interior and exterior painting for offices, retail spaces, industrial facilities. Free quotes, flexible scheduling, fully insured."
        keywords="commercial painting GTA, office painting Toronto, retail painting Mississauga, industrial painting, commercial painters Ontario"
        structuredData={[faqSchema, serviceSchema]}
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Paintbrush className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl font-bold">Commercial Painting Services</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Transform your business space with professional painting services that minimize downtime and maximize results. We specialize in commercial projects of all sizes.
              </p>
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Commercial Painting Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Commercial Painting Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Building2,
                  title: "Office Buildings",
                  description: "Professional office environments that inspire productivity",
                  features: ["Conference rooms", "Common areas", "Executive suites", "Lobbies"]
                },
                {
                  icon: Store,
                  title: "Retail Spaces",
                  description: "Inviting storefronts that attract and retain customers",
                  features: ["Showrooms", "Customer areas", "Exterior facades", "Display areas"]
                },
                {
                  icon: Factory,
                  title: "Industrial Facilities",
                  description: "Durable finishes for demanding environments",
                  features: ["Warehouses", "Manufacturing facilities", "Distribution centers", "Loading docks"]
                },
                {
                  icon: Store,
                  title: "Hospitality",
                  description: "Welcoming spaces that enhance guest experience",
                  features: ["Hotels", "Restaurants", "Cafes", "Guest rooms"]
                },
                {
                  icon: Building2,
                  title: "Healthcare",
                  description: "Clean, compliant finishes for medical facilities",
                  features: ["Hospitals", "Clinics", "Medical offices", "Care facilities"]
                },
                {
                  icon: Factory,
                  title: "Multi-Unit Residential",
                  description: "Property management painting specialists",
                  features: ["Condos", "Apartments", "Common areas", "Unit turnover"]
                }
               ].map((sector, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <span>{sector.title}</span>
                    </CardTitle>
                    <CardDescription>{sector.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {sector.features.map((feature, idx) => (
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

        {/* Services Offered */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Interior & Exterior Services</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Interior Commercial Painting</CardTitle>
                  <CardDescription>
                    Transform your interior spaces with minimal disruption to your business operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Office spaces and cubicles",
                      "Conference and meeting rooms",
                      "Lobbies and reception areas",
                      "Hallways and stairwells",
                      "Break rooms and cafeterias",
                      "Retail and showroom floors"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exterior Commercial Painting</CardTitle>
                  <CardDescription>
                    Weather-resistant finishes that protect and enhance your building's curb appeal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Building facades and walls",
                      "Storefront painting",
                      "Parking structures",
                      "Metal cladding and siding",
                      "Trim and architectural details",
                      "Loading dock areas"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Commercial Process</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "Initial Consultation",
                  description: "We assess your space, discuss your needs, timeline constraints, and budget. Site visit to understand logistics and access requirements."
                },
                {
                  title: "Detailed Proposal",
                  description: "Comprehensive quote with scope of work, timeline, and paint specifications. Flexible scheduling options to suit your business operations."
                },
                {
                  title: "Professional Execution",
                  description: "Experienced crews work efficiently with minimal disruption. Daily progress updates and site cleanliness maintained throughout."
                },
                {
                  title: "Final Inspection",
                  description: "Thorough walkthrough and inspection. Address any concerns immediately. Your satisfaction guaranteed."
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
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">The Commercial Painting Advantage</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: "Flexible Scheduling",
                  description: "We work around your business hours - nights, weekends, or phased schedules to minimize disruption."
                },
                {
                  icon: Shield,
                  title: "Fully Insured & Licensed",
                  description: "Licensed, bonded, and fully insured. WSIB compliant with comprehensive liability coverage."
                },
                {
                  icon: Users,
                  title: "Project Management",
                  description: "Dedicated project managers ensure clear communication, on-time delivery, and quality control throughout."
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

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
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
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Commercial Space?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get a detailed quote for your commercial painting project. Fast response, competitive pricing, and professional service guaranteed.
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

export default CommercialPainting;