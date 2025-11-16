import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Building2, Award, Shield, Cpu, Leaf, Users, Play, Pause, Wrench, Target, Briefcase, Mail, Info, Ruler, ClipboardCheck, Hammer, Droplets, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/ui/Button";

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const heroReadyRef = useRef(false);

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

  // Enable animations after initial render to prevent flash
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsEnabled(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Enable animations after hero is ready (poster or video loaded)
  useEffect(() => {
    const markHeroReady = () => {
      if (!heroReadyRef.current) {
        heroReadyRef.current = true;
        setIsPageLoaded(true);
        window.dispatchEvent(new CustomEvent('hero-ready'));
      }
    };

    // Fallback timer in case assets are slow
    const fallback = setTimeout(markHeroReady, 800);
    
    return () => clearTimeout(fallback);
  }, []);

  // Preload poster images for current and adjacent slides
  useEffect(() => {
    // Mark hero as ready on mount
    if (!heroReadyRef.current) {
      heroReadyRef.current = true;
      setIsPageLoaded(true);
      window.dispatchEvent(new CustomEvent('hero-ready'));
    }
  }, []);

  const handleVideoReady = () => {
    setIsVideoLoaded(true);
    // Mark hero as ready when first video loads
    if (!heroReadyRef.current) {
      heroReadyRef.current = true;
      setIsPageLoaded(true);
      window.dispatchEvent(new CustomEvent('hero-ready'));
    }
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
      v.play().catch(() => {});
      return;
    }

    setIsVideoLoaded(false);

    const markReady = () => {
      setIsVideoLoaded(true);
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
      className="relative w-full min-h-screen overflow-hidden bg-black" 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="banner"
      aria-label="Hero section"
    >
      
      {/* Video Background */}
      <div 
        className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out"
        style={{ 
          opacity: isFadingOut ? 0.4 : 1,
          aspectRatio: '16/9'
        }}
      >
        <video
          ref={videoRef}
          width={1920}
          height={1080}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterUrl}
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onError={(e) => {
            console.error('Hero video failed to load', { src: videoUrl, error: e });
            setIsVideoLoaded(true);
          }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Mobile-optimized source for faster loading on mobile devices */}
          {isMobile && <source src={videoUrlMobile} type="video/mp4" />}
          {/* Desktop/fallback source */}
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay - Stronger for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85 z-10" />

      {/* Content Overlay - Centered Full Viewport */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="w-full max-w-6xl mx-auto text-center">
          {/* Main Headline - Enterprise Scale Typography */}
          <h1 
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 
                       text-white
                       drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]
                       ${animationsEnabled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
              animation: animationsEnabled ? 'fade-in 0.8s ease-out 0.1s both, scale-in 0.8s ease-out 0.1s both' : 'none',
              lineHeight: '1.05',
              letterSpacing: '-0.025em',
              textShadow: '0 6px 24px rgba(0,0,0,0.9), 0 3px 12px rgba(0,0,0,0.7)'
            }}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/95 bg-clip-text text-transparent">
              {headline}
            </span>
          </h1>

          {/* Subheadline - Clean and Simple */}
          <p 
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-16 text-white/95 
                       max-w-5xl mx-auto font-normal
                       drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]
                       ${animationsEnabled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
              animation: animationsEnabled ? 'fade-in 0.8s ease-out 0.3s both' : 'none',
              lineHeight: '1.3',
              letterSpacing: '-0.01em',
              textShadow: '0 3px 16px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)'
            }}
          >
            {subheadline}
          </p>

          {/* Simplified CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16
                       ${animationsEnabled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
              animation: animationsEnabled ? 'fade-in 0.8s ease-out 0.5s both' : 'none'
            }}
          >
            <Button 
              asChild
              size="lg"
              className="group bg-gradient-to-r from-[hsl(var(--brand-accent))] to-[hsl(24_100%_60%)] 
                       hover:from-[hsl(24_100%_60%)] hover:to-[hsl(var(--brand-accent))]
                       text-white border-0 shadow-[0_8px_24px_rgba(249,115,22,0.4)]
                       hover:shadow-[0_12px_32px_rgba(249,115,22,0.5)]
                       transition-all duration-300 ease-out
                       px-10 py-7 text-xl font-semibold rounded-xl
                       hover:scale-105 hover:-translate-y-1"
            >
              <Link to={primaryCTA.href}>
                <primaryCTA.icon className="mr-3 h-6 w-6" />
                {primaryCTA.label}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button 
              asChild
              size="lg"
              variant="outline"
              className="group backdrop-blur-xl bg-white/10 border-2 border-white/30 
                       text-white hover:bg-white/20 hover:border-white/50
                       shadow-[0_4px_16px_rgba(0,0,0,0.3)]
                       hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)]
                       transition-all duration-300 ease-out
                       px-10 py-7 text-xl font-semibold rounded-xl
                       hover:scale-105 hover:-translate-y-1"
            >
              <Link to={secondaryCTA.href}>
                {secondaryCTA.label}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Slide Indicators - Minimal and Centered */}
          <div className={`flex gap-3 justify-center ${animationsEnabled ? 'animate-fade-in' : ''}`}>
            {activeSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-12 bg-white' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Play/Pause Control */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-8 right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 group"
        aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
        ) : (
          <Play className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-slide-up" />
          </div>
        </div>
      )}
    </section>
  );
};

export default EnhancedHero;
