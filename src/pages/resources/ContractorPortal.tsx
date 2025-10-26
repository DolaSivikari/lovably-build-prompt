/**
 * Contractor Portal - Phase 1 (CRITICAL)
 * Download center for pre-qualification documents
 */
import { useState } from "react";
import { FileText, Download, Package, Shield, CheckCircle2, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  description: string;
  fileType: string;
  fileSize: string;
  downloadCount?: number;
}

const ContractorPortal = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    estimatedValue: "",
  });

  const documents: Document[] = [
    {
      id: "company-profile",
      name: "Company Profile",
      description: "2-page overview of Ascent Group Construction",
      fileType: "PDF",
      fileSize: "450 KB",
      downloadCount: 234,
    },
    {
      id: "capabilities-statement",
      name: "Capabilities Statement",
      description: "Bonding capacity, concurrent projects, crew size",
      fileType: "PDF",
      fileSize: "680 KB",
      downloadCount: 189,
    },
    {
      id: "past-projects-list",
      name: "Past Projects List",
      description: "Sortable Excel file with project details and values",
      fileType: "XLSX",
      fileSize: "125 KB",
      downloadCount: 156,
    },
    {
      id: "references",
      name: "References List",
      description: "Contact information for past clients",
      fileType: "PDF",
      fileSize: "280 KB",
      downloadCount: 178,
    },
    {
      id: "prequalification-package",
      name: "Pre-Qualification Package",
      description: "Comprehensive package with financials and references",
      fileType: "PDF",
      fileSize: "1.2 MB",
      downloadCount: 145,
    },
    {
      id: "insurance-certificates",
      name: "Insurance Certificates",
      description: "Auto-generated, current liability and WSIB certificates",
      fileType: "PDF",
      fileSize: "890 KB",
      downloadCount: 267,
    },
    {
      id: "safety-documentation",
      name: "Safety Documentation",
      description: "WSIB clearance, COR certification, safety statistics",
      fileType: "PDF",
      fileSize: "720 KB",
      downloadCount: 134,
    },
    {
      id: "subcontractor-questionnaire",
      name: "Subcontractor Questionnaire",
      description: "Standard RFP answers and qualifications",
      fileType: "PDF",
      fileSize: "540 KB",
      downloadCount: 112,
    },
  ];

  const handleDownload = (doc: Document) => {
    // Simulate download
    toast({
      title: "Download Started",
      description: `Downloading ${doc.name}...`,
    });
    console.log(`Downloading: ${doc.id}`);
    // TODO: Track download analytics
  };

  const handleDownloadAll = () => {
    toast({
      title: "Preparing Package",
      description: "Creating ZIP file with all documents...",
    });
    console.log("Downloading complete package");
    // TODO: Generate ZIP with all documents
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Received",
      description: "We'll email the complete package within 15 minutes.",
    });
    console.log("Form submitted:", formData);
    // TODO: Send to backend
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Contractor Portal - Pre-Qualification Documents | Ascent Group"
        description="Download our contractor pre-qualification documents, capabilities statement, insurance certificates, and past projects list. Everything you need for RFPs and bidding."
      />
      <Navigation />

      <PageHeader
        title="Contractor Resources & Pre-Qualification Documents"
        description="Everything You Need to Evaluate Ascent Group as Your Subcontractor"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources/contractor-portal" },
          { label: "Contractor Portal" },
        ]}
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Intro */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground">
              Complete package for RFPs and bidding. All documents are current and ready for download.
            </p>
          </div>

          {/* Download All Button */}
          <div className="max-w-3xl mx-auto mb-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Package className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg">Complete Pre-Qualification Package</h3>
                      <p className="text-sm text-muted-foreground">All documents in one ZIP file</p>
                    </div>
                  </div>
                  <Button onClick={handleDownloadAll} size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download Complete Package
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="w-8 h-8 text-primary" />
                    <Badge variant="secondary">{doc.fileType}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-4">{doc.name}</CardTitle>
                  <CardDescription>{doc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{doc.fileSize}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  {doc.downloadCount && (
                    <div className="text-xs text-muted-foreground mt-2">
                      {doc.downloadCount} downloads
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Request Package Form */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-6 h-6 text-primary" />
                  <CardTitle>Request Complete Package via Email</CardTitle>
                </div>
                <CardDescription>
                  Fill out the form below and we'll send the complete pre-qualification package to your email.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company *</Label>
                      <Input
                        id="company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="ABC Construction"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@abcconstruction.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(416) 555-0123"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      >
                        <SelectTrigger id="projectType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multi_unit">Multi-Unit Development</SelectItem>
                          <SelectItem value="commercial">Commercial Building</SelectItem>
                          <SelectItem value="industrial">Industrial Facility</SelectItem>
                          <SelectItem value="institutional">Institutional</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedValue">Estimated Value</Label>
                      <Select
                        value={formData.estimatedValue}
                        onValueChange={(value) => setFormData({ ...formData, estimatedValue: value })}
                      >
                        <SelectTrigger id="estimatedValue">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                          <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                          <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                          <SelectItem value="5m+">$5M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Complete Package to Email
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
