import { useParallax } from "@/hooks/useParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ParallaxShapes = () => {
  const parallax1 = useParallax(0.2);
  const parallax2 = useParallax(0.4);
  const parallax3 = useParallax(0.15);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Top Left Triangle */}
      <div
        className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none opacity-[0.03] z-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          backgroundColor: "hsl(var(--brand-accent))",
          transform: `translateY(${parallax1}px)`,
        }}
      />

      {/* Bottom Right Triangle */}
      <div
        className="fixed bottom-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-[0.03] z-0"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          backgroundColor: "hsl(var(--brand-primary))",
          transform: `translateY(-${parallax2}px)`,
        }}
      />

      {/* Middle Diagonal */}
      <div
        className="fixed top-1/3 right-0 w-[250px] h-[250px] pointer-events-none opacity-[0.02] z-0"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
          backgroundColor: "hsl(var(--brand-accent))",
          transform: `translateY(${parallax3}px)`,
        }}
      />
    </>
  );
};

export default ParallaxShapes;
