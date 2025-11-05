import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/HeroBackground";

const GCHero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <HeroBackground />
      
      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Licensed & Bonded General Contractor</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Ontario's Trusted General Contractor
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Delivering commercial, multi-family, and institutional projects on-time and on-budget since 2009
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="group">
              <Link to="/contact" className="gap-2">
                <FileText className="h-5 w-5" />
                Submit RFP
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="group">
              <Link to="/contact" className="gap-2">
                Request Proposal
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 justify-center pt-4 text-sm">
            <Link to="/prequalification" className="text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
              View Pre-Qualification Package
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link to="/capabilities" className="text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
              Explore Capabilities
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link to="/safety" className="text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
              Safety & Compliance
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </section>
  );
};

export default GCHero;
