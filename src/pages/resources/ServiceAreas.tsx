import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { serviceAreaCities } from "@/data/service-area-cities";

const ServiceAreas = () => {
  const regions = [
    {
      name: "Greater Toronto Area (GTA)",
      coverage: "Primary Service Area",
      cities: ["Toronto", "Mississauga", "Brampton", "Markham", "Vaughan", "Richmond Hill", "Oakville", "Burlington"]
    },
    {
      name: "Central Ontario",
      coverage: "Regular Service Area",
      cities: ["Barrie", "Newmarket", "Aurora", "King City", "Uxbridge", "Whitby", "Oshawa", "Ajax"]
    },
    {
      name: "Southwestern Ontario",
      coverage: "Project-Based Service",
      cities: ["Hamilton", "Guelph", "Kitchener", "Waterloo", "Cambridge", "London", "Niagara Falls"]
    },
    {
      name: "Eastern Ontario",
      coverage: "Large Project Service",
      cities: ["Ottawa", "Kingston", "Belleville", "Peterborough"]
    }
  ];

  const benefits = [
    "Local teams familiar with Ontario building codes",
    "Multiple staging locations across the GTA",
    "Fast response times (within 2 hours in GTA)",
    "Knowledge of local weather patterns and materials",
    "Established relationships with local suppliers",
    "Understanding of municipal permit requirements"
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Service Areas | Ascent Group Construction"
        description="We serve the entire Greater Toronto Area and beyond. Toronto, Mississauga, Brampton, Vaughan, and across Ontario. Fast response times, local expertise."
        canonical="https://ascentgroupconstruction.com/resources/service-areas"
      />
      <Navigation />

      <PageHeader
        eyebrow="Where We Work"
        title="Service Areas"
        description="Serving Ontario with fast response times and local expertise"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/faq" },
          { label: "Service Areas" }
        ]}
      />

      {/* Map Section (Placeholder) */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-background rounded-lg border flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive Ontario Service Map</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Serving the GTA and surrounding regions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Coverage by Region</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different service levels based on proximity and project size
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {regions.map((region) => (
              <Card key={region.name}>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">{region.coverage}</Badge>
                  <CardTitle className="text-xl">{region.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {region.cities.map((city) => (
                      <Badge key={city} variant="secondary">{city}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto p-6 bg-muted rounded-lg text-center">
            <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Don't See Your City?</h3>
            <p className="text-muted-foreground mb-4">
              We regularly travel for projects over $50,000. Contact us to discuss your specific location and project needs.
            </p>
            <Badge variant="outline" className="text-primary">
              Travel Radius: Up to 200km for large projects
            </Badge>
          </div>
        </div>
      </section>

      {/* Local Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Why Local Expertise Matters</h2>
              <p className="text-muted-foreground">
                15+ years serving Ontario means we know the territory
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Response Times</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">2hr</div>
                <h3 className="font-semibold mb-1">GTA Core</h3>
                <p className="text-sm text-muted-foreground">Emergency response within 2 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">4hr</div>
                <h3 className="font-semibold mb-1">Extended GTA</h3>
                <p className="text-sm text-muted-foreground">Response within 4 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">24hr</div>
                <h3 className="font-semibold mb-1">All Ontario</h3>
                <p className="text-sm text-muted-foreground">On-site assessment within 24 hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceAreas;