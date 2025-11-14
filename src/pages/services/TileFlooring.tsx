import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { Ruler, Shield, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/heroes/hero-tile-flooring.jpg';
import { ServiceCitySection } from "@/components/services/ServiceCitySection";

const TileFlooring = () => {
  const stats = [
    { value: '500K+', label: 'SF Installed' },
    { value: '100%', label: 'Warranty Compliant' },
    { value: '200+', label: 'Projects Complete' },
    { value: '15 Years', label: 'Experience' }
  ];

  const deliverables = [
    {
      icon: Ruler,
      title: 'Ceramic & Porcelain Tile',
      description: 'Large-format porcelain, ceramic tile, and mosaic installations for commercial lobbies, corridors, and high-traffic areas.'
    },
    {
      icon: Shield,
      title: 'Luxury Vinyl & Resilient Flooring',
      description: 'Commercial-grade LVT, sheet vinyl, and resilient flooring systems with seamless installation and proper substrate preparation.'
    },
    {
      icon: Sparkles,
      title: 'Specialty Surfaces',
      description: 'Natural stone, terrazzo, epoxy flooring, and decorative concrete for unique aesthetic and performance requirements.'
    },
    {
      icon: Clock,
      title: 'Waterproofing & Substrate Prep',
      description: 'Critical waterproof membrane installation, crack isolation, and proper substrate leveling ensuring long-term performance.'
    }
  ];

  const process = [
    {
      phase: 'Substrate Assessment',
      description: 'Moisture testing, flatness verification, and structural evaluation to determine proper preparation requirements.'
    },
    {
      phase: 'Preparation & Waterproofing',
      description: 'Substrate leveling, crack repair, waterproof membrane application, and proper slope verification for wet areas.'
    },
    {
      phase: 'Installation & Finishing',
      description: 'Precision tile layout, proper thinset/adhesive application, grout installation, and sealing per manufacturer specifications.'
    }
  ];

  const advantages = [
    'NTCA-certified tile installers',
    'In-house substrate preparation crews',
    'Proper waterproofing protocols for wet areas',
    'Full warranty compliance documentation'
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Tile & Flooring Installation | Commercial & Multi-Family Projects Ontario"
        description="Professional tile installation and flooring services for commercial, institutional, and multi-family projects. Ceramic, porcelain, LVT, and specialty surfaces with certified crews and warranty-compliant installation."
        keywords="tile installation, commercial flooring, porcelain tile, luxury vinyl tile, LVT installation, ceramic tile contractor, flooring contractor Ontario"
      />
      <Navigation />

      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Tile & Flooring', href: '/services/tile-flooring' }
        ]} />
        <PageHero.Title>Tile & Flooring Installation</PageHero.Title>
        <PageHero.Subtitle>
          Professional flooring solutions for commercial and multi-family projects
        </PageHero.Subtitle>
        <PageHero.Stats stats={stats} />
        <PageHero.CTAs primaryText="Request Quote" primaryHref="/estimate" />
      </PageHero.Root>

      <main className="flex-1">
        {/* What We Deliver Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Deliver</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tile and flooring installations backed by proper substrate preparation and warranty compliance
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverables.map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <item.icon className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Systematic approach ensuring proper installation and long-term performance
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold">{step.phase}</h3>
                  </div>
                  <p className="text-muted-foreground ml-14">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Ascent for Tile & Flooring</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-lg">{advantage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Cities Section */}
        <ServiceCitySection serviceName="Tile & Flooring" serviceSlug="tile-flooring" />

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Flooring Project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get expert tile and flooring installation backed by certified crews and warranty compliance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/estimate">Request Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TileFlooring;