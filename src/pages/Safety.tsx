import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield, 
  HardHat, 
  AlertTriangle, 
  Users, 
  ClipboardCheck,
  Award,
  CheckCircle2
} from "lucide-react";
import companyData from "@/data/company-info.json";

const Safety = () => {
  const safetyFeatures = [
    {
      icon: HardHat,
      title: "PPE Requirements",
      description: "Mandatory personal protective equipment for all team members on every job site"
    },
    {
      icon: AlertTriangle,
      title: "Hazard Assessment",
      description: "Comprehensive site analysis before project commencement to identify and mitigate risks"
    },
    {
      icon: ClipboardCheck,
      title: "Daily Safety Briefings",
      description: "Morning toolbox talks covering daily tasks, hazards, and safety procedures"
    },
    {
      icon: Users,
      title: "Certified Safety Officers",
      description: "Trained safety personnel on-site for all medium to large projects"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Safety - Our Commitment to Zero Incidents"
        description="Ascen Group Construction prioritizes safety above all else. Learn about our comprehensive safety programs, training, and 100% OSHA compliance record."
        keywords="construction safety, OSHA compliance, safety training, workplace safety, safe construction practices"
      />
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block mb-3 px-4 py-1.5 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
              <span className="text-secondary font-semibold text-sm tracking-wider uppercase">Safety First</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Safety First, Always</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              {companyData.safety.commitment}
            </p>
          </div>
        </section>

        {/* Safety Stats */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="text-center p-8 bg-primary text-primary-foreground hover:shadow-xl transition-shadow">
                <div className="text-5xl font-bold mb-2">500+</div>
                <p className="text-lg opacity-90">Projects with Zero Lost-Time Incidents</p>
              </Card>
              <Card className="text-center p-8 bg-primary text-primary-foreground hover:shadow-xl transition-shadow">
                <div className="text-5xl font-bold mb-2">2,000+</div>
                <p className="text-lg opacity-90">Hours of Safety Training Annually</p>
              </Card>
              <Card className="text-center p-8 bg-primary text-primary-foreground hover:shadow-xl transition-shadow">
                <div className="text-5xl font-bold mb-2">100%</div>
                <p className="text-lg opacity-90">OSHA Compliance Rate</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Safety Programs */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Safety Programs</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive safety initiatives that protect our team, clients, and the public
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {companyData.safety.programs.map((program, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                          <p className="text-muted-foreground">
                            {program.description}
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

        {/* Safety Features */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Safety on Every Site</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Standard safety practices implemented across all our projects
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {safetyFeatures.map((feature, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Safety Certifications & Compliance</h2>
                <p className="text-lg text-muted-foreground">
                  Fully licensed, insured, and compliant with all safety regulations
                </p>
              </div>

              <Card>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">OSHA 30-Hour Certification</h3>
                        <p className="text-sm text-muted-foreground">All supervisors and project managers are OSHA 30-hour certified</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">WSIB Coverage</h3>
                        <p className="text-sm text-muted-foreground">Full Workplace Safety and Insurance Board coverage for all employees</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">Liability Insurance</h3>
                        <p className="text-sm text-muted-foreground">Comprehensive general liability insurance protecting clients and properties</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">COR Certification</h3>
                        <p className="text-sm text-muted-foreground">Certificate of Recognition for workplace health and safety management systems</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Work with a Safety-First Contractor
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Experience peace of mind knowing your project is in the hands of a safety-conscious, fully compliant team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-8">
                  Get Free Estimate
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  Learn More About Us
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

export default Safety;
