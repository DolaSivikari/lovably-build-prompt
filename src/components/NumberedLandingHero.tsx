import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { landingMenuItems } from "@/data/landing-menu";
import heroConstruction from "@/assets/hero-construction.jpg";
import heroPremiumVideo from "@/assets/hero-premium.mp4";
import homeHeroVideo from "@/assets/home-hero.mp4";
import heroClipchampVideo from "@/assets/hero-clipchamp.mp4";
import { useEffect, useRef, useState } from "react";
import OptimizedImage from "@/components/OptimizedImage";

const NumberedLandingHero = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const [shouldUseVideo, setShouldUseVideo] = useState(true);
  const [activeVideo, setActiveVideo] = useState<1 | 2 | 3>(1);
  const [videosLoaded, setVideosLoaded] = useState({ video1: false, video2: false, video3: false });

  useEffect(() => {
    // Check for user preferences that might prevent video playback
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as any).connection?.saveData;
    
    if (reducedMotion || saveData) {
      setShouldUseVideo(false);
      return;
    }

    // Attempt to play first video, fallback to image if it fails
    const video1 = video1Ref.current;
    if (video1) {
      video1.play().catch(() => {
        setShouldUseVideo(false);
      });
    }
  }, []);

  const handleVideo1Loaded = () => {
    setVideosLoaded(prev => ({ ...prev, video1: true }));
  };

  const handleVideo2Loaded = () => {
    setVideosLoaded(prev => ({ ...prev, video2: true }));
  };

  const handleVideo3Loaded = () => {
    setVideosLoaded(prev => ({ ...prev, video3: true }));
  };

  const handleVideo1Ended = () => {
    const video2 = video2Ref.current;
    if (video2) {
      video2.currentTime = 0;
      video2.play();
      setActiveVideo(2);
    }
  };

  const handleVideo2Ended = () => {
    const video3 = video3Ref.current;
    if (video3) {
      video3.currentTime = 0;
      video3.play();
      setActiveVideo(3);
    }
  };

  const handleVideo3Ended = () => {
    const video1 = video1Ref.current;
    if (video1) {
      video1.currentTime = 0;
      video1.play();
      setActiveVideo(1);
    }
  };

  // Pre-buffer next video when current video is 80% complete
  const handleTimeUpdate = (currentVideoNum: 1 | 2 | 3) => {
    const currentVideo = currentVideoNum === 1 ? video1Ref.current : 
                         currentVideoNum === 2 ? video2Ref.current : 
                         video3Ref.current;
    
    if (!currentVideo) return;

    const progress = currentVideo.currentTime / currentVideo.duration;
    
    if (progress >= 0.8) {
      // Pre-buffer next video
      const nextVideo = currentVideoNum === 1 ? video2Ref.current :
                       currentVideoNum === 2 ? video3Ref.current :
                       video1Ref.current;
      
      if (nextVideo && nextVideo.readyState < 3) {
        nextVideo.load();
      }
    }
  };

  return (
    <section className="landing-hero w-full relative">
      {/* Background Video */}
      <div className="landing-hero__background">
        {shouldUseVideo ? (
          <>
            <video
              ref={video1Ref}
              autoPlay
              muted
              playsInline
              preload="auto"
              poster={heroConstruction}
              onLoadedData={handleVideo1Loaded}
              onEnded={handleVideo1Ended}
              onTimeUpdate={() => handleTimeUpdate(1)}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                activeVideo === 1 && videosLoaded.video1 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.6, 1)' }}
            >
              <source src={heroPremiumVideo} type="video/mp4" />
            </video>
            <video
              ref={video2Ref}
              muted
              playsInline
              preload="metadata"
              onLoadedData={handleVideo2Loaded}
              onEnded={handleVideo2Ended}
              onTimeUpdate={() => handleTimeUpdate(2)}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                activeVideo === 2 && videosLoaded.video2 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.6, 1)' }}
            >
              <source src={homeHeroVideo} type="video/mp4" />
            </video>
            <video
              ref={video3Ref}
              muted
              playsInline
              preload="metadata"
              onLoadedData={handleVideo3Loaded}
              onEnded={handleVideo3Ended}
              onTimeUpdate={() => handleTimeUpdate(3)}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                activeVideo === 3 && videosLoaded.video3 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.6, 1)' }}
            >
              <source src={heroClipchampVideo} type="video/mp4" />
            </video>
          </>
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
