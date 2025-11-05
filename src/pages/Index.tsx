import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EnhancedHero from "@/components/homepage/EnhancedHero";
import CompanyIntroduction from "@/components/homepage/CompanyIntroduction";
import MetricsDashboard from "@/components/homepage/MetricsDashboard";
import CertificationBadges from "@/components/homepage/CertificationBadges";
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
    "Ascent Group Construction provides comprehensive general contracting services across Ontario including commercial construction, multi-family projects, exterior systems (stucco, EIFS, masonry repair), metal cladding installation, parking garage restoration, waterproofing, and institutional construction. We serve Toronto, Mississauga, Brampton, Vaughan, and Markham with 15+ years of experience."
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
        "description": "Comprehensive construction services including commercial construction, masonry repair, EIFS installation, metal cladding, and parking garage restoration throughout Toronto and the GTA."
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
        title="General Contractor Toronto | Commercial Construction & Building Envelope"
        description="Full-service General Contractor in Toronto delivering commercial, multi-family residential, and institutional construction solutions. Specializing in construction management, design-build, and building envelope systems across Ontario."
        keywords="general contractor Toronto, construction management, design-build services, commercial construction, multi-family residential, institutional construction, building envelope, GTA general contractor, Toronto construction company"
        structuredData={[howToChooseContractor, whatDoesAscentDo, whyChooseUsSchema, siteSearchSchema]} 
        includeRating={true} 
      />
      <Navigation />
      <MobileStickyCTA />
      <main id="main-content" role="main">
        <EnhancedHero />
        <CompanyIntroduction />
        
        {/* Single Metrics Section - Consolidated */}
        <MetricsDashboard />
        
        {/* Trust & Certifications - Consolidated */}
        <GCTrustStrip />
        
        {/* Direct Answer for AEO/GEO */}
        <DirectAnswer />
        
        {/* Target Audiences */}
        <WhoWeServe />
        
        {/* Value Proposition */}
        <div className="py-24">
          <WhyChooseUs />
        </div>
        
        {/* Services Explorer */}
        <div className="py-24">
          <ServicesExplorer />
        </div>
        
        {/* Social Proof */}
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
