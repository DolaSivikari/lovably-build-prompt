import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Award, Shield, TrendingUp, Users } from "lucide-react";

const metrics = [
  {
    value: 2000000000,
    displayValue: "$2B+",
    label: "Total Project Value",
    icon: TrendingUp,
    color: "text-accent",
    skipCounter: true
  },
  {
    value: 500,
    suffix: "+",
    label: "Projects Completed",
    icon: Award,
    color: "text-accent"
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    icon: Users,
    color: "text-accent"
  },
  {
    value: 0,
    label: "Safety Incidents",
    icon: Shield,
    color: "text-accent",
    description: "500+ projects with zero lost-time incidents"
  }
];

const MetricsDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-primary via-primary-dark to-primary border-y border-primary-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              metric={metric} 
              isVisible={isVisible} 
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface MetricCardProps {
  metric: typeof metrics[0];
  isVisible: boolean;
  delay: number;
}

const MetricCard = ({ metric, isVisible, delay }: MetricCardProps) => {
  const count = useCountUp(metric.value, 2000, isVisible);
  const Icon = metric.icon;
  
  // For large values like $2B+, use displayValue instead of counting
  const displayText = (metric as any).skipCounter 
    ? (metric as any).displayValue 
    : `${(metric as any).prefix || ''}${count}${(metric as any).suffix || ''}`;

  return (
    <div 
      className="text-center animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-center mb-3">
        <div className="p-3 rounded-full bg-accent/20 border border-accent/30">
          <Icon className={`w-6 h-6 ${metric.color}`} />
        </div>
      </div>
      
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {displayText}
      </div>
      
      <div className="text-sm md:text-base text-white/90 font-medium">
        {metric.label}
      </div>
      
      {metric.description && (
        <div className="text-xs text-white/70 mt-1 max-w-[200px] mx-auto">
          {metric.description}
        </div>
      )}
    </div>
  );
};

export default MetricsDashboard;
