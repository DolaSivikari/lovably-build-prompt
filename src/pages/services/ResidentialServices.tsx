import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Paintbrush, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ResidentialServices = () => {
  const services = [
    { name: "Interior Painting", desc: "Professional interior painting for homes" },
    { name: "Exterior Painting", desc: "Weather-resistant exterior coatings" },
    { name: "Stucco Repair", desc: "Expert stucco and EIFS repair" },
    { name: "Cabinet Refinishing", desc: "Kitchen and bathroom updates" },
  ];

  return (
    <div className="min-h-screen">
      <SEO title="Residential Services | Ascent Group" description="Professional residential painting and finishing services" />
      <Navigation />
      <PageHeader title="Residential Services" description="Quality craftsmanship for your home" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Residential" }]} />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Paintbrush className="w-8 h-8 text-secondary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{s.name}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/contact?type=residential"><Button size="lg" className="bg-secondary hover:bg-secondary/90">Get Your Free Quote</Button></Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ResidentialServices;
