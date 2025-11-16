import { Building, Heart, GraduationCap, Factory, Hotel, ShoppingBag, Landmark, Hammer, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { UnifiedCard } from "@/components/shared/UnifiedCard";
import { Button } from "@/ui/Button";
import SEO from "@/components/SEO";
import FeaturedProjects from "@/components/FeaturedProjects";
import heroMarketsImage from "@/assets/heroes/hero-markets-overview.jpg";

const Markets = () => {
  const marketSectors = [
    {
      title: "Commercial",
      description: "Office buildings, tenant improvements, and mixed-use developments with fast-track scheduling.",
      icon: Building,
      link: "/markets/commercial",
      stats: { projects: "250+", value: "$500M+" }
    },
    {
      title: "Multi-Family",
      description: "Residential communities, condominiums, and apartment complexes requiring coordinated trades.",
      icon: Building,
      link: "/markets/multi-family",
      stats: { projects: "180+", value: "$350M+" }
    },
    {
      title: "Healthcare",
      description: "Medical facilities, hospitals, and clinics with stringent infection control protocols.",
      icon: Heart,
      link: "/markets/healthcare",
      stats: { projects: "75+", value: "$200M+" }
    },
    {
      title: "Education",
      description: "Schools, universities, and training facilities with minimal disruption to operations.",
      icon: GraduationCap,
      link: "/markets/education",
      stats: { projects: "90+", value: "$180M+" }
    },
    {
      title: "Industrial",
      description: "Warehouses, distribution centers, and manufacturing facilities with heavy-duty requirements.",
      icon: Factory,
      link: "/markets/industrial",
      stats: { projects: "120+", value: "$280M+" }
    },
    {
      title: "Institutional",
      description: "Government buildings, civic centers, and public facilities meeting compliance standards.",
      icon: Landmark,
      link: "/markets/institutional",
      stats: { projects: "60+", value: "$150M+" }
    },
    {
      title: "Hospitality",
      description: "Hotels, resorts, and entertainment venues with premium finishes and tight timelines.",
      icon: Hotel,
      link: "/markets/hospitality",
      stats: { projects: "45+", value: "$120M+" }
    },
    {
      title: "Retail",
      description: "Shopping centers, big-box stores, and specialty retail with occupied space coordination.",
      icon: ShoppingBag,
      link: "/markets/retail",
      stats: { projects: "85+", value: "$160M+" }
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Market Sectors | Construction Services Across Industries | Ascent Group"
        description="Specialized construction services for commercial, multi-family, healthcare, education, industrial, institutional, hospitality, and retail sectors across the GTA."
      />
      <Navigation />
      
      <PageHeader
        title="Markets We Serve"
        description="Specialized construction expertise across diverse industry sectors"
        backgroundImage={heroMarketsImage}
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Overview */}
          <section className="mb-16 text-center max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              With decades of experience across multiple sectors, we understand the unique requirements, 
              regulations, and operational constraints of each industry. Our specialized approach ensures 
              your project receives the expertise it deserves.
            </p>
          </section>

          {/* Market Sectors Grid */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketSectors.map((sector, index) => {
                const Icon = sector.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{sector.title}</CardTitle>
                      <CardDescription className="min-h-[60px]">{sector.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                        <div>
                          <div className="font-semibold text-foreground">{sector.stats.projects}</div>
                          <div className="text-xs">Projects</div>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{sector.stats.value}</div>
                          <div className="text-xs">Contract Value</div>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Link to={sector.link}>
                          Learn More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Featured Projects */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects Across Markets</h2>
            <FeaturedProjects />
            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">
                  View All Projects
                </Link>
              </Button>
            </div>
          </section>

          {/* Why Choose Us by Sector */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Sector-Specific Expertise</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Deep understanding of building codes, accessibility standards, and industry-specific 
                    regulations across all sectors.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Operational Continuity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Proven track record of executing projects in occupied buildings with minimal 
                    disruption to your operations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Rigorous quality control processes tailored to each sector's unique standards 
                    and expectations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Ready to Discuss Your Project?</CardTitle>
                <CardDescription>Let's explore how our sector expertise can benefit your next construction project</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/submit-rfp">
                    Submit RFP
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Markets;
