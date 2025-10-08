import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
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
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block mb-3 px-4 py-1.5 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
              <span className="text-secondary font-semibold text-sm tracking-wider uppercase">What We Stand For</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Core Values</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              The principles that guide every decision, every project, and every interaction with our clients and team members
            </p>
          </div>
        </section>

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

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Experience the Ascen Group Difference
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Work with a contractor who puts integrity, quality, and your satisfaction first
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-8">
                  Get Free Estimate
                </Button>
              </Link>
              <Link to="/our-process">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  See Our Process
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Values;
