import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import logoIntroVideo from "@/assets/ascent-logo-intro.mp4";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if user has seen splash in last 24 hours
    const hasSeenSplash = localStorage.getItem("ascent-splash-seen");
    const lastSeen = hasSeenSplash ? parseInt(hasSeenSplash) : 0;
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (now - lastSeen < twentyFourHours || prefersReducedMotion) {
      // Skip splash if seen recently or user prefers reduced motion
      onComplete();
      return;
    }
  }, [onComplete, prefersReducedMotion]);

  const handleVideoEnd = () => {
    localStorage.setItem("ascent-splash-seen", Date.now().toString());
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 500);
  };

  const handleSkip = () => {
    localStorage.setItem("ascent-splash-seen", Date.now().toString());
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 300);
  };

  if (!isVisible || prefersReducedMotion) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="max-w-full max-h-full w-auto h-auto"
      >
        <source src={logoIntroVideo} type="video/mp4" />
      </video>

      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 px-6 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md hover:bg-accent"
      >
        Skip Intro
      </button>
    </div>
  );
};

export default SplashScreen;
