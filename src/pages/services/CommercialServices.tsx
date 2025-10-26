import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Building2 } from "lucide-react";

const CommercialServices = () => (
  <div className="min-h-screen">
    <SEO title="Commercial Services | Ascent Group" />
    <Navigation />
    <PageHeader title="Commercial Services" description="Professional solutions for businesses" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Commercial" }]} />
    <section className="py-16 container mx-auto px-4 text-center">
      <Building2 className="w-16 h-16 text-primary mx-auto mb-4" />
      <p className="text-muted-foreground">Office painting, retail spaces, and tenant improvements.</p>
    </section>
    <Footer />
  </div>
);

export default CommercialServices;
