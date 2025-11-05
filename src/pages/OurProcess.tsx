import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardCheck, 
  Ruler, 
  Hammer, 
  ShieldCheck, 
  Award, 
  CheckCircle,
  ArrowRight,
  Calendar,
  Users,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { generateHowToSchema } from "@/utils/faq-schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const processSteps = [
  {
    step: "01",
    icon: ClipboardCheck,
    title: "Consultation & Assessment",
    timeframe: "1-2 Days",
    description: "We start with a comprehensive site visit to understand your vision and requirements.",
    details: [
      "Free on-site consultation with project specialist",
      "Detailed surface inspection and condition assessment",
      "Discuss your goals, timeline, and budget expectations",
      "Take measurements and document existing conditions",
      "Identify potential challenges or prep work needed"
    ],
    deliverable: "Detailed proposal with scope, timeline, and transparent pricing"
  },
  {
    step: "02",
    icon: Ruler,
    title: "Planning & Preparation",
    timeframe: "2-5 Days",
    description: "Thorough planning and prep work ensures flawless execution and lasting results.",
    details: [
      "Finalize color selections with professional guidance",
      "Source premium materials from trusted suppliers",
      "Schedule crew and coordinate timeline with you",
      "Prepare work area: protect furniture, floors, landscaping",
      "Surface prep: cleaning, sanding, patching, priming"
    ],
    deliverable: "Signed contract, scheduled start date, and materials on-site"
  },
  {
    step: "03",
    icon: Hammer,
    title: "Expert Execution",
    timeframe: "3-14 Days",
    description: "Our certified craftsmen bring your vision to life with precision and care.",
    details: [
      "Professional application by experienced, background-checked team",
      "Daily progress updates and site cleanup",
      "Quality control inspections at each phase",
      "Work around your schedule (after-hours available)",
      "Minimal disruption to your home or business operations"
    ],
    deliverable: "Beautiful, professionally finished surfaces that exceed expectations"
  },
  {
    step: "04",
    icon: ShieldCheck,
    title: "Quality Assurance & Warranty",
    timeframe: "1 Day",
    description: "We don't finish until you're thrilled with every detail.",
    details: [
      "Comprehensive walkthrough with you to review all work",
      "Touch-ups and adjustments at no extra cost",
      "Complete site cleanup and final inspection",
      "2-10 year warranty documentation provided",
      "Maintenance tips and care instructions"
    ],
    deliverable: "Project sign-off, warranty certificate, and ongoing support"
  }
];

const qualityStandards = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    description: "$5M liability, WSIB compliant, all workers fully covered"
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "2-10 year warranties on all workmanship and materials"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "15+ years experience, certified professionals, background-checked"
  }
];

const faqs = [
  {
    question: "How long does a typical painting project take in the GTA?",
    answer: "Timeline varies by project size and complexity. Residential interiors (2000 sq ft): 3-7 days. Residential exteriors: 5-10 days weather permitting. Condo units: 2-4 days. Commercial projects: 1-4 weeks depending on scope. We provide detailed timelines during consultation and send daily progress updates."
  },
  {
    question: "Can you work evenings or weekends for commercial projects?",
    answer: "Absolutely! We offer flexible scheduling including after-hours (6PM-6AM), weekends, and holiday work for commercial clients to minimize business disruption. After-hours work incurs a 20-30% premium but ensures zero impact on your operations. We've completed hundreds of commercial projects this way."
  },
  {
    question: "What happens if I'm not satisfied with the work?",
    answer: "Your satisfaction is our priority. We conduct a thorough final walkthrough with you, and if anything doesn't meet your expectations, we'll address it immediately at no extra cost. All work comes with our satisfaction guarantee plus written warranties ranging from 2-10 years depending on the service."
  },
  {
    question: "How do you handle weather delays for exterior projects?",
    answer: "For exterior painting, we require temperatures above 10°C and dry conditions for 48 hours before and after application. We monitor forecasts closely and adjust schedules proactively. Weather delays don't extend your contract price - we reschedule to the next suitable window at no extra cost to you."
  },
  {
    question: "What's included in your estimates?",
    answer: "Our detailed estimates include: all materials (primer, paint, supplies), labor, surface preparation, furniture protection, daily cleanup, project management, insurance, and warranty. We provide line-item breakdowns so you understand exactly what you're paying for. No hidden fees, no surprises."
  }
];

const OurProcess = () => {
  // Generate HowTo schema for SEO
  const howToSchema = generateHowToSchema({
    name: "How Ascent Group Construction Delivers Your Project",
    description: "Our proven 4-step construction and painting process ensures quality results from consultation to warranty",
    steps: processSteps.map((step, idx) => ({
      name: step.title,
      text: step.description + " " + step.details.join(". ")
    })),
    totalTime: "P14D"
  });

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Process - 4 Steps to Perfect Results | Ascent Group Construction"
        description="Discover our proven 4-step process for painting and construction projects in the GTA. From consultation to warranty, we ensure quality at every stage with transparent communication."
        keywords="construction process, painting process Toronto, how we work, project timeline, quality assurance"
        structuredData={howToSchema}
      />
      <Navigation />

      <PageHeader
        eyebrow="Our Process"
        title="4 Steps to Exceptional Results"
        description="Our proven process ensures quality, transparency, and complete satisfaction from initial consultation to final warranty"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How We Work" }
        ]}
        variant="with-cta"
        cta={{
          label: "Start Your Project",
          href: "/estimate"
        }}
      />

      {/* Trust Badges */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {qualityStandards.map((standard, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <standard.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{standard.title}</div>
                  <div className="text-xs text-muted-foreground">{standard.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Timeline Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Step-by-Step Excellence</Badge>
            <h2 className="text-4xl font-bold mb-4">Our Proven Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every project follows our time-tested 4-step methodology, refined over 15 years and 500+ successful completions
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute left-[48px] top-[120px] w-0.5 h-[calc(100%+3rem)] bg-gradient-to-b from-primary to-primary/20" />
                )}

                <Card className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary/50">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[auto_1fr] gap-0">
                      {/* Left: Icon & Step Number */}
                      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 md:p-12 flex flex-col items-center justify-center text-center min-w-[200px]">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                          <step.icon className="w-10 h-10 text-secondary" />
                        </div>
                        <div className="text-6xl font-bold opacity-50 mb-2">{step.step}</div>
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {step.timeframe}
                        </Badge>
                      </div>

                      {/* Right: Content */}
                      <div className="p-8 md:p-12">
                        <h3 className="text-3xl font-bold mb-3 text-primary">{step.title}</h3>
                        <p className="text-lg text-muted-foreground mb-6">{step.description}</p>

                        <div className="space-y-3 mb-6">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm leading-relaxed">{detail}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                          <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm mb-1">Deliverable</div>
                            <div className="text-sm text-muted-foreground">{step.deliverable}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Results That Speak for Themselves</h2>
            <p className="text-primary-foreground/90 text-lg">Over 15 years of consistent excellence across the GTA</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-secondary">500+</div>
              <div className="text-primary-foreground/80">Completed Projects</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-secondary">98%</div>
              <div className="text-primary-foreground/80">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-secondary">15+</div>
              <div className="text-primary-foreground/80">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-secondary">97%</div>
              <div className="text-primary-foreground/80">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Common Questions</Badge>
            <h2 className="text-4xl font-bold mb-4">Process FAQs</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about working with us
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-muted/30 rounded-lg px-6 border-2 border-transparent hover:border-primary/20 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Experience the Ascent Difference?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Get a free consultation and detailed quote. No pressure, just honest advice and transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/estimate">
                  Request Proposal
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/blog">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurProcess;