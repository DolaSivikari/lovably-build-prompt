import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";

const Warranties = () => {
  return (
    <>
      <SEO 
        title="Warranties & Guarantees | Ascent Group Construction"
        description="Learn about our comprehensive warranties and guarantees. We stand behind our work with industry-leading protection for your investment."
        canonical="/resources/warranties"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main id="main-content">
          <PageHeader
            title="Warranties & Guarantees"
            description="Protecting your investment with comprehensive coverage"
          />
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-muted-foreground mb-8">
                  We stand behind every project with industry-leading warranties. Contact us to learn more about our comprehensive guarantee programs.
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

export default Warranties;
