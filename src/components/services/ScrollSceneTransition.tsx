import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { trackScrollDepth } from "@/lib/analytics";

const scenes = [
  {
    id: "planning",
    gradient: "from-blue-950/30 via-blue-900/15 to-background",
    pattern: "blueprint",
    label: "Planning & Design",
    description: "Blueprint phase with architectural precision",
    icon: "📐",
  },
  {
    id: "foundation",
    gradient: "from-amber-950/30 via-amber-900/15 to-background",
    pattern: "construction",
    label: "Foundation & Excavation",
    description: "Building from the ground up",
    icon: "🏗️",
  },
  {
    id: "structure",
    gradient: "from-slate-950/30 via-slate-900/15 to-background",
    pattern: "construction",
    label: "Structural Framework",
    description: "Steel beams and concrete rising",
    icon: "🔩",
  },
  {
    id: "envelope",
    gradient: "from-cyan-950/30 via-cyan-900/15 to-background",
    pattern: "finishing",
    label: "Building Envelope",
    description: "Exterior work and weatherproofing",
    icon: "🏢",
  },
  {
    id: "finishing",
    gradient: "from-purple-950/30 via-purple-900/15 to-background",
    pattern: "finishing",
    label: "Interior Finishes",
    description: "Final touches and details",
    icon: "🎨",
  },
  {
    id: "complete",
    gradient: "from-green-950/30 via-green-900/15 to-background",
    pattern: "complete",
    label: "Project Complete",
    description: "Successful handover",
    icon: "✅",
  },
];

export const ScrollSceneTransition = () => {
  const { scrollYProgress } = useScroll();
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const sceneIndex = Math.min(
        Math.floor(latest * scenes.length),
        scenes.length - 1
      );
      setCurrentScene(sceneIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // More granular opacity transitions for 6 scenes
  const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.25, 0.35], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.45, 0.55], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.5, 0.65, 0.75], [0, 1, 0]);
  const opacity5 = useTransform(scrollYProgress, [0.7, 0.85, 0.95], [0, 1, 0]);
  const opacity6 = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  const opacities = [opacity1, opacity2, opacity3, opacity4, opacity5, opacity6];

  return (
    <>
      {/* Fixed background container */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {scenes.map((scene, index) => (
          <motion.div
            key={scene.id}
            className={`absolute inset-0 bg-gradient-to-br ${scene.gradient}`}
            style={{ opacity: opacities[index] }}
          >
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  scene.pattern === "blueprint"
                    ? "repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(59, 130, 246, 0.1) 50px, rgba(59, 130, 246, 0.1) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(59, 130, 246, 0.1) 50px, rgba(59, 130, 246, 0.1) 51px)"
                    : scene.pattern === "construction"
                    ? "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(249, 115, 22, 0.1) 35px, rgba(249, 115, 22, 0.1) 70px)"
                    : scene.pattern === "finishing"
                    ? "radial-gradient(circle, rgba(168, 85, 247, 0.1) 1px, transparent 1px)"
                    : "none",
                backgroundSize:
                  scene.pattern === "finishing" ? "20px 20px" : "auto",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Enhanced scene indicator */}
      <div className="fixed top-32 right-8 z-50">
        <div className="bg-card/90 backdrop-blur-md rounded-xl p-5 border border-border shadow-lg max-w-xs">
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Project Phase</p>
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{scenes[currentScene].icon}</span>
              <p className="text-base font-bold text-foreground">
                {scenes[currentScene].label}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {scenes[currentScene].description}
            </p>
          </motion.div>
          
          {/* Progress dots with labels */}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
            {scenes.map((scene, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all flex-shrink-0 ${
                    index === currentScene
                      ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                      : index < currentScene
                      ? "bg-primary/50"
                      : "bg-muted-foreground/30"
                  }`}
                />
                <span className={`text-xs transition-colors ${
                  index === currentScene 
                    ? "text-foreground font-semibold" 
                    : "text-muted-foreground"
                }`}>
                  {scene.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
