import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Shield, Clock, Award } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sealants = () => {
  const processSteps = [
    {
      number: "01",
      title: "Surface Assessment",
      description: "Thorough inspection of joints, gaps, and existing sealant condition to determine the best approach.",
    },
    {
      number: "02",
      title: "Surface Preparation",
      description: "Complete removal of old sealant, cleaning, and preparation of surfaces for optimal adhesion.",
    },
    {
      number: "03",
      title: "Application",
      description: "Professional application of premium sealants using industry-leading techniques and equipment.",
    },
    {
      number: "04",
      title: "Quality Inspection",
      description: "Comprehensive review ensuring proper adhesion, finish quality, and weather resistance.",
    },
  ];

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
    <>
      <SEO 
        title="Sealants & Caulking Services | Professional Waterproofing"
        description="Expert sealant and caulking services for commercial and residential buildings. Prevent water damage and improve energy efficiency with our professional waterproofing solutions."
        keywords="sealants, caulking, waterproofing, building envelope, weather sealing, joint sealing, commercial sealants, residential caulking"
      />
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/90 to-primary-dark py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Sealants & Caulking Services
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Professional waterproofing solutions that protect your building envelope, prevent water damage, and improve energy efficiency.
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
                  <h2 className="text-3xl font-bold mb-4">Building Envelope Protection</h2>
                  <p className="text-muted-foreground mb-4">
                    Our expert sealant and caulking services protect your building from water infiltration, air leakage, and energy loss. We use premium materials and proven techniques to ensure lasting protection.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Window and door perimeter sealing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Expansion joint treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Curtain wall and cladding joints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Concrete and masonry sealing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>Penetration and utility sealing</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-card p-6 rounded-lg border">
                  <Shield className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Water Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    Prevent water infiltration and structural damage
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Clock className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Long-lasting</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium materials designed for durability
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Award className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Expert Application</h3>
                  <p className="text-sm text-muted-foreground">
                    Certified technicians with specialized training
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Warranty Backed</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive warranty on all work
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
              Protect Your Building Investment
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Don't wait for water damage. Get expert sealant and caulking services today.
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

export default Sealants;
