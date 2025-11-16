import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { UnifiedPageHero } from "@/components/sections/UnifiedPageHero";
import { UnifiedCard } from "@/components/shared/UnifiedCard";
import { Section } from "@/components/sections/Section";
import { Button } from "@/ui/Button";
import { CheckCircle2, Clock, TrendingUp, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { CTA_TEXT } from "@/design-system/constants";

const Retail = () => {
  const valuePropositions = [
    {
      icon: Clock,
      title: "After-Hours Construction",
      description: "Overnight and weekend scheduling to keep your store open and revenue flowing during renovations"
    },
    {
      icon: TrendingUp,
      title: "Fast-Track Delivery",
      description: "Accelerated timelines to meet seasonal launches, grand openings, and critical sales periods"
    },
    {
      icon: Store,
      title: "Brand Experience Focus",
      description: "Precision execution of brand standards and design specifications for consistent customer experience"
    }
  ];

  const retailProjects = [
    {
      name: "Flagship Store Renovation",
      description: "Complete transformation of 15,000 sq ft retail space with modern fixtures, lighting, and experiential zones",
      metrics: "6-week turnaround, store remained operational",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
    },
    {
      name: "Shopping Mall Food Court Upgrade",
      description: "Renovated 12,000 sq ft food court with new seating, finishes, and infrastructure for 8 restaurant tenants",
      metrics: "Completed during off-hours, zero mall closure",
      image: "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800&h=600&fit=crop"
    },
    {
      name: "Multi-Location Retail Rollout",
      description: "Coordinated build-out of 14 new store locations across GTA for national retail chain",
      metrics: "$5.2M program, all stores opened on schedule",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop"
    }
  ];

  const capabilities = [
    "Tenant improvement and store build-outs",
    "Brand refresh and remodel programs",
    "Food service and restaurant construction",
    "Storefront and facade renovations",
    "Retail fixture installation and millwork",
    "Flooring, lighting, and finishes",
    "Display and merchandising build-outs",
    "Multi-location program management"
  ];

  return (
    <>
      <SEO 
        title="Retail Construction Services | Store Build-Outs & Renovations"
        description="Fast-track retail construction and tenant improvements for stores, restaurants, and shopping centers. After-hours scheduling, accelerated timelines, brand-focused execution across the GTA."
        canonical="/markets/retail"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main id="main-content">
        <PageHeader
          eyebrow="Retail Market"
          title="Building Better Shopping Experiences"
          description="Expert retail construction and renovation services with fast-track delivery and minimal business disruption"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Markets", href: "/markets/commercial" },
            { label: "Retail" }
          ]}
          variant="standard"
          backgroundImage={heroRetail}
        />

          {/* Value Propositions */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Why Retailers Choose Ascent</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {valuePropositions.map((prop, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <prop.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{prop.title}</h3>
                        <p className="text-muted-foreground">{prop.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Retail Projects Gallery */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">Retail Project Portfolio</h2>
                  <p className="text-lg text-muted-foreground">Creating exceptional retail environments that drive sales</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {retailProjects.map((project, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-xl transition-all group">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                        <div className="pt-3 border-t">
                          <p className="text-xs font-semibold text-primary">{project.metrics}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Retail Capabilities */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Retail-Specific Capabilities</h2>
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
                <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Retail Space?</h2>
                <p className="text-xl mb-8 opacity-90">
                  Let's discuss how we can deliver your store renovation or build-out without disrupting sales.
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

export default Retail;
