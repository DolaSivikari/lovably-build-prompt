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

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navigation />
      <MobileStickyCTA />
      <main id="main-content" role="main">
        <NumberedLandingHero />
        <TrustBar />
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
