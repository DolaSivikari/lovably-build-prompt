import { Building2, Home } from "lucide-react";
import { Button } from "@/ui/Button";
import { Link } from "react-router-dom";
import { useWhyChooseUs } from "@/hooks/useWhyChooseUs";
import ClientSegmentCard from "./ClientSegmentCard";
import CredentialBadge from "./CredentialBadge";

// Fallback credentials if database is empty
const fallbackCredentials = [
  { icon: "BadgeCheck", stat: "$5M Coverage", label: "Liability Insurance" },
  { icon: "Building2", stat: "500+ Projects", label: "Successfully Completed" },
  { icon: "Clock", stat: "95% On-Time", label: "Delivery Rate" },
  { icon: "ShieldCheck", stat: "WSIB Compliant", label: "Fully Licensed" },
  { icon: "Users", stat: "OSHA Certified", label: "Safety Teams" },
  { icon: "Award", stat: "21+ Services", label: "Under One Roof" },
];

const ClientValueProposition = () => {
  const { data: items, isLoading } = useWhyChooseUs();
  
  const credentials = items && items.length > 0 
    ? items.slice(0, 6).map(item => ({
        icon: item.icon_name || "BadgeCheck",
        stat: item.stats_badge || item.title,
        label: item.title,
      }))
    : fallbackCredentials;

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

        {/* Split-Screen Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - Who We Serve (40%) */}
          <div className="lg:col-span-2 space-y-6">
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

          {/* RIGHT COLUMN - Why Choose Us (60%) */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Why Choose Us</h3>
              <p className="text-muted-foreground">Proven credentials and performance</p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">Loading credentials...</div>
            ) : (
              <>
                {/* Credentials Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {credentials.map((cred, idx) => (
                    <CredentialBadge
                      key={idx}
                      icon={cred.icon}
                      stat={cred.stat}
                      label={cred.label}
                    />
                  ))}
                </div>

                {/* Market Intelligence Connection */}
                <div className="p-6 rounded-lg bg-steel-blue/5 border border-steel-blue/20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground mb-2">
                        Backed by Real Market Data
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our services directly address Ontario's critical construction challenges with data-driven solutions.
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <Link to="/capabilities">View Full Credentials</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientValueProposition;
