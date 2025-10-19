import { useRef, useState, useEffect } from "react";
import { Users, Building, Award, TrendingUp } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { supabase } from "@/integrations/supabase/client";
import StatCard from "./StatCard";

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase
        .from('stats')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (data) {
        // Map icon names to actual Lucide icons
        const statsWithIcons = data.map(stat => ({
          ...stat,
          icon: getIconComponent(stat.icon_name)
        }));
        setStats(statsWithIcons);
      }
    };

    fetchStats();
  }, []);

  // Helper to get icon component from name
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
    <section ref={sectionRef} className="w-full py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Proven Track Record
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Numbers that demonstrate our commitment to excellence and client success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.id || stat.label} 
              stat={stat} 
              index={index} 
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
