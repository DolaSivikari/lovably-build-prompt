import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ServiceTabs } from '@/components/services/ServiceTabs';
import { interiorbuildoutsVariants } from '@/data/merged-services-data';
import { createServiceSchema } from '@/utils/schema-injector';
import { breadcrumbSchema } from '@/utils/structured-data';

const InteriorBuildouts = () => {
  const serviceSchema = createServiceSchema({
    serviceType: 'Interior Buildouts & Finishing',
    areaServed: ['Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham', 'Hamilton', 'Burlington'],
    priceRange: '$$-$$$',
    subServices: ['Suite Buildouts', 'Tenant Improvements', 'Drywall & Finishing']
  });

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: 'Home', url: 'https://ascentgroupconstruction.com/' },
    { name: 'Services', url: 'https://ascentgroupconstruction.com/services' },
    { name: 'Interior Buildouts & Finishing', url: 'https://ascentgroupconstruction.com/services/interior-buildouts' }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Interior Buildouts & Drywall Finishing Services | Ascent Group"
        description="Professional interior construction including suite buildouts, tenant improvements, drywall installation, and interior finishing for commercial and residential spaces."
        keywords="interior buildouts, suite buildouts, tenant improvements, drywall installation, interior finishing, commercial interiors"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage/95 via-sage/90 to-sage/80 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-primary-foreground">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-background/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Specialty Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Interior Buildouts & Finishing
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Complete interior construction from suite buildouts to precision drywall finishing
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
              Turnkey Interior Construction Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From ground-up tenant improvements to precision drywall finishing, we deliver complete 
              interior solutions with meticulous attention to detail and quality craftsmanship.
            </p>
          </div>

          {/* Tabbed Service Variants */}
          <ServiceTabs variants={interiorbuildoutsVariants} />

          {/* CTA Section */}
          <div className="mt-16 bg-card border-2 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Out Your Space?</h3>
            <p className="text-muted-foreground mb-6">
              Contact us for a consultation and detailed construction plan
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

export default InteriorBuildouts;
