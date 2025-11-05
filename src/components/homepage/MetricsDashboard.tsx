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
    skipCounter: true
  },
  {
    value: 500,
    suffix: "+",
    label: "Projects Completed",
    icon: Award,
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    icon: Users,
  },
  {
    value: 0,
    label: "Safety Incidents",
    icon: Shield,
    description: "Zero lost-time incidents across 500+ projects"
  }
];

const MetricsDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section ref={ref} className="py-20 md:py-24 bg-gradient-to-br from-navy-dark via-primary to-navy-dark">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            By The Numbers
          </h2>
          <div className="h-1 w-16 bg-steel-blue mx-auto"></div>
        </div>

        {/* Metrics Grid */}
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
    <div className="text-center">
      {/* Icon with Steel Blue Accent */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-lg bg-steel-blue/20 border border-steel-blue/30 flex items-center justify-center">
          <Icon className="w-8 h-8 text-steel-blue" />
        </div>
      </div>
      
      {/* Metric Value */}
      <div className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
        {displayText}
      </div>
      
      {/* Metric Label */}
      <div className="text-base md:text-lg text-white/90 font-semibold mb-2">
        {metric.label}
      </div>
      
      {/* Description */}
      {metric.description && (
        <div className="text-sm text-white/70 mt-2 max-w-[200px] mx-auto leading-relaxed">
          {metric.description}
        </div>
      )}
    </div>
  );
};

export default MetricsDashboard;
