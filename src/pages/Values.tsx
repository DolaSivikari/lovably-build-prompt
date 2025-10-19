import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/sections/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, MessageCircle, Shield, Heart, Users, Target } from "lucide-react";
import companyData from "@/data/company-info.json";

const iconMap: { [key: string]: any } = {
  award: Award,
  "message-circle": MessageCircle,
  shield: Shield,
  heart: Heart,
};

const Values = () => {
  const coreValues = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To deliver exceptional construction and finishing services that exceed client expectations while maintaining the highest standards of quality, safety, and professionalism."
    },
    {
      icon: Users,
      title: "Our Vision",
      description: "To be the most trusted and respected construction partner in the GTA, known for our craftsmanship, integrity, and commitment to building lasting relationships."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Our Values - What We Stand For"
        description="Discover the core values that guide Ascen Group Construction: Quality craftsmanship, transparent communication, safety, and customer satisfaction in every project."
        keywords="company values, construction integrity, quality craftsmanship, customer satisfaction, professional ethics"
      />
      <Navigation />

      <PageHeader
        eyebrow="Our Values"
        title="Guided by Core Values"
        description="The principles that drive our commitment to excellence and integrity in every project"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Values" }
        ]}
        variant="standard"
      />
      
      <main>

        {/* Mission & Vision */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {coreValues.map((value, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <value.icon className="w-10 h-10 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">{value.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">The Values That Define Us</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  These fundamental principles shape our culture and guide how we work with clients, partners, and each other
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {companyData.values.map((value, index) => {
                  const IconComponent = iconMap[value.icon];
                  return (
                    <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-2 group">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-primary">{value.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Ascent Advantage */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-3 px-4 py-1.5 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
                <span className="text-primary font-semibold text-sm tracking-wider uppercase">ASCENT ADVANTAGE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Why Choose Us?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Experience the difference of working with a construction partner who values excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Excellence in Execution */}
              <Card className="text-center hover:shadow-xl transition-all duration-300 group border-2">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Award className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Excellence in Execution</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every project receives the same commitment to quality, precision, and craftsmanship.
                  </p>
                </CardContent>
              </Card>

              {/* Safety First, Always */}
              <Card className="text-center hover:shadow-xl transition-all duration-300 group border-2">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Shield className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Safety First, Always</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    500+ projects with zero lost-time incidents. COR-certified safety protocols on every site.
                  </p>
                </CardContent>
              </Card>

              {/* Innovation & Technology */}
              <Card className="text-center hover:shadow-xl transition-all duration-300 group border-2">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Target className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Innovation & Technology</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Modern techniques and premium materials reduce rework and improve accuracy.
                  </p>
                </CardContent>
              </Card>

              {/* Client Partnership */}
              <Card className="text-center hover:shadow-xl transition-all duration-300 group border-2">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Client Partnership</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Collaborative approach with clients, architects, and trades ensures your vision becomes reality.
                  </p>
                </CardContent>
              </Card>

              {/* Sustainable Building */}
              <Card className="text-center hover:shadow-xl transition-all duration-300 group border-2">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Heart className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Sustainable Building</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Low-VOC materials and eco-friendly practices deliver long-term value.
                  </p>
                </CardContent>
              </Card>

              {/* Transparent Communication */}
              <Card className="text-center hover:shadow-xl transition-all duration-300 group border-2">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <MessageCircle className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Transparent Communication</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Real-time insights and shared dashboards—no surprises, just collaboration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How We Live Our Values */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Values in Action</h2>
                <p className="text-lg text-muted-foreground">
                  How our values translate into real-world practices and outcomes
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Quality in Every Detail</h3>
                    <p className="text-muted-foreground mb-4">
                      We use only premium materials from trusted suppliers like Benjamin Moore and Sherwin-Williams. Our craftsmen undergo continuous training to stay current with the latest techniques and best practices.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                      <Award className="w-4 h-4" />
                      <span>98% Client Satisfaction Rate</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Transparent Communication</h3>
                    <p className="text-muted-foreground mb-4">
                      From detailed written estimates to daily progress updates, we keep you informed every step of the way. No surprises, no hidden costs—just honest, straightforward communication.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                      <MessageCircle className="w-4 h-4" />
                      <span>Same-Day Response Time</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Safety Without Compromise</h3>
                    <p className="text-muted-foreground mb-4">
                      Our 100% OSHA compliance rate and zero lost-time incident record on 500+ projects demonstrate our unwavering commitment to safety for our team, clients, and the public.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                      <Shield className="w-4 h-4" />
                      <span>500+ Projects with Zero Lost-Time Incidents</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Complete Customer Satisfaction</h3>
                    <p className="text-muted-foreground mb-4">
                      We don't consider a project finished until you're completely satisfied. Our comprehensive warranties and responsive service ensure your investment is protected long after project completion.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                      <Heart className="w-4 h-4" />
                      <span>98% Referral Rate from Happy Clients</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <CTASection
          title="Experience the Ascen Group Difference"
          description="Work with a contractor who puts integrity, quality, and your satisfaction first"
          primaryCTA={{ label: "Get Free Estimate", href: "/estimate" }}
          secondaryCTA={{ label: "See Our Process", href: "/our-process", variant: "outline" }}
          className="bg-gradient-to-br from-primary to-primary/80"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Values;
