import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DualPathHero from "@/components/DualPathHero";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import FeaturedProjects from "@/components/FeaturedProjects";
import SEO from "@/components/SEO";
import SocialProof from "@/components/SocialProof";
import CompanyOverviewHub from "@/components/homepage/CompanyOverviewHub";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import TrustBar from "@/components/homepage/TrustBar";
import ClientSelector from "@/components/homepage/ClientSelector";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import CertificationsBar from "@/components/homepage/CertificationsBar";
import PrequalPackage from "@/components/homepage/PrequalPackage";

import DirectAnswer from "@/components/seo/DirectAnswer";
import SkipLink from "@/components/SkipLink";
import InteractiveCTA from "@/components/homepage/InteractiveCTA";
import AchievementShowcase from "@/components/homepage/AchievementShowcase";
import ContentHub from "@/components/homepage/ContentHub";
import { createHowToSchema, createQASchema, createSiteSearchSchema } from "@/utils/schema-injector";

const Index = () => {
  // AEO/GEO Structured Data
  const howToChooseContractor = createHowToSchema({
    name: "How to Choose a Reliable Construction Contractor in Ontario",
    description: "A step-by-step guide to selecting a qualified construction contractor for your commercial or residential project",
    steps: [
      {
        position: 1,
        name: "Verify Licensing and Insurance",
        text: "Ensure the contractor has valid WSIB coverage, liability insurance, and necessary municipal licenses in Ontario"
      },
      {
        position: 2,
        name: "Check Experience and Portfolio",
        text: "Review their portfolio of completed projects similar to yours, with a minimum of 10+ years industry experience"
      },
      {
        position: 3,
        name: "Request Multiple References",
        text: "Contact at least 3 recent clients and verify project quality, timeline adherence, and communication"
      },
      {
        position: 4,
        name: "Compare Detailed Estimates",
        text: "Get itemized quotes from 3+ contractors, comparing materials, timelines, and warranties"
      },
      {
        position: 5,
        name: "Review Contract Terms",
        text: "Ensure written contracts include payment schedules, change order procedures, and completion guarantees"
      }
    ]
  });

  const whatDoesAscentDo = createQASchema(
    "What services does Ascent Group Construction provide?",
    "Ascent Group Construction provides comprehensive construction services across Ontario including commercial and residential painting, exterior systems (stucco, EIFS, masonry repair), metal cladding installation, parking garage restoration, waterproofing, and specialty construction. We serve Toronto, Mississauga, Brampton, Vaughan, and Markham with 15+ years of experience."
  );

  const siteSearchSchema = createSiteSearchSchema("https://ascentgroupconstruction.com");

  return (
    <div className="min-h-screen">
      <SkipLink />
      <SEO structuredData={[howToChooseContractor, whatDoesAscentDo, siteSearchSchema]} />
      <Navigation />
      <MobileStickyCTA />
      <main id="main-content" role="main">
        <DualPathHero />
        <TrustBar />
        
        {/* Trust Indicators Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Years In Business</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1,000+</div>
                <div className="text-sm text-muted-foreground">Units Annually</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">$5M</div>
                <div className="text-sm text-muted-foreground">Bonding Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15</div>
                <div className="text-sm text-muted-foreground">Concurrent Projects</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Direct Answer for AEO/GEO */}
        <DirectAnswer>
          <p className="text-lg leading-relaxed">
            <strong>Ascent Group Construction is Ontario&apos;s complete construction partner</strong>, 
            providing commercial painting, residential painting, exterior systems (stucco, EIFS, masonry), 
            metal cladding, and parking garage restoration across the Greater Toronto Area. 
            With 15+ years of experience, we serve property managers, commercial clients, and homeowners 
            in Toronto, Mississauga, Brampton, Vaughan, and Markham with fully licensed, insured, 
            and WSIB-compliant services.
          </p>
        </DirectAnswer>
        
        <CompanyOverviewHub />
        <ClientSelector />
        <WhyChooseUs />
        <ServicesExplorer />
        <AchievementShowcase />
        <CertificationsBar />
        <FeaturedProjects />
        <SocialProof />
        <PrequalPackage />
        <ContentHub />
        <InteractiveCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
