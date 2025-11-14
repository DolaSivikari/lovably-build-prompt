import { Building2, Home } from "lucide-react";
import { Button } from "@/ui/Button";
import { Link } from "react-router-dom";
import ClientSegmentCard from "./ClientSegmentCard";

const ClientValueProposition = () => {

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Why Clients Choose Us
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Developers, general contractors, property managers, and asset owners choose us because building envelope performance is non-negotiable—and 
            accountability is everything. Whether you're constructing new buildings, managing existing assets, or protecting long-term value, we deliver 
            the diagnostics, engineering-backed solutions, and 25-year performance that keep projects on schedule, prevent costly failures, and eliminate 
            finger-pointing. One team. One contract. One point of accountability.
          </p>
        </div>

        {/* Who We Serve Section */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-foreground mb-2">Who We Serve</h3>
              <p className="text-muted-foreground">Specialized solutions for your project needs</p>
            </div>

            <ClientSegmentCard
              icon={Building2}
              title="Developers & Building Owners"
              services={[
                "Building Envelope & Restoration",
                "Multi-Family Residential Projects",
                "Building Envelope Systems",
              ]}
              ctaText="See Our Work"
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
