import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';
import { resolveAssetPath } from '@/utils/assetResolver';

interface LandingContent {
  headline: string;
  subheadline: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text: string | null;
  cta_secondary_url: string | null;
  background_image: string | null;
  is_active: boolean;
  rotating_project_images?: string[];
}

const Landing = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<LandingContent>({
    headline: 'Building Excellence Across the GTA',
    subheadline: 'Premium painting, restoration & finishing services for commercial, residential & industrial properties',
    cta_primary_text: 'Enter Site',
    cta_primary_url: '/home',
    cta_secondary_text: 'Get Free Estimate',
    cta_secondary_url: '/estimate',
    background_image: null,
    is_active: true,
    rotating_project_images: []
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadLandingContent();
  }, []);

  useEffect(() => {
    // Redirect if landing page is disabled
    if (!content.is_active) {
      navigate('/home');
    }
  }, [content.is_active, navigate]);

  useEffect(() => {
    // Rotate background images if available
    if (content.rotating_project_images && content.rotating_project_images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          (prev + 1) % content.rotating_project_images!.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [content.rotating_project_images]);

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
        background_image: data.background_image,
        is_active: data.is_active,
        rotating_project_images: Array.isArray(data.rotating_project_images) 
          ? data.rotating_project_images as string[]
          : []
      });
    }
  };

  const handleCTAClick = (url: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(url);
    }, 500);
  };

  const currentBgImage = content.rotating_project_images && content.rotating_project_images.length > 0
    ? content.rotating_project_images[currentImageIndex]
    : content.background_image;

  return (
    <>
      <SEO 
        title="Ascent Group Construction - Premium GTA Contractors"
        description="Leading construction, painting, and restoration services across the Greater Toronto Area. Commercial, residential, and industrial excellence."
        canonical="/"
      />
      
      <div className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background Image or Gradient */}
        {currentBgImage ? (
          <div className="absolute inset-0">
            <OptimizedImage
              src={resolveAssetPath(currentBgImage) || currentBgImage}
              alt="Ascent Group Construction Background"
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/80 via-primary/70 to-primary-dark/80 animate-fade-in" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light animate-fade-in" />
        )}
        
        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cream/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        {/* Content container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <img 
              src={resolveAssetPath('/src/assets/ascent-logo.png') || '/src/assets/ascent-logo.png'}
              alt="Ascent Group Construction" 
              className="h-24 sm:h-32 mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 opacity-0 animate-slide-up drop-shadow-lg" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            {content.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-cream/90 mb-12 max-w-3xl mx-auto opacity-0 animate-slide-up" style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
            {content.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-slide-up" style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}>
            <Button 
              onClick={() => handleCTAClick(content.cta_primary_url)}
              size="lg"
              className="bg-secondary hover:bg-construction-orange-dark text-white shadow-2xl hover:shadow-accent transition-all duration-300 text-lg px-8 py-6 group animate-pulse"
              style={{ animationDelay: '2s' }}
            >
              {content.cta_primary_text}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {content.cta_secondary_text && content.cta_secondary_url && (
              <Button 
                onClick={() => handleCTAClick(content.cta_secondary_url!)}
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-xl text-lg px-8 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                {content.cta_secondary_text}
              </Button>
            )}
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-cream/70 text-sm opacity-0 animate-fade-in" style={{ animationDelay: '1.9s', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>GTA's Premier Contractor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>25+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Fully Licensed & Insured</span>
            </div>
          </div>
        </div>

        {/* Image indicator dots */}
        {content.rotating_project_images && content.rotating_project_images.length > 1 && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {content.rotating_project_images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`View background image ${index + 1}`}
              />
            ))}
          </div>
        )}

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
