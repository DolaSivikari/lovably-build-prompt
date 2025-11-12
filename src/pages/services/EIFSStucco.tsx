import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/ui/Button';
import { Card } from "@/components/ui/card";
import { Shield, Droplets, Palette, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { createServiceSchema } from '@/utils/schema-injector';
import { breadcrumbSchema } from '@/utils/structured-data';
import heroImage from '@/assets/hero-eifs-stucco.jpg';

const EIFSStucco = () => {
  const serviceSchema = createServiceSchema({
    serviceType: 'EIFS & Stucco Systems',
    areaServed: ['Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham', 'Hamilton', 'Burlington'],
    priceRange: '$$$',
    subServices: ['EIFS Installation', 'Traditional Stucco', 'System Repairs']
  });

  const breadcrumbSchemaData = breadcrumbSchema([
    { name: 'Home', url: 'https://ascentgroupconstruction.com/' },
    { name: 'Services', url: 'https://ascentgroupconstruction.com/services' },
    { name: 'EIFS & Stucco', url: 'https://ascentgroupconstruction.com/services/eifs-stucco' }
  ]);

  const stats = [
    { value: '500K+', label: 'SF Installed' },
    { value: '100%', label: 'Warranty Coverage' },
    { value: '200+', label: 'Projects' },
    { value: 'ZERO', label: 'System Failures' }
  ];

  const deliverables = [
    {
      icon: Shield,
      title: 'EIFS Installation',
      description: 'Complete exterior insulation and finish systems with superior thermal performance and weather resistance.'
    },
    {
      icon: Droplets,
      title: 'Traditional Stucco',
      description: 'Classic cement-based stucco applications with modern waterproofing technology and lasting durability.'
    },
    {
      icon: Palette,
      title: 'Custom Finishes',
      description: 'Unlimited architectural designs with multiple textures, colors, and decorative elements.'
    },
    {
      icon: Award,
      title: 'System Repairs',
      description: 'Expert diagnosis and remediation of existing EIFS and stucco failures with comprehensive warranties.'
    }
  ];

  const process = [
    {
      phase: 'Substrate Preparation',
      description: 'Wall assessment, moisture barrier installation, and insulation board attachment with proper drainage planes.'
    },
    {
      phase: 'Base Coat & Mesh',
      description: 'Base coat application with embedded reinforcing mesh for crack resistance and structural integrity.'
    },
    {
      phase: 'Finish Application',
      description: 'Final coat with selected texture and color, sealed and protected for maximum longevity.'
    }
  ];

  const advantages = [
    'Factory-trained applicators with manufacturer certifications',
    'In-house quality control and moisture testing',
    'Complete warranty coverage on materials and labor',
    'Energy efficiency improvements up to 30%'
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="EIFS & Stucco Installation & Repair | Self-Performed by Specialty Contractor"
        description="Specialty contractor self-performing EIFS and stucco installation, repair, and restoration. Factory-trained applicators with manufacturer certifications serving Ontario's commercial and multi-family projects."
        keywords="EIFS installation, stucco systems, specialty contractor, self-perform EIFS, exterior insulation, stucco repair, EIFS restoration, energy efficient cladding"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'EIFS & Stucco' }
        ]} />
        <PageHero.Title>EIFS & Stucco Systems</PageHero.Title>
        <PageHero.Subtitle>
          Energy-efficient exterior finishes with superior aesthetics and lasting performance
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete EIFS & Stucco Solutions</h2>
            <p className="text-lg text-muted-foreground">
              From new installations to system repairs, we deliver energy-efficient exterior finish systems
              that enhance building performance and curb appeal.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Installation Process</h2>
            <p className="text-lg text-muted-foreground">
              Factory-certified application methods ensuring optimal performance and manufacturer warranties
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Self-Perform EIFS & Stucco</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Selected EIFS & Stucco Projects</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Mixed-Use Development', detail: '150,000 SF EIFS system, Downtown Toronto' },
              { title: 'Retail Complex Restoration', detail: 'Complete EIFS repair and refinish, Mississauga' },
              { title: 'Residential Tower', detail: 'Energy-efficient EIFS retrofit, Markham' }
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
      
      {/* Specialty Contractor Advantage */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Specialty Contractor Difference</h2>
            <p className="text-lg text-muted-foreground mb-6">
              As a specialty contractor, we self-perform EIFS and stucco work with factory-trained crews—not subcontractors. This means better quality control, manufacturer-backed warranties, and direct accountability from our team to yours.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/why-specialty-contractor">
                Why Choose a Specialty Contractor? <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Enhance Your Building Exterior?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Get expert EIFS and stucco solutions with comprehensive warranties
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

export default EIFSStucco;
