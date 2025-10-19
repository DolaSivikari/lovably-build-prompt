import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { landingMenuItems } from "@/data/landing-menu";
import heroConstruction from "@/assets/hero-construction.jpg";
import homeHeroVideo from "@/assets/home-hero.mp4";
import { useEffect, useRef, useState } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { motion, useScroll, useTransform } from "framer-motion";

const NumberedLandingHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldUseVideo, setShouldUseVideo] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    // Check for user preferences that might prevent video playback
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as any).connection?.saveData;
    
    setPrefersReducedMotion(reducedMotion);
    
    if (reducedMotion || saveData) {
      setShouldUseVideo(false);
      return;
    }

    // Attempt to play video, fallback to image if it fails
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setShouldUseVideo(false);
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="landing-hero w-full relative min-h-[85vh]">
      {/* Background Image with Parallax - Simplified */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: prefersReducedMotion ? 0 : y }}
      >
        <OptimizedImage
          src={heroConstruction}
          alt="Ascent Group Construction project showcase"
          width={1920}
          height={1080}
          priority={true}
          loading="eager"
          className="w-full h-full"
          objectFit="cover"
        />
        {/* Clean overlay - PCL style */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
      </motion.div>

      {/* Centered Text Block - PCL style */}
      <div className="relative z-10 flex items-center justify-center min-h-[85vh]">
        <nav 
          className="landing-menu max-w-4xl" 
          role="navigation" 
          aria-label="Main landing navigation"
        >
          {landingMenuItems.map((item, index) => (
            <Link
              key={item.number}
              to={item.link}
              className="landing-menu-item group"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
              onTouchStart={() => setActiveItem(item.number)}
              onTouchEnd={() => setActiveItem(null)}
            >
              <span className="landing-menu-item__number">
                {item.number}
              </span>
              <div className="landing-menu-item__content">
                <h2 className="landing-menu-item__title">
                  {item.title}
                </h2>
                <p className="landing-menu-item__subtext">
                  {item.subtext}
                </p>
              </div>

              <div className="landing-menu-item__cta">
                <span>Learn more about {item.title}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </nav>

        {/* Scroll Indicator */}
        <div className="landing-hero__scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default NumberedLandingHero;
