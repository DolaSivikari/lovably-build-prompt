import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GCHero from "@/components/homepage/GCHero";
import GCTrustStrip from "@/components/homepage/GCTrustStrip";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";

import SEO from "@/components/SEO";
import SocialProof from "@/components/SocialProof";
import CompanyOverviewHub from "@/components/homepage/CompanyOverviewHub";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import WhoWeServe from "@/components/homepage/WhoWeServe";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import CertificationsBar from "@/components/homepage/CertificationsBar";
import PrequalPackage from "@/components/homepage/PrequalPackage";

import DirectAnswer from "@/components/seo/DirectAnswer";
import SkipLink from "@/components/SkipLink";
import AchievementShowcase from "@/components/homepage/AchievementShowcase";
import ContentHub from "@/components/homepage/ContentHub";
import Testimonials from "@/components/Testimonials";
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

  // Why Choose Us Structured Data
  const whyChooseUsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Why Choose Ascent Group Construction",
    "description": "Six key reasons to choose Ascent Group Construction for your Toronto and GTA construction projects",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Licensed Construction Excellence Across Ontario",
        "description": "Fully licensed and insured with $5M liability coverage, WSIB compliant, and municipally licensed across the Greater Toronto Area with 500+ successful projects."
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Comprehensive Construction Services Under One Roof",
        "description": "21+ specialized services including commercial painting, masonry repair, EIFS installation, metal cladding, and parking garage restoration throughout Toronto and the GTA."
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Premium Materials & Manufacturer Warranties",
        "description": "Benjamin Moore and Sherwin-Williams authorized contractor using premium materials backed by extended manufacturer warranties."
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "On-Time, On-Budget Project Delivery",
        "description": "95% on-time completion rate with transparent pricing, itemized estimates, and dedicated project management across Ontario."
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Safety-First Approach to Every Project",
        "description": "OSHA certified crews with zero-incident safety record, comprehensive protocols, and full liability coverage."
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "24/7 Emergency Response Services",
        "description": "Same-day emergency assessment and response throughout Greater Toronto Area with dedicated rapid response team."
      }
    ]
  };

  const siteSearchSchema = createSiteSearchSchema("https://ascentgroupconstruction.com");

  return (
    <div className="min-h-screen">
      <SkipLink />
      <SEO 
        title="General Contractor Toronto | Commercial & Multi-Family Construction | Ascent Group"
        description="Full-service general contractor delivering commercial, multi-family, and institutional projects across Ontario. Design-build, construction management, and self-perform trades. Licensed, bonded, WSIB certified."
        keywords="general contractor Toronto, commercial construction Ontario, multi-family construction, construction management, design-build, building envelope, GTA contractor"
        structuredData={[howToChooseContractor, whatDoesAscentDo, whyChooseUsSchema, siteSearchSchema]} 
        includeRating={true} 
      />
      <Navigation />
      <MobileStickyCTA />
      <main id="main-content" role="main">
        <GCHero />
        <GCTrustStrip />
        
        {/* Direct Answer for AEO/GEO */}
        <DirectAnswer />
        
        <WhoWeServe />
        
        <div className="py-24">
          <CompanyOverviewHub />
        </div>
        
        <div className="py-24">
          <WhyChooseUs />
        </div>
        
        <div className="py-24">
          <ServicesExplorer />
        </div>
        
        <div className="py-24">
          <AchievementShowcase />
        </div>
        
        <CertificationsBar />
        <Testimonials />
        
        <SocialProof />
        <PrequalPackage />
        <ContentHub />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
