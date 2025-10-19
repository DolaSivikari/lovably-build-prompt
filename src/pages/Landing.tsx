import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import SEO from '@/components/SEO';

interface LandingContent {
  headline: string;
  subheadline: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text: string | null;
  cta_secondary_url: string | null;
  background_image: string | null;
}

const Landing = () => {
  const [content, setContent] = useState<LandingContent>({
    headline: 'Building Excellence Across the GTA',
    subheadline: 'Premium painting, restoration & finishing services for commercial, residential & industrial properties',
    cta_primary_text: 'Enter Site',
    cta_primary_url: '/home',
    cta_secondary_text: 'Get Free Estimate',
    cta_secondary_url: '/estimate',
    background_image: null
  });

  useEffect(() => {
    loadLandingContent();
  }, []);

  const loadLandingContent = async () => {
    const { data } = await supabase
      .from('landing_page')
      .select('*')
      .eq('is_active', true)
      .single();

    if (data) {
      setContent({
        headline: data.headline,
        subheadline: data.subheadline,
        cta_primary_text: data.cta_primary_text,
        cta_primary_url: data.cta_primary_url,
        cta_secondary_text: data.cta_secondary_text,
        cta_secondary_url: data.cta_secondary_url,
        background_image: data.background_image
      });
    }
  };

  return (
    <>
      <SEO 
        title="Ascent Group Construction - Premium GTA Contractors"
        description="Leading construction, painting, and restoration services across the Greater Toronto Area. Commercial, residential, and industrial excellence."
        canonical="/"
      />
      
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage-dark via-sage to-sage-light">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-sage-dark/90 via-sage/80 to-cream/50 animate-pulse-slow" />
        
        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cream/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        {/* Content container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-12 animate-fade-in">
            <img 
              src="/src/assets/ascent-logo.png" 
              alt="Ascent Group Construction" 
              className="h-24 sm:h-32 mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up drop-shadow-lg">
            {content.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-cream/90 mb-12 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {content.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              asChild
              size="lg"
              className="bg-terracotta hover:bg-terracotta-dark text-white shadow-2xl hover:shadow-accent transition-all duration-300 text-lg px-8 py-6 group"
            >
              <Link to={content.cta_primary_url}>
                {content.cta_primary_text}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {content.cta_secondary_text && content.cta_secondary_url && (
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-xl text-lg px-8 py-6"
              >
                <Link to={content.cta_secondary_url}>
                  <Phone className="mr-2 h-5 w-5" />
                  {content.cta_secondary_text}
                </Link>
              </Button>
            )}
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-cream/70 text-sm animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terracotta rounded-full" />
              <span>GTA's Premier Contractor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terracotta rounded-full" />
              <span>25+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terracotta rounded-full" />
              <span>Fully Licensed & Insured</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
