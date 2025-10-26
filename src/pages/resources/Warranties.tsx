import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";

const Warranties = () => (
  <div className="min-h-screen">
    <SEO title="Warranties & Guarantees | Ascent Group" />
    <Navigation />
    <PageHeader title="Warranties & Guarantees" description="Our commitment to quality" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Warranties" }]} />
    <section className="py-16 container mx-auto px-4"><p className="text-center">5-year workmanship warranty on all projects.</p></section>
    <Footer />
  </div>
);

export default Warranties;
