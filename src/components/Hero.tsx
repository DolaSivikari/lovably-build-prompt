import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";
import HeroBackground from "./HeroBackground";
import OptimizedImage from "./OptimizedImage";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const [heroContent, setHeroContent] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchHeroContent = async () => {
      const { data } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .single();
      
      if (data) setHeroContent(data);
    };

    const fetchStats = async () => {
      const { data } = await supabase
        .from('stats')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (data) setStats(data.slice(0, 3)); // Get first 3 for hero badges
    };

    fetchHeroContent();
    fetchStats();
  }, []);

  // Default content for fallback
  const headline = heroContent?.headline || "Building Excellence, Crafting Legacy";
  const subheadline = heroContent?.subheadline || "Ascent Group Construction merges heritage craftsmanship with modern innovation to deliver exceptional painting and exterior finishing services across the GTA. Trusted by homeowners and businesses for over 15 years.";
  const badgeText = heroContent?.badge_text || "Trusted Excellence Since 2009";
  const primaryCtaText = heroContent?.primary_cta_text || "Get Started";
  const primaryCtaUrl = heroContent?.primary_cta_url || "/contact";
  const secondaryCtaText = heroContent?.secondary_cta_text || "View Our Work";
  const secondaryCtaUrl = heroContent?.secondary_cta_url || "/projects";

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={heroImage}
          alt="Modern construction site with steel framework at sunset, showcasing professional commercial building project"
          priority={true}
          width={1920}
          height={1080}
          className="w-full h-full"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        <HeroBackground />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full animate-fade-in">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-glow" />
            <span className="text-primary-foreground font-semibold text-sm tracking-wider uppercase">
              <Sparkles className="inline-block w-4 h-4 mr-1" />
              {badgeText}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
            {headline.split(',')[0]},
            <span className="block text-secondary relative">
              {headline.split(',')[1] || "Crafting Legacy"}
              <span className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent" />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-fade-in">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" variant="secondary" asChild className="group hover:shadow-glow transition-all">
              <Link to={primaryCtaUrl}>
                {primaryCtaText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all" asChild>
              <Link to={secondaryCtaUrl}>{secondaryCtaText}</Link>
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={stat.id} 
                className="flex items-center gap-2 text-primary-foreground group animate-fade-in hover-lift"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                <span className="font-medium">{stat.value}{stat.suffix} {stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-primary-foreground/70">
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
