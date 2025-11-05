import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ServiceTabs } from '@/components/services/ServiceTabs';
import { paintingVariants } from '@/data/merged-services-data';
import { createServiceSchema } from '@/utils/schema-injector';
import { breadcrumbSchema } from '@/utils/structured-data';

const PaintingServices = () => {
  const serviceSchema = createServiceSchema({
    serviceType: 'Painting Services',
    areaServed: ['Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham', 'Hamilton', 'Burlington'],
    priceRange: '$$-$$$',
    subServices: ['Commercial Painting', 'Residential Painting', 'Condo & Multi-Unit Painting', 'Parking Garage Coating']
  });

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: 'Home', url: 'https://ascentgroupconstruction.com/' },
    { name: 'Services', url: 'https://ascentgroupconstruction.com/services' },
    { name: 'Painting Services', url: 'https://ascentgroupconstruction.com/services/painting' }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Professional Painting Services: Commercial, Residential & Parking Garage | Ascent Group"
        description="Expert painting services for commercial buildings, residential homes, multi-unit properties, and parking garage facilities. Interior & exterior painting across the GTA."
        keywords="painting services, commercial painting, residential painting, condo painting, multi-unit painting, parking garage coating, interior painting, exterior painting"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/80 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-primary-foreground">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-background/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Painting Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Painting Solutions
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Expert painting for commercial, residential, and multi-unit properties across Ontario
            </p>
            <Button size="lg" variant="secondary" className="group" asChild>
              <Link to="/contact">
                Request Proposal
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
              Complete Painting Services for Every Property Type
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you're refreshing a commercial space, transforming your home, managing a multi-unit property, or restoring a parking structure,
              Ascent Group delivers exceptional painting and coating results with minimal disruption.
            </p>
          </div>

          {/* Tabbed Service Variants */}
          <ServiceTabs variants={paintingVariants} />

          {/* CTA Section */}
          <div className="mt-16 bg-card border-2 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Space?</h3>
            <p className="text-muted-foreground mb-6">
              Contact us today for a free consultation and detailed quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Request Project Proposal
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

export default PaintingServices;
