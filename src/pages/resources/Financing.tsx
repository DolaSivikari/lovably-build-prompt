import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { UnifiedPageHero } from "@/components/sections/UnifiedPageHero";
import { Section } from "@/components/sections/Section";
import { CTA_TEXT } from "@/design-system/constants";

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
          <UnifiedPageHero
            title="Financing Options"
            description="Flexible payment solutions for your construction project"
            primaryCTA={{ text: CTA_TEXT.contact, href: "/contact" }}
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: "Financing" }
            ]}
          />
          <Section size="major" maxWidth="narrow">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-8">
                We offer flexible financing options to make your project more affordable. Contact us to discuss payment plans tailored to your needs.
              </p>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Financing;
