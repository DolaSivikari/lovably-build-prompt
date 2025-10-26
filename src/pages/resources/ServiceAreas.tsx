import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";

const ServiceAreas = () => (
  <div className="min-h-screen">
    <SEO title="Service Areas | Ascent Group" />
    <Navigation />
    <PageHeader title="Service Areas" description="Serving the Greater Toronto Area" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
    <section className="py-16 container mx-auto px-4"><p className="text-center">Toronto, Mississauga, Brampton, Vaughan, Markham, and surrounding areas.</p></section>
    <Footer />
  </div>
);

export default ServiceAreas;
