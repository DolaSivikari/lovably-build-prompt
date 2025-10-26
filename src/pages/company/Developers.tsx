import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";

const Developers = () => {
  return (
    <>
      <SEO 
        title="Developers & Contractors | Ascent Group Construction"
        description="Partner with Ascent Group Construction for your development and contracting needs. Trusted by developers across the Greater Toronto Area."
        canonical="/company/developers"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main id="main-content">
          <PageHeader
            title="Developers & Contractors"
            description="Strategic partnerships for successful project delivery"
          />
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-muted-foreground mb-8">
                  We work with developers and contractors to deliver exceptional results on time and within budget. Contact us to discuss your next project.
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Developers;
