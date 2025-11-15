import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/ui/Button";
import { 
  Building2, 
  Shield, 
  Target, 
  CheckCircle, 
  MapPin, 
  TrendingUp,
  Phone,
  Mail,
  FileText,
  Award,
  HardHat,
  Home,
  Factory
} from "lucide-react";
import { Link } from "react-router-dom";
import { VideoBackground } from "@/components/shared/VideoBackground";
import logoIntroVideo from "@/assets/ascent-logo-intro.mp4";
import heroAboutImage from "@/assets/heroes/hero-about-company.jpg";

const About = () => {
  const services = [
    "Façade Remediation & Cladding Repairs",
    "Sealant (Caulking) Replacement Programs",
    "Concrete & Parking Garage Repairs",
    "EIFS & Stucco Systems",
    "Masonry Restoration",
    "Waterproofing Systems",
    "Protective & Architectural Coatings"
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity & Transparency",
      description: "Straight scopes, clear pricing, and proactive communication."
    },
    {
      icon: HardHat,
      title: "Safety First",
      description: "Planning, training, and controls that protect occupants, crews, and property."
    },
    {
      icon: Award,
      title: "Craftsmanship & Compliance",
      description: "Manufacturer-aligned methods and detail-driven execution."
    },
    {
      icon: Target,
      title: "Accountability",
      description: "We own outcomes and close projects with thorough documentation."
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Site Walk & Assessment",
      description: "We meet on site to understand the issue, constraints, and access. For urgent matters, we aim to attend within 48–72 hours (subject to safety and access)."
    },
    {
      number: "02",
      title: "Scope & Proposal",
      description: "You receive a clear, itemized scope—drawings/photos as needed, alternates where helpful, and unit rates for repetitive work. We prioritize fast, complete submittals so you can move forward confidently."
    },
    {
      number: "03",
      title: "Mobilize & Execute",
      description: "We coordinate permits, access, logistics, and occupant notices. A dedicated lead oversees daily safety, quality, and schedule."
    },
    {
      number: "04",
      title: "Quality Assurance & Reporting",
      description: "Field checks, photo logs, and (when requested) ITPs/inspection records ensure work follows specifications and manufacturer guidance."
    },
    {
      number: "05",
      title: "Closeout & Warranty",
      description: "Final walkthrough, punch completion, turnover package (photos, product data, care guidance), and applicable warranty."
    }
  ];

  const clientTypes = [
    {
      icon: Building2,
      title: "Property Managers & Building Owners/Developers",
      description: "Condos, multi-residential, commercial, and institutional properties seeking dependable prime execution for envelope and restoration scopes.",
      priority: "Primary"
    },
    {
      icon: FileText,
      title: "Envelope/Building Consultants",
      description: "A responsive specialty partner who follows details and documents work thoroughly.",
      priority: "Primary"
    },
    {
      icon: Factory,
      title: "General Contractors",
      description: "Unit-rate and tender support for envelope trade packages (EIFS/stucco, sealants, coatings, masonry, garage rehab, waterproofing).",
      priority: "Secondary"
    },
    {
      icon: Home,
      title: "Homeowners",
      description: "Emergency and maintenance requests only.",
      priority: "Limited"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="About Us - Ontario's Building Envelope & Restoration Specialist"
        description="Ascent Group Construction delivers accountable, prime-scope execution for building envelope and exterior restoration projects. Learn about our approach, values, and vision."
        keywords="about Ascent Group, building envelope contractor, specialty contractor Ontario, restoration company, GTA contractor"
      />
      <Navigation />

      <div className="relative">
        <VideoBackground
          videoUrl={logoIntroVideo}
          posterUrl={heroAboutImage}
          overlay={true}
          overlayOpacity={0.4}
          showControls={false}
        >
          <div className="container mx-auto px-4 py-32 text-center">
            <p className="text-sm uppercase tracking-wider text-white/80 mb-4">About Us</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ontario's Building Envelope & Restoration Specialist
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Delivering accountable, prime-scope execution for owners, property managers, and consulting engineers.
            </p>
          </div>
        </VideoBackground>
      </div>

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About Us" }
        ]}
      />

      {/* Main Introduction */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-foreground/90 leading-relaxed mb-6">
                At Ascent Group Construction, we take full responsibility for the success of our specialty scopes. 
                As a lead/prime contractor for building envelope and exterior restoration projects, we coordinate 
                the required trades, manage safety and quality, and keep stakeholders informed from site walk to closeout.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Today, we focus on the work we do best—façade remediation, sealant replacement, concrete & parking 
                garage repair, EIFS/stucco, masonry restoration, waterproofing, and protective coatings—while building 
                toward our long-term goal of becoming a general contractor within the next 3–5 years.
              </p>
            </div>

            {/* Founder Quote */}
            <Card className="mt-12 border-l-4 border-primary bg-muted/30">
              <CardContent className="p-8">
                <blockquote className="text-xl italic text-foreground/90 mb-4">
                  "I started Ascent to raise the bar on reliability and accountability. Every scope we lead is 
                  treated like it's our own building—planned carefully, executed safely, and finished right."
                </blockquote>
                <p className="text-sm font-semibold text-primary">— Hebun Isik, Founder</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Who We Serve</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted partners across Ontario's construction ecosystem
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {clientTypes.map((client, index) => {
                const IconComponent = client.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold">{client.title}</h3>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              client.priority === 'Primary' ? 'bg-primary/20 text-primary' :
                              client.priority === 'Secondary' ? 'bg-secondary/20 text-secondary-foreground' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {client.priority}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{client.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What We Self-Perform */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What We Self-Perform</h2>
              <p className="text-lg text-muted-foreground">
                Each scope is planned for minimal disruption, clear sequencing, and documented QA/QC
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-lg font-medium">{service}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              Each scope is planned for minimal disruption, clear sequencing, and documented QA/QC so owners 
              and consultants have complete confidence in what was performed and why.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide every project we undertake
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="inline-flex p-4 bg-primary/10 rounded-full mb-6">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our 5-Step Approach */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our 5-Step Approach</h2>
              <p className="text-lg text-muted-foreground">
                A proven process for reliable project delivery
              </p>
            </div>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-8">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">{step.number}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety, Insurance & Compliance */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Safety, Insurance & Compliance</h2>
              <p className="text-lg text-muted-foreground">
                Your protection is our priority
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>WSIB compliance and safety training (e.g., Working at Heights/WHMIS)</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Commercial General Liability (CGL) coverage; certificates available on request</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Bonding/Pre-qualification support available on request (project-dependent)</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Job-specific Safety Plans, toolbox talks, and secure site practices</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Where We Work</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We serve <strong>Ontario & the Greater Toronto Area</strong>, with emphasis on the GTA and 
              Golden Horseshoe: Toronto, Mississauga, Brampton, Vaughan/Markham, Oakville/Burlington, 
              and Hamilton. We consider broader Ontario for the right project.
            </p>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-12 text-center">
                <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We're building a reputation as Ontario's trusted lead contractor for envelope & restoration 
                  scopes—and using that foundation to expand responsibly into a full GC service offering over 
                  the next 3–5 years. Every successful scope, relationship, and referral gets us closer—without 
                  compromising the service standards that define Ascent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ready to Work Together */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Work Together?</h2>
              <p className="text-lg text-muted-foreground">
                Let's discuss your project and how we can help
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Book a Site Walk</h3>
                  <p className="text-muted-foreground mb-6">48–72h target for urgent matters</p>
                  <Button asChild className="w-full">
                    <Link to="/contact">Schedule Visit</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Request a Quote</h3>
                  <p className="text-muted-foreground mb-6">Detailed project estimates</p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link to="/estimate">Get Quote</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">For GCs</h3>
                  <p className="text-muted-foreground mb-6">Trade packages & pre-qual docs</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Partner With Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
