import { Building2, Shield, Award, Clock, TrendingUp, Users } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

const gcStats = [
  {
    icon: Clock,
    text: "15+ Years Building Excellence",
  },
  {
    icon: Building2,
    text: "500+ Projects Completed",
  },
  {
    icon: TrendingUp,
    text: "$30M+ Portfolio Value",
  },
  {
    icon: Shield,
    text: "$5M Bonding Capacity",
  },
  {
    icon: Award,
    text: "WSIB & Safety Certified",
  },
  {
    icon: Users,
    text: "Licensed General Contractor",
  },
];

const GCTrustStrip = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef} className="py-12 bg-muted/30 border-y border-border/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {gcStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center gap-3 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground leading-tight">
                  {stat.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GCTrustStrip;
