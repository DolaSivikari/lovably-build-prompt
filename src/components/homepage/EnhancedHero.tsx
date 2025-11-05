import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Building2, Award } from "lucide-react";
import { Button } from "@/ui/Button";
import heroClipchampVideo from "@/assets/hero-clipchamp.mp4";

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
  }
];

const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

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

  const parallaxOffset = scrollY * 0.5;
  const mouseParallaxX = mousePosition.x * 20; // Max 20px movement
  const mouseParallaxY = mousePosition.y * 20; // Max 20px movement

  return (
    <section 
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Background with Parallax Effect */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ 
          transform: `translateY(${parallaxOffset}px) translateX(${mouseParallaxX}px) translateY(${mouseParallaxY}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={slide.poster}
          className="w-full h-full object-cover transition-opacity duration-1000"
          onLoadedData={() => setIsVideoLoaded(true)}
          style={{ opacity: isVideoLoaded ? 1 : 0.7 }}
        >
          <source src={slide.video} type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Content */}
      <div 
        className={`relative z-10 container mx-auto px-4 py-20 transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Stat Callout */}
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">{slide.stat}</span>
              <span className="text-xs text-white/90 font-semibold whitespace-nowrap">{slide.statLabel}</span>
            </div>
            <div className="w-px h-8 bg-accent/50" />
            <Award className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-white">COR Certified</span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            {slide.headline}
          </h1>

          {/* Subheadline */}
          <p 
            className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            {slide.subheadline}
          </p>

          {/* Dual CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up"
            style={{ animationDelay: "0.8s" }}
          >
            <Button asChild size="lg" variant="primary" className="group shadow-accent">
              <Link to={slide.primaryCTA.href} className="gap-2">
                <PrimaryIcon className="h-5 w-5" />
                {slide.primaryCTA.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="secondary" className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm">
              <Link to={slide.secondaryCTA.href}>
                {slide.secondaryCTA.label}
              </Link>
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "1s" }}>
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
                    : 'w-8 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-slide-up" />
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
