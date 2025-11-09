import { Building2, Home } from "lucide-react";
import { Button } from "@/ui/Button";
import { Link } from "react-router-dom";
import ClientSegmentCard from "./ClientSegmentCard";

const ClientValueProposition = () => {

  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Why Partner With Ascent Group
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Ontario's trusted general contractor delivering commercial, institutional, and multi-family projects with proven expertise and unwavering commitment to excellence.
          </p>
        </div>

        {/* Who We Serve Section */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Who We Serve</h3>
              <p className="text-muted-foreground">Specialized solutions for your project needs</p>
            </div>

            <ClientSegmentCard
              icon={Building2}
              title="Developers & General Contractors"
              services={[
                "Design-Build & Construction Management",
                "Multi-Family Residential Projects",
                "Building Envelope Systems",
              ]}
              ctaText="View Capabilities"
              ctaUrl="/capabilities"
            />

            <ClientSegmentCard
              icon={Home}
              title="Property Owners & Managers"
              services={[
                "Building Restoration & Retrofits",
                "Capital Planning & Renovations",
                "Emergency Repairs & Maintenance",
              ]}
              ctaText="Request Proposal"
              ctaUrl="/contact"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientValueProposition;
