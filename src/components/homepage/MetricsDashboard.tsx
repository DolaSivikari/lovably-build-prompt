import { useRef, useEffect, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Award, Shield, TrendingUp, Users, Building2, DollarSign, Hammer, CheckCircle, Zap, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, any> = {
  Building2, DollarSign, Hammer, Shield, Users, Award, TrendingUp, CheckCircle, Zap, Star
};

const MetricsDashboard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('stats')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        const formattedMetrics = (data || []).map((stat: any) => ({
          value: stat.value,
          suffix: stat.suffix || '',
          label: stat.label,
          icon: iconMap[stat.icon_name] || TrendingUp,
          description: stat.description || undefined,
          skipCounter: stat.value >= 1000000000
        }));

        setMetrics(formattedMetrics);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="w-16 h-16 rounded-lg mx-auto mb-6 bg-steel-blue/20" />
                <Skeleton className="h-16 w-32 mx-auto mb-3 bg-white/10" />
                <Skeleton className="h-6 w-40 mx-auto bg-white/10" />
              </div>
            ))}
          </div>
        ) : metrics.length === 0 ? (
          <div className="text-center text-white/70 py-12">
            <p>No statistics available at this time.</p>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

interface MetricCardProps {
  metric: {
    value: number;
    suffix?: string;
    label: string;
    icon: any;
    description?: string;
    skipCounter?: boolean;
  };
  isVisible: boolean;
  delay: number;
}

const MetricCard = ({ metric, isVisible, delay }: MetricCardProps) => {
  const count = useCountUp(metric.value, 2000, isVisible);
  const Icon = metric.icon;
  
  // Format display text with counter or static value for large numbers
  const displayText = metric.skipCounter 
    ? `$${(metric.value / 1000000000).toFixed(0)}B+`
    : `${count}${metric.suffix || ''}`;

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
