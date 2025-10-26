import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Home, Paintbrush, Hammer, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ResidentialServices = () => {
  const services = [
    {
      name: "Interior Painting",
      description: "Transform your living spaces with professional interior painting",
      price: "From $2,500",
      timeline: "3-5 days"
    },
    {
      name: "Exterior Painting",
      description: "Protect and beautify your home's exterior with premium coatings",
      price: "From $5,000",
      timeline: "5-7 days"
    },
    {
      name: "Deck & Fence Staining",
      description: "Preserve and enhance outdoor wood structures",
      price: "From $1,500",
      timeline: "2-3 days"
    },
    {
      name: "Kitchen Cabinet Refinishing",
      description: "Refresh your kitchen without the cost of replacement",
      price: "From $3,500",
      timeline: "4-6 days"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Residential Painting Services | Ascent Group"
        description="Professional residential painting and renovation services for homeowners across the GTA. Interior, exterior, cabinets, and more."
        canonical="https://ascentgroupconstruction.com/services/residential"
      />
      <Navigation />

      <PageHeader
        eyebrow="For Homeowners"
        title="Residential Services"
        description="Premium painting and finishing for your home"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Residential" }
        ]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Home className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><strong>Pricing:</strong> {service.price}</p>
                    <p className="text-sm"><strong>Timeline:</strong> {service.timeline}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/estimate">Get Free Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us for Your Home?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
              <div>
                <Paintbrush className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Premium Materials</h3>
                <p className="text-sm text-muted-foreground">Benjamin Moore & Sherwin-Williams</p>
              </div>
              <div>
                <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">5-Year Warranty</h3>
                <p className="text-sm text-muted-foreground">Workmanship guarantee</p>
              </div>
              <div>
                <Hammer className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Experienced Crew</h3>
                <p className="text-sm text-muted-foreground">15+ years serving homeowners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResidentialServices;