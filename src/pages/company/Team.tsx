import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";

const Team = () => {
  return (
    <>
      <SEO 
        title="Our Team | Ascent Group Construction"
        description="Meet the professional team behind Ascent Group Construction. Experienced leaders in commercial and residential construction across the Greater Toronto Area."
        canonical="/company/team"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main id="main-content">
          <PageHeader
            title="Our Team"
            description="Meet the professionals driving excellence at Ascent Group Construction"
          />
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-muted-foreground mb-8">
                  Our team page is under construction. Check back soon to meet our leadership team and discover the expertise behind every project.
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

export default Team;
