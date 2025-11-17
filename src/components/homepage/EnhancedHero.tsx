import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Building2, Award, Shield, Cpu, Leaf, Users, Play, Pause, Wrench, Target, Briefcase, Mail, Info, Ruler, ClipboardCheck, Hammer, Droplets, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/ui/Button";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCountUp } from "@/hooks/useCountUp";
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

const EnhancedHero = ({ splashComplete = true }: { splashComplete?: boolean }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use enriched hero slides only
  const activeSlides = heroSlides;

  // Helper to detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Mark hero as ready immediately on mount
  useEffect(() => {
    setIsReady(true);
    window.dispatchEvent(new CustomEvent('hero-ready'));
  }, []);

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isPlaying || activeSlides.length === 0 || !splashComplete || prefersReducedMotion) return;

    const initialDelay = setTimeout(() => {
      autoplayIntervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
          setIsTransitioning(false);
        }, 300);
      }, 7000);
    }, 2000);

    return () => {
      clearTimeout(initialDelay);
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPlaying, activeSlides.length, splashComplete, prefersReducedMotion]);

  const handleSlideChange = (index: number) => {
    if (index === currentSlide) return;
    setIsPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Simple video auto-play on mobile
  useEffect(() => {
    const v = videoRef.current;
    if (!v || isMobile) return;
    
    const playVideo = () => {
      v.play().catch(() => {});
    };

    if (v.readyState >= 3) {
      playVideo();
    } else {
      v.addEventListener('loadeddata', playVideo, { once: true });
    }

    return () => {
      v.removeEventListener('loadeddata', playVideo);
    };
  }, [currentSlide, isMobile]);


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
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }

    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    }
  };

  // Reset to slide 0 if currentSlide is out of bounds
  useEffect(() => {
    if (currentSlide >= activeSlides.length && activeSlides.length > 0) {
      setCurrentSlide(0);
    }
  }, [currentSlide, activeSlides.length]);

  const slide = activeSlides[currentSlide];

  // Guard against undefined slide
  if (!slide) return null;

  // Extract slide data
  const headline = slide.headline;
  const subheadline = slide.subheadline;
  const statNumber = slide.stat;
  const statLabel = slide.statLabel;
  const videoUrl = slide.video;
  const posterUrl = slide.poster;
  const primaryCTA = slide.primaryCTA;
  const secondaryCTA = slide.secondaryCTA;
  
  // Count up animation for the stat
  const targetNumber = parseInt(statNumber?.replace(/[^0-9]/g, '') || '0', 10);
  const displayedNumber = useCountUp(targetNumber, 2000, isReady);

  return (
    <section 
      className="relative min-h-[85vh] md:min-h-screen bg-background overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label={`Hero slide ${currentSlide + 1} of ${activeSlides.length}`}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Poster image - always visible */}
        <img
          src={posterUrl}
          alt={headline}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        
        {/* Video layer */}
        {videoUrl && !isMobile && (
          <video
            ref={videoRef}
            key={currentSlide}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-90"
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 h-[85vh] md:h-screen flex items-center">
        <div 
          className={`
            max-w-4xl space-y-4 md:space-y-6 transition-all duration-300
            ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
          `}
        >
          {/* Stat Badge */}
          {statNumber && statLabel && (
            <div 
              className={`flex items-center gap-4 mb-6 md:mb-8 transition-all duration-700 ${
                isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-br from-accent/90 via-primary/90 to-accent/90 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center font-bold text-lg md:text-xl shadow-2xl border-2 border-white/20">
                  {displayedNumber}+
                </div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                  {statNumber}
                </div>
                <div className="text-xs md:text-sm text-white/90 drop-shadow-md">
                  {statLabel}
                </div>
              </div>
            </div>
          )}

          {/* Headline */}
          <h1 
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-2xl transition-all duration-700 ${
              isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-accent/90">
              {headline}
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 drop-shadow-lg max-w-3xl leading-relaxed transition-all duration-700 ${
              isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 transition-all duration-700 ${
              isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <Button
              asChild
              size="lg"
              className="group relative bg-gradient-to-r from-accent via-accent to-primary hover:from-accent/90 hover:via-primary hover:to-accent/90 text-white font-semibold px-6 md:px-8 py-5 md:py-6 rounded-md shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 border-2 border-white/20 min-h-[48px]"
            >
              <Link to={primaryCTA.href}>
                <Building2 className="mr-2 h-5 w-5" />
                {primaryCTA.label}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {secondaryCTA && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold px-6 md:px-8 py-5 md:py-6 rounded-md shadow-xl transition-all duration-300 hover:scale-105 min-h-[48px]"
              >
                <Link to={secondaryCTA.href}>
                  {secondaryCTA.label}
                </Link>
              </Button>
            )}
          </div>

          {/* Slide Indicators */}
          <div 
            className={`flex gap-2 mt-8 md:mt-12 transition-all duration-700 ${
              isReady ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            {activeSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-12 bg-gradient-to-r from-accent to-primary shadow-lg' 
                    : 'w-8 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Play/Pause Button - Desktop only */}
      {!prefersReducedMotion && !isMobile && (
        <button
          onClick={togglePlayPause}
          className="absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-md border border-white/30 text-white p-3 rounded-full shadow-xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </button>
      )}

      {/* Scroll Indicator */}
      {prefersReducedMotion && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-xl">
            <span className="text-xs md:text-sm">Scroll to explore</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default EnhancedHero;
