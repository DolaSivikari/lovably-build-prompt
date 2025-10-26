import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { FileText, Download, Shield, Building2, Award, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ContractorPortal = () => {
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    projectDetails: ""
  });

  const documents = [
    {
      title: "Company Profile",
      description: "2-page overview of Ascent Group Construction, services, and capabilities",
      icon: Building2,
      size: "PDF, 1.2MB"
    },
    {
      title: "Capabilities Statement",
      description: "Detailed breakdown of project types, bonding capacity, and concurrent project capability",
      icon: Award,
      size: "PDF, 850KB"
    },
    {
      title: "Past Projects List",
      description: "Comprehensive list of completed projects, sortable by type, value, and completion date",
      icon: FileText,
      size: "Excel/PDF, 2.5MB"
    },
    {
      title: "Insurance Certificates",
      description: "Current general liability, WSIB clearance, bonding capacity, and auto insurance",
      icon: Shield,
      size: "PDF Bundle, 3.2MB"
    },
    {
      title: "Safety Documentation",
      description: "Safety manual, COR™ certificate, WSIB clearance, and safety statistics",
      icon: Shield,
      size: "PDF Bundle, 4.8MB"
    },
    {
      title: "References List",
      description: "Contact information for past commercial clients and project references",
      icon: Mail,
      size: "PDF, 450KB"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request received! We'll email the contractor package within 1 hour.");
    setFormData({ company: "", contact: "", email: "", phone: "", projectDetails: "" });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contractor Portal | Ascent Group Construction"
        description="Download our complete contractor package including company profile, capabilities statement, insurance certificates, past projects, and references."
        canonical="https://ascentgroupconstruction.com/resources/contractor-portal"
      />
      <Navigation />

      <PageHeader
        eyebrow="For General Contractors & Developers"
        title="Contractor Portal"
        description="Download pre-qualification documents and RFP materials"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/faq" },
          { label: "Contractor Portal" }
        ]}
      />

      {/* Intro Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to Our Contractor Portal</h2>
            <p className="text-muted-foreground">
              Everything you need to pre-qualify Ascent Group Construction for your next project. 
              Download individual documents or request our complete contractor package.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">$5M</div>
                <p className="text-sm text-muted-foreground">Liability Coverage</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">$10M</div>
                <p className="text-sm text-muted-foreground">Bonding Capacity</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">15</div>
                <p className="text-sm text-muted-foreground">Concurrent Projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">48hr</div>
                <p className="text-sm text-muted-foreground">RFP Response Time</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Download Documentation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All documents are current and automatically updated
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <Card key={doc.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <CardDescription className="text-sm">{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{doc.size}</span>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Download Complete Package (All Documents)
            </Button>
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Request Full Contractor Package</CardTitle>
                <CardDescription>
                  We'll email you our complete pre-qualification package within 1 hour
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input 
                        id="company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact">Contact Name *</Label>
                      <Input 
                        id="contact"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="projectDetails">Project Details (Optional)</Label>
                    <Textarea 
                      id="projectDetails"
                      rows={4}
                      placeholder="Tell us about your upcoming project..."
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({...formData, projectDetails: e.target.value})}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Me the Complete Package
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContractorPortal;