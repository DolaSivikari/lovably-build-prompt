import { useState } from "react";
import { Shield, FileText, Download, Package, CheckCircle2, Award, Building2, Truck, Users, HardHat } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ContractorPortal = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectDetails: "",
    documents: [] as string[],
  });

  const documents = [
    { name: "Certificate of Insurance", icon: Shield, size: "2MB", description: "Current liability coverage" },
    { name: "WSIB Clearance Certificate", icon: CheckCircle2, size: "1MB", description: "Valid workplace safety clearance" },
    { name: "Bonding Letter", icon: Award, size: "500KB", description: "Bonding capacity confirmation" },
    { name: "Business License", icon: FileText, size: "1MB", description: "Current business registration" },
    { name: "Company Profile & Capabilities", icon: Building2, size: "5MB", description: "Detailed company overview" },
    { name: "Safety Manual & Certifications", icon: HardHat, size: "3MB", description: "Safety policies and COR certification" },
    { name: "Project References List", icon: Users, size: "2MB", description: "Recent project references" },
    { name: "Equipment Inventory", icon: Truck, size: "2MB", description: "Available equipment and resources" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request submitted!",
      description: "We'll send your custom package within 24 hours.",
    });
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      projectDetails: "",
      documents: [],
    });
  };

  const toggleDocument = (docName: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.includes(docName)
        ? prev.documents.filter(d => d !== docName)
        : [...prev.documents, docName]
    }));
  };

  return (
    <>
      <SEO 
        title="Contractor Portal | Ascent Group Construction"
        description="Access our complete contractor documentation package including insurance certificates, WSIB clearance, bonding letters, and company profile."
        keywords="contractor portal, bid documents, insurance certificates, WSIB, bonding, subcontractor"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <PageHeader
          title="Contractor Portal"
          description="Everything you need to bid with confidence"
        />

        <main id="main-content" className="container mx-auto px-4 py-12 space-y-12">
          {/* Introduction */}
          <section className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground">
              Download our complete contractor package or request specific documents for your RFP. All documentation is current and updated regularly.
            </p>
          </section>

          {/* Complete Package Card - Featured */}
          <section>
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="bg-primary/5">
                <div className="flex items-center gap-4">
                  <Package className="h-12 w-12 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">Complete Contractor Package</CardTitle>
                    <p className="text-muted-foreground mt-1">All documents in one convenient download</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Includes:</p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        All insurance certificates and clearances
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Company profile and capabilities statement
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Project references and safety documentation
                      </li>
                    </ul>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-2">ZIP File • ~15MB</div>
                    <Button size="lg" className="gap-2">
                      <Download className="h-5 w-5" />
                      Download Complete Package
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Individual Documents Grid */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-2">Individual Documents</h2>
            <p className="text-muted-foreground mb-8">Download specific documents as needed</p>
            <div className="grid md:grid-cols-2 gap-4">
              {documents.map((doc, index) => {
                const Icon = doc.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 flex-1">
                          <Icon className="h-8 w-8 text-primary flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{doc.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                            <span className="text-xs text-muted-foreground">PDF • {doc.size}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Request Custom Package Form */}
          <section className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Request Custom Package</h2>
            <p className="text-muted-foreground mb-8">Need specific documents for your RFP? Let us know what you need.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="projectDetails">Project Details</Label>
                <Textarea
                  id="projectDetails"
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="Tell us about your project and timeline..."
                  rows={4}
                />
              </div>

              <div>
                <Label className="mb-3 block">Documents Needed</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {documents.map((doc) => (
                    <div key={doc.name} className="flex items-center space-x-2">
                      <Checkbox
                        id={doc.name}
                        checked={formData.documents.includes(doc.name)}
                        onCheckedChange={() => toggleDocument(doc.name)}
                      />
                      <Label htmlFor={doc.name} className="text-sm cursor-pointer">
                        {doc.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                Submit Request
              </Button>
            </form>
          </section>

          {/* Why Partner Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why Partner With Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Proven Track Record</h3>
                  <p className="text-muted-foreground">1,000+ units completed annually with consistent quality</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Financial Strength</h3>
                  <p className="text-muted-foreground">$5M liability, $10M bonding capacity per project</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Safety First</h3>
                  <p className="text-muted-foreground">COR certified with zero lost-time incidents</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="max-w-3xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>How current are these documents?</AccordionTrigger>
                <AccordionContent>
                  All documents are updated monthly. Insurance certificates and WSIB clearances are always current. We recommend downloading fresh copies for each RFP submission.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you provide project-specific documentation?</AccordionTrigger>
                <AccordionContent>
                  Yes! Use the custom package request form to specify your project requirements. We can provide tailored documentation including project-specific references, equipment lists, and safety plans.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What's your typical response time for RFPs?</AccordionTrigger>
                <AccordionContent>
                  We typically respond to RFPs within 3-5 business days. For urgent bids, we can accommodate faster turnarounds with advance notice.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Do you offer design-build services?</AccordionTrigger>
                <AccordionContent>
                  Yes, we provide full design-build services for painting, restoration, and building envelope projects. Our team can work with your specifications or develop complete solutions from concept to completion.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContractorPortal;
