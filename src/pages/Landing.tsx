import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';
import { resolveAssetPath } from '@/utils/assetResolver';
import homeHeroVideo from '@/assets/home-hero.mp4';
import heroConstruction from '@/assets/hero-construction.jpg';

interface MenuItem {
  number: string;
  title: string;
  link: string;
  subtext: string;
}

const defaultMenuItems: MenuItem[] = [
  {
    number: "01",
    title: "OUR SERVICES",
    link: "/services",
    subtext: "Painting, Exterior Systems & Specialty Work"
  },
  {
    number: "02",
    title: "WHO WE SERVE",
    link: "/homeowners",
    subtext: "Homeowners, Property Managers & Commercial Clients"
  },
  {
    number: "03",
    title: "ABOUT US",
    link: "/about",
    subtext: "25+ Years of Craftsmanship & Excellence"
  },
  {
    number: "04",
    title: "OUR PROJECTS",
    link: "/projects",
    subtext: "500+ Completed Projects Across the GTA"
  },
  {
    number: "05",
    title: "CONTACT US",
    link: "/contact",
    subtext: "Let's Build Something Exceptional Together"
  }
];

const Landing = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldUseVideo, setShouldUseVideo] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    checkLandingPageStatus();
    
    // Check for user preferences that might prevent video playback
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as any).connection?.saveData;
    
    if (prefersReducedMotion || saveData) {
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

  const checkLandingPageStatus = async () => {
    const { data } = await supabase
      .from('landing_page')
      .select('is_active')
      .eq('is_active', true)
      .single();

    if (!data) {
      navigate('/home');
    } else {
      setIsActive(true);
    }
  };

  const handleNavigate = (url: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(url);
    }, 500);
  };

  if (!isActive) {
    return null;
  }

  return (
    <>
      <SEO 
        title="Ascent Group Construction - Premium GTA Contractors"
        description="Leading construction, painting, and restoration services across the Greater Toronto Area. Commercial, residential, and industrial excellence."
        canonical="/"
      />
      
      <section className={`landing-hero w-full relative transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background Video */}
        <div className="landing-hero__background">
          {shouldUseVideo ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={heroConstruction}
              className="w-full h-full object-cover"
            >
              <source src={homeHeroVideo} type="video/mp4" />
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
            {defaultMenuItems.map((item, index) => (
              <button
                key={item.number}
                onClick={() => handleNavigate(item.link)}
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
                  <span>Explore {item.title.toLowerCase()}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </nav>

          {/* Scroll Indicator */}
          <div className="landing-hero__scroll-indicator">
            <div className="scroll-line" />
            <span className="scroll-text">Scroll to explore</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
