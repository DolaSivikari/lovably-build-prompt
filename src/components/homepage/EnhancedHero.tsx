import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Building2, Award, Shield, Cpu, Leaf, Users, Play, Pause, Wrench, Target, Briefcase, Mail, Info, Ruler, ClipboardCheck, Hammer, Droplets, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/ui/Button";

import HeroTabNavigation from "./HeroTabNavigation";
import HeroNavigationCards from "./HeroNavigationCards";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useVideoPreloader } from "@/hooks/useVideoPreloader";
import { useCountUp } from "@/hooks/useCountUp";
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
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [landingMenuItems, setLandingMenuItems] = useState<any[]>([]);
  const mobileCardsRef = useRef<HTMLDivElement>(null);
  const [mobileCardAutoScroll, setMobileCardAutoScroll] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [preloadedPosters, setPreloadedPosters] = useState<Set<string>>(new Set());

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

  // Extract video URLs and set up preloading
  const videoUrls = activeSlides.map(slide => slide.video);
  const { getVideoUrl, isPreloaded } = useVideoPreloader({
    videoUrls,
    currentIndex: currentSlide,
    prefetchCount: 2 // Preload current + 2 ahead + 1 behind
  });

  // Helper to detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Preload poster images for current and adjacent slides
  useEffect(() => {
    const postersToPreload: string[] = [];
    
    // Current slide poster (highest priority)
    if (activeSlides[currentSlide]?.poster) {
      postersToPreload.push(activeSlides[currentSlide].poster);
    }
    
    // Next slide poster
    const nextIndex = (currentSlide + 1) % activeSlides.length;
    if (activeSlides[nextIndex]?.poster) {
      postersToPreload.push(activeSlides[nextIndex].poster);
    }
    
    // Previous slide poster
    const prevIndex = (currentSlide - 1 + activeSlides.length) % activeSlides.length;
    if (activeSlides[prevIndex]?.poster) {
      postersToPreload.push(activeSlides[prevIndex].poster);
    }

    // Preload images
    postersToPreload.forEach(posterUrl => {
      if (!preloadedPosters.has(posterUrl)) {
        const img = new Image();
        img.src = posterUrl;
        img.onload = () => {
          setPreloadedPosters(prev => new Set(prev).add(posterUrl));
        };
      }
    });
  }, [currentSlide, activeSlides, preloadedPosters]);

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
      setIsFadingOut(true);
      setIsTransitioning(true);
      
      // Fade out (300ms) -> Change content (instant) -> Fade in (300ms)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        setIsFadingOut(false);
      }, 300);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 7000);

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPlaying, activeSlides.length, currentSlide]);

  const handleSlideChange = (index: number) => {
    if (index === currentSlide) return; // Don't transition to the same slide
    
    setIsPlaying(false); // Pause autoplay when user interacts
    setIsFadingOut(true);
    setIsTransitioning(true);
    
    // Fade out (300ms) -> Change content (instant) -> Fade in (300ms)
    setTimeout(() => {
      setCurrentSlide(index);
      setIsFadingOut(false);
    }, 300);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Reset video loaded state when slide changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // If video is already ready to play, show it immediately
    if (v.readyState >= 3) {
      setIsVideoLoaded(true);
      setShowPoster(false);
      v.play().catch(() => {});
      return;
    }

    setIsVideoLoaded(false);
    setShowPoster(true);

    const markReady = () => {
      setIsVideoLoaded(true);
      setTimeout(() => setShowPoster(false), 100);
      v.play().catch(() => {});
    };

    v.addEventListener('loadedmetadata', markReady);
    v.addEventListener('loadeddata', markReady);

    return () => {
      v.removeEventListener('loadedmetadata', markReady);
      v.removeEventListener('loadeddata', markReady);
    };
  }, [currentSlide]);


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
  const videoUrl = getVideoUrl(slide.video); // Use preloaded URL
  const videoUrlMobile = slide.video.replace('.mp4', '-mobile.mp4');
  const posterUrl = slide.poster;
  const PrimaryIcon = slide.primaryCTA.icon;
  const primaryCTA = slide.primaryCTA;
  const secondaryCTA = slide.secondaryCTA;

  return (
    <section 
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Video Background */}
      <div 
        className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out"
        style={{ 
          opacity: isFadingOut ? 0.4 : 1
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterUrl}
          onLoadedData={handleVideoReady}
          onError={(e) => {
            console.error('Hero video failed to load', { src: videoUrl, error: e });
            setIsVideoLoaded(true);
            setShowPoster(true);
          }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Mobile-optimized source for faster loading on mobile devices */}
          {isMobile && <source src={videoUrlMobile} type="video/mp4" />}
          {/* Desktop/fallback source */}
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
              loading={preloadedPosters.has(posterUrl) ? "eager" : "lazy"}
              fetchPriority={preloadedPosters.has(posterUrl) ? "high" : "low"}
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
            !isFirstRender ? 'transition-opacity duration-300 ease-in-out' : ''
          } ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
        >
        <div className="max-w-5xl mx-auto">
          {/* Floating Stat Mini-Cards with Glassmorphism */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
            {/* Main Stat Card */}
            <div 
              className={`group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-4 shadow-2xl hover:shadow-accent/20 hover:scale-105 transition-all duration-300 ${!prefersReducedMotion && 'animate-fade-in'}`}
              style={{ animationDelay: prefersReducedMotion ? "0s" : "0.1s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-accent" />
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">
                    {statNumber}
                  </div>
                  <div className="text-xs text-white/80 font-medium whitespace-nowrap">{statLabel}</div>
                </div>
              </div>
            </div>

            {/* COR Certified Badge */}
            <div 
              className={`group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-4 shadow-2xl hover:shadow-green-500/20 hover:scale-105 transition-all duration-300 ${!prefersReducedMotion && 'animate-fade-in'}`}
              style={{ animationDelay: prefersReducedMotion ? "0s" : "0.2s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <span className="text-sm font-bold text-white">COR Certified</span>
              </div>
            </div>

            {/* Zero Incidents Badge */}
            <div 
              className={`group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-4 shadow-2xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 ${!prefersReducedMotion && 'animate-fade-in'}`}
              style={{ animationDelay: prefersReducedMotion ? "0s" : "0.3s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <CheckCircle2 className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-sm font-bold text-white whitespace-nowrap">Zero Incidents</span>
              </div>
            </div>
          </div>

          {/* Main Headline with Gradient Text */}
          <h1 
            className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1] ${!prefersReducedMotion && 'animate-fade-in'}`}
            style={{ 
              animationDelay: prefersReducedMotion ? "0s" : '0.4s',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)'
            }}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {headline.split(' ').map((word, i) => {
                // Apply gradient to numbers and key words
                const isNumber = /\d/.test(word) || word.includes('$') || word.includes('%');
                const isKeyWord = ['Zero', 'Prime', 'Emergency', 'Certified'].includes(word);
                
                if (isNumber || isKeyWord) {
                  return (
                    <span 
                      key={i} 
                      className="bg-gradient-to-r from-accent via-accent/90 to-accent/70 bg-clip-text text-transparent font-black"
                    >
                      {word}{' '}
                    </span>
                  );
                }
                return word + ' ';
              })}
            </span>
          </h1>
          <p 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed font-medium ${!prefersReducedMotion && 'animate-fade-in'}`}
            style={{ 
              animationDelay: prefersReducedMotion ? "0s" : "0.6s",
              textShadow: '0 2px 15px rgba(0,0,0,0.4)'
            }}
          >
            {subheadline}
          </p>

          {/* Enhanced CTAs with Staggered Animation */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 mb-12 ${!prefersReducedMotion && 'animate-fade-in'}`}
            style={{ animationDelay: prefersReducedMotion ? "0s" : "0.8s" }}
          >
            <Button asChild size="lg" variant="primary" className="group relative overflow-hidden shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all duration-300">
              <Link to={primaryCTA.href} className="gap-2">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <primaryCTA.icon className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{primaryCTA.label}</span>
                <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white backdrop-blur-xl shadow-xl transition-all duration-300">
              <Link to={secondaryCTA.href}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{secondaryCTA.label}</span>
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

      {/* Hero Navigation Cards - Unified Design */}
      {landingMenuItems.length > 0 ? (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-7xl px-4">
          <HeroNavigationCards 
            items={landingMenuItems.map((item, index) => ({
              id: item.id,
              title: formatTitle(item.title),
              description: item.subtext || '',
              icon: getIconForTitle(item.title),
              url: item.link,
              badge: item.badge,
              display_order: index
            }))}
          />
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
