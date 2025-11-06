import { useParallax } from "@/hooks/useParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GeometricShapesProps {
  currentSlide: number;
}

const GeometricShapes = ({ currentSlide }: GeometricShapesProps) => {
  const parallaxOffset = useParallax(0.3);
  const prefersReducedMotion = useReducedMotion();

  const shapes = [
    {
      id: 1,
      className:
        "absolute top-0 left-0 w-[400px] h-[400px] bg-[hsl(var(--brand-accent))] opacity-20",
      style: { clipPath: "polygon(0 0, 100% 0, 0 100%)" },
    },
    {
      id: 2,
      className:
        "absolute bottom-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--brand-primary))] opacity-15",
      style: { clipPath: "polygon(100% 0, 100% 100%, 0 100%)" },
    },
    {
      id: 3,
      className:
        "absolute top-1/2 right-0 w-[300px] h-[300px] bg-[hsl(25_95%_53%)] opacity-10",
      style: { clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" },
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <div
          key={shape.id}
          className={`${shape.className} transition-all duration-1000 ease-in-out`}
          style={{
            ...shape.style,
            transform: prefersReducedMotion
              ? "none"
              : `translate(${currentSlide * 10 - index * 5}%, ${parallaxOffset / (index + 1)}px)`,
          }}
        />
      ))}
    </div>
  );
};

export default GeometricShapes;
