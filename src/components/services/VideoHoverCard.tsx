import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Volume2, VolumeX } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useIsMobile } from "@/hooks/useIsMobile";
import { trackCTAClick } from "@/lib/analytics";

interface VideoHoverCardProps {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

export const VideoHoverCard = ({
  name,
  slug,
  short_description,
  videoUrl,
  thumbnailUrl,
}: VideoHoverCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useIntersectionObserver(cardRef, { threshold: 0.2 });
  
  const { tiltStyle, handleMouseMove, handleMouseLeave } = use3DTilt({
    maxTilt: 10,
    perspective: 1000,
    scale: 1.02,
  });

  // Preload video when card enters viewport
  useEffect(() => {
    if (isInView && videoUrl && videoRef.current) {
      videoRef.current.load();
    }
  }, [isInView, videoUrl]);

  // Handle video playback
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && isVideoLoaded) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isVideoLoaded]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
      if (videoRef.current && isInView) {
        videoRef.current.play().catch(console.error);
      }
    }
  };

  const handleTap = () => {
    if (isMobile && videoRef.current && isInView) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(console.error);
        setIsHovered(true);
      } else {
        videoRef.current.pause();
        setIsHovered(false);
      }
    }
  };

  const handleMouseLeaveCard = () => {
    setIsHovered(false);
    setIsMuted(true);
    handleMouseLeave();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleVideoError = () => {
    setHasVideoError(true);
    console.error("Video failed to load:", videoUrl);
  };

  const handleClick = () => {
    trackCTAClick(name, "video_hover_card");
  };

  return (
    <Link
      to={`/services/${slug}`}
      onClick={handleClick}
      className="block group"
      aria-label={`View ${name} service details`}
    >
      <motion.div
        ref={cardRef}
        className="relative h-[450px] rounded-2xl overflow-hidden border-2 border-border bg-card group"
        style={{
          ...tiltStyle,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveCard}
        onClick={isMobile ? handleTap : undefined}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Video or Image */}
        <div className="relative h-64 overflow-hidden rounded-t-xl">
          {videoUrl && isInView && !hasVideoError ? (
            <>
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered && isVideoLoaded ? "opacity-100" : "opacity-0"
                }`}
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                onLoadedData={() => setIsVideoLoaded(true)}
                onError={handleVideoError}
                aria-label={`Video preview for ${name}`}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              
              {/* Thumbnail (shown before video loads or when not hovered) */}
              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt={name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isHovered && isVideoLoaded ? "opacity-0" : "opacity-100"
                  }`}
                  loading="lazy"
                />
              )}

              {/* Mute/Unmute button */}
              {isHovered && isVideoLoaded && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors z-10"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              )}
            </>
          ) : (
            <img
              src={thumbnailUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5"}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}

          {/* Play indicator */}
          {videoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered && isVideoLoaded ? 0 : 1,
                scale: isHovered && isVideoLoaded ? 0.8 : 1,
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none"
            >
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </motion.div>
          )}

          {/* Loading indicator */}
          {videoUrl && isInView && !isVideoLoaded && isHovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative p-6 bg-card">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ transform: "translateZ(20px)" }}
          />

          {/* Text content */}
          <div className="relative" style={{ transform: "translateZ(40px)" }}>
            <motion.h3
              className="text-2xl font-bold mb-3 text-foreground"
              animate={{
                y: isHovered ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.h3>

            <motion.p
              className="text-muted-foreground mb-4 line-clamp-3"
              animate={{
                opacity: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            >
              {short_description}
            </motion.p>

            {/* Watch more indicator */}
            <motion.div
              className="flex items-center gap-2 text-primary font-semibold"
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -10,
              }}
              transition={{ duration: 0.3 }}
            >
              <span>Watch More</span>
              <Play className="w-4 h-4" fill="currentColor" />
            </motion.div>
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{
            translateX: isHovered ? "200%" : "-100%",
          }}
          transition={{ duration: 0.8 }}
          style={{ transform: "translateZ(60px)" }}
        />
      </motion.div>
    </Link>
  );
};
