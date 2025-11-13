import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/ui/Button';
import { Card } from "@/components/ui/card";
import { Car, HardHat, Wrench, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { generateServiceSchema, generateBreadcrumbSchema, SERVICE_SCHEMAS } from '@/utils/schemaGenerators';
import heroImage from '@/assets/hero-parking-rehabilitation.jpg';
import { ServiceCitySection } from "@/components/services/ServiceCitySection";

const ParkingRehabilitation = () => {
  const serviceConfig = SERVICE_SCHEMAS["parking-rehabilitation"];
  const siteUrl = window.location.origin;
  
  const serviceSchema = generateServiceSchema({
    name: serviceConfig.name,
    description: serviceConfig.description,
    url: `${siteUrl}/services/parking-rehabilitation`,
    provider: "Ascent Group Construction",
    areaServed: serviceConfig.areaServed,
    serviceType: serviceConfig.serviceType
  });

  const breadcrumbSchemaData = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Services", url: `${siteUrl}/services` },
    { name: "Parking Rehabilitation", url: `${siteUrl}/services/parking-rehabilitation` }
  ]);

  const stats = [
    { value: '75+', label: 'Structures' },
    { value: '2M+', label: 'SF Restored' },
    { value: '30+ Years', label: 'Life Extension' },
    { value: '100%', label: 'In Service' }
  ];

  const deliverables = [
    {
      icon: Car,
      title: 'Concrete Restoration',
      description: 'Structural concrete repairs including spall repair, rebar replacement, and corrosion protection systems.'
    },
    {
      icon: HardHat,
      title: 'Traffic Coating Systems',
      description: 'Durable polyurethane and polyaspartic traffic membranes protecting against freeze-thaw and de-icing salts.'
    },
    {
      icon: Wrench,
      title: 'Structural Strengthening',
      description: 'Post-tensioning, carbon fiber reinforcement, and structural modifications to extend service life.'
    },
    {
      icon: Shield,
      title: 'Joint & Sealant Systems',
      description: 'Expansion joint replacement and comprehensive sealant programs preventing water intrusion.'
    }
  ];

  const process = [
    {
      phase: 'Condition Assessment',
      description: 'Structural engineering inspection, concrete testing, and corrosion mapping to determine rehabilitation scope.'
    },
    {
      phase: 'Phased Restoration',
      description: 'Strategic sequencing minimizing parking disruption while executing comprehensive concrete and coating repairs.'
    },
    {
      phase: 'Protection Systems',
      description: 'Traffic membrane installation, joint replacement, and corrosion inhibitor application for long-term protection.'
    }
  ];

  const advantages = [
    'Structural engineers on staff for complex repairs',
    'Phased construction maintaining parking availability',
    'Complete traffic membrane system warranties',
    'Experience with occupied structure rehabilitation'
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Parking Structure Rehabilitation | Specialty Contractor with Structural Engineers"
        description="Specialty contractor self-performing parking garage restoration including concrete restoration, traffic coating, and structural repairs. In-house structural engineers serving Ontario commercial and multi-family properties."
        keywords="parking structure rehabilitation, specialty contractor, parking garage restoration, concrete restoration, traffic coating, parking garage repair, structural strengthening, self-perform"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Parking Rehabilitation' }
        ]} />
        <PageHero.Title>Parking Structure Rehabilitation</PageHero.Title>
        <PageHero.Subtitle>
          Comprehensive restoration extending the life of parking structures while maintaining operations
        </PageHero.Subtitle>
        <PageHero.Stats stats={stats} />
        <PageHero.CTAs 
          primaryText="Request Assessment"
          primaryHref="/contact"
          secondaryText="View Projects"
          secondaryHref="/projects"
        />
      </PageHero.Root>

      {/* What We Deliver */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Parking Structure Solutions</h2>
            <p className="text-lg text-muted-foreground">
              From structural concrete restoration to advanced traffic coatings, we rehabilitate parking
              structures with minimal disruption and maximum longevity.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Rehabilitation Process</h2>
            <p className="text-lg text-muted-foreground">
              Strategic approach maximizing service life while minimizing operational impact
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Self-Perform Parking Rehabilitation</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Selected Rehabilitation Projects</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Hospital Parking Garage', detail: '6-level structure, complete restoration, Toronto' },
              { title: 'Retail Complex Parking', detail: '180,000 SF traffic coating and repairs, Vaughan' },
              { title: 'Residential Tower Garage', detail: 'Structural strengthening and waterproofing, Mississauga' }
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
              As a specialty contractor, we self-perform parking structure restoration with structural and waterproofing crews—not subcontractors. This means integrated solutions, faster response times, comprehensive warranties, and direct accountability from our team to yours.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/why-specialty-contractor">
                Why Choose a Specialty Contractor? <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* City-Specific SEO Section */}
      <ServiceCitySection
        serviceName="Parking Structure Rehabilitation"
        serviceSlug="parking-rehabilitation"
        recentProjects={[
          {
            title: "Underground Parkade Restoration",
            location: "North York Residential Tower",
            description: "Comprehensive parking garage rehabilitation for 6-level, 500-space underground structure including concrete repair, traffic coatings, waterproofing, and lighting upgrades extending service life 25+ years."
          },
          {
            title: "Multi-Level Parking Rehabilitation",
            location: "Mississauga Commercial Complex",
            description: "Phased parking structure restoration maintaining 75% space availability throughout 14-month project including structural repairs, joint replacement, and protective coating systems."
          },
          {
            title: "Above-Grade Parkade Renewal",
            location: "Toronto Entertainment District",
            description: "Complete rehabilitation of 4-level above-grade parking structure serving mixed-use development including concrete restoration, expansion joints, traffic membranes, and drainage improvements."
          }
        ]}
        faqs={[
          {
            question: "How much does parking garage rehabilitation cost in Toronto?",
            answer: "Parking garage rehabilitation in Toronto typically costs $18-$55 per square foot depending on deterioration extent and scope. Comprehensive restoration including concrete repair, waterproofing, and coatings averages $30-$45/sq ft. Basic coating renewal without structural work ranges $12-$25/sq ft. We provide detailed condition assessments and phased cost estimates."
          },
          {
            question: "How long do parking structure repairs last in Ontario?",
            answer: "Properly executed parking garage rehabilitation in Ontario's climate typically extends structure life 20-30 years. Traffic coating systems last 10-15 years, concrete repairs 25-40 years, expansion joints 12-20 years. Regular maintenance inspections every 3-5 years and minor repairs maximize investment longevity."
          },
          {
            question: "Can you rehabilitate parking garages while keeping them open?",
            answer: "Yes, we specialize in phased parking rehabilitation maintaining operations throughout construction. Our approach typically keeps 65-80% of spaces available, with rotating closures as work progresses by level and zone. We provide temporary traffic management, signage, and tenant communication ensuring minimal disruption to building operations."
          }
        ]}
      />

      {/* CTA Band */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Restore Your Parking Structure</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Expert rehabilitation services extending structure life by decades
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Request Assessment <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ParkingRehabilitation;
