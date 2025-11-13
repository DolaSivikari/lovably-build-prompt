import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { use3DTilt } from "@/hooks/use3DTilt";

interface VideoHoverCardProps {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  videoUrl?: string; // Optional video URL
  thumbnailUrl?: string; // Fallback thumbnail
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { tiltStyle, handleMouseMove, handleMouseLeave } = use3DTilt({
    maxTilt: 8,
    scale: 1.05,
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && videoUrl) {
      videoRef.current.play().catch(() => {
        // Video play failed, likely due to autoplay policy
      });
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    handleMouseLeave();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Placeholder video/image if not provided
  const hasVideo = !!videoUrl;
  const displayThumbnail = thumbnailUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5";

  return (
    <Link to={`/services/${slug}`}>
      <motion.div
        className="relative h-[400px] group cursor-pointer overflow-hidden rounded-2xl border-2 border-border"
        style={{
          ...tiltStyle,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleLeave}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Video/Image Background */}
        <div className="absolute inset-0">
          {hasVideo ? (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                playsInline
                poster={displayThumbnail}
                onLoadedData={() => setIsVideoLoaded(true)}
                style={{
                  opacity: isHovered && isVideoLoaded ? 1 : 0,
                  transition: "opacity 0.5s",
                }}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              <img
                src={displayThumbnail}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: isHovered && isVideoLoaded ? 0 : 1,
                  transition: "opacity 0.5s",
                }}
              />
            </>
          ) : (
            <img
              src={displayThumbnail}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Play Icon (when video is available and not playing) */}
        {hasVideo && !isHovered && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Play className="w-8 h-8 text-white ml-1" />
          </motion.div>
        )}

        {/* Content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6"
          style={{
            transform: "translateZ(20px)",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.h3
            className="text-2xl font-bold text-white mb-2 drop-shadow-lg"
            animate={{
              y: isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>

          <motion.p
            className="text-sm text-white/90 mb-4 line-clamp-2 drop-shadow"
            animate={{
              opacity: isHovered ? 1 : 0.8,
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {short_description}
          </motion.p>

          <motion.div
            className="flex items-center gap-2 text-white font-semibold"
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <span>Watch More</span>
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{
            x: isHovered ? "100%" : "-100%",
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Glow effect */}
        <div
          className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-accent/30 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"
          style={{
            transform: "translateZ(-10px)",
          }}
        />
      </motion.div>
    </Link>
  );
};
