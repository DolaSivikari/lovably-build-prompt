import { useState, useEffect, useRef } from "react";
import { Users, Building, Award, TrendingUp, ChevronRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCountUp } from "@/hooks/useCountUp";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useCompanyStats } from "@/hooks/useCompanyStats";

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
  const [expandedStat, setExpandedStat] = useState<string | null>(null);
  const { yearsInBusinessFormatted } = useCompanyStats();

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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Numbers That Speak For Themselves
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Over {yearsInBusinessFormatted} years of delivering exceptional construction services across Ontario
            </p>
          </motion.div>
        </div>

        {/* Interactive Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = getIconComponent(stat.icon_name);
            const isExpanded = expandedStat === stat.id;
            
            return (
              <StatCard
                key={stat.id}
                stat={stat}
                Icon={Icon}
                index={index}
                isVisible={isVisible}
                isExpanded={isExpanded}
                onToggle={() => setExpandedStat(isExpanded ? null : stat.id)}
              />
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Join hundreds of satisfied clients across Ontario
          </p>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View Our Portfolio
            <ChevronRight className="h-5 w-5" />
          </a>
        </motion.div>
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
  isExpanded: boolean;
  onToggle: () => void;
}

const StatCard = ({ stat, Icon, index, isVisible, isExpanded, onToggle }: StatCardProps) => {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <button
        onClick={onToggle}
        className={`w-full text-left bg-card rounded-xl p-6 border-2 transition-all duration-300 ${
          isExpanded
            ? "border-primary shadow-xl shadow-primary/20 scale-105"
            : "border-border hover:border-primary/50 hover:shadow-lg"
        }`}
      >
        {/* Icon with Animated Background */}
        <div className="relative mb-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isExpanded
                ? "bg-primary text-primary-foreground scale-110"
                : "bg-primary/10 text-primary group-hover:bg-primary/20"
            }`}
          >
            <Icon className="h-8 w-8" />
          </div>
          
          {/* Animated Ring */}
          {isVisible && (
            <svg className="absolute inset-0 w-16 h-16 -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${(count / stat.value) * 176} 176`}
                className="text-primary transition-all duration-1000"
              />
            </svg>
          )}
        </div>

        {/* Stat Value */}
        <div className="mb-2">
          <span className="text-4xl md:text-5xl font-bold text-foreground block">
            {count}
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <div className="text-base font-semibold text-foreground mb-1">
          {stat.label}
        </div>

        {/* Description - Expandable */}
        <div
          className={`text-sm text-muted-foreground transition-all duration-300 overflow-hidden ${
            isExpanded ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          {stat.description}
        </div>

        {/* Expand Indicator */}
        <div className="flex items-center gap-1 text-xs text-primary mt-2 font-medium">
          {isExpanded ? "Show less" : "Learn more"}
          <ChevronRight
            className={`h-3 w-3 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
      </button>
    </motion.div>
  );
};

export default AchievementShowcase;
