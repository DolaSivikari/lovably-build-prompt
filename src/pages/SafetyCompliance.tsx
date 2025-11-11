import { Shield, Award, HardHat, AlertCircle, Download, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import MetricCounter from "@/components/MetricCounter";

const SafetyCompliance = () => {
  const safetyMetrics = [
    { value: 0.85, suffix: "", label: "EMR Rate", description: "Below industry average" },
    { value: 1.2, suffix: "", label: "TRIR", description: "Total Recordable Incident Rate" },
    { value: 0, suffix: "", label: "Lost-Time Incidents", description: "Last 18 months" },
    { value: 2000, suffix: "+", label: "Training Hours", description: "Annually" },
  ];

  const certifications = [
    { name: "WSIB Clearance Certificate", status: "Current", icon: Shield },
    { name: "COR Certification", status: "Certified", icon: Award },
    { name: "OSHA 30-Hour Training", status: "All Supervisors", icon: HardHat },
    { name: "First Aid & CPR", status: "Certified", icon: AlertCircle },
    { name: "Fall Protection", status: "Certified", icon: Shield },
  ];

  const programs = [
    "Daily Toolbox Talks",
    "Site-Specific Safety Plans",
    "Hazard Identification & Control",
    "Comprehensive PPE Requirements",
    "Fall Protection Systems",
    "Emergency Response Procedures",
    "Incident Investigation Protocol",
    "Contractor Safety Orientation",
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Safety & Compliance | COR Certified Building Contractor Toronto"
        description="Ascent Group Construction maintains industry-leading safety standards with COR certification, WSIB clearance, and comprehensive safety programs across all Ontario projects."
      />
      <Navigation />
      
      <PageHeader
        title="Safety First, Every Project, Every Time"
        description="Industry-leading safety standards and comprehensive compliance programs"
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Safety Statistics */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Safety Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {safetyMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 text-center">
                    <MetricCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      label={metric.label}
                    />
                    <p className="text-sm text-muted-foreground mt-2">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Safety Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{cert.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            {cert.status}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Safety Programs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Comprehensive Safety Programs</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {programs.map((program, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="font-medium">{program}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Our Commitment */}
          <section className="mb-16">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Safety Commitment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center max-w-3xl mx-auto">
                  At Ascent Group Construction, safety isn't just a priority—it's the foundation of everything we do. 
                  Every worker goes home safe, every day. We invest heavily in training, equipment, and protocols to 
                  ensure zero incidents on every project.
                </p>
                <div className="grid md:grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Prevention First</h3>
                    <p className="text-sm text-muted-foreground">
                      Proactive hazard identification and control
                    </p>
                  </div>
                  <div className="text-center">
                    <HardHat className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Continuous Training</h3>
                    <p className="text-sm text-muted-foreground">
                      2,000+ hours of annual safety training
                    </p>
                  </div>
                  <div className="text-center">
                    <Award className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Industry Recognition</h3>
                    <p className="text-sm text-muted-foreground">
                      COR certified with excellent EMR rating
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Download Documents */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Safety Documentation</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">WSIB Certificate</CardTitle>
                  <CardDescription>Current clearance certificate</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Safety Policy Manual</CardTitle>
                  <CardDescription>Comprehensive safety protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Insurance Certificate</CardTitle>
                  <CardDescription>$5M liability coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SafetyCompliance;
