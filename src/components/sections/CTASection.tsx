import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTAButton {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "outline";
}

interface CTASectionProps {
  title: string;
  description: string;
  primaryCTA: CTAButton;
  secondaryCTA?: CTAButton;
  className?: string;
}

const CTASection = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className = ""
}: CTASectionProps) => {
  return (
    <section className={`py-20 bg-primary text-primary-foreground ${className}`}>
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg mb-8 opacity-90">
          {description}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg" 
            variant={primaryCTA.variant || "secondary"}
            asChild
          >
            <Link to={primaryCTA.href}>
              {primaryCTA.label}
            </Link>
          </Button>
          {secondaryCTA && (
            <Button 
              size="lg" 
              variant={secondaryCTA.variant || "outline"}
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link to={secondaryCTA.href}>
                {secondaryCTA.label}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
