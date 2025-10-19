import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import ProcessTimeline from "@/components/ProcessTimeline";
import MetricCounter from "@/components/MetricCounter";
import { Button } from "@/components/ui/button";
import { Shield, Award, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const qualityStandards = [
  {
    title: "Licensed & Insured",
    items: [
      "Full liability coverage and WSIB compliance",
      "All workers covered under comprehensive insurance",
      "Regular safety audits and training programs"
    ]
  },
  {
    title: "Quality Guaranteed",
    items: [
      "Comprehensive warranties on all work (2-10 years)",
      "Premium materials from trusted brands",
      "Satisfaction guarantee with free touch-ups"
    ]
  },
  {
    title: "Expert Team",
    items: [
      "15+ years of specialized industry experience",
      "Certified professionals with ongoing training",
      "Background-checked and vetted team members"
    ]
  }
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Timeline varies by project size and complexity. Most residential projects take 3-7 days, while larger commercial projects can range from 2-12 weeks. We provide a detailed timeline during the consultation phase and keep you updated throughout."
  },
  {
    question: "Do you work during business hours?",
    answer: "We're flexible! For commercial projects, we can work evenings, weekends, or after-hours to minimize disruption to your operations. Residential projects typically run during standard business hours, but we can accommodate special timing requests."
  },
  {
    question: "What happens if I'm not satisfied with the work?",
    answer: "Your satisfaction is our priority. We conduct a thorough final walkthrough with you, and if anything doesn't meet your expectations, we'll address it immediately at no extra cost. All work comes with our satisfaction guarantee."
  },
  {
    question: "How do you handle weather delays?",
    answer: "For exterior projects, weather can be unpredictable. We monitor forecasts closely and adjust schedules proactively. If delays occur, we communicate immediately and work with you to minimize impact on your timeline."
  },
  {
    question: "Do you provide warranties?",
    answer: "Yes! We offer comprehensive warranties on all our work, typically ranging from 2-10 years depending on the service and materials used. All warranty details are provided in writing before work begins."
  }
];

const OurProcess = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Our Process - 4 Simple Steps | Ascen Group"
        description="Discover our proven 4-step process for delivering exceptional construction and painting services. From consultation to warranty, we ensure quality at every stage."
      />
      <Navigation />

      <PageHeader
        eyebrow="Our Process"
        title="How We Work"
        description="Our proven 4-step process ensures quality results, on-time delivery, and complete transparency from start to finish."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How We Work" }
        ]}
        variant="standard"
      />

      {/* Trust Badges Section */}
      <section className="pb-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span>CCA Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-primary" />
                <span>Experienced Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-background">
        <ProcessTimeline />
      </section>

      {/* Quality Standards Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-3">
              By The Numbers
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Commitment to Excellence
            </h2>
          </div>

          {/* Metrics - Emphasized */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 max-w-5xl mx-auto">
            <div className="text-center">
              <MetricCounter value={500} suffix="+" label="" />
              <p className="text-sm font-medium mt-2">Completed Projects</p>
            </div>
            <div className="text-center">
              <MetricCounter value={98} suffix="%" label="" />
              <p className="text-sm font-medium mt-2">On-Time Completion</p>
            </div>
            <div className="text-center">
              <MetricCounter value={15} suffix="+" label="" />
              <p className="text-sm font-medium mt-2">Years Experience</p>
            </div>
            <div className="text-center">
              <MetricCounter value={95} suffix="%" label="" />
              <p className="text-sm font-medium mt-2">Client Satisfaction</p>
            </div>
          </div>

          {/* Quality Standards - Simplified */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {qualityStandards.map((standard, index) => (
                <div key={index} className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold mb-4">{standard.title}</h3>
                  <ul className="space-y-2">
                    {standard.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Common Questions About Our Process
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about working with us
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg px-6">
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
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get a free consultation and detailed quote. No pressure, just honest advice and transparent pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/estimate">Get Free Estimate</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
              <Link to="/case-studies">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurProcess;
