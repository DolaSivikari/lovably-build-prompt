import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  HardHat, 
  AlertTriangle, 
  Users, 
  ClipboardCheck,
  Award,
  CheckCircle2,
  FileText
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

      <PageHeader
        eyebrow="Safety First"
        title="Safety is Our Top Priority"
        description="Comprehensive safety protocols and training to protect our team and your property"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Safety" }
        ]}
        variant="standard"
      />
      
      <main>

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

              <Card className="mb-8">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold">OSHA 30-Hour Certification</h3>
                          <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                            <Shield className="w-4 h-4" />
                            Download
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground">All supervisors and project managers are OSHA 30-hour certified</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold">WSIB Coverage</h3>
                          <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                            <Shield className="w-4 h-4" />
                            Download Certificate
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground">Full Workplace Safety and Insurance Board coverage for all employees</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold">Liability Insurance</h3>
                          <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                            <Shield className="w-4 h-4" />
                            Download Certificate
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground">Comprehensive general liability insurance protecting clients and properties</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold">COR Certification</h3>
                          <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            Download Certificate
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground">Certificate of Recognition for workplace health and safety management systems</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Manual Download */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-3">Download Our Safety Manual</h3>
                  <p className="mb-6 opacity-90">
                    Complete documentation of our safety protocols, procedures, and training programs
                  </p>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Shield className="w-5 h-5 mr-2" />
                    Download Safety Manual (PDF)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default Safety;
