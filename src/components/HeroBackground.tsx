import { useEffect, useRef } from "react";

const HeroBackground = () => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 50;
      const moveY = (clientY / window.innerHeight - 0.5) * 50;

      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${-moveX * 0.5}px, ${-moveY * 0.5}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Geometric Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Diagonal Accent Stripe */}
      <div className="absolute inset-0 diagonal-stripe opacity-20" />

      {/* Animated Gradient Orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-40 blur-3xl transition-transform duration-700 ease-out"
        style={{ background: "var(--gradient-orb)" }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-30 blur-3xl transition-transform duration-700 ease-out"
        style={{ background: "radial-gradient(circle, hsl(var(--primary-light) / 0.3) 0%, transparent 70%)" }}
      />
    </>
  );
};

export default HeroBackground;
