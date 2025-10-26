import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Phone,
  Clock,
  Shield,
  CheckCircle,
  FileText,
} from "lucide-react";

const EmergencyServices = () => {
  const emergencyTypes = [
    "Fire Damage Restoration",
    "Water Damage Repair",
    "Storm Damage Repair",
    "Vandalism Cleanup",
    "Structural Repairs",
    "Emergency Weatherproofing",
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="24/7 Emergency Construction Services | Ascent Group"
        description="Emergency construction and painting services. Available 24/7. On-site within 4 hours. Fire, water, storm damage restoration. Call now."
        canonical="https://ascentgroupconstruction.com/emergency-services"
      />
      <Navigation />

      {/* Hero Section - Urgent Design */}
      <section className="relative bg-gradient-to-br from-destructive via-destructive/90 to-orange-600 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <AlertTriangle className="w-20 h-20 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              24/7 Emergency Construction Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Immediate response for urgent construction needs
            </p>

            {/* Huge Phone Number */}
            <div className="bg-white/10 backdrop-blur border-2 border-white/30 rounded-2xl p-8 mb-8">
              <p className="text-lg font-semibold mb-2">EMERGENCY HOTLINE</p>
              <a 
                href="tel:+14165559999" 
                className="text-5xl md:text-7xl font-bold hover:text-white/80 transition-colors block"
              >
                (416) 555-9999
              </a>
              <p className="text-sm mt-2 text-white/80">Available 24 Hours / 7 Days</p>
            </div>

            <Button asChild size="lg" className="bg-white text-destructive hover:bg-white/90 text-xl py-6 px-8">
              <Link to="/contact?type=emergency">
                Request Emergency Service
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <Card className="bg-background">
                <CardContent className="p-8">
                  <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Immediate Answer</h3>
                  <p className="text-muted-foreground">24/7 phone support</p>
                </CardContent>
              </Card>
              <Card className="bg-background border-2 border-primary">
                <CardContent className="p-8">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">4-Hour Response</h3>
                  <p className="text-muted-foreground">On-site assessment</p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-8">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Fully Insured</h3>
                  <p className="text-muted-foreground">$5M liability</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Emergency Services We Handle
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {emergencyTypes.map((type, index) => (
                <Card key={index}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{type}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Claims */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We Work With Insurance Companies
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experienced in insurance claim documentation and direct billing. We'll help you navigate the process.
            </p>
            <div className="bg-background p-8 rounded-lg border-2 border-border">
              <h3 className="font-bold mb-4">What We Provide:</h3>
              <div className="space-y-2 text-left max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Detailed damage assessment reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Photo documentation for claims</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Itemized repair estimates</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Direct billing to insurance (when available)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-destructive text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't Wait - Get Help Now
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Every minute counts in an emergency. Call us immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-destructive hover:bg-white/90">
                <a href="tel:+14165559999">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Emergency Line
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact?type=emergency">
                  Submit Emergency Request
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmergencyServices;
