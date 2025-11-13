import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  serviceId: string;
}

interface Connection {
  from: string;
  to: string;
}

interface ServiceNode {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

const serviceNodes: ServiceNode[] = [
  { id: "structural", name: "Structural", x: 20, y: 50, color: "hsl(var(--primary))" },
  { id: "envelope", name: "Envelope", x: 40, y: 30, color: "hsl(var(--accent))" },
  { id: "interior", name: "Interior", x: 60, y: 50, color: "hsl(var(--secondary))" },
  { id: "mechanical", name: "Mechanical", x: 80, y: 30, color: "hsl(var(--chart-1))" },
  { id: "specialty", name: "Specialty", x: 50, y: 70, color: "hsl(var(--chart-2))" },
];

const connections: Connection[] = [
  { from: "structural", to: "envelope" },
  { from: "envelope", to: "interior" },
  { from: "interior", to: "mechanical" },
  { from: "structural", to: "specialty" },
  { from: "specialty", to: "mechanical" },
];

export const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

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

    // Initialize particles
    particlesRef.current = connections.flatMap((conn) => {
      const fromNode = serviceNodes.find((n) => n.id === conn.from)!;
      const toNode = serviceNodes.find((n) => n.id === conn.to)!;

      return Array.from({ length: 3 }, () => ({
        x: (fromNode.x * canvas.width) / 100,
        y: (fromNode.y * canvas.height) / 100,
        vx: ((toNode.x - fromNode.x) * canvas.width) / 100 / 200,
        vy: ((toNode.y - fromNode.y) * canvas.height) / 100 / 200,
        serviceId: conn.from,
      }));
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach((conn) => {
        const fromNode = serviceNodes.find((n) => n.id === conn.from)!;
        const toNode = serviceNodes.find((n) => n.id === conn.to)!;

        const isHighlighted =
          hoveredNode === conn.from || hoveredNode === conn.to;

        ctx.beginPath();
        ctx.moveTo(
          (fromNode.x * canvas.width) / 100,
          (fromNode.y * canvas.height) / 100
        );
        ctx.lineTo(
          (toNode.x * canvas.width) / 100,
          (toNode.y * canvas.height) / 100
        );
        ctx.strokeStyle = isHighlighted
          ? fromNode.color
          : "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = isHighlighted ? 2 : 1;
        ctx.stroke();
      });

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Reset particle if it goes off screen
        const node = serviceNodes.find((n) => n.id === particle.serviceId)!;
        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          particle.x = (node.x * canvas.width) / 100;
          particle.y = (node.y * canvas.height) / 100;
        }

        const isHighlighted = hoveredNode === particle.serviceId;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, isHighlighted ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? node.color : "rgba(255, 255, 255, 0.4)";
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredNode]);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-background via-muted/5 to-background rounded-2xl overflow-hidden border border-border">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Service Nodes */}
      {serviceNodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute cursor-pointer group"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          whileHover={{ scale: 1.2 }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-white/30 shadow-lg relative"
            style={{ backgroundColor: `${node.color}40` }}
          >
            {/* Glow effect */}
            {hoveredNode === node.id && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: node.color,
                  filter: "blur(20px)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.6, scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Label */}
            <span className="relative z-10 text-xs font-bold text-white drop-shadow-lg">
              {node.name}
            </span>
          </div>

          {/* Tooltip */}
          <motion.div
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-sm font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: hoveredNode === node.id ? 1 : 0,
              y: hoveredNode === node.id ? 0 : -10,
            }}
          >
            Click to explore {node.name}
          </motion.div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
        <h4 className="text-sm font-semibold mb-2">Service Connections</h4>
        <p className="text-xs text-muted-foreground">
          Hover over nodes to see relationships
        </p>
      </div>
    </div>
  );
};
