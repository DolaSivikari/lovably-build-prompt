import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/ui/Button';
import { Card } from "@/components/ui/card";
import { Ruler, Layers, PaintBucket, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { createServiceSchema } from '@/utils/schema-injector';
import { breadcrumbSchema } from '@/utils/structured-data';
import heroImage from '@/assets/heroes/hero-tenant-improvements.jpg';

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
    { name: 'Interior Buildouts', url: 'https://ascentgroupconstruction.com/services/interior-buildouts' }
  ]);

  const stats = [
    { value: '500+', label: 'Buildouts' },
    { value: '2M+', label: 'SF Completed' },
    { value: '95%', label: 'On-Time Delivery' },
    { value: 'Level 5', label: 'Finish Quality' }
  ];

  const deliverables = [
    {
      icon: Ruler,
      title: 'Tenant Improvements',
      description: 'Complete commercial buildouts from base building to turnkey occupancy with all trades coordinated.'
    },
    {
      icon: Layers,
      title: 'Drywall & Metal Framing',
      description: 'Precision framing and drywall installation with specialty finishes including curves and reveals.'
    },
    {
      icon: PaintBucket,
      title: 'Interior Finishing',
      description: 'Complete finishing packages including paint, millwork, flooring, and ceiling systems.'
    },
    {
      icon: Building2,
      title: 'Suite Conversions',
      description: 'Adaptive reuse and space reconfiguration transforming existing interiors for new functions.'
    }
  ];

  const process = [
    {
      phase: 'Design Coordination',
      description: 'Architectural review, value engineering, and coordination with MEP trades for optimal buildout sequence.'
    },
    {
      phase: 'Rough-In & Framing',
      description: 'Metal framing installation, MEP rough-ins, and inspections before drywall enclosure.'
    },
    {
      phase: 'Finishing & Closeout',
      description: 'Drywall finishing, paint, flooring, millwork installation, and punch list completion for occupancy.'
    }
  ];

  const advantages = [
    'Complete trade coordination eliminating finger-pointing',
    'In-house millwork and specialty finishing capabilities',
    'Fast-track scheduling with proven sequencing methods',
    'Quality control at every phase ensuring Level 5 finishes'
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Interior Buildouts & Tenant Improvements | Commercial Interior Construction"
        description="Professional interior buildouts including tenant improvements, drywall installation, metal framing, and complete interior finishing for commercial spaces."
        keywords="interior buildouts, tenant improvements, drywall installation, metal framing, interior finishing, commercial interiors"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Interior Buildouts' }
        ]} />
        <PageHero.Title>Interior Buildouts & Finishing</PageHero.Title>
        <PageHero.Subtitle>
          Complete interior construction from tenant improvements to precision finishing
        </PageHero.Subtitle>
        <PageHero.Stats stats={stats} />
        <PageHero.CTAs 
          primaryText="Request Proposal"
          primaryHref="/contact"
          secondaryText="View Projects"
          secondaryHref="/projects"
        />
      </PageHero.Root>

      {/* What We Deliver */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Turnkey Interior Solutions</h2>
            <p className="text-lg text-muted-foreground">
              From commercial tenant improvements to complete suite buildouts, we deliver interior
              construction with quality craftsmanship and coordinated execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {deliverables.map((item, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Buildout Process</h2>
            <p className="text-lg text-muted-foreground">
              Coordinated execution ensuring quality finishes and on-time occupancy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.phase}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Perform Advantage */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Self-Perform Interior Buildouts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Selected Interior Projects</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Corporate Office Buildout', detail: '25,000 SF tenant improvement, Downtown Toronto' },
              { title: 'Medical Clinic Suite', detail: 'Complete buildout with specialty finishes, Mississauga' },
              { title: 'Retail Space Conversion', detail: 'Adaptive reuse from office to retail, Vaughan' }
            ].map((project, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.detail}</p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link to="/projects">View Project <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Out Your Space?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Expert interior construction with coordinated execution and quality finishes
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Request Proposal <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InteriorBuildouts;
