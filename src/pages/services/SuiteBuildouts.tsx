import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Home, Building2, Wrench } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SuiteBuildouts = () => {
  const processSteps = [
    {
      number: "01",
      title: "Consultation & Design",
      description: "We work with you to understand your vision, functional requirements, and design preferences.",
    },
    {
      number: "02",
      title: "Planning & Permits",
      description: "Complete project planning including drawings, permits, and detailed scheduling.",
    },
    {
      number: "03",
      title: "Construction",
      description: "Professional execution of all trades including framing, electrical, plumbing, and finishing.",
    },
    {
      number: "04",
      title: "Final Inspection",
      description: "Thorough walkthrough, quality checks, and ensuring everything meets your expectations.",
    },
  ];

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
    <>
      <SEO 
        title="Suite Buildouts | Commercial & Residential Construction"
        description="Professional suite buildout services for commercial offices, retail spaces, and residential units. Full-service construction from design to completion."
        keywords="suite buildouts, office buildouts, retail construction, commercial renovation, tenant improvements, interior construction, space planning"
      />
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/90 to-primary-dark py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Suite Buildouts & Interior Construction
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Transform empty spaces into functional, beautiful environments. Full-service buildouts for commercial offices, retail spaces, and residential suites.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/estimate">Get Free Estimate</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Complete Buildout Solutions</h2>
                  <p className="text-muted-foreground mb-4">
                    From concept to completion, we deliver turnkey suite buildouts that meet your exact specifications, timeline, and budget. Our experienced team coordinates all trades for seamless execution.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Services Included</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Design consultation and space planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Demolition and site preparation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Framing, electrical, and plumbing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Drywall, painting, and finishing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Flooring, millwork, and fixtures</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Project Types */}
              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                <div className="bg-card p-6 rounded-lg border">
                  <Building2 className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Commercial Offices</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional office spaces, meeting rooms, and collaborative work environments
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Home className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Residential Suites</h3>
                  <p className="text-sm text-muted-foreground">
                    Basement apartments, in-law suites, and condo renovations
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Wrench className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Retail Spaces</h3>
                  <p className="text-sm text-muted-foreground">
                    Store buildouts, showrooms, and customer-facing spaces
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {processSteps.map((step) => (
                  <div key={step.number} className="bg-card p-6 rounded-lg border">
                    <div className="text-4xl font-bold text-primary/20 mb-2">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>
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
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build Your Vision?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let's discuss your suite buildout project and create a space that works for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/estimate">Request Free Estimate</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/projects">View Our Projects</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SuiteBuildouts;
