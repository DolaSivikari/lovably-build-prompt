import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { landingMenuItems } from "@/data/landing-menu";
import heroConstruction from "@/assets/hero-construction.jpg";
import heroVideo from "@/assets/hero-construction-video.mp4";
import { useEffect, useRef, useState } from "react";
import OptimizedImage from "@/components/OptimizedImage";

const NumberedLandingHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // On mobile, delay video load until after initial paint
    if (isMobile) {
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Desktop: load immediately
      setShouldLoadVideo(true);
    }
  }, [isMobile]);

  return (
    <section className="landing-hero w-full relative">
      {/* Background Video */}
      <div className="landing-hero__background">
        {shouldLoadVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={heroConstruction}
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <OptimizedImage
            src={heroConstruction}
            alt="Ascent Group Construction project showcase"
            width={1920}
            height={1080}
            priority={true}
            loading="eager"
            className="absolute inset-0 w-full h-full"
            objectFit="cover"
          />
        )}
      </div>

      {/* Dark Overlay */}
      <div className="landing-hero__overlay" />

      {/* Numbered Navigation Menu */}
      <div className="landing-hero__content">
        <nav 
          className="landing-menu" 
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
