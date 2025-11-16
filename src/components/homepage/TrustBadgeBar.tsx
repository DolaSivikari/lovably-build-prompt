import { Shield, Award, Users, Clock, Building2, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const trustBadges = [
  {
    icon: Shield,
    label: "Licensed Business",
    detail: "Registered & Insured",
  },
  {
    icon: Users,
    label: "10-Person Crew",
    detail: "Self-Performed",
  },
  {
    icon: Phone,
    label: "24/7 Emergency",
    detail: "Rapid Response",
  },
  {
    icon: Building2,
    label: "10+ Projects",
    detail: "Completed",
  },
  {
    icon: Clock,
    label: "15+ Years",
    detail: "Experience",
  },
  {
    icon: Award,
    label: "98% Satisfaction",
    detail: "Client Rated",
  },
];

export const TrustBadgeBar = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={cn(
        "py-8 bg-gradient-to-r from-construction-orange/5 via-background to-construction-orange/5 border-y border-border/50",
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center text-center p-4 rounded-lg",
                  "bg-background/50 backdrop-blur-sm",
                  "border border-border/30",
                  "transition-all duration-500 hover:scale-105 hover:border-construction-orange/50",
                  "hover:shadow-lg hover:shadow-construction-orange/10",
                  isVisible ? "opacity-100" : "opacity-0"
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="mb-2 p-2 rounded-full bg-construction-orange/10">
                  <Icon className="w-6 h-6 text-construction-orange" />
                </div>
                <div className="font-semibold text-sm text-foreground">
                  {badge.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {badge.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
