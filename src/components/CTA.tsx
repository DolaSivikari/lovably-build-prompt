import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Shield, FileText, CheckCircle2 } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const CTA = () => {
  const features = [
    {
      icon: Clock,
      title: "Fast Response Time",
      description: "Detailed estimates delivered within 24-48 hours",
    },
    {
      icon: FileText,
      title: "Detailed Assessments",
      description: "Comprehensive project scope and timeline breakdown",
    },
    {
      icon: Shield,
      title: "Transparent Pricing",
      description: "Clear cost structures with no hidden fees",
    },
  ];

  const benefits = [
    "Licensed & Insured",
    "Safety Certified",
    "Quality Guaranteed",
    "30-Day Warranty",
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Refined Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full mb-4">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">24-48 Hour Response</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Transform Your Vision Into Reality
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional assessments, transparent pricing, and expert craftsmanship for projects of every scale
          </p>
        </div>

        {/* Elegant Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 h-full">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Elegant CTA Card */}
        <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="relative p-12 rounded-3xl bg-card border-2 border-border shadow-2xl">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-secondary/[0.02] rounded-3xl" />
            
            <div className="relative space-y-8">
              {/* Benefits Badges */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Content */}
              <div className="text-center space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  Start Your Project Today
                </h3>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Receive a comprehensive estimate with detailed timelines and transparent cost breakdowns
                </p>
              </div>

              {/* Elegant CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="group h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link 
                    to="/estimate" 
                    className="flex items-center gap-2"
                    onClick={() => trackCTAClick('Request Estimate', 'CTA Section')}
                  >
                    Request Free Estimate
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-base font-semibold border-2 hover:bg-muted/50"
                  asChild
                >
                  <Link 
                    to="/projects"
                    onClick={() => trackCTAClick('View Our Work', 'CTA Section')}
                  >
                    View Our Portfolio
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
