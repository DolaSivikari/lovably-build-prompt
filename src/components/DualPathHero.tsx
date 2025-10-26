import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DualPathHero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-muted/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Complete Construction Solutions Across Ontario
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            From Single-Home Renovations to 1,000+ Unit Developments
          </p>
        </div>

        {/* Dual Path Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Homeowners Path */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <CardContent className="pt-8 pb-8 relative z-10">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Homeowners & Small Business</h2>
                <p className="text-muted-foreground mb-6">
                  Professional painting and renovation services for your home or business
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm">Residential painting & finishing</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm">Small commercial projects</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm">Renovations & repairs</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm">Financing available</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full group/btn"
                >
                  <Link to="/estimate">
                    Get Free Quote
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                >
                  <Link to="/services/residential">
                    View Residential Services
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Developers & GCs Path */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 relative overflow-hidden bg-gradient-to-br from-background to-muted/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <CardContent className="pt-8 pb-8 relative z-10">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Developers & Contractors</h2>
                <p className="text-muted-foreground mb-6">
                  Large-scale painting and finishing with proven multi-unit capacity
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm">Multi-unit developments (1,000+ units)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm">New construction & renovations</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm">$10M bonding capacity</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm">48-hour RFP response</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full group/btn"
                >
                  <Link to="/resources/contractor-portal">
                    Request Proposal
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                >
                  <Link to="/developer-services">
                    View Developer Services
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-1">500+</div>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-1">15+</div>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-1">$5M</div>
            <p className="text-sm text-muted-foreground">Liability Coverage</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-1">98%</div>
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualPathHero;