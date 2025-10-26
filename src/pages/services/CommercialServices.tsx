import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Building2, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CommercialServices = () => {
  const services = [
    "Office buildings", "Retail spaces", "Restaurants", "Hotels", "Medical facilities",
    "Educational facilities", "Warehouses", "Manufacturing plants"
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Commercial Painting Services | Ascent Group"
        description="Professional commercial painting for offices, retail, hospitality, and industrial facilities. After-hours scheduling, minimal disruption."
        canonical="https://ascentgroupconstruction.com/services/commercial"
      />
      <Navigation />

      <PageHeader
        eyebrow="For Businesses"
        title="Commercial Services"
        description="Minimal disruption, maximum quality"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Commercial" }
        ]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">After-Hours Available</h3>
                <p className="text-sm text-muted-foreground">Night and weekend work to avoid disruption</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">$5M Liability</h3>
                <p className="text-sm text-muted-foreground">Fully insured and bonded</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">15 Concurrent Projects</h3>
                <p className="text-sm text-muted-foreground">Capacity for large-scale work</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Commercial Sectors We Serve</h2>
            <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
              {services.map(service => (
                <span key={service} className="px-4 py-2 bg-muted rounded-full text-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg">Request Proposal</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommercialServices;