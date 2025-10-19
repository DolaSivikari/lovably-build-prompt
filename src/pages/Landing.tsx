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

// Simplified animation variants - PCL-inspired
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
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
    <section 
      ref={containerRef as any}
      className="relative w-full h-screen overflow-hidden bg-background"
      aria-labelledby="landing-heading"
    >
      <SEO
        title={`${content.headline} | Ascent Exterior Restoration`}
        description={content.subheadline}
        keywords="commercial painting GTA, exterior restoration, condo painting, property management"
        ogImage="/og-image.jpg"
      />

      {/* Background Image */}
      <OptimizedImage
        src={bgImage}
        alt="Commercial construction project"
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />

      {/* Gradient Overlay - Dramatic vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Content Container */}
      <motion.div
        className="relative z-10 flex h-full items-end pb-16 px-6 lg:pb-24 lg:px-12 max-w-7xl mx-auto"
        variants={contentVariants}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 
            id="landing-heading"
            className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            {content.headline}
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-xl leading-relaxed text-gray-200 md:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {content.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-8">
            <button
              onClick={handleCTAClick}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-construction-orange text-white font-semibold text-lg shadow-lg hover:bg-construction-orange-dark transition-all focus:outline-none focus:ring-4 focus:ring-construction-orange/50 hover:shadow-xl"
            >
              {content.cta_primary_text}
            </button>

            {content.cta_secondary_text && (
              <Link
                to={content.cta_secondary_url}
                className="text-white hover:text-construction-orange transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-construction-orange rounded drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              >
                {content.cta_secondary_text} →
              </Link>
            )}
          </div>

          {/* Trust Bar - Minimal */}
          {(content.projects_count || content.years_in_business) && (
            <div className="flex gap-8 text-sm text-gray-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {content.projects_count && (
                <div>
                  <span className="font-bold text-white">{content.projects_count}+</span> Projects Completed
                </div>
              )}
              {content.years_in_business && (
                <div>
                  <span className="font-bold text-white">{content.years_in_business}</span> Years of Excellence
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Landing;
