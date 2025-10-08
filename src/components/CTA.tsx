import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Shield, FileText, CheckCircle2 } from "lucide-react";

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
    <section className="py-16 bg-gradient-to-br from-primary via-primary-dark to-charcoal text-cream relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl md:text-2xl text-cream/90 mb-6">
            Professional estimates for projects of any scale — from commercial renovations to institutional upgrades
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-cream/20 rounded-sm">
            <Clock className="w-4 h-4 text-cream" />
            <span className="text-cream font-semibold text-sm">Detailed project assessments with transparent timelines and pricing</span>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-white/5 backdrop-blur-sm border-cream/10 hover:bg-white/10 hover:border-cream/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <feature.icon className="w-10 h-10 text-cream mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-cream/80">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main CTA Card */}
        <Card className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border-2 border-cream/10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Get Your Professional Estimate
              </h3>
              <p className="text-cream/90 text-lg">
                Complete site assessments, detailed project planning, and comprehensive cost breakdowns
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-3 bg-white/5 border border-cream/10 rounded-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-cream flex-shrink-0" />
                  <span className="text-sm font-medium text-white">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-cream hover:bg-white text-charcoal font-bold text-lg px-10 py-6 shadow-xl hover-lift"
                asChild
              >
                <Link to="/estimate" className="flex items-center gap-2">
                  Request Estimate
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-cream/30 bg-white/5 text-cream hover:bg-white/10 hover:border-cream/50 text-lg px-10 py-6 hover-lift"
                asChild
              >
                <Link to="/projects">
                  View Our Work
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
