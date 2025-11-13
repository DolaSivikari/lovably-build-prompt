import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const scenes = [
  {
    id: "blueprint",
    gradient: "from-blue-950/20 via-blue-900/10 to-background",
    pattern: "blueprint",
    label: "Planning & Design",
  },
  {
    id: "construction",
    gradient: "from-orange-950/20 via-orange-900/10 to-background",
    pattern: "construction",
    label: "Construction Phase",
  },
  {
    id: "finishing",
    gradient: "from-purple-950/20 via-purple-900/10 to-background",
    pattern: "finishing",
    label: "Finishing Touches",
  },
  {
    id: "complete",
    gradient: "from-green-950/20 via-green-900/10 to-background",
    pattern: "complete",
    label: "Project Complete",
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

  const opacity1 = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.65, 0.75], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  const opacities = [opacity1, opacity2, opacity3, opacity4];

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

      {/* Scene indicator */}
      <div className="fixed top-32 right-8 z-50">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-2">Current Phase</p>
          <motion.p
            key={currentScene}
            className="text-sm font-bold text-foreground"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {scenes[currentScene].label}
          </motion.p>
          
          {/* Progress dots */}
          <div className="flex gap-2 mt-3">
            {scenes.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentScene
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
