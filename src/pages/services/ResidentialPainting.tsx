import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Home, CheckCircle2, Paintbrush, Sparkles, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { generateFAQSchema, generateServiceSchema } from "@/utils/faq-schema";

const ResidentialPainting = () => {
  const faqs = [
    {
      question: "How much does it cost to paint a house?",
      answer: "Interior painting typically ranges from $3-6 per square foot, while exterior painting ranges from $2.50-5 per square foot. Final cost depends on surface condition, number of coats, paint quality, and project complexity. We provide free detailed estimates."
    },
    {
      question: "How long does residential painting take?",
      answer: "Most interior rooms take 2-3 days including prep and drying time. Full interior homes (2,000-3,000 sq ft) typically take 5-10 business days. Exterior painting takes 5-7 days depending on weather and house size."
    },
    {
      question: "Do I need to move furniture?",
      answer: "We handle all furniture moving and protection as part of our service. We carefully move items to the center of rooms, cover them with protective sheets, and return everything to its original location when done."
    },
    {
      question: "What paint brands do you use?",
      answer: "We use premium brands like Benjamin Moore, Sherwin-Williams, and Dulux. We'll help you select the right paint for your needs, balancing quality, durability, and budget. All paints come with manufacturer warranties."
    },
    {
      question: "Do you offer color consultation?",
      answer: "Yes! Free color consultation is included with every project. Our experts help you choose colors that match your style, lighting, and existing decor. We provide sample testing before final selection."
    }
  ];

  const faqSchema = generateFAQSchema(faqs);
  const serviceSchema = generateServiceSchema({
    name: "Residential Painting Services",
    description: "Professional interior and exterior house painting services for homeowners across the Greater Toronto Area. Quality craftsmanship, premium materials, and satisfaction guaranteed.",
    areaServed: ["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham"],
    url: "https://ascentgroupconstruction.com/services/residential-painting"
  });

  return (
    <div className="min-h-screen">
      <SEO 
        title="Residential Painting GTA - Interior & Exterior House Painting Services"
        description="Transform your home with professional residential painting services. Expert interior and exterior house painting in Toronto, Mississauga, Brampton. Free estimates, quality guaranteed, 15+ years experience."
        keywords="residential painting GTA, house painting Toronto, interior painting Mississauga, exterior painting Brampton, home painters Ontario"
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
                <h1 className="text-4xl md:text-5xl font-bold">Residential Painting Services</h1>
              </div>
              <p className="text-xl text-white/90 mb-8">
                Transform your home with expert painting services. Quality craftsmanship, premium materials, and attention to detail that makes your house feel like home.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Our Residential Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Interior Painting",
                  description: "Transform your living spaces with beautiful colors",
                  features: ["Living rooms & bedrooms", "Kitchens & bathrooms", "Trim & baseboards", "Ceiling painting"]
                },
                {
                  title: "Exterior Painting",
                  description: "Protect and beautify your home's exterior",
                  features: ["Siding & stucco", "Trim & shutters", "Doors & garage doors", "Pressure washing prep"]
                },
                {
                  title: "Color Consultation",
                  description: "Expert guidance on choosing the perfect palette",
                  features: ["Color matching", "Trend advice", "Sample testing", "Design coordination"]
                },
                {
                  title: "Surface Preparation",
                  description: "Proper prep ensures lasting results",
                  features: ["Cleaning & sanding", "Crack repair", "Primer application", "Surface protection"]
                },
                {
                  title: "Specialty Finishes",
                  description: "Unique textures and decorative painting",
                  features: ["Faux finishes", "Accent walls", "Textured surfaces", "Custom effects"]
                },
                {
                  title: "Deck & Fence Staining",
                  description: "Protect and enhance outdoor wood structures",
                  features: ["Staining & sealing", "Pressure washing", "Wood restoration", "Weather protection"]
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

        {/* What's Included */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What's Included & Pricing</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                  <CardDescription>Every project comes with comprehensive service</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Free color consultation",
                      "Complete surface preparation",
                      "Premium quality paints",
                      "Professional application",
                      "Furniture protection & moving",
                      "Comprehensive warranty"
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
                  <CardTitle>Transparent Pricing</CardTitle>
                  <CardDescription>Based on your specific project needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Square footage and room count",
                      "Surface condition and prep needs",
                      "Paint quality and coats",
                      "Ceiling height and details",
                      "Access and complexity",
                      "No hidden fees"
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

        {/* Why Choose Us */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Homeowners Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Sparkles,
                  title: "Quality Craftsmanship",
                  description: "Experienced painters who treat your home with care and deliver flawless results that last."
                },
                {
                  icon: Home,
                  title: "Respect Your Home",
                  description: "We protect your belongings, maintain cleanliness daily, and work efficiently to minimize disruption."
                },
                {
                  icon: Shield,
                  title: "Satisfaction Guaranteed",
                  description: "Comprehensive warranty on labor and materials. We stand behind our work and ensure you're completely happy."
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
        <section className="py-16 bg-muted/30">
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
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Home?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get your free estimate today. Most quotes delivered within 24 hours.
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

export default ResidentialPainting;