import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Building2, Award, Shield, Cpu, Leaf, Users, Play, Pause, Wrench, Target, Briefcase, Mail, Info, Ruler, ClipboardCheck, Hammer, Droplets } from "lucide-react";
import { Button } from "@/ui/Button";
import GeometricShapes from "./GeometricShapes";
import HeroTabNavigation from "./HeroTabNavigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { supabase } from "@/integrations/supabase/client";
import { enrichedHeroSlides } from "@/data/enriched-hero-slides";

// Helper to map icon names to Lucide icons
const getIconComponent = (iconName?: string) => {
  const iconMap: Record<string, any> = {
    FileText, Building2, Award, Shield, Cpu, Leaf, Users, Ruler,
    ClipboardCheck, Hammer, Droplets, Wrench, Target, Briefcase, Mail, Info
  };
  return iconMap[iconName || 'Building2'] || Building2;
};

// Helper to get icon for menu items
const getIconForTitle = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('service')) return Wrench;
  if (titleLower.includes('serve') || titleLower.includes('market')) return Target;
  if (titleLower.includes('about') || titleLower.includes('company')) return Info;
  if (titleLower.includes('project')) return Briefcase;
  if (titleLower.includes('contact')) return Mail;
  return Building2;
};

// Helper to format title for better readability
const formatTitle = (title: string) => {
  return title
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Use enriched hero slides with expanded SEO-optimized descriptions
const heroSlides = enrichedHeroSlides.map(slide => ({
  ...slide,
  primaryCTA: { ...slide.primaryCTA, icon: Building2 }, // Default icon
}));

interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string;
  description?: string;
  stat_number?: string;
  stat_label?: string;
  primary_cta_text: string;
  primary_cta_url: string;
  primary_cta_icon?: string;
  secondary_cta_text?: string;
  secondary_cta_url?: string;
  video_url?: string;
  poster_url?: string;
}

const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [landingMenuItems, setLandingMenuItems] = useState<any[]>([]);
  const mobileCardsRef = useRef<HTMLDivElement>(null);
  const [mobileCardAutoScroll, setMobileCardAutoScroll] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Remove first render flag after component mounts
  useEffect(() => {
    setIsFirstRender(false);
  }, []);


  // Fetch landing menu items
  useEffect(() => {
    const fetchLandingMenu = async () => {
      const { data } = await supabase
        .from('landing_menu_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (data) setLandingMenuItems(data);
    };
    fetchLandingMenu();
  }, []);

  // Auto-scroll mobile cards
  useEffect(() => {
    if (!mobileCardAutoScroll || !mobileCardsRef.current || landingMenuItems.length === 0) return;
    
    const container = mobileCardsRef.current;
    let currentIndex = 0;
    
    const scrollInterval = setInterval(() => {
      if (container) {
        const cardWidth = 200; // 192px (w-48) + 12px gap
        currentIndex = (currentIndex + 1) % landingMenuItems.length;
        
        container.scrollTo({
          left: currentIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }, 3000); // Auto-scroll every 3 seconds
    
    return () => clearInterval(scrollInterval);
  }, [mobileCardAutoScroll, landingMenuItems]);

  // Use enriched hero slides only
  const activeSlides = heroSlides;

  // Handle smooth poster-to-video transition
  const handleVideoReady = () => {
    setIsVideoLoaded(true);
    // Fade out poster after video is ready
    setTimeout(() => setShowPoster(false), 100);
  };

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;

  useEffect(() => {
    if (!isPlaying || activeSlides.length === 0) return;

    autoplayIntervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 7000);

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPlaying, activeSlides.length, currentSlide]);

  const handleSlideChange = (index: number) => {
    setIsPlaying(false); // Pause autoplay when user interacts
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Reset video loaded state when slide changes
  useEffect(() => {
    // If video is already ready to play, don't show poster
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
      setShowPoster(false);
    } else {
      setIsVideoLoaded(false);
      setShowPoster(true);
      
      if (videoRef.current) {
        const handleCanPlay = () => {
          setIsVideoLoaded(true);
          setTimeout(() => setShowPoster(false), 100);
        };
        
        videoRef.current.addEventListener('canplaythrough', handleCanPlay);
        return () => videoRef.current?.removeEventListener('canplaythrough', handleCanPlay);
      }
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized position (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - go to next slide
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        setIsTransitioning(false);
      }, 500);
    }

    if (isRightSwipe) {
      // Swipe right - go to previous slide
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  // Reset to slide 0 if currentSlide is out of bounds
  useEffect(() => {
    if (currentSlide >= activeSlides.length && activeSlides.length > 0) {
      setCurrentSlide(0);
    }
  }, [currentSlide, activeSlides.length]);

  const slide = activeSlides[currentSlide];
  const prefersReducedMotion = useReducedMotion();

  // Guard against undefined slide
  if (!slide) return null;

  // Extract slide data from enriched slides
  const headline = slide.headline;
  const subheadline = slide.subheadline;
  const statNumber = slide.stat;
  const statLabel = slide.statLabel;
  const videoUrl = slide.video;
  const posterUrl = slide.poster;
  const PrimaryIcon = slide.primaryCTA.icon;
  const primaryCTA = slide.primaryCTA;
  const secondaryCTA = slide.secondaryCTA;

  const parallaxOffset = prefersReducedMotion ? 0 : scrollY * 0.5;
  const mouseParallaxX = prefersReducedMotion ? 0 : mousePosition.x * 20;
  const mouseParallaxY = prefersReducedMotion ? 0 : mousePosition.y * 20;

  return (
    <section 
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Geometric Shapes */}
      <GeometricShapes currentSlide={currentSlide} />
      
      {/* Video Background with Parallax Effect */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ 
          transform: `translateY(${parallaxOffset}px) translateX(${mouseParallaxX}px) translateY(${mouseParallaxY}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={handleVideoReady}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Poster Overlay - Fades out when video is ready */}
        {showPoster && (
          <div 
            className="absolute inset-0 z-[1] transition-opacity duration-700 ease-out"
            style={{ opacity: isVideoLoaded ? 0 : 1 }}
          >
            <img
              src={posterUrl}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        )}

        {/* Loading Indicator */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 z-[2] flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--ink))]/70 via-[hsl(var(--ink))]/60 to-[hsl(var(--ink))]/80" />

      {/* Content */}
        <div 
          className={`relative z-10 container mx-auto px-4 py-16 md:py-20 ${
            !isFirstRender ? 'transition-opacity duration-1000' : ''
          } ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
        <div className="max-w-5xl mx-auto">
          {/* Stat Callout */}
          <div 
            className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 mb-6 ${!prefersReducedMotion && 'animate-fade-in'}`}
            style={{ animationDelay: prefersReducedMotion ? "0s" : "0.2s" }}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-[hsl(var(--bg))]">{statNumber}</span>
              <span className="text-xs text-[hsl(var(--bg))]/90 font-semibold whitespace-nowrap">{statLabel}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-[hsl(var(--brand-accent))] px-2 sm:px-3 py-1 rounded-full">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(var(--bg))]" />
              <span className="text-xs sm:text-sm font-semibold text-[hsl(var(--bg))]">COR Certified</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[hsl(var(--bg))] mb-6 leading-tight ${!prefersReducedMotion && 'animate-slide-up'}`}
            style={{ 
              animationDelay: prefersReducedMotion ? "0s" : '0.2s',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)'
            }}
          >
            {headline}
          </h1>
          <p 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-[hsl(var(--bg))]/95 mb-10 max-w-3xl leading-relaxed ${!prefersReducedMotion && 'animate-slide-up'}`}
            style={{ animationDelay: prefersReducedMotion ? "0s" : "0.6s" }}
          >
            {subheadline}
          </p>

          {/* Dual CTAs */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 mb-12 ${!prefersReducedMotion && 'animate-slide-up'}`}
            style={{ animationDelay: prefersReducedMotion ? "0s" : "0.8s" }}
          >
            <Button asChild size="lg" variant="primary" className="group shadow-accent">
              <Link to={primaryCTA.href} className="gap-2">
                <primaryCTA.icon className="h-5 w-5" />
                {primaryCTA.label}
                <ArrowRight className="h-4 w-4 hover-translate-arrow" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm">
              <Link to={secondaryCTA.href}>
                {secondaryCTA.label}
              </Link>
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className={`flex gap-2 justify-center md:justify-start ${!prefersReducedMotion && 'animate-fade-in'}`} style={{ animationDelay: prefersReducedMotion ? "0s" : "1s" }}>
            {activeSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-12 bg-accent' 
                      : 'w-6 bg-white/50 hover:bg-white/70'
                  }`}
                />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Tab Navigation - Use landing menu if available */}
      {landingMenuItems.length > 0 ? (
        <div className="absolute bottom-6 md:bottom-24 left-1/2 -translate-x-1/2 z-20 w-full max-w-7xl px-4">
          
          {/* Mobile: Horizontal scrollable premium cards with auto-scroll */}
          <div 
            ref={mobileCardsRef}
            className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 scroll-smooth"
            onTouchStart={() => setMobileCardAutoScroll(false)}
            onMouseDown={() => setMobileCardAutoScroll(false)}
          >
            <div className="flex gap-3 pb-4">
              {landingMenuItems.map((item) => {
                const Icon = getIconForTitle(item.title);
                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="flex-shrink-0 w-48 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all active:scale-95"
                    style={{ touchAction: 'manipulation' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-md bg-accent/20">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-xs font-bold text-white/60">{item.number || '—'}</span>
                    </div>
                    <div className="text-sm font-bold text-white mb-1 leading-tight">
                      {formatTitle(item.title)}
                    </div>
                    <div className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                      {item.subtext}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Desktop: Enhanced button layout */}
          <div className="hidden md:flex gap-4 justify-center flex-wrap">
            {landingMenuItems.map((item) => (
              <Link 
                key={item.id}
                to={item.link} 
                className="relative px-6 py-3 text-base font-semibold transition-all duration-300 text-white/90 hover:text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 after:scale-x-0"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <HeroTabNavigation 
          slides={activeSlides} 
          currentSlide={currentSlide} 
          onSlideChange={handleSlideChange} 
        />
      )}

      {/* Play/Pause Control */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-8 right-8 z-20 w-12 h-12 rounded-full bg-[hsl(var(--bg))]/10 hover:bg-[hsl(var(--bg))]/20 backdrop-blur-md border border-[hsl(var(--bg))]/30 flex items-center justify-center transition-all duration-300 group"
        aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-[hsl(var(--bg))] group-hover:scale-110 transition-transform" />
        ) : (
          <Play className="h-5 w-5 text-[hsl(var(--bg))] group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[hsl(var(--bg))]/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-[hsl(var(--bg))]/60 rounded-full animate-slide-up" />
          </div>
        </div>
      )}
    </section>
  );
};

export default EnhancedHero;
