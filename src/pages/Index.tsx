import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import Stats from "@/components/Stats";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import SEO from "@/components/SEO";
import BlogPreview from "@/components/BlogPreview";
import CaseStudyPreview from "@/components/CaseStudyPreview";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navigation />
      <main id="main-content" role="main">
        <Hero />
        <ServicesPreview />
        <Stats />
        <FeaturedProjects />
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
