import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/useIsMobile";
import { trackCTAClick } from "@/lib/analytics";

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

const defaultPositions = [
  { x: 20, y: 40 },
  { x: 50, y: 20 },
  { x: 80, y: 40 },
  { x: 35, y: 70 },
  { x: 65, y: 70 },
];

export const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const particlesRef = useRef<Particle[]>([]);
  const burstParticlesRef = useRef<Particle[]>([]);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 4 : 6;

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('id, name, slug')
      .eq('publish_state', 'published')
      .eq('featured', true)
      .limit(5);

    if (data && data.length > 0) {
      const loadedNodes: Node[] = data.map((service, index) => ({
        x: defaultPositions[index]?.x || 50,
        y: defaultPositions[index]?.y || 50,
        id: service.slug,
        name: service.name,
        slug: service.slug,
      }));
      setNodes(loadedNodes);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (nodes.length === 0) return;
    
    const orbitingParticles: Particle[] = [];
    nodes.forEach((node, nodeIndex) => {
      for (let i = 0; i < particleCount; i++) {
        orbitingParticles.push({
          x: node.x,
          y: node.y,
          vx: 0,
          vy: 0,
          targetNode: nodeIndex,
          orbitAngle: (Math.PI * 2 * i) / particleCount,
          orbitRadius: 30,
          speed: 0.02 + Math.random() * 0.01,
        });
      }
    });
    particlesRef.current = orbitingParticles;
  }, [nodes, particleCount]);

  useEffect(() => {
    if (hoveredNode !== null && nodes.length > 0) {
      const node = nodes[hoveredNode];
      const canvas = canvasRef.current;
      if (!canvas) return;

      const burst: Particle[] = [];
      const burstCount = isMobile ? 15 : 30;
      
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount;
        const speed = 2 + Math.random() * 3;
        burst.push({
          x: (node.x * canvas.width) / 100,
          y: (node.y * canvas.height) / 100,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        });
      }
      burstParticlesRef.current = burst;

      setTimeout(() => {
        burstParticlesRef.current = [];
      }, 1000);
    }
  }, [hoveredNode, nodes, isMobile]);

  useEffect(() => {
    if (nodes.length === 0) return;
    
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

      ctx.strokeStyle = "rgba(147, 51, 234, 0.2)";
      ctx.lineWidth = 2;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const from = nodes[i];
          const to = nodes[j];
          
          if (hoveredNode !== null && (hoveredNode === i || hoveredNode === j)) {
            ctx.strokeStyle = "rgba(147, 51, 234, 0.6)";
            ctx.lineWidth = 3;
          } else {
            ctx.strokeStyle = "rgba(147, 51, 234, 0.2)";
            ctx.lineWidth = 2;
          }

          ctx.beginPath();
          ctx.moveTo((from.x * canvas.width) / 100, (from.y * canvas.height) / 100);
          ctx.lineTo((to.x * canvas.width) / 100, (to.y * canvas.height) / 100);
          ctx.stroke();
        }
      }

      particlesRef.current.forEach((particle) => {
        if (particle.targetNode !== undefined && nodes[particle.targetNode]) {
          const targetNode = nodes[particle.targetNode];
          const targetX = (targetNode.x * canvas.width) / 100;
          const targetY = (targetNode.y * canvas.height) / 100;

          if (particle.orbitAngle !== undefined && particle.orbitRadius !== undefined) {
            particle.orbitAngle += particle.speed || 0.02;
            particle.x = targetX + Math.cos(particle.orbitAngle) * particle.orbitRadius;
            particle.y = targetY + Math.sin(particle.orbitAngle) * particle.orbitRadius;
          }

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(147, 51, 234, 0.6)";
          ctx.fill();
        }
      });

      burstParticlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.vy += 0.1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(234, 179, 8, 0.8)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [nodes, hoveredNode]);

  const handleNodeClick = (slug: string, name: string) => {
    trackCTAClick(name, "particle_network");
    navigate(`/services/${slug}`);
  };

  if (loading || nodes.length === 0) {
    return (
      <div className="relative w-full h-[600px] bg-muted/20 rounded-xl animate-pulse flex items-center justify-center">
        <p className="text-muted-foreground">Loading interactive network...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-background via-primary/5 to-background rounded-xl overflow-hidden shadow-xl">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-label="Interactive service network visualization"
        role="img"
      />

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
          onClick={() => handleNodeClick(node.slug, node.name)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <div
            className={`w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg transition-all duration-300 ${
              hoveredNode === index ? "shadow-2xl shadow-primary/50 ring-4 ring-primary/30" : ""
            }`}
          >
            <span className="text-2xl">🏗️</span>
          </div>

          <div
            className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-4 py-2 shadow-xl whitespace-nowrap transition-all duration-200 ${
              hoveredNode === index ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <p className="text-sm font-semibold text-foreground">{node.name}</p>
            <p className="text-xs text-muted-foreground">Click to explore</p>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-border" />
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-sm text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
          🖱️ Hover over nodes • Click to explore services
        </p>
      </motion.div>
    </div>
  );
};
