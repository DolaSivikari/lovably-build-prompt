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

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navigation />
      <MobileStickyCTA />
      <main id="main-content" role="main">
        <NumberedLandingHero />
        <HomepageContent />
        <ServicesPreview />
        <Stats />
        <FeaturedProjects />
        <SocialProof />
        <BlogPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
