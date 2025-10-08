import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import Stats from "@/components/Stats";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navigation />
      <Hero />
      <ServicesPreview />
      <Stats />
      <FeaturedProjects />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
