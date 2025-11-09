import { useEffect, useState } from "react";
import { CHALLENGES, Challenge } from "./challengeMapping";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface IndustryMetric {
  metric_name: string;
  current_value: string;
  change_direction: string | null;
  change_percentage: string | null;
  unit: string | null;
}

interface ChallengeFilterBannerProps {
  activeChallenge: string | null;
  onChallengeClick: (challengeId: string | null) => void;
}

export const ChallengeFilterBanner = ({ 
  activeChallenge, 
  onChallengeClick 
}: ChallengeFilterBannerProps) => {
  const [metrics, setMetrics] = useState<Record<string, IndustryMetric>>({});

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data } = await supabase
        .from("industry_pulse_metrics")
        .select("metric_name, current_value, change_direction, change_percentage, unit")
        .eq("is_active", true);
      
      if (data) {
        const metricsMap = data.reduce((acc, metric) => {
          acc[metric.metric_name] = metric;
          return acc;
        }, {} as Record<string, IndustryMetric>);
        setMetrics(metricsMap);
      }
    };

    fetchMetrics();
  }, []);

  const getTrendIcon = (direction: string | null) => {
    if (direction === "up") return TrendingUp;
    if (direction === "down") return TrendingDown;
    return Minus;
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Market-Aligned Capabilities
        </h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Our services address Ontario's most pressing construction challenges
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CHALLENGES.map((challenge: Challenge) => {
          const Icon = challenge.icon;
          const isActive = activeChallenge === challenge.id;
          const metric = challenge.metricName ? metrics[challenge.metricName] : null;
          const TrendIcon = metric?.change_direction ? getTrendIcon(metric.change_direction) : null;
          
          return (
            <Card
              key={challenge.id}
              onClick={() => onChallengeClick(isActive ? null : challenge.id)}
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                isActive && "ring-2 ring-primary shadow-lg"
              )}
              style={isActive ? { borderColor: challenge.color } : undefined}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${challenge.color}20` }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: challenge.color }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {challenge.label}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {challenge.description}
                  </p>
                </div>
                
                {/* Real-time Metric from Market Intelligence */}
                {metric && (
                  <div className="mt-2 pt-3 border-t border-border/50 w-full">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-bold text-foreground">
                        {metric.current_value}
                        {metric.unit && <span className="text-sm ml-0.5">{metric.unit}</span>}
                      </span>
                      {TrendIcon && metric.change_percentage && (
                        <div className="flex items-center gap-1">
                          <TrendIcon 
                            className="w-3 h-3"
                            style={{ color: challenge.color }}
                          />
                          <span 
                            className="text-xs font-medium"
                            style={{ color: challenge.color }}
                          >
                            {metric.change_percentage}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Market Intelligence
                    </p>
                  </div>
                )}
                
                {isActive && (
                  <div className="text-xs font-semibold text-primary">
                    ✓ Active Filter
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
