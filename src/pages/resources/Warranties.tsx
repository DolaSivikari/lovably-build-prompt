import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/sections/Section";
import { CTA_TEXT } from "@/design-system/constants";

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
            breadcrumbs={[
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
              { name: "Warranties" }
            ]}
            cta={{ text: CTA_TEXT.contact, href: "/contact" }}
          />
          <Section size="major" maxWidth="narrow">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-8">
                We stand behind every project with industry-leading warranties. Contact us to learn more about our comprehensive guarantee programs.
              </p>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Warranties;
