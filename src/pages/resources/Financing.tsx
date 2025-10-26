import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";

const Financing = () => (
  <div className="min-h-screen">
    <SEO title="Financing Options | Ascent Group" />
    <Navigation />
    <PageHeader title="Financing Options" description="Flexible payment solutions" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Financing" }]} />
    <section className="py-16 container mx-auto px-4"><p className="text-center">Payment plans available for qualified projects.</p></section>
    <Footer />
  </div>
);

export default Financing;
