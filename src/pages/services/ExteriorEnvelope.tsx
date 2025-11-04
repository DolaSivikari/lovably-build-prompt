import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ServiceTabs } from '@/components/services/ServiceTabs';
import { buildingEnvelopeVariants } from '@/data/merged-services-data';
import { createServiceSchema } from '@/utils/schema-injector';
import { breadcrumbSchema } from '@/utils/structured-data';

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
        title="Exterior Envelope Systems: Stucco, EIFS & Sealants | Ascent Group"
        description="Expert exterior envelope protection including stucco application, EIFS installation, and professional sealant services. Waterproofing and weatherproofing across the GTA."
        keywords="exterior envelope, building envelope, stucco, EIFS, sealants, caulking, waterproofing, weatherproofing, exterior insulation, building protection"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/80 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-primary-foreground">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-background/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Exterior Envelope Systems
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Protect Your Exterior Envelope
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Expert stucco, EIFS, and sealant services to protect and enhance your building's exterior
            </p>
            <Button size="lg" variant="secondary" className="group" asChild>
              <Link to="/contact">
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

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
                  Request Free Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+16471234567">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="mailto:info@ascentgroup.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </a>
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
