import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCountUp } from "@/hooks/useCountUp";
import { Shield, Award, CheckCircle, Users, Building2, TrendingUp } from "lucide-react";

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed", icon: Building2 },
  { value: 15, suffix: "+", label: "Years Experience", icon: Award },
  { value: 98, suffix: "%", label: "Client Retention", icon: TrendingUp },
  { value: 50, suffix: "M+", label: "Revenue Delivered", prefix: "$", icon: CheckCircle },
];

const clients = [
  "Madison Group",
  "PCL Construction",
  "EllisDon",
  "Graham Construction",
  "Bird Construction",
  "Metrus Properties",
  "Tridel",
  "Daniels Corporation"
];

const EnhancedTrustBar = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-muted/30 to-background border-y border-border/50">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const count = useCountUp(stat.value, 2500, isVisible);
            
            return (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-500 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.prefix}{count}{stat.suffix}
                </div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Client Logos */}
        <div className="border-t border-border/50 pt-12">
          <p className="text-center text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted by Leading Developers and Property Managers Across the GTA
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 max-w-5xl mx-auto">
            {clients.map((client, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible 
                    ? "opacity-60 translate-y-0" 
                    : "opacity-0 translate-y-4"
                } hover:opacity-100 hover:scale-110 cursor-default`}
                style={{ transitionDelay: `${400 + index * 75}ms` }}
              >
                <span className="text-lg font-semibold text-foreground/70 whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8 max-w-3xl mx-auto">
            Projects completed for property management firms managing 10,000+ units across the Greater Toronto Area
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTrustBar;
