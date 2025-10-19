import { useRef, useState, useEffect } from "react";
import { Users, Building, Award, TrendingUp } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCountUp } from "@/hooks/useCountUp";
import { Card } from "./ui/card";
import { supabase } from "@/integrations/supabase/client";
import dynamicIconImports from 'lucide-react/dynamicIconImports';

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
            {stats.map((stat, index) => {
              const count = useCountUp(stat.value, 2000, isVisible);
              
              return (
                <div
                  key={stat.label}
                  className={`relative text-center group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  {/* Circular progress ring with floating effect */}
                  <div className="relative inline-flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {/* Outer glow */}
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ width: '160px', height: '160px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                    
                    {/* Progress ring */}
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="8"
                        opacity="0.2"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - (isVisible ? 0.75 : 0))}`}
                        className="transition-all duration-2000 ease-out"
                        style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))' }}
                      />
                    </svg>
                    
                    {/* Icon integrated into ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                        <div className="relative bg-card border-2 border-primary/50 rounded-full p-5 shadow-xl group-hover:shadow-2xl group-hover:border-primary transition-all duration-500">
                          <stat.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animated number with 3D effect */}
                  <div 
                    className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-br from-primary via-primary to-primary/70 bg-clip-text text-transparent group-hover:scale-110 transition-all duration-500"
                    style={{ 
                      textShadow: '0 2px 20px hsl(var(--primary) / 0.3)',
                      transform: isVisible ? 'none' : 'rotateX(90deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {count}{stat.suffix}
                  </div>

                  <div className="text-xl font-semibold mb-2 text-foreground">{stat.label}</div>
                  <p className="text-sm text-muted-foreground max-w-[200px] mx-auto leading-relaxed">{stat.description}</p>

                  {/* Connection dot on timeline */}
                  <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50 group-hover:scale-150 transition-transform duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
