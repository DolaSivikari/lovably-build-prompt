import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Building2, Award, Shield, Cpu, Leaf, Users, Play, Pause, Wrench, Target, Briefcase, Mail, Info } from "lucide-react";
import { Button } from "@/ui/Button";
import heroClipchampVideo from "@/assets/hero-clipchamp.mp4";
import GeometricShapes from "./GeometricShapes";
import HeroTabNavigation from "./HeroTabNavigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useVideoPreloader } from "@/hooks/useVideoPreloader";
import { useSettingsData } from "@/hooks/useSettingsData";
import { supabase } from "@/integrations/supabase/client";

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

const heroSlides = [
  {
    video: heroClipchampVideo,
    poster: "/hero-poster-1.webp",
    stat: "$2B+",
    statLabel: "Total Project Value",
    headline: "Ontario's Trusted General Contractor",
    subheadline: "Delivering commercial, multi-family, and institutional projects on-time and on-budget since 2009",
    primaryCTA: { label: "Submit RFP", icon: FileText, href: "/contact" },
    secondaryCTA: { label: "View Portfolio", href: "/projects" }
  },
  {
    video: heroClipchampVideo,
    poster: "/hero-poster-2.webp",
    stat: "500+",
    statLabel: "Completed Projects",
    headline: "Design-Build Excellence",
    subheadline: "From concept through completion – comprehensive construction management across the GTA",
    primaryCTA: { label: "Request Proposal", icon: Building2, href: "/contact" },
    secondaryCTA: { label: "Our Services", href: "/services" }
  },
  {
    video: heroClipchampVideo,
    poster: "/hero-poster-3.webp",
    stat: "98%",
    statLabel: "Client Satisfaction",
    headline: "Safety-First Construction",
    subheadline: "Zero lost-time incidents across 500+ projects. COR-certified with industry-leading safety standards",
    primaryCTA: { label: "View Safety Record", icon: Award, href: "/safety" },
    secondaryCTA: { label: "Prequalification Package", href: "/prequalification" }
  },
  {
    video: heroClipchampVideo,
    poster: "/hero-poster-4.webp",
    stat: "15+",
    statLabel: "Years of Excellence",
    headline: "Building Tomorrow's Infrastructure",
    subheadline: "Leveraging cutting-edge construction technology and project management software for superior results",
    primaryCTA: { label: "Our Technology", icon: Cpu, href: "/company/equipment-resources" },
    secondaryCTA: { label: "Learn More", href: "/about" }
  },
  {
    video: heroClipchampVideo,
    poster: "/hero-poster-5.webp",
    stat: "LEED",
    statLabel: "Certified Projects",
    headline: "Sustainable Construction Leaders",
    subheadline: "Eco-friendly building practices reducing environmental impact while maximizing energy efficiency",
    primaryCTA: { label: "Green Initiatives", icon: Leaf, href: "/sustainability" },
    secondaryCTA: { label: "Case Studies", href: "/projects" }
  },
  {
    video: heroClipchampVideo,
    poster: "/hero-poster-6.webp",
    stat: "150+",
    statLabel: "Expert Professionals",
    headline: "Powered by Industry Leaders",
    subheadline: "Professional engineers, certified tradespeople, and project managers dedicated to your success",
    primaryCTA: { label: "Meet Our Team", icon: Users, href: "/company/team" },
    secondaryCTA: { label: "Careers", href: "/careers" }
  }
];

const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [videoOpacity, setVideoOpacity] = useState({ a: 1, b: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<'a' | 'b'>('a');
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [landingMenuItems, setLandingMenuItems] = useState<any[]>([]);

  // Fetch homepage settings
  const { data: homepageSettings } = useSettingsData<any>('homepage_settings');

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

  // Video preloader for seamless slide transitions
  const videoUrls = heroSlides.map(slide => slide.video);
  const { getVideoUrl, isPreloaded } = useVideoPreloader({
    videoUrls,
    currentIndex: currentSlide,
    prefetchCount: 2, // Prefetch 2 videos ahead
  });

  // Handle smooth poster-to-video transition
  const handleVideoReady = () => {
    setIsVideoLoaded(true);
    // Fade out poster after video is ready
    setTimeout(() => setShowPoster(false), 100);
  };

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;

  useEffect(() => {
    if (!isPlaying) return;

    autoplayIntervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 7000);

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPlaying]);

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

  // Smooth video loop using crossfade technique
  useEffect(() => {
    const currentVideoRef = activeVideo === 'a' ? videoRefA.current : videoRefB.current;
    const nextVideoRef = activeVideo === 'a' ? videoRefB.current : videoRefA.current;

    if (!currentVideoRef || !nextVideoRef) return;

    const handleTimeUpdate = () => {
      const duration = currentVideoRef.duration;
      const currentTime = currentVideoRef.currentTime;
      
      // Start crossfade when 1 second remaining
      if (duration - currentTime <= 1 && duration - currentTime > 0.5) {
        // Prepare next video
        nextVideoRef.currentTime = 0;
        nextVideoRef.play();
        
        // Crossfade
        if (activeVideo === 'a') {
          setVideoOpacity({ a: 0, b: 1 });
        } else {
          setVideoOpacity({ a: 1, b: 0 });
        }
      }
      
      // Switch active video when crossfade complete
      if (duration - currentTime <= 0.5 && duration - currentTime > 0) {
        setActiveVideo(activeVideo === 'a' ? 'b' : 'a');
      }
    };

    currentVideoRef.addEventListener('timeupdate', handleTimeUpdate);
    return () => currentVideoRef.removeEventListener('timeupdate', handleTimeUpdate);
  }, [activeVideo]);

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
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }

    if (isRightSwipe) {
      // Swipe right - go to previous slide
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const slide = heroSlides[currentSlide];
  const PrimaryIcon = slide.primaryCTA.icon;
  const prefersReducedMotion = useReducedMotion();

  // Use admin-managed content if available, fallback to hardcoded
  const headline = homepageSettings?.headline || slide.headline;
  const subheadline = homepageSettings?.subheadline || slide.subheadline;
  const description = homepageSettings?.hero_description || slide.subheadline;
  const primaryCTA = {
    label: homepageSettings?.cta_primary_text || slide.primaryCTA.label,
    href: homepageSettings?.cta_primary_url || slide.primaryCTA.href,
    icon: PrimaryIcon
  };
  const secondaryCTA = {
    label: homepageSettings?.cta_secondary_text || slide.secondaryCTA.label,
    href: homepageSettings?.cta_secondary_url || slide.secondaryCTA.href
  };

  const parallaxOffset = prefersReducedMotion ? 0 : scrollY * 0.5;
  const mouseParallaxX = prefersReducedMotion ? 0 : mousePosition.x * 20;
  const mouseParallaxY = prefersReducedMotion ? 0 : mousePosition.y * 20;

  return (
    <section 
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Geometric Shapes */}
      <GeometricShapes currentSlide={currentSlide} />
      
      {/* Video Background with Parallax Effect and Smooth Loop */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ 
          transform: `translateY(${parallaxOffset}px) translateX(${mouseParallaxX}px) translateY(${mouseParallaxY}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Video A */}
        <video
          ref={videoRefA}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          onLoadedData={handleVideoReady}
          style={{ opacity: videoOpacity.a }}
        >
          <source src={getVideoUrl(slide.video)} type="video/mp4" />
        </video>
        
        {/* Video B - for seamless crossfade loop */}
        <video
          ref={videoRefB}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoOpacity.b }}
        >
          <source src={getVideoUrl(slide.video)} type="video/mp4" />
        </video>

        {/* Poster Overlay - Fades out when video is ready */}
        {showPoster && (
          <div 
            className="absolute inset-0 z-[1] transition-opacity duration-700 ease-out"
            style={{ opacity: isVideoLoaded ? 0 : 1 }}
          >
            <img
              src={slide.poster}
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
        className={`relative z-10 container mx-auto px-4 py-16 md:py-20 transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Stat Callout */}
          <div 
            className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 mb-6 ${!prefersReducedMotion && 'animate-fade-in'}`}
            style={{ animationDelay: prefersReducedMotion ? "0s" : "0.2s" }}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-[hsl(var(--bg))]">{slide.stat}</span>
              <span className="text-xs text-[hsl(var(--bg))]/90 font-semibold whitespace-nowrap">{slide.statLabel}</span>
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
            {description}
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
            
            <Button asChild size="lg" variant="secondary" className="bg-[hsl(var(--bg))]/10 hover:bg-[hsl(var(--bg))]/20 border-[hsl(var(--bg))]/30 text-[hsl(var(--bg))] backdrop-blur-sm">
              <Link to={secondaryCTA.href}>
                {secondaryCTA.label}
              </Link>
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className={`flex gap-2 justify-center md:justify-start ${!prefersReducedMotion && 'animate-fade-in'}`} style={{ animationDelay: prefersReducedMotion ? "0s" : "1s" }}>
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-12 bg-accent' 
                    : 'w-8 bg-[hsl(var(--bg))]/30 hover:bg-[hsl(var(--bg))]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Tab Navigation - Use landing menu if available */}
      {landingMenuItems.length > 0 ? (
        <div className="absolute bottom-6 md:bottom-24 left-1/2 -translate-x-1/2 z-20 w-full max-w-7xl px-4">
          
          {/* Mobile: Horizontal scrollable premium cards */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
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
          slides={heroSlides} 
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
