import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Factory, HardHat, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const IndustrialServices = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Industrial Painting Services | Ascent Group"
        description="Specialized industrial coatings, floor systems, and protective coatings for manufacturing facilities, warehouses, and industrial sites."
        canonical="https://ascentgroupconstruction.com/services/industrial"
      />
      <Navigation />

      <PageHeader
        eyebrow="For Industrial Facilities"
        title="Industrial Services"
        description="Specialized coatings and protective systems"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Industrial" }
        ]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Factory className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold mb-2">Facility Coatings</h3>
                <p className="text-sm text-muted-foreground">
                  High-performance coatings for manufacturing plants and warehouses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <HardHat className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold mb-2">Epoxy Floor Systems</h3>
                <p className="text-sm text-muted-foreground">
                  Durable epoxy and polyurethane floor coatings for heavy traffic
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold mb-2">Protective Coatings</h3>
                <p className="text-sm text-muted-foreground">
                  Corrosion protection and chemical-resistant coatings
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustrialServices;