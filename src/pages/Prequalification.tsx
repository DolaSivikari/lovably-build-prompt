import { useState, useEffect } from "react";
import { Download, FileText, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  file_name: string;
  version: string;
}

const categoryLabels: Record<string, string> = {
  prequalification: "Pre-Qualification",
  insurance: "Insurance",
  "capability-statement": "Capability Statement",
  safety: "Safety",
  certifications: "Certifications",
  other: "Other"
};

const categoryIcons: Record<string, any> = {
  prequalification: FileText,
  insurance: Shield,
  "capability-statement": FileText,
  safety: CheckCircle2,
  certifications: Shield,
  other: FileText
};

function DownloadableDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents_library')
        .select('id, title, description, category, file_url, file_name, version')
        .eq('is_active', true)
        .eq('requires_authentication', false)
        .order('category')
        .order('display_order');

      if (error) throw error;
      setDocuments(data || []);
    } catch (error: any) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      // Log download
      await supabase.from('document_access_log').insert({
        document_id: doc.id,
        ip_address: null,
        user_agent: navigator.userAgent
      });

      // Increment download count
      const { data: currentDoc } = await supabase
        .from('documents_library')
        .select('download_count')
        .eq('id', doc.id)
        .single();

      if (currentDoc) {
        await supabase
          .from('documents_library')
          .update({ download_count: (currentDoc.download_count || 0) + 1 })
          .eq('id', doc.id);
      }

      // Open file
      window.open(doc.file_url, '_blank');
    } catch (error: any) {
      toast({ title: "Error", description: "Failed to download document", variant: "destructive" });
    }
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-4 text-center">Downloadable Documentation</h2>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        All required documentation for contractor pre-qualification and RFP submissions
      </p>

      {loading ? (
        <div className="text-center py-8">Loading documents...</div>
      ) : documents.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Documents will be available soon. Please contact us for immediate needs.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {documents.map((doc) => {
            const Icon = categoryIcons[doc.category] || FileText;
            return (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">v{doc.version}</Badge>
                      </div>
                      {doc.description && (
                        <CardDescription>{doc.description}</CardDescription>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {categoryLabels[doc.category]}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}

const Prequalification = () => {
  const companyStats = [
    { label: "Years in Business", value: "15+" },
    { label: "Annual Volume", value: "$10-30M" },
    { label: "Bonding Capacity", value: "$5M" },
    { label: "Insurance Coverage", value: "$5M Liability" },
    { label: "WSIB Status", value: "Current Clearance" },
    { label: "Service Area", value: "Greater Toronto Area" },
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
          <DownloadableDocuments />

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
                    <Link to="/submit-rfp">
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
