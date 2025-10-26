import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";

const IndustrialServices = () => (
  <div className="min-h-screen">
    <SEO title="Industrial Services | Ascent Group" />
    <Navigation />
    <PageHeader title="Industrial Services" description="Heavy-duty coatings and facility painting" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industrial" }]} />
    <section className="py-16 container mx-auto px-4"><p className="text-center text-muted-foreground">Warehouse painting, industrial coatings, and line marking.</p></section>
    <Footer />
  </div>
);

export default IndustrialServices;
