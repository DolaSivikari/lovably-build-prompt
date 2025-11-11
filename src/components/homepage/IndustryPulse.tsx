import { useEffect, useState, useRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Skeleton } from "@/components/ui/skeleton";

interface PulseMetric {
  id: string;
  metric_name: string;
  current_value: string;
  change_direction: 'up' | 'down' | 'neutral';
  change_percentage?: string;
  unit?: string;
  source: string;
  source_url?: string;
  last_updated: string;
  display_order: number;
}

const IndustryPulse = () => {
  const [metrics, setMetrics] = useState<PulseMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data, error } = await supabase
          .from('industry_pulse_metrics')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setMetrics(data as PulseMetric[]);
          const mostRecent = new Date(data[0].last_updated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          setLastUpdated(mostRecent);
        }
      } catch (error) {
        console.error('Error fetching industry pulse metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6">
            <Skeleton className="h-5 w-5 mb-4" />
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-32 mb-3" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              {getTrendIcon(metric.change_direction)}
              {metric.change_percentage && (
                <span className={`text-sm font-semibold ${
                  metric.change_direction === 'up' ? 'text-green-600 dark:text-green-400' : 
                  metric.change_direction === 'down' ? 'text-red-600 dark:text-red-400' : 
                  'text-muted-foreground'
                }`}>
                  {metric.change_percentage}
                </span>
              )}
            </div>

            <div className="text-3xl font-bold text-foreground mb-2">
              {metric.current_value}
            </div>

            <div className="text-sm font-medium text-foreground/90 mb-3">
              {metric.metric_name}
            </div>

            {metric.unit && (
              <div className="text-xs text-muted-foreground mb-2">
                {metric.unit}
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Source:{' '}
              {metric.source_url ? (
                <a 
                  href={metric.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-primary"
                >
                  {metric.source}
                </a>
              ) : (
                <span>{metric.source}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {lastUpdated && (
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      )}
    </div>
  );
};

export default IndustryPulse;
