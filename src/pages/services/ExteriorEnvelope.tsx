import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/ui/Button';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceTabs } from '@/components/services/ServiceTabs';
import { buildingEnvelopeVariants } from '@/data/merged-services-data';
import { createServiceSchema } from '@/utils/schema-injector';
import { breadcrumbSchema } from '@/utils/structured-data';
import heroImage from '@/assets/hero-building-envelope.jpg';
import { ServiceCitySection } from "@/components/services/ServiceCitySection";

const ExteriorEnvelope = () => {
  const serviceSchema = createServiceSchema({
    serviceType: 'Exterior Envelope Systems',
    areaServed: ['Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham', 'Hamilton', 'Burlington'],
    priceRange: '$$-$$$',
    subServices: ['Stucco & EIFS', 'Sealants & Caulking']
  });

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: 'Home', url: 'https://ascentgroupconstruction.com/' },
    { name: 'Services', url: 'https://ascentgroupconstruction.com/services' },
    { name: 'Exterior Envelope Systems', url: 'https://ascentgroupconstruction.com/services/exterior-envelope' }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Exterior Envelope Systems | Specialty Contractor Self-Performing Stucco, EIFS & Sealants"
        description="Specialty contractor self-performing complete building envelope protection including stucco, EIFS installation, and comprehensive sealant services. Waterproofing and weatherproofing expertise across Ontario commercial and multi-family projects."
        keywords="exterior envelope, specialty contractor, building envelope contractor, stucco, EIFS, sealants, caulking, waterproofing, weatherproofing, self-perform envelope, building protection"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Exterior Envelope" }
        ]} />
        <PageHero.Title>Exterior Envelope Systems</PageHero.Title>
        <PageHero.Subtitle>
          Complete building protection through expert stucco, EIFS, and sealant solutions.
        </PageHero.Subtitle>
        <PageHero.CTAs
          primaryText="Request Proposal" 
          primaryHref="/contact"
          secondaryText="View Projects"
          secondaryHref="/projects"
        />
      </PageHero.Root>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Exterior Envelope Protection
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From stucco and EIFS installation to comprehensive sealant services, we protect your building 
              from water infiltration, air leakage, and the elements while enhancing curb appeal.
            </p>
          </div>

          {/* Tabbed Service Variants */}
          <ServiceTabs variants={buildingEnvelopeVariants} />

          {/* CTA Section */}
          <div className="mt-16 bg-card border-2 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Protect Your Investment</h3>
            <p className="text-muted-foreground mb-6">
              Contact us today for a comprehensive exterior envelope assessment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Request Proposal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/projects">
                  View Projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExteriorEnvelope;
