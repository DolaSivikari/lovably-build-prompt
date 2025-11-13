import { useState } from "react";
import { motion } from "framer-motion";
import { IsometricBuilding3D } from "./IsometricBuilding3D";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Building2, Hammer, Wrench, PaintBucket } from "lucide-react";

const buildingSections = [
  {
    id: "foundation",
    name: "Foundation & Excavation",
    icon: Building2,
    color: "from-amber-500 to-orange-600",
    position: "bottom-8 left-8",
    description: "Structural integrity from the ground up",
    slug: "foundation-excavation",
  },
  {
    id: "structural",
    name: "Structural Steel & Concrete",
    icon: Hammer,
    color: "from-slate-500 to-slate-700",
    position: "bottom-32 left-16",
    description: "Building the core framework",
    slug: "structural-steel",
  },
  {
    id: "envelope",
    name: "Building Envelope",
    icon: Wrench,
    color: "from-blue-500 to-blue-700",
    position: "bottom-48 right-16",
    description: "Weather protection and insulation",
    slug: "building-envelope",
  },
  {
    id: "finishes",
    name: "Interior Finishes",
    icon: PaintBucket,
    color: "from-purple-500 to-purple-700",
    position: "top-32 right-8",
    description: "Drywall, flooring, and millwork",
    slug: "interior-finishes",
  },
];

export const HeroIsometric3D = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[800px] py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Click on any building section to discover our specialized construction services
          </p>
        </motion.div>

        {/* 3D Building or Fallback */}
        {!prefersReducedMotion ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <IsometricBuilding3D />
          </motion.div>
        ) : (
          // Simplified fallback for reduced motion
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {buildingSections.map((section) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`/services/${section.slug}`}
                  className="group p-6 rounded-xl border border-border bg-card hover:border-primary transition-all"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${section.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {section.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {section.description}
                  </p>
                </a>
              );
            })}
          </div>
        )}

        {/* Features below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
        >
          <div className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <p className="text-muted-foreground">Years Experience</p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Projects Completed</p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-muted-foreground">Client Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
