import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ProcessTimeline from "@/components/ProcessTimeline";
import MetricCounter from "@/components/MetricCounter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Clock, ThumbsUp, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const qualityStandards = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full liability coverage and WSIB compliance for your peace of mind"
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "Comprehensive warranties and satisfaction guarantee on all work"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "98% of projects completed on or ahead of schedule"
  },
  {
    icon: ThumbsUp,
    title: "Premium Materials",
    description: "We use only top-tier brands and environmentally friendly products"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Highly trained professionals with years of specialized experience"
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "500+ successful projects and 95%+ customer satisfaction"
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

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-sm">Simple & Transparent</Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              Our <span className="text-primary">4-Step Process</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A proven approach that ensures quality, transparency, and your complete satisfaction at every stage
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <ThumbsUp className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">500+ Projects</span>
              </div>
            </div>

            {/* Progress Bar Visual */}
            <div className="pt-8">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                      {step}
                    </div>
                    {step < 4 && (
                      <div className="w-16 md:w-32 h-1 bg-gradient-to-r from-primary to-primary/50" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work With You</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process ensures quality results while keeping you informed every step of the way
          </p>
        </div>
        <ProcessTimeline />
      </section>

      {/* Quality Standards Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Commitment to Excellence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We don't just meet industry standards—we set them
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <MetricCounter value={500} suffix="+" label="Completed Projects" />
            <MetricCounter value={98} suffix="%" label="On-Time Completion" />
            <MetricCounter value={15} suffix="+" label="Years Experience" />
            <MetricCounter value={95} suffix="%" label="Client Satisfaction" />
          </div>

          {/* Quality Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityStandards.map((standard, index) => {
              const Icon = standard.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{standard.title}</h3>
                    <p className="text-muted-foreground">{standard.description}</p>
                  </CardContent>
                </Card>
              );
            })}
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
