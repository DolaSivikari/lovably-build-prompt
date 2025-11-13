import { Droplets, CheckCircle2, ArrowRight, Clock, Shield, Waves, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import heroImage from "@/assets/heroes/hero-sealant-replacement.jpg";
import { ServiceCitySection } from "@/components/services/ServiceCitySection";

const SealantReplacement = () => {
  const whatWeDeliver = [
    {
      icon: Target,
      title: "Leak Source Identification",
      description: "Water testing, thermal imaging, and forensic investigation to pinpoint failed joints and sealant breakdown locations."
    },
    {
      icon: Waves,
      title: "Premium Sealant Systems",
      description: "High-performance polyurethane, silicone, and polysulfide sealants specified for each application and substrate."
    },
    {
      icon: Shield,
      title: "Joint Design Compliance",
      description: "Engineered joint sizing, backer rod selection, and proper depth-to-width ratios ensuring long-term performance."
    },
    {
      icon: Droplets,
      title: "Waterproofing Integration",
      description: "Comprehensive sealing of window perimeters, control joints, curtain wall interfaces, and building penetrations."
    }
  ];

  const howWeWork = [
    {
      phase: "Investigation",
      activities: [
        "Building envelope water testing and leak tracing",
        "Existing sealant adhesion and cohesion testing",
        "Joint movement analysis and substrate evaluation",
        "Sealant specification and project scope development"
      ]
    },
    {
      phase: "Preparation",
      activities: [
        "Complete removal of failed sealant and debris",
        "Joint cleaning and substrate surface preparation",
        "Primer application where required by manufacturer",
        "Backer rod installation to proper joint depth"
      ]
    },
    {
      phase: "Installation",
      activities: [
        "Climate-controlled sealant application by certified crews",
        "Tool finish to proper concave joint profile",
        "Quality control testing and visual inspections",
        "Post-installation water testing and warranty documentation"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "High-Rise Window Wall Re-Sealing",
      location: "Downtown Toronto",
      size: "10,000+ linear feet",
      duration: "6 months",
      description: "Complete sealant replacement on 28-story residential tower eliminating persistent water infiltration issues."
    },
    {
      title: "Curtain Wall Joint Remediation",
      location: "Mississauga, ON",
      size: "40,000 sq ft facade",
      duration: "4 months",
      description: "Systematic sealant replacement at all curtain wall joints with upgraded high-movement polyurethane system."
    },
    {
      title: "Control Joint Waterproofing",
      location: "Vaughan, ON",
      size: "15-story commercial",
      duration: "3 months",
      description: "Failed control joint sealant replacement with engineered backer rod and traffic-grade polyurethane sealant."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Sealant Replacement Toronto | Building Joint Sealing Ontario"
        description="Professional sealant replacement services for commercial buildings. Window perimeters, control joints, curtain walls. 10,000+ windows sealed with zero leak callbacks across the GTA."
        keywords="sealant replacement Toronto, building joint sealing, window sealing, curtain wall sealant, control joint sealing, waterproofing sealant Toronto"
      />
      <Navigation />
      
      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Sealant Replacement" }
        ]} />
        <PageHero.Title>Sealant Replacement Programs</PageHero.Title>
        <PageHero.Subtitle>
          Comprehensive joint sealing eliminating water infiltration at windows, control joints, and building interfaces.
        </PageHero.Subtitle>
        <PageHero.CTAs
          primaryText="Request Quote" 
          primaryHref="/contact"
          secondaryText="View Projects"
          secondaryHref="/projects"
        />
      </PageHero.Root>

      <main>
        {/* What We Deliver */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">What We Deliver</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Engineered sealant replacement programs addressing water infiltration, air leakage, and building envelope performance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whatWeDeliver.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">How We Work</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our proven three-phase approach ensures proper sealant adhesion, joint design compliance, and long-term waterproofing performance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {howWeWork.map((phase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">{phase.phase}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Case Studies */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4">Selected Case Studies</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Recent sealant replacement projects demonstrating our technical expertise and quality workmanship.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {caseStudies.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {project.location}
                      </span>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                        {project.size}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Completed in {project.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* City-Specific SEO Section */}
        <ServiceCitySection
          serviceName="Sealant Replacement & Joint Sealing"
          serviceSlug="sealant-replacement"
          recentProjects={[
            {
              title: "High-Rise Window Perimeter Sealing",
              location: "Toronto Condominium Tower",
              description: "Complete window perimeter sealant replacement for 28-story residential tower using silicone sealants with 20-year service life and comprehensive leak testing program."
            },
            {
              title: "Curtain Wall Joint Sealing",
              location: "Mississauga Corporate Office",
              description: "Structural silicone glazing system maintenance and perimeter joint sealing for 12-story curtain wall building with rope access logistics minimizing tenant disruption."
            },
            {
              title: "Expansion Joint Replacement",
              location: "North York Commercial Complex",
              description: "Building expansion joint system replacement including traffic-rated and pedestrian-rated joints for mixed-use development with coordinated phasing maintaining building operations."
            }
          ]}
          faqs={[
            {
              question: "How often should building sealants be replaced in Toronto?",
              answer: "Building sealants in Toronto typically need replacement every 10-20 years depending on exposure, sealant type, and UV exposure. Window perimeter joints: 12-18 years. Expansion joints: 10-15 years. Vertical facade joints: 15-20 years. Regular inspections every 5 years help identify failing joints before leaks occur."
            },
            {
              question: "How much does sealant replacement cost in the GTA?",
              answer: "Sealant replacement costs in the GTA vary by location and access: window perimeters $15-$35 per linear foot, vertical facade joints $18-$40/LF, expansion joints $45-$120/LF. High-rise projects requiring swing stages or rope access have additional mobilization costs. We provide detailed estimates after joint survey and assessment."
            },
            {
              question: "Can you replace sealants in winter in Ontario?",
              answer: "Some sealants can be installed in winter with proper precautions. Low-modulus silicones can be installed down to -10°C, though optimal conditions are 5-30°C. We use heated enclosures, substrate warming, and cold-weather sealant formulations for winter work. Spring-fall (April-November) offers ideal conditions for most sealant work."
            }
          ]}
        />

        {/* CTA Band */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Experiencing Water Leaks?</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Request a leak investigation and let our experts develop a comprehensive sealant replacement program for your building.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">
                  Request Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/about">Talk to a Specialist</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SealantReplacement;