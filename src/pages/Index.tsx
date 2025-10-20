import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NumberedLandingHero from "@/components/NumberedLandingHero";
import ServicesPreview from "@/components/ServicesPreview";
import Stats from "@/components/Stats";
import FeaturedProjects from "@/components/FeaturedProjects";
import CTA from "@/components/CTA";
import SEO from "@/components/SEO";
import BlogPreview from "@/components/BlogPreview";
import SocialProof from "@/components/SocialProof";
import HomepageContent from "@/components/HomepageContent";
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
        <HomepageContent />
        <ClientSelector />
        <WhyChooseUs />
        <ServicesPreview />
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
