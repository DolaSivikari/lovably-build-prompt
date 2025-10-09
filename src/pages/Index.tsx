import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NumberedLandingHero from "@/components/NumberedLandingHero";
import ServicesPreview from "@/components/ServicesPreview";
import Stats from "@/components/Stats";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import SEO from "@/components/SEO";
import BlogPreview from "@/components/BlogPreview";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import GoogleReviews from "@/components/GoogleReviews";
import HomepageContent from "@/components/HomepageContent";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import QuoteWidget from "@/components/QuoteWidget";

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
        
        {/* Quote Widget Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <QuoteWidget />
            </div>
          </div>
        </section>
        
        <FeaturedProjects />
        <GoogleReviews />
        <CaseStudyPreview />
        <BlogPreview />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
