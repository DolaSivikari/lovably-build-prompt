import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight, FileText } from "lucide-react";
import heroPremiumVideo from "@/assets/hero-premium.mp4";
import heroConstructionImage from "@/assets/hero-construction.jpg";

const GCHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        poster={heroConstructionImage}
      >
        <source src={heroPremiumVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6 animate-fade-in">
          <Award className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold">Licensed General Contractor | 15+ Years Experience</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up leading-tight">
          Ontario's Trusted
          <span className="block text-accent mt-2">General Contractor</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up opacity-90" style={{ animationDelay: "0.2s" }}>
          Delivering commercial, multi-family, and institutional projects on-time and on-budget since 2009
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button size="lg" asChild className="group bg-accent hover:bg-accent/90 text-primary">
            <Link to="/contact" className="flex items-center gap-2">
              Submit RFP / Request Proposal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm">
            <Link to="/capabilities" className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              View Capabilities
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-slide-up" />
        </div>
      </div>
    </section>
  );
};

export default GCHero;
