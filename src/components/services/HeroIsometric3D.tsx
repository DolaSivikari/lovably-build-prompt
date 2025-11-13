import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Layers, Hammer, Shield, Zap, Wrench, Sparkles, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface BuildingSection {
  id: string;
  name: string;
  icon: any;
  color: string;
  position: string;
  description: string;
  slug: string;
}

const buildingSections: BuildingSection[] = [
  {
    id: "foundation",
    name: "Foundation & Structure",
    icon: Building2,
    color: "hsl(var(--primary))",
    position: "bottom-8 left-1/4",
    description: "Solid foundations for lasting buildings",
    slug: "structural-concrete"
  },
  {
    id: "envelope",
    name: "Building Envelope",
    icon: Shield,
    color: "hsl(var(--accent))",
    position: "top-1/3 right-1/4",
    description: "Weather-tight exterior solutions",
    slug: "building-envelope"
  },
  {
    id: "interior",
    name: "Interior Systems",
    icon: Layers,
    color: "hsl(var(--secondary))",
    position: "top-1/2 left-1/3",
    description: "Complete interior finishes",
    slug: "interior-systems"
  },
  {
    id: "mechanical",
    name: "Mechanical Systems",
    icon: Zap,
    color: "hsl(var(--chart-1))",
    position: "bottom-1/3 right-1/3",
    description: "Advanced HVAC & plumbing",
    slug: "mechanical-piping"
  },
  {
    id: "specialty",
    name: "Specialty Work",
    icon: Sparkles,
    color: "hsl(var(--chart-2))",
    position: "top-1/4 left-1/2",
    description: "Expert specialty trades",
    slug: "specialty-contracting"
  },
  {
    id: "renovation",
    name: "Renovation",
    icon: Hammer,
    color: "hsl(var(--chart-3))",
    position: "bottom-1/2 right-1/2",
    description: "Transform existing spaces",
    slug: "renovation-restoration"
  }
];

export const HeroIsometric3D = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: -20, y: 25 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setRotation(prev => ({
      x: Math.max(-45, Math.min(0, prev.x + e.movementY * 0.5)),
      y: prev.y + e.movementX * 0.5
    }));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Explore Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Click and drag to rotate • Select sections to learn more
          </p>
        </motion.div>

        {/* 3D Isometric Building */}
        <div
          className="relative mx-auto max-w-4xl h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="relative w-full h-full"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateX: rotation.x,
              rotateY: rotation.y,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Main Building Structure */}
            <div
              className="absolute inset-0 m-auto w-64 h-80"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(0)",
              }}
            >
              {/* Building Base */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30"
                style={{
                  transform: "rotateX(90deg) translateZ(-16px)",
                  transformStyle: "preserve-3d",
                }}
                whileHover={{ borderColor: "hsl(var(--primary))" }}
              />

              {/* Building Front */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-br from-muted/40 to-muted/20 border-2 border-border backdrop-blur-sm"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Windows */}
                <div className="grid grid-cols-3 gap-4 p-6">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-accent/20 border border-accent/40 rounded"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Building Right Side */}
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-full bg-gradient-to-br from-muted/30 to-muted/10 border-2 border-border backdrop-blur-sm"
                style={{
                  transform: "rotateY(90deg) translateZ(128px)",
                  transformOrigin: "left",
                  transformStyle: "preserve-3d",
                }}
              />

              {/* Building Top */}
              <motion.div
                className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30"
                style={{
                  transform: "rotateX(90deg) translateZ(320px)",
                  transformStyle: "preserve-3d",
                }}
              />

              {/* Interactive Service Sections */}
              {buildingSections.map((section, index) => {
                const Icon = section.icon;
                const isSelected = selectedSection === section.id;

                return (
                  <motion.button
                    key={section.id}
                    className={cn(
                      "absolute w-16 h-16 rounded-xl backdrop-blur-md border-2 transition-all",
                      "flex items-center justify-center group",
                      isSelected
                        ? "border-white shadow-2xl scale-110 z-20"
                        : "border-white/30 hover:border-white/60 hover:scale-105"
                    )}
                    style={{
                      backgroundColor: isSelected
                        ? section.color
                        : `${section.color}40`,
                      transform: `translateZ(${index * 20 + 50}px)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSection(isSelected ? null : section.id);
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                    
                    {/* Glow effect */}
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          backgroundColor: section.color,
                          filter: "blur(20px)",
                          opacity: 0.6,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Service Details Panel */}
        <AnimatePresence>
          {selectedSection && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              {buildingSections
                .filter((s) => s.id === selectedSection)
                .map((section) => {
                  const Icon = section.icon;
                  return (
                    <div
                      key={section.id}
                      className="p-8 rounded-2xl backdrop-blur-md border-2 bg-card/50"
                      style={{ borderColor: section.color }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-16 h-16 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: section.color }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">
                            {section.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {section.description}
                          </p>
                        </div>
                      </div>
                      <a
                        href={`/services/${section.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
                        style={{ backgroundColor: section.color }}
                      >
                        Learn More
                      </a>
                    </div>
                  );
                })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
