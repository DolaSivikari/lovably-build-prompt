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
    <section ref={sectionRef} className="w-full py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Architectural blueprint watermarks */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="absolute top-10 left-10 w-64 h-64" viewBox="0 0 200 200">
          <rect x="10" y="10" width="180" height="180" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="absolute bottom-20 right-20 w-80 h-80" viewBox="0 0 200 200">
          <polygon points="100,10 190,190 10,190" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Proven Track Record
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Numbers that demonstrate our commitment to excellence and client success
          </p>
        </div>

        {/* Timeline-style horizontal layout */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
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
      </div>
    </section>
  );
};

export default Stats;
