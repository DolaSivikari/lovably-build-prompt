import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import heroFinancingImage from "@/assets/heroes/hero-financing.jpg";

const Financing = () => {
  return (
    <>
      <SEO
        title="Financing Options | Ascent Group Construction"
        description="Flexible financing solutions for your construction project. Explore payment plans and financing options that fit your budget."
        canonical="/resources/financing"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main id="main-content">
          <PageHeader
            title="Financing Options"
            description="Flexible payment solutions for your construction project"
            backgroundImage={heroFinancingImage}
          />
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-muted-foreground mb-8">
                  We offer flexible financing options to make your project more
                  affordable. Contact us to discuss payment plans tailored to
                  your needs.
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

export default Financing;
