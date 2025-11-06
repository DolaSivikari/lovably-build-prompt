import { Shield, Award, Clock, CheckCircle, Users, Phone, ThumbsUp } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";
import { useCompanyStats } from "@/hooks/useCompanyStats";

const staticIndicators = [
  {
    icon: Shield,
    text: "Licensed & Insured",
  },
  {
    icon: Award,
    text: "$5M+ Liability Coverage",
  },
  {
    icon: CheckCircle,
    text: "WSIB Compliant",
  },
  {
    icon: Phone,
    text: "24/7 Emergency Service",
  },
  {
    icon: ThumbsUp,
    text: "Satisfaction Guaranteed",
  },
];

const TrustBar = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const { yearsInBusinessFormatted, totalProjectsFormatted } = useCompanyStats();

  // Combine dynamic stats with static indicators
  const trustIndicators = [
    {
      icon: Clock,
      text: `${yearsInBusinessFormatted} Years in Business`,
    },
    ...staticIndicators,
    {
      icon: Users,
      text: `${totalProjectsFormatted} Projects Completed`,
    },
  ];

  return (
    <section ref={sectionRef} className="py-8 bg-muted/30 border-y border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto gap-8 pb-2 scrollbar-hide snap-x snap-mandatory md:justify-center">
          {trustIndicators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 flex-shrink-0 snap-start transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
