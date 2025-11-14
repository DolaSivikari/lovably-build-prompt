import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EnhancedHero from "@/components/homepage/EnhancedHero";
import CompanyIntroduction from "@/components/homepage/CompanyIntroduction";
import ProvenTrackRecord from "@/components/homepage/ProvenTrackRecord";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import SEO from "@/components/SEO";
import CompanyOverviewHub from "@/components/homepage/CompanyOverviewHub";
import SmartCTA from "@/components/SmartCTA";
import ClientValueProposition from "@/components/homepage/ClientValueProposition";
import CertificationsBar from "@/components/homepage/CertificationsBar";
import PrequalPackage from "@/components/homepage/PrequalPackage";
import SkipLink from "@/components/SkipLink";
import ContentHub from "@/components/homepage/ContentHub";
import Testimonials from "@/components/Testimonials";
import { createHowToSchema, createQASchema, createSiteSearchSchema } from "@/utils/schema-injector";
import InsightsFeed from "@/components/insights/InsightsFeed";
import ValuePillars from "@/components/homepage/ValuePillars";

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
    "Ascent Group Construction is a prime specialty contractor for building envelope and restoration across Ontario. We deliver façade remediation programs, parking garage restoration, sealant replacement programs, and protective coatings. With self-performed core trades including EIFS, masonry, and coatings, we serve developers, property managers, and building owners across Toronto and the GTA with 15+ years of experience."
  );

  // Specialty Contractor Schema (replaces general contractor positioning)
  const specialtyContractorSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Ascent Group Construction",
    "description": "Prime specialty contractor for building envelope and restoration: façade remediation, parking garage restoration, and sealant programs across Ontario & the GTA.",
    "url": "https://ascentgroupconstruction.com/",
    "email": "mailto:hebun.isik.ca@gmail.com",
    "areaServed": [
      { "@type": "State", "name": "Ontario" },
      { "@type": "City", "name": "Toronto" },
      { "@type": "City", "name": "Mississauga" },
      { "@type": "City", "name": "Brampton" },
      { "@type": "City", "name": "Vaughan" },
      { "@type": "City", "name": "Markham" }
    ],
    "priceRange": "$25000-$150000",
    "serviceType": "Building Envelope & Restoration Contractor",
    "knowsAbout": [
      "façade remediation",
      "EIFS repair",
      "sealant replacement",
      "masonry restoration",
      "parking garage restoration",
      "building envelope",
      "protective coatings",
      "stucco repair",
      "waterproofing"
    ]
  };

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
    <div className="min-h-screen relative">
      <SkipLink />
      
      <SEO
        title="Ascent — Envelope & Restoration Contractor | Prime for Façade, Garage & Sealant Programs | Ontario & GTA"
        description="Prime envelope & restoration contractor in Ontario. Façade remediation, garage restoration, EIFS, masonry repair. Serving the GTA since 2009."
        keywords="envelope contractor Ontario, facade remediation Toronto, parking garage restoration GTA, building envelope contractor, EIFS repair, sealant replacement, masonry restoration, specialty contractor"
        structuredData={[specialtyContractorSchema, howToChooseContractor, whatDoesAscentDo, whyChooseUsSchema, siteSearchSchema]} 
        includeRating={true} 
      />
      <Navigation />
      <SmartCTA />
      <main id="main-content" role="main">
        <EnhancedHero />
        <ValuePillars />
        <CompanyIntroduction />
        
        {/* Market Intelligence Hub - Industry Pulse + Challenge/Response */}
        <ProvenTrackRecord />
        
        {/* Unified Client Value Proposition */}
        <ClientValueProposition />
        
        {/* Services Explorer */}
        <div className="py-24">
          <ServicesExplorer />
        </div>
        
        {/* Social Proof */}
        <Testimonials />
        <PrequalPackage />
        <InsightsFeed limit={9} showFilters={true} showPinnedFirst={true} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
