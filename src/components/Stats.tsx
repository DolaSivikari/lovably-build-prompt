import { useRef } from "react";
import { Users, Building, Award, TrendingUp } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCountUp } from "@/hooks/useCountUp";
import { Card } from "./ui/card";

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  const stats = [
    {
      icon: Building,
      value: 500,
      suffix: "+",
      label: "Projects Completed",
      description: "Across commercial, industrial, and institutional sectors",
    },
    {
      icon: Users,
      value: 200,
      suffix: "+",
      label: "Skilled Professionals",
      description: "Dedicated team of experts committed to excellence",
    },
    {
      icon: Award,
      value: 98,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Proven track record of delivering on promises",
    },
    {
      icon: TrendingUp,
      value: 2,
      suffix: "B+",
      label: "Projects Delivered",
      description: "Total value of successfully completed work",
      prefix: "$",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-20 animate-float" style={{ background: "var(--gradient-orb)" }} />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-15 animate-float" style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.4) 0%, transparent 70%)", animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Proven Track Record
          </h2>
          <p className={`text-lg text-primary-foreground/80 max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Numbers that demonstrate our commitment to excellence and client success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const count = useCountUp(stat.value, 2000, isVisible);
            
            return (
              <Card
                key={stat.label}
                className={`text-center p-8 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 hover:scale-105 hover:shadow-2xl transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-secondary rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <stat.icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-secondary transition-all duration-300 group-hover:scale-110">
                  {stat.prefix}{count}{stat.suffix}
                </div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-primary-foreground/70">{stat.description}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
