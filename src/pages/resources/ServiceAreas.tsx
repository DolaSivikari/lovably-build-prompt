import { MapPin, Clock, Phone, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { serviceAreaCities, primaryServiceCities } from "@/data/service-area-cities";

const ServiceAreas = () => {
  const regions = [
    {
      name: "Toronto & GTA Core",
      cities: ["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham", "Richmond Hill"],
      responseTime: "Same-day service available",
    },
    {
      name: "Durham Region",
      cities: ["Pickering", "Ajax", "Whitby", "Oshawa"],
      responseTime: "24-hour response",
    },
    {
      name: "York Region",
      cities: ["Newmarket", "Aurora", "King City"],
      responseTime: "24-hour response",
    },
    {
      name: "Halton Region",
      cities: ["Oakville", "Burlington", "Milton"],
      responseTime: "24-hour response",
    },
  ];

  return (
    <>
      <SEO 
        title="Service Areas | Ascent Group Construction"
        description="Serving Toronto, Mississauga, Brampton, Vaughan, Markham and the Greater Toronto Area with professional painting and construction services."
        keywords="service areas, Toronto, GTA, Mississauga, Brampton, Vaughan, Markham, construction services"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <PageHeader
          title="Service Areas"
          description="Serving Ontario with Excellence"
        />

        <main id="main-content" className="container mx-auto px-4 py-12 space-y-16">
          {/* Service Radius Section */}
          <section className="text-center max-w-3xl mx-auto">
            <div className="bg-muted/30 rounded-lg p-8 mb-8">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Service Coverage</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Primary Service Area</h3>
                  <p className="text-muted-foreground">100km radius from Toronto - Same-day service available</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Extended Coverage</h3>
                  <p className="text-muted-foreground">Up to 200km - Available for larger projects</p>
                </div>
              </div>
            </div>
          </section>

          {/* Primary Service Cities */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-2">Primary Service Cities</h2>
            <p className="text-muted-foreground mb-8">Areas with same-day emergency service and fastest response times</p>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {primaryServiceCities.map((city) => (
                <Card key={city} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground">{city}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Regional Breakdown */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Coverage by Region</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {regions.map((region, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">{region.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {region.responseTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {region.cities.map((city) => (
                        <span
                          key={city}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* All Service Areas Grid */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-2">Complete Coverage Area</h2>
            <p className="text-muted-foreground mb-8">All cities and municipalities we serve</p>
            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {serviceAreaCities.map((city) => (
                    <div key={city} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{city}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Coverage Details */}
          <section className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">Service Availability</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <Clock className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Emergency Services</h3>
                  <p className="text-sm text-muted-foreground">Available 24/7 within GTA core for urgent repairs and emergency situations</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <MapPin className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Regular Projects</h3>
                  <p className="text-sm text-muted-foreground">All of Southern Ontario covered for scheduled painting and construction projects</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Large Projects</h3>
                  <p className="text-sm text-muted-foreground">Province-wide consideration for major commercial and multi-unit developments</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Not Sure If We Serve Your Area?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us to confirm coverage. We're always expanding our service area and may accommodate special projects outside our typical range.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Request Proposal</a>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ServiceAreas;
