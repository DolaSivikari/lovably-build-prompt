import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { landingMenuItems } from "@/data/landing-menu";
import heroConstruction from "@/assets/hero-construction.jpg";
import homeHeroVideo from "@/assets/home-hero.mp4";
import { useEffect, useRef, useState } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import FeaturedStoriesCarousel from "@/components/FeaturedStoriesCarousel";

interface LandingContent {
  id?: string;
  headline: string;
  subheadline: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text?: string;
  cta_secondary_url?: string;
  background_image?: string;
  background_image_alt?: string;
  rotating_project_images?: any;
  featured_stories?: any;
  projects_count?: number;
  years_in_business?: number;
  insured?: boolean;
  is_active: boolean;
}

const editorialVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.8,
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    } 
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: 20, scale: 0.9 },
  show: (i: number) => ({ 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      delay: 0.8 + i * 0.12, 
      duration: 0.5,
      type: "spring" as const,
      stiffness: 120
    } 
  }),
};

const rootVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const Landing = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [content, setContent] = useState<LandingContent | null>(null);
  const [shouldUseVideo, setShouldUseVideo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadLandingContent();
    
    // Check user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as any).connection;
    const saveData = connection?.saveData;
    
    if (prefersReducedMotion || saveData) {
      setShouldUseVideo(false);
    }
  }, []);

  // Intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.25 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Video autoplay handling
  useEffect(() => {
    if (!isVisible || !shouldUseVideo) return;
    
    const minVideoWidth = 768;
    if (window.innerWidth < minVideoWidth) {
      setShouldUseVideo(false);
      return;
    }
    
    const video = videoRef.current;
    if (!video) {
      setShouldUseVideo(false);
      return;
    }
    
    const timeout = window.setTimeout(async () => {
      try {
        await video.play();
        setShouldUseVideo(true);
      } catch {
        setShouldUseVideo(false);
      }
    }, 120);
    
    return () => window.clearTimeout(timeout);
  }, [isVisible, shouldUseVideo]);

  const loadLandingContent = async () => {
    try {
      const { data, error } = await supabase
        .from('landing_page')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;

      if (!data || !data.is_active) {
        navigate('/home', { replace: true });
        return;
      }

      setContent(data);
    } catch (error) {
      console.error('Error loading landing content:', error);
      navigate('/home', { replace: true });
    }
  };

  // Rotate background images if available
  useEffect(() => {
    const rotatingImages = Array.isArray(content?.rotating_project_images) 
      ? content.rotating_project_images 
      : [];
    
    if (rotatingImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % rotatingImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [content]);

  const handleCTAClick = () => {
    navigate(content?.cta_primary_url || '/home');
  };

  if (!content) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-background">
        <span className="text-muted-foreground">Loading…</span>
      </section>
    );
  }

  const bgImage = content.background_image || heroConstruction;
  const rotatingImages = Array.isArray(content.rotating_project_images) 
    ? content.rotating_project_images 
    : [];
  const featuredStories = Array.isArray(content.featured_stories)
    ? content.featured_stories
    : [];

  return (
    <AnimatePresence>
      <motion.main
        ref={containerRef as any}
        initial="hidden"
        animate="show"
        exit="exit"
        variants={rootVariants}
        className="w-full min-h-screen relative overflow-hidden bg-background text-foreground"
        aria-labelledby="landing-heading"
        role="main"
      >
        <SEO 
          title={content.headline}
          description={content.subheadline}
        />

        {/* Background layers */}
        <div className="absolute inset-0 -z-20">
          {rotatingImages.length > 0 ? (
            <div className="absolute inset-0">
              {rotatingImages.map((src: string, i: number) => (
                <OptimizedImage
                  key={i}
                  src={src}
                  alt={content.background_image_alt || "Project background"}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    i === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                  width={1920}
                  height={1080}
                />
              ))}
            </div>
          ) : shouldUseVideo ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster={typeof bgImage === "string" ? bgImage : heroConstruction}
              aria-hidden
            >
              <source src={homeHeroVideo} type="video/mp4" />
            </video>
          ) : (
            <OptimizedImage
              src={bgImage}
              alt={content.background_image_alt || "Ascent Group background"}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              priority
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Content grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
            
            {/* Left editorial block */}
            <motion.div 
              variants={editorialVariants}
              className="editorial-block max-w-xl bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <div className="kicker text-sm uppercase tracking-widest text-construction-accent mb-3">
                Exterior Restoration
              </div>
              
              <h1 
                id="landing-heading" 
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-4"
              >
                {content.headline}
              </h1>
              
              <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
                {content.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <motion.button
                  onClick={handleCTAClick}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-md bg-construction-orange text-white font-semibold shadow-lg hover:shadow-2xl hover:bg-construction-orange-dark transition-all focus:outline-none focus:ring-4 focus:ring-construction-orange/50 animate-pulse-glow"
                  aria-label={content.cta_primary_text || "Continue to site"}
                >
                  {content.cta_primary_text}
                </motion.button>

                {content.cta_secondary_text && content.cta_secondary_url && (
                  <Link 
                    to={content.cta_secondary_url} 
                    className="text-sm text-white/90 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    {content.cta_secondary_text}
                  </Link>
                )}
              </div>

              {/* Trust bar with stats */}
              <div className="trust-bar flex flex-wrap gap-8 text-sm text-white/80">
                <div>
                  <strong className="block text-2xl font-bold text-white">
                    {content.projects_count || 500}+
                  </strong>
                  <span>Projects</span>
                </div>
                <div>
                  <strong className="block text-2xl font-bold text-white">
                    {content.years_in_business || 25}+
                  </strong>
                  <span>Years</span>
                </div>
                <div>
                  <strong className="block text-2xl font-bold text-white">
                    {content.insured ? "Insured" : "Licensed"}
                  </strong>
                  <span>Certified</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Numbered nav + featured stories */}
            <div className="nav-and-stories">
              <nav 
                className="landing-menu w-full space-y-2" 
                role="navigation" 
                aria-label="Main landing navigation"
              >
                {landingMenuItems.map((item, index) => (
                  <motion.div 
                    key={item.number} 
                    custom={index} 
                    initial="hidden" 
                    animate="show" 
                    variants={navItemVariants}
                  >
                      <Link
                        to={item.link}
                        className="landing-menu-item group flex items-center gap-4 md:gap-6 py-4 px-4 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/50 hover:border-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-construction-orange"
                        aria-label={`${item.title} — ${item.subtext}`}
                      >
                      <span className="landing-menu-item__number text-2xl md:text-3xl font-bold text-construction-accent flex-shrink-0">
                        {item.number}
                      </span>

                      <div className="landing-menu-item__content flex-1 min-w-0">
                        <h2 className="landing-menu-item__title text-base md:text-lg font-semibold text-white mb-1">
                          {item.title}
                        </h2>
                        <p className="landing-menu-item__subtext text-xs md:text-sm text-white/75">
                          {item.subtext}
                        </p>
                      </div>

                      <div className="landing-menu-item__cta hidden sm:flex items-center gap-2 text-sm text-white/80 flex-shrink-0">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Featured stories carousel */}
              {featuredStories.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-white mb-4">Featured Stories</h2>
                  <FeaturedStoriesCarousel items={featuredStories} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation indicators for rotating images */}
        {rotatingImages.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {rotatingImages.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </motion.main>
    </AnimatePresence>
  );
};

export default Landing;
