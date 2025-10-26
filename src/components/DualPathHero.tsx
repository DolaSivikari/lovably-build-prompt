/**
 * Dual-Path Hero Component - Phase 3
 * Audience segmentation for homeowners vs developers/contractors
 */
import { Link } from "react-router-dom";
import { Home, Building2, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

const DualPathHero = () => {
  const handlePathClick = (audiencePath: 'residential' | 'commercial') => {
    // Track audience path selection
    console.log(`User selected path: ${audiencePath}`);
    // TODO: Send to analytics when backend is ready
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-construction.jpg"
          alt="Large-scale construction project"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal/90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Complete Construction Solutions<br />Across Ontario
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              From Single-Home Renovations to 1,000+ Unit Developments
            </p>
          </div>

          {/* Audience Selector Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-8">
            {/* Homeowners & Small Business Card */}
            <Card className="group hover:scale-105 transition-all duration-300 bg-background/95 backdrop-blur-sm border-2 border-border hover:border-primary/50 hover:shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Home className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    Homeowners & Small Business
                  </h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>Residential services</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>Small commercial projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>Renovations & improvements</span>
                    </li>
                  </ul>
                </div>

                <Link to="/contact?type=residential" onClick={() => handlePathClick('residential')}>
                  <Button size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-white">
                    Get Your Free Quote
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Developers & Contractors Card */}
            <Card className="group hover:scale-105 transition-all duration-300 bg-background/95 backdrop-blur-sm border-2 border-border hover:border-primary hover:shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    Developers & Contractors
                  </h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Multi-unit projects (1,000+ units)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>New construction</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Large-scale services</span>
                    </li>
                  </ul>
                </div>

                <Link to="/contact?type=commercial" onClick={() => handlePathClick('commercial')}>
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                    Request Proposal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-white/90 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">1,000+</div>
              <div className="text-sm">Units Annually</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">$5M</div>
              <div className="text-sm">Bonding Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15</div>
              <div className="text-sm">Concurrent Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualPathHero;
