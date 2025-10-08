import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { 
  ClipboardCheck, 
  Hammer, 
  Paintbrush, 
  CheckCircle, 
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Sparkles
} from "lucide-react";

const OurProcess = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  
  const processSteps = [
    {
      step: 1,
      icon: ClipboardCheck,
      title: "Pre-Project Planning",
      duration: "1-3 days",
      description: "We start with understanding your vision and requirements",
      details: [
        "Initial consultation (phone or in-person)",
        "Site inspection and measurements",
        "Detailed project scope discussion",
        "Material selection and color consultation",
        "Transparent pricing with written estimate",
        "Timeline and scheduling planning"
      ],
      deliverables: ["Written estimate", "Project timeline", "Material samples"]
    },
    {
      step: 2,
      icon: Hammer,
      title: "Preparation & Protection",
      duration: "1-2 days",
      description: "Proper preparation is the foundation of quality results",
      details: [
        "Complete furniture and floor protection",
        "Surface cleaning and degreasing",
        "Crack filling and patching",
        "Sanding and surface smoothing",
        "Priming of all surfaces",
        "Masking and taping precision work"
      ],
      deliverables: ["Protected space", "Prepped surfaces", "Quality inspection"]
    },
    {
      step: 3,
      icon: Paintbrush,
      title: "Professional Execution",
      duration: "Varies by project",
      description: "Expert application with attention to every detail",
      details: [
        "Premium materials and tools",
        "Multiple coats for durability",
        "Consistent application techniques",
        "Quality control at each stage",
        "Daily progress updates",
        "Clean workspace maintained"
      ],
      deliverables: ["Professional finish", "Daily updates", "Photo documentation"]
    },
    {
      step: 4,
      icon: CheckCircle,
      title: "Completion & Quality Assurance",
      duration: "1 day",
      description: "We don't leave until you're completely satisfied",
      details: [
        "Thorough final inspection",
        "Touch-ups and corrections",
        "Complete cleanup and removal",
        "Final walkthrough with client",
        "Warranty documentation",
        "Care and maintenance instructions"
      ],
      deliverables: ["Final inspection", "Warranty papers", "Maintenance guide"]
    }
  ];

  const qualityStandards = [
    {
      icon: Shield,
      title: "Quality Materials",
      description: "We use only premium, industry-leading paints and materials with manufacturer warranties"
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "98% of our projects are completed on or ahead of schedule without compromising quality"
    },
    {
      icon: Users,
      title: "Skilled Craftsmen",
      description: "Our team brings decades of combined experience and ongoing training in latest techniques"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Our Process"
        description="Discover how Ascent Group Construction delivers exceptional results through our proven 4-step process - from consultation to completion with guaranteed satisfaction."
        keywords="construction process, painting process, project timeline, quality assurance, GTA contractor"
      />
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full animate-fade-in">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-secondary font-semibold text-sm tracking-wider uppercase">How We Work</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">Our Proven Process</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              From initial consultation to final walkthrough, we follow a systematic approach 
              that ensures quality, transparency, and your complete satisfaction at every step.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <div 
                  key={step.step} 
                  className={`mb-16 last:mb-0 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Step Info */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                          <step.icon className="w-8 h-8 text-secondary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                            Step {step.step}
                          </div>
                          <h2 className="text-3xl font-bold text-primary">{step.title}</h2>
                        </div>
                      </div>
                      
                      <div className="mb-4 inline-block px-3 py-1 bg-secondary/10 rounded-full">
                        <span className="text-sm font-semibold text-primary">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {step.duration}
                        </span>
                      </div>

                      <p className="text-lg text-muted-foreground mb-6">
                        {step.description}
                      </p>

                      <div className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-border">
                        <div className="text-sm font-semibold text-muted-foreground mb-3">
                          You Receive:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((deliverable, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Visual Card */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <Card className="overflow-hidden shadow-xl border-2 hover:border-primary/30 hover:scale-105 transition-all duration-500 group">
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-12 relative">
                          {/* Decorative corner accent */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                          
                          <div className="text-center relative z-10">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                              <div className="text-5xl font-bold text-primary">
                                {step.step}
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                            <div className="w-16 h-1 bg-secondary mx-auto mb-6" />
                            <p className="text-muted-foreground">
                              This phase ensures {step.title.toLowerCase()} meets our high standards and your expectations.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="flex justify-center my-8">
                      <div className="animate-pulse">
                        <ArrowRight className="w-8 h-8 text-primary animate-bounce" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Quality Standards</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every project is backed by our commitment to excellence and attention to detail
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {qualityStandards.map((standard, index) => (
                <Card 
                  key={index} 
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <standard.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{standard.title}</h3>
                    <p className="text-muted-foreground">{standard.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your vision and show you exactly how we'll bring it to life
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" variant="secondary" className="text-lg">
                  Get Free Estimate
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg">
                  <Phone className="mr-2 w-5 h-5" />
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

export default OurProcess;
