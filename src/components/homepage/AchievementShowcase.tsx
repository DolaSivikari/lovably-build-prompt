import { useState, useEffect, useRef } from "react";
import { Users, Building, Award, TrendingUp, ChevronRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCountUp } from "@/hooks/useCountUp";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface StatData {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon_name: string;
  display_order: number;
}

const AchievementShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [stats, setStats] = useState<StatData[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase
        .from('stats')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (data) {
        setStats(data as StatData[]);
      }
    };

    fetchStats();
  }, []);

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'Building': Building,
      'Users': Users,
      'Award': Award,
      'TrendingUp': TrendingUp
    };
    return iconMap[iconName] || Building;
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Built on Excellence
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Numbers That Speak For Themselves
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Over 15 years of delivering exceptional construction services across Ontario
            </p>
          </motion.div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = getIconComponent(stat.icon_name);
            
            return (
              <StatCard
                key={stat.id}
                stat={stat}
                Icon={Icon}
                index={index}
                isVisible={isVisible}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Separate StatCard Component
interface StatCardProps {
  stat: StatData;
  Icon: any;
  index: number;
  isVisible: boolean;
}

const StatCard = ({ stat, Icon, index, isVisible }: StatCardProps) => {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl p-6 border-2 border-border"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>

      {/* Stat Value */}
      <div className="mb-2">
        <span className="text-4xl md:text-5xl font-bold text-foreground block">
          {count}
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <div className="text-base font-semibold text-foreground">
        {stat.label}
      </div>
    </motion.div>
  );
};

export default AchievementShowcase;
