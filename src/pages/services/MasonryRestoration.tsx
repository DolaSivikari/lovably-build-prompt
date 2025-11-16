import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import PageHeader from '@/components/PageHeader';
import { UnifiedCard } from "@/components/shared/UnifiedCard";
import { Section } from "@/components/sections/Section";
import { Button } from '@/ui/Button';
import { Building2, Hammer, Shield, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { CTA_TEXT } from "@/design-system/constants";
import { generateServiceSchema, generateBreadcrumbSchema, SERVICE_SCHEMAS } from '@/utils/schemaGenerators';
import heroImage from '@/assets/hero-masonry-restoration.jpg';
import { ServiceCitySection } from "@/components/services/ServiceCitySection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const MasonryRestoration = () => {
  const serviceConfig = SERVICE_SCHEMAS["masonry-restoration"];
  const siteUrl = window.location.origin;
  
  const serviceSchema = generateServiceSchema({
    name: serviceConfig.name,
    description: serviceConfig.description,
    url: `${siteUrl}/services/masonry-restoration`,
    provider: "Ascent Group Construction",
    areaServed: serviceConfig.areaServed,
    serviceType: serviceConfig.serviceType
  });

  const breadcrumbSchemaData = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Services", url: `${siteUrl}/services` },
    { name: "Masonry Restoration", url: `${siteUrl}/services/masonry-restoration` }
  ]);

  const stats = [
    { value: '50+', label: 'Heritage Projects' },
    { value: '100%', label: 'Code Compliance' },
    { value: '35 Years', label: 'Experience' },
    { value: '1M+', label: 'SF Restored' }
  ];

  const deliverables = [
    {
      icon: Building2,
      title: 'Brick & Stone Restoration',
      description: 'Historic preservation and modern masonry repairs using authentic materials, traditional techniques, and engineering-backed solutions for structural integrity.'
    },
    {
      icon: Hammer,
      title: 'Tuckpointing & Repointing',
      description: 'Expert mortar replacement matching original composition, color profile, and joint styling. Custom mortar formulation from our in-house lab ensuring seamless integration.'
    },
    {
      icon: Shield,
      title: 'Structural Masonry Repairs',
      description: 'Engineering-backed solutions for cracked walls, failed lintels, parapet reconstruction, and deteriorated structural masonry. Full P.Eng. stamped designs when required.'
    },
    {
      icon: Clock,
      title: 'Heritage Building Conservation',
      description: 'Specialized restoration services meeting municipal heritage standards, conservation guidelines, and Ontario Heritage Act requirements with proper documentation.'
    }
  ];

  const process = [
    {
      phase: 'Assessment & Engineering',
      description: 'Comprehensive condition assessment, mortar analysis, structural evaluation, and engineering review determining repair scope and methodology.'
    },
    {
      phase: 'Material Matching & Approval',
      description: 'Custom mortar formulation in our lab, historic brick/stone sourcing, material testing, and heritage approval coordination when required.'
    },
    {
      phase: 'Restoration Execution',
      description: 'Skilled master masons execute repairs using traditional methods supported by modern engineering, quality control, and warranty documentation.'
    }
  ];

  const advantages = [
    'Master masons with heritage restoration certifications and 35+ years experience',
    'In-house mortar lab for precise material matching and testing',
    'P.Eng. structural engineering support for complex repairs',
    'Experience with municipal heritage approvals and conservation guidelines',
    'Complete material testing and quality control protocols',
    'Comprehensive warranty documentation and maintenance plans'
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Masonry Restoration & Repair | Specialty Contractor with Master Masons"
        description="Specialty contractor self-performing masonry restoration including brick repair, tuckpointing, and heritage conservation. Master masons with in-house mortar lab serving Ontario commercial and institutional projects."
        keywords="masonry restoration, brick repair, specialty contractor, tuckpointing, stone restoration, heritage conservation, structural masonry, self-perform masonry"
        structuredData={[serviceSchema, breadcrumbSchemaData]}
      />
      <Navigation />

      <PageHeader
        title="Masonry Restoration"
        description="Expert brick, stone, and structural masonry repairs preserving your building's integrity"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Masonry Restoration' }
        ]}
        cta={{ label: CTA_TEXT.project, href: "/estimate" }}
      />

      {/* What We Deliver */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Masonry Solutions</h2>
            <p className="text-lg text-muted-foreground">
              From heritage conservation to modern repairs, we restore and preserve masonry structures
              with authentic materials and proven techniques.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {deliverables.map((item, index) => (
              <UnifiedCard key={index} variant="elevated" className="p-8">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </UnifiedCard>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Restoration Process</h2>
            <p className="text-lg text-muted-foreground">
              Methodical approach combining traditional craftsmanship with modern engineering
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Self-Perform Masonry Restoration</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Selected Restoration Projects</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Historic Library Restoration', detail: 'Complete brick restoration, Heritage Toronto approved' },
              { title: 'Cathedral Masonry Repair', detail: 'Stone conservation and structural stabilization' },
              { title: 'Century Building Tuckpointing', detail: '40,000 SF heritage-compliant repointing' }
            ].map((project, index) => (
              <UnifiedCard key={index} variant="interactive" className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.detail}</p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link to="/projects">View Project <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </UnifiedCard>
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
              As a specialty contractor focused on building envelope restoration, we self-perform masonry work with certified craftsmen—not subcontractors. This means superior craftsmanship, heritage preservation expertise, and direct accountability from our team to yours.
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
        serviceName="Masonry Restoration"
        serviceSlug="masonry-restoration"
        recentProjects={[
          {
            title: "Heritage Building Masonry Restoration",
            location: "Old Toronto Historic District",
            description: "Complete brick and stone restoration for 6-story heritage building including tuckpointing, brick replacement, and limestone repair with heritage committee oversight and period-appropriate materials."
          },
          {
            title: "Commercial Tower Masonry Repair",
            location: "Downtown Toronto Financial District",
            description: "Structural masonry repair for 18-story office tower including spalled brick replacement, shelf angle repairs, and comprehensive tuckpointing program over occupied building."
          },
          {
            title: "Church Restoration Project",
            location: "Etobicoke Historic Church",
            description: "Sympathetic masonry restoration including stone cleaning, mortar repointing with lime-based mortars, and structural repairs maintaining architectural integrity of 120-year-old structure."
          }
        ]}
        faqs={[
          {
            question: "How much does masonry restoration cost in Toronto?",
            answer: "Masonry restoration in Toronto typically ranges from $80-$150 per square foot of facade area depending on building height, extent of deterioration, and heritage requirements. Tuckpointing averages $15-$35 per square foot. Stone repair ranges $100-$250/sq ft. We provide detailed condition assessments and cost estimates."
          },
          {
            question: "When should I repoint my brick building in Ontario?",
            answer: "Repointing is typically needed every 25-50 years in Ontario depending on mortar type, exposure, and maintenance. Signs you need repointing include: crumbling mortar, gaps between bricks, interior moisture, and loose bricks. We recommend condition assessments every 10 years for commercial buildings."
          },
          {
            question: "Can you match historic masonry colors and textures?",
            answer: "Yes, we specialize in heritage masonry restoration throughout the GTA. We conduct mortar analysis to match original compositions, source period-appropriate bricks, and work with heritage consultants to ensure restorations meet municipal heritage guidelines while maintaining structural integrity."
          }
        ]}
      />

      {/* CTA Band */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Preserve Your Historic Masonry</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Expert restoration services backed by decades of heritage conservation experience
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

export default MasonryRestoration;
