import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Building, Users, TrendingUp, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MultiUnitServices = () => {
  const capabilities = [
    { metric: "1,000+", label: "Units Completed" },
    { metric: "15", label: "Concurrent Projects" },
    { metric: "$10M", label: "Bonding Capacity" },
    { metric: "50+", label: "Field Personnel" }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Multi-Unit Development Services | Ascent Group"
        description="Large-scale painting and finishing for condos, apartments, and multi-unit developments. Capacity for 1,000+ units, proven developer partnerships."
        canonical="https://ascentgroupconstruction.com/services/multi-unit"
      />
      <Navigation />

      <PageHeader
        eyebrow="For Developers & GCs"
        title="Multi-Unit Services"
        description="Large-scale capacity trusted by Ontario's leading developers"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Multi-Unit" }
        ]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We've Completed 1,000+ Unit Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Proven capacity, reliable delivery, and competitive pricing for large-scale developments
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {capabilities.map((cap) => (
              <Card key={cap.label}>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{cap.metric}</div>
                  <p className="text-sm text-muted-foreground">{cap.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Building className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-xl mb-3">Project Types</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• New construction high-rises</li>
                  <li>• Condo tower repaints</li>
                  <li>• Apartment building renovations</li>
                  <li>• Townhouse developments</li>
                  <li>• Mixed-use developments</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Award className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-xl mb-3">Why Developers Choose Us</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Volume pricing structure</li>
                  <li>• Multi-phase project management</li>
                  <li>• 48-hour RFP response time</li>
                  <li>• Proven track record</li>
                  <li>• Long-term partnerships</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 space-x-4">
            <Button size="lg" asChild>
              <a href="/resources/contractor-portal">Download Contractor Package</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Request Proposal</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MultiUnitServices;