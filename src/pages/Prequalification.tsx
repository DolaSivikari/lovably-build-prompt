import { Download, FileText, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";

const Prequalification = () => {
  const companyStats = [
    { label: "Years in Business", value: "15+" },
    { label: "Annual Volume", value: "$10-30M" },
    { label: "Bonding Capacity", value: "$5M" },
    { label: "Insurance Coverage", value: "$5M Liability" },
    { label: "WSIB Status", value: "Current Clearance" },
    { label: "Service Area", value: "Greater Toronto Area" },
  ];

  const documents = [
    { name: "Company Capability Statement", description: "Comprehensive overview of services and experience", icon: FileText },
    { name: "Current Insurance Certificate", description: "$5M general liability coverage", icon: Shield },
    { name: "WSIB Clearance Certificate", description: "Current compliance documentation", icon: CheckCircle2 },
    { name: "Safety Program Summary", description: "COR certified safety protocols", icon: Shield },
    { name: "Equipment & Resources List", description: "Self-perform capabilities", icon: FileText },
    { name: "Reference List", description: "Recent client contacts and testimonials", icon: FileText },
    { name: "Sample Project Portfolio", description: "Featured projects with details", icon: FileText },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Pre-Qualification Package | General Contractor Toronto | Ascent Group"
        description="Download Ascent Group Construction's complete pre-qualification package including certifications, insurance, bonding capacity, and safety documentation for RFP submissions."
      />
      <Navigation />
      
      <PageHeader
        title="Pre-Qualification Package"
        description="Complete contractor qualification documentation for your RFP process"
      />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Company Overview */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Company Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {companyStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Downloadable Documents */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">Downloadable Documentation</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              All required documentation for contractor pre-qualification and RFP submissions
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {documents.map((doc, index) => {
                const Icon = doc.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{doc.name}</CardTitle>
                          <CardDescription>{doc.description}</CardDescription>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Download Complete Package (ZIP)
              </Button>
            </div>
          </section>

          {/* RFP Submission */}
          <section className="mb-16">
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Submit Your RFP</CardTitle>
                <CardDescription>
                  We respond to all requests for proposals within 48 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Fast Response</p>
                    <p className="text-sm text-muted-foreground">48-hour turnaround</p>
                  </div>
                  <div>
                    <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Detailed Proposals</p>
                    <p className="text-sm text-muted-foreground">Itemized estimates</p>
                  </div>
                  <div>
                    <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Competitive Pricing</p>
                    <p className="text-sm text-muted-foreground">Value engineering included</p>
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/contact">
                      Submit RFP Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Past Performance */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Recent Project Performance</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Project</th>
                        <th className="text-left p-3">Client Type</th>
                        <th className="text-left p-3">Value</th>
                        <th className="text-left p-3">Year</th>
                        <th className="text-left p-3">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">Waterfront Condo Restoration</td>
                        <td className="p-3">Multi-Family</td>
                        <td className="p-3">$2.5M</td>
                        <td className="p-3">2024</td>
                        <td className="p-3">General Contractor</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Office Tower Renovation</td>
                        <td className="p-3">Commercial</td>
                        <td className="p-3">$1.8M</td>
                        <td className="p-3">2023</td>
                        <td className="p-3">CM-at-Risk</td>
                      </tr>
                      <tr>
                        <td className="p-3">School Interior Upgrade</td>
                        <td className="p-3">Institutional</td>
                        <td className="p-3">$950K</td>
                        <td className="p-3">2023</td>
                        <td className="p-3">Design-Build</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <Link to="/projects">View All Projects</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Prequalification;
