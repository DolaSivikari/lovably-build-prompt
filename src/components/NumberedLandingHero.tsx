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
  const [nextVideo, setNextVideo] = useState<1 | 2 | 3 | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState({ video1: false, video2: false, video3: false });
  
  const CROSSFADE_MS = 1400;
  
  const getNextVideoIndex = (current: 1 | 2 | 3): 1 | 2 | 3 => {
    return current === 1 ? 2 : current === 2 ? 3 : 1;
  };

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

  const startCrossfade = (nextIndex: 1 | 2 | 3) => {
    if (isCrossfading) return;
    
    const nextRef = nextIndex === 1 ? video1Ref.current : 
                    nextIndex === 2 ? video2Ref.current : 
                    video3Ref.current;
    
    if (nextRef) {
      nextRef.currentTime = 0;
      nextRef.play().catch(() => {
        // Fallback: just switch immediately if play fails
        setActiveVideo(nextIndex);
      });
      
      setNextVideo(nextIndex);
      setIsCrossfading(true);
      
      setTimeout(() => {
        setActiveVideo(nextIndex);
        setIsCrossfading(false);
        setNextVideo(null);
      }, CROSSFADE_MS);
    }
  };

  const handleVideo1Ended = () => {
    if (!isCrossfading) {
      startCrossfade(2);
    }
  };

  const handleVideo2Ended = () => {
    if (!isCrossfading) {
      startCrossfade(3);
    }
  };

  const handleVideo3Ended = () => {
    if (!isCrossfading) {
      startCrossfade(1);
    }
  };

  // Start crossfade when current video is 88% complete
  const handleTimeUpdate = (currentVideoNum: 1 | 2 | 3) => {
    const currentVideo = currentVideoNum === 1 ? video1Ref.current : 
                         currentVideoNum === 2 ? video2Ref.current : 
                         video3Ref.current;
    
    if (!currentVideo) return;

    const progress = currentVideo.currentTime / currentVideo.duration;
    
    // Pre-buffer at 80%
    if (progress >= 0.8 && progress < 0.88) {
      const nextIndex = getNextVideoIndex(currentVideoNum);
      const nextRef = nextIndex === 1 ? video1Ref.current :
                     nextIndex === 2 ? video2Ref.current :
                     video3Ref.current;
      
      if (nextRef && nextRef.readyState < 3) {
        nextRef.load();
      }
    }
    
    // Start crossfade at 88%
    if (progress >= 0.88 && !isCrossfading && nextVideo === null) {
      const nextIndex = getNextVideoIndex(currentVideoNum);
      startCrossfade(nextIndex);
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
              className={`w-full h-full object-cover absolute inset-0 transition-all ease-in-out will-change-[opacity,transform] ${
                !isCrossfading 
                  ? activeVideo === 1 && videosLoaded.video1
                    ? 'opacity-100 scale-100 z-[20] duration-[1400ms]'
                    : 'opacity-0 scale-100 z-[10] duration-[1400ms]'
                  : activeVideo === 1
                    ? 'opacity-0 scale-[1.02] z-[20] duration-[1400ms]'
                    : nextVideo === 1
                      ? 'opacity-100 scale-100 z-[30] duration-[1400ms]'
                      : 'opacity-0 scale-100 z-[10] duration-[1400ms]'
              }`}
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
              className={`w-full h-full object-cover absolute inset-0 transition-all ease-in-out will-change-[opacity,transform] ${
                !isCrossfading 
                  ? activeVideo === 2 && videosLoaded.video2
                    ? 'opacity-100 scale-100 z-[20] duration-[1400ms]'
                    : 'opacity-0 scale-100 z-[10] duration-[1400ms]'
                  : activeVideo === 2
                    ? 'opacity-0 scale-[1.02] z-[20] duration-[1400ms]'
                    : nextVideo === 2
                      ? 'opacity-100 scale-100 z-[30] duration-[1400ms]'
                      : 'opacity-0 scale-100 z-[10] duration-[1400ms]'
              }`}
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
              className={`w-full h-full object-cover absolute inset-0 transition-all ease-in-out will-change-[opacity,transform] ${
                !isCrossfading 
                  ? activeVideo === 3 && videosLoaded.video3
                    ? 'opacity-100 scale-100 z-[20] duration-[1400ms]'
                    : 'opacity-0 scale-100 z-[10] duration-[1400ms]'
                  : activeVideo === 3
                    ? 'opacity-0 scale-[1.02] z-[20] duration-[1400ms]'
                    : nextVideo === 3
                      ? 'opacity-100 scale-100 z-[30] duration-[1400ms]'
                      : 'opacity-0 scale-100 z-[10] duration-[1400ms]'
              }`}
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
