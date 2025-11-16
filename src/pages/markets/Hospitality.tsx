import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/sections/Section";
import { UnifiedCard } from "@/components/shared/UnifiedCard";
import { Button } from "@/ui/Button";
import { CheckCircle2, Bed, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { CTA_TEXT } from "@/design-system/constants";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const Hospitality = () => {
  const valuePropositions = [
    {
      icon: Bed,
      title: "Guest-First Approach",
      description: "Phased construction to keep rooms revenue-generating while renovating, with noise and dust mitigation protocols"
    },
    {
      icon: Clock,
      title: "Accelerated Timelines",
      description: "Fast-track delivery to minimize vacancy periods and maximize return on investment"
    },
    {
      icon: Sparkles,
      title: "Premium Finishes",
      description: "Expert execution of high-end finishes, millwork, and luxury materials that define guest experience"
    }
  ];

  const hospitalityProjects = [
    {
      name: "Boutique Hotel Renovation",
      description: "Complete transformation of 85-room boutique hotel including lobby, guest rooms, restaurant, and spa",
      metrics: "3-phase delivery, 50% occupancy maintained",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
    },
    {
      name: "Resort Conference Center Addition",
      description: "New 12,000 sq ft conference facility with ballroom, breakout rooms, and catering kitchen",
      metrics: "$6.8M project, completed for peak season",
      image: "https://images.unsplash.com/photo-1519167758481-83f29da8c9cb?w=800&h=600&fit=crop"
    },
    {
      name: "Restaurant and Bar Concept Build-Out",
      description: "Built upscale restaurant and cocktail lounge with custom millwork, show kitchen, and patio expansion",
      metrics: "8-week fast-track, opened on target date",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
    }
  ];

  const capabilities = [
    "Guest room and suite renovations",
    "Lobby and common area modernization",
    "Restaurant and bar build-outs",
    "Spa and fitness facility construction",
    "Conference and event space upgrades",
    "Kitchen and food service renovations",
    "Exterior facade and landscaping",
    "Phased renovation program management"
  ];

  return (
    <>
      <SEO 
        title="Hospitality Construction Services | Hotels & Resorts"
        description="Specialized hospitality construction for hotels, resorts, and restaurants. Phased renovations, accelerated timelines, premium finishes with minimal guest disruption across the GTA."
        canonical="/markets/hospitality"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main id="main-content">
          <PageHeader
            title="Crafting Memorable Guest Experiences"
            description="Expert construction and renovation services for hotels, resorts, and restaurants with guest-focused scheduling and premium execution"
            cta={{ label: CTA_TEXT.primary, href: "/contact" }}
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Markets", href: "/markets/commercial" },
              { label: "Hospitality" }
            ]}
          />

          {/* Value Propositions */}
          <Section size="major">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Hospitality Brands Choose Ascent</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {valuePropositions.map((prop, index) => (
                <UnifiedCard key={index} variant="elevated" className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <prop.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{prop.title}</h3>
                  <p className="text-muted-foreground">{prop.description}</p>
                </UnifiedCard>
              ))}
            </div>
          </Section>

          {/* Hospitality Projects Gallery */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">Hospitality Project Portfolio</h2>
                  <p className="text-lg text-muted-foreground">Building spaces where memories are made</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {hospitalityProjects.map((project, index) => (
                    <UnifiedCard key={index} variant="elevated" className="overflow-hidden hover:shadow-xl transition-all group p-0">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                        <div className="pt-3 border-t">
                          <p className="text-xs font-semibold text-primary">{project.metrics}</p>
                        </div>
                      </div>
                    </UnifiedCard>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Hospitality Capabilities */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Hospitality-Specific Capabilities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">Planning Your Hospitality Project?</h2>
                <p className="text-xl mb-8 opacity-90">
                  Let's discuss how we can renovate or expand your property while maintaining guest satisfaction and revenue.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/submit-rfp">Submit RFP</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Hospitality;
