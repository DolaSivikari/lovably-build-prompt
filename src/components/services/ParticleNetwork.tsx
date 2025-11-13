import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  name: string;
  slug: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetNode?: number;
  orbitAngle?: number;
  orbitRadius?: number;
  speed?: number;
}

interface Connection {
  from: string;
  to: string;
}

const nodes: Node[] = [
  { id: "structural", name: "Structural Services", x: 20, y: 40, slug: "structural-steel" },
  { id: "envelope", name: "Building Envelope", x: 50, y: 20, slug: "building-envelope" },
  { id: "interior", name: "Interior Systems", x: 80, y: 40, slug: "interior-finishes" },
  { id: "mechanical", name: "Mechanical", x: 35, y: 70, slug: "mechanical-systems" },
  { id: "specialty", name: "Specialty Work", x: 65, y: 70, slug: "specialty-contracting" },
];

const connections: Connection[] = [
  { from: "structural", to: "envelope" },
  { from: "envelope", to: "interior" },
  { from: "structural", to: "mechanical" },
  { from: "interior", to: "specialty" },
  { from: "mechanical", to: "specialty" },
];

export const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const burstParticlesRef = useRef<Particle[]>([]);

  // Initialize particles with orbital properties
  useEffect(() => {
    // Create orbiting particles for each node
    const orbitingParticles: Particle[] = [];
    nodes.forEach((node, nodeIndex) => {
      for (let i = 0; i < 6; i++) {
        orbitingParticles.push({
          x: node.x,
          y: node.y,
          vx: 0,
          vy: 0,
          targetNode: nodeIndex,
          orbitAngle: (Math.PI * 2 * i) / 6,
          orbitRadius: 30,
          speed: 0.02 + Math.random() * 0.01,
        });
      }
    });
    particlesRef.current = orbitingParticles;
  }, []);

  // Handle particle burst on hover
  useEffect(() => {
    if (hoveredNode !== null) {
      const node = nodes[hoveredNode];
      const canvas = canvasRef.current;
      if (!canvas) return;

      const burst: Particle[] = [];
      
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30;
        const speed = 2 + Math.random() * 3;
        burst.push({
          x: (node.x * canvas.width) / 100,
          y: (node.y * canvas.height) / 100,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        });
      }
      burstParticlesRef.current = burst;

      // Clear burst after animation
      setTimeout(() => {
        burstParticlesRef.current = [];
      }, 1000);
    }
  }, [hoveredNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from)!;
        const toNode = nodes.find((n) => n.id === conn.to)!;

        const fromIndex = nodes.indexOf(fromNode);
        const toIndex = nodes.indexOf(toNode);
        const isHighlighted = hoveredNode === fromIndex || hoveredNode === toIndex;

        ctx.beginPath();
        ctx.moveTo((fromNode.x * canvas.width) / 100, (fromNode.y * canvas.height) / 100);
        ctx.lineTo((toNode.x * canvas.width) / 100, (toNode.y * canvas.height) / 100);
        ctx.strokeStyle = isHighlighted ? "rgba(147, 197, 253, 0.6)" : "rgba(147, 197, 253, 0.2)";
        ctx.lineWidth = isHighlighted ? 3 : 1;
        ctx.stroke();
      });

      // Update orbiting particles
      particlesRef.current.forEach((particle) => {
        if (particle.targetNode !== undefined && particle.orbitAngle !== undefined) {
          const node = nodes[particle.targetNode];
          
          // Update orbit angle
          particle.orbitAngle += particle.speed || 0.02;
          
          // Calculate position with physics
          const radius = particle.orbitRadius || 30;
          const targetX = (node.x * canvas.width) / 100 + Math.cos(particle.orbitAngle) * radius;
          const targetY = (node.y * canvas.height) / 100 + Math.sin(particle.orbitAngle) * radius;
          
          // Smooth movement towards target (spring physics)
          particle.x += (targetX - particle.x) * 0.1;
          particle.y += (targetY - particle.y) * 0.1;
        }

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, 4
        );
        gradient.addColorStop(0, "rgba(147, 197, 253, 0.8)");
        gradient.addColorStop(1, "rgba(147, 197, 253, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw burst particles
      burstParticlesRef.current = burstParticlesRef.current.filter(particle => {
        // Apply gravity and friction
        particle.vy += 0.1;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Remove if out of bounds
        const outOfBounds = 
          particle.x < -50 || particle.x > canvas.width + 50 ||
          particle.y < -50 || particle.y > canvas.height + 50;

        if (!outOfBounds) {
          // Draw with trail effect
          ctx.fillStyle = "rgba(255, 165, 0, 0.6)";
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        return !outOfBounds;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [hoveredNode]);

  const handleNodeClick = (slug: string) => {
    window.location.href = `/services/${slug}`;
  };

  return (
    <div className="relative w-full h-[600px] bg-background rounded-xl overflow-hidden border border-border">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Interactive nodes */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute cursor-pointer group"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseEnter={() => setHoveredNode(index)}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => handleNodeClick(node.slug)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Node circle */}
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              hoveredNode === index
                ? "bg-primary shadow-lg shadow-primary/50 scale-110"
                : "bg-primary/80"
            }`}
          >
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: hoveredNode === index ? 1 : 0,
              y: hoveredNode === index ? 0 : 10,
            }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card/95 backdrop-blur-sm px-4 py-2 rounded-lg border border-border shadow-lg pointer-events-none"
          >
            <p className="text-sm font-semibold text-foreground">{node.name}</p>
          </motion.div>
        </motion.div>
      ))}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Hover</span> on nodes to see connections •{" "}
          <span className="font-semibold text-foreground">Click</span> to explore service
        </p>
      </div>
    </div>
  );
};
