import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Shield, Clock, Users, Award, CheckCircle, FileCheck, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full WSIB coverage, $5M liability insurance, and bonding capacity for large projects",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "98% on-schedule completion rate with proactive project management and communication",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "15+ years in commercial construction with certified project managers and skilled trades",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "Industry-leading warranties, premium materials, and rigorous quality control processes",
  },
];

const certifications = [
  { icon: Shield, name: "WSIB Compliant", issuer: "Ontario WSIB" },
  { icon: Award, name: "COR Certified", issuer: "IHSA" },
  { icon: CheckCircle, name: "ISO 9001", issuer: "Quality Management" },
  { icon: FileCheck, name: "Bonding Capacity", issuer: "$10M+ Available" },
];

const EnhancedWhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Why Choose Ascent Group</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Built on Trust, Delivered with Excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your project deserves a partner who combines technical expertise with unwavering commitment to quality
          </p>
        </div>

        {/* Main Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-7xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Certifications Bar */}
        <div className="border-t border-border/50 pt-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            Certifications & Credentials
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center p-6 rounded-lg border border-border/50 bg-card hover:shadow-md transition-all duration-300 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${400 + index * 75}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-sm mb-2 text-foreground">{cert.name}</h4>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedWhyChooseUs;
