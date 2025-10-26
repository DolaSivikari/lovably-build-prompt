import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Clock, AlertTriangle, Shield } from "lucide-react";

const EmergencyServices = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="24/7 Emergency Construction Services | Ascent Group"
        description="Emergency painting and restoration services across the GTA. Fire damage, water damage, storm repair. On-site within 4 hours."
        canonical="https://ascentgroupconstruction.com/emergency-services"
      />
      <Navigation />

      {/* Emergency Hero */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AlertTriangle className="h-20 w-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              24/7 Emergency Services
            </h1>
            <p className="text-2xl mb-8">
              On-site within 4 hours across the GTA
            </p>
            <Button size="lg" variant="secondary" className="text-2xl h-16 px-8" asChild>
              <a href="tel:+14165551234">
                <Phone className="mr-3 h-8 w-8" />
                Call Now: (416) 555-1234
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Fire & Smoke Damage</h3>
                <p className="text-sm text-muted-foreground">Emergency restoration and repainting</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Water Damage</h3>
                <p className="text-sm text-muted-foreground">Flood and leak restoration</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Storm Damage</h3>
                <p className="text-sm text-muted-foreground">Wind and hail damage repair</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">4hr</div>
                <p className="text-sm text-muted-foreground">Response Time</p>
              </div>
              <div>
                <Phone className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <p className="text-sm text-muted-foreground">Availability</p>
              </div>
              <div>
                <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <p className="text-sm text-muted-foreground">Insurance Claims Assisted</p>
              </div>
            </div>

            <Button size="lg" variant="destructive" asChild>
              <a href="tel:+14165551234">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Hotline: (416) 555-1234
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmergencyServices;