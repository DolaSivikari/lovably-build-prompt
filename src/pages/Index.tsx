import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NumberedLandingHero from "@/components/NumberedLandingHero";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import Stats from "@/components/Stats";
import FeaturedProjects from "@/components/FeaturedProjects";
import CTA from "@/components/CTA";
import SEO from "@/components/SEO";
import BlogPreview from "@/components/BlogPreview";
import SocialProof from "@/components/SocialProof";
import CompanyOverviewHub from "@/components/homepage/CompanyOverviewHub";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import TrustBar from "@/components/homepage/TrustBar";
import ClientSelector from "@/components/homepage/ClientSelector";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import CertificationsBar from "@/components/homepage/CertificationsBar";
import PrequalPackage from "@/components/homepage/PrequalPackage";
import QuickLinks from "@/components/homepage/QuickLinks";
import DirectAnswer from "@/components/seo/DirectAnswer";
import SkipLink from "@/components/SkipLink";
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
        <NumberedLandingHero />
        <TrustBar />
        
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
        <Stats />
        <CertificationsBar />
        <FeaturedProjects />
        <SocialProof />
        <PrequalPackage />
        <QuickLinks />
        <BlogPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
