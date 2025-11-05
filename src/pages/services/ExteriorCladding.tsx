import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/ui/Button';
import { Card } from "@/components/ui/card";
import { Home, Layers, Palette, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { createServiceSchema } from '@/utils/schema-injector';
import { breadcrumbSchema } from '@/utils/structured-data';
import heroImage from '@/assets/hero-exterior-cladding.jpg';

const ExteriorCladding = () => {
  const serviceSchema = createServiceSchema({
    serviceType: 'Exterior Cladding Systems',
    areaServed: ['Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham', 'Hamilton', 'Burlington'],
    priceRange: '$$$',
    subServices: ['Siding Installation', 'Metal Cladding', 'Panel Systems']
  });

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: 'Home', url: 'https://ascentgroupconstruction.com/' },
    { name: 'Services', url: 'https://ascentgroupconstruction.com/services' },
    { name: 'Exterior Cladding', url: 'https://ascentgroupconstruction.com/services/exterior-cladding' }
  ]);

  const stats = [
    { value: '1M+', label: 'SF Installed' },
    { value: '40+ Years', label: 'System Life' },
    { value: '350+', label: 'Projects' },
    { value: '100%', label: 'Weathertight' }
  ];

  const deliverables = [
    {
      icon: Home,
      title: 'Vinyl & Fiber Cement Siding',
      description: 'Traditional siding systems with modern materials offering low maintenance and lasting performance.'
    },
    {
      icon: Layers,
      title: 'Engineered Wood Systems',
      description: 'Premium wood-based cladding systems combining natural aesthetics with advanced weather protection.'
    },
    {
      icon: Palette,
      title: 'Composite Cladding',
      description: 'High-performance composite panels offering unlimited design options with superior durability.'
    },
    {
      icon: Shield,
      title: 'Stucco & EIFS Systems',
      description: 'Traditional stucco and Exterior Insulation Finishing Systems with superior thermal performance and design flexibility.'
    },
    {
      icon: CheckCircle2,
      title: 'Sealants & Caulking',
      description: 'Professional weatherproofing and building envelope protection with high-performance sealant systems.'
    },
    {
      icon: Shield,
      title: 'Rainscreen Applications',
      description: 'Ventilated rainscreen assemblies maximizing weather protection and building envelope performance.'
    }
  ];

  const process = [
    {
      phase: 'System Selection',
      description: 'Material evaluation, design consultation, and performance review ensuring optimal cladding selection.'
    },
    {
      phase: 'Envelope Preparation',
      description: 'Weather barrier installation, drainage plane creation, and substrate preparation for cladding attachment.'
    },
    {
      phase: 'Cladding Installation',
      description: 'Precision installation with attention to details, transitions, and penetrations for lasting weathertightness.'
    }
  ];

  const advantages = [
    'Experience with all major cladding systems and materials',
    'In-house fabrication for custom trim and accessories',
    'Complete envelope integration and warranty coverage',
    'Energy efficiency improvements through proper installation'
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Exterior Cladding & Siding Systems | Modern Facade Solutions"
        description="Professional exterior cladding installation including siding systems, composite panels, and rainscreen applications for commercial and residential buildings."
        keywords="exterior cladding, siding installation, composite panels, rainscreen systems, building envelope, facade systems"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Exterior Cladding' }
        ]} />
        <PageHero.Title>Exterior Cladding Systems</PageHero.Title>
        <PageHero.Subtitle>
          Complete cladding solutions enhancing aesthetics and protecting building envelopes
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Cladding Solutions</h2>
            <p className="text-lg text-muted-foreground">
              From traditional siding to modern composite systems, we install exterior cladding that
              protects your investment while enhancing curb appeal.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Cladding Process</h2>
            <p className="text-lg text-muted-foreground">
              Systematic approach ensuring proper envelope integration and lasting performance
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Self-Perform Exterior Cladding</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Selected Cladding Projects</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Multi-Family Residence', detail: 'Complete fiber cement siding, 24 units, Markham' },
              { title: 'Retail Complex Re-Clad', detail: 'Composite panel system upgrade, Mississauga' },
              { title: 'Commercial Building', detail: 'Rainscreen cladding installation, Toronto' }
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upgrade Your Building Exterior</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Expert cladding installation with superior weather protection and lasting aesthetics
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

export default ExteriorCladding;
