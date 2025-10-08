import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Shield, Star, CheckCircle2, Upload, Users, DollarSign, Calendar } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
      
      {/* Animated Marquee */}
      <div className="relative overflow-hidden bg-secondary/20 py-3 mb-12">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="text-secondary font-semibold text-lg mx-8">Small jobs welcome</span>
          <span className="text-white/60">•</span>
          <span className="text-white/90 mx-8">No project too small</span>
          <span className="text-white/60">•</span>
          <span className="text-secondary font-semibold text-lg mx-8">Small jobs welcome</span>
          <span className="text-white/60">•</span>
          <span className="text-white/90 mx-8">No project too small</span>
          <span className="text-white/60">•</span>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Small jobs. Big care.
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-6">
            From a leaky faucet to a fresh-painted room or a tidy patio repair — fast, friendly, affordable.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-semibold text-sm">Free estimates in 24–48 hours</span>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <p className="text-lg text-white/90 leading-relaxed">
            We help homeowners with quick repairs, painting, tiling and outdoor touch-ups — no large project minimums, no confusing jargon, just straightforward pricing and dependable service.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-8 py-6 shadow-xl hover-scale">
            <Link to="/estimate" className="flex items-center gap-2">
              Get a Fast Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 hover-scale"
            asChild
          >
            <Link to="/services">
              See Starter Packages
            </Link>
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">Small jobs welcome</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">Affordable packages</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">30-day guarantee</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.45s" }}>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">★ 4.8 rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Estimate Section */}
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-2 border-white/20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <Upload className="w-6 h-6 text-secondary" />
                <h3 className="text-2xl font-bold text-white">Free Estimate — 24–48 hrs</h3>
              </div>
              <p className="text-white/90">Upload a Photo for a Quick Ballpark</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Friendly Specialists</h4>
                  <p className="text-sm text-white/80">Teams who treat your home like theirs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Transparent Pricing</h4>
                  <p className="text-sm text-white/80">Clear timelines, no surprises</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Fast Booking</h4>
                  <p className="text-sm text-white/80">Same-week availability for most jobs</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-10">
                <Link to="/estimate">
                  Get Your Free Estimate
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
