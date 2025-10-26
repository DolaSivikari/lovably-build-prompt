import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Shield, FileText, Award, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CertificationsInsurance = () => {
  const certifications = [
    {
      title: "General Liability Insurance",
      coverage: "$5,000,000",
      description: "Comprehensive general liability coverage protecting clients and projects",
      status: "Active",
      expiry: "December 2025"
    },
    {
      title: "WSIB Clearance Certificate",
      coverage: "Full Coverage",
      description: "Workplace Safety and Insurance Board clearance in good standing",
      status: "Active",
      expiry: "Ongoing"
    },
    {
      title: "Bonding Capacity",
      coverage: "$10,000,000",
      description: "Surety bonding capacity for large-scale commercial projects",
      status: "Active",
      expiry: "Ongoing"
    },
    {
      title: "Automobile Insurance",
      coverage: "$2,000,000",
      description: "Commercial fleet coverage for all company vehicles",
      status: "Active",
      expiry: "March 2026"
    }
  ];

  const professionalCerts = [
    { name: "COR™ (Certificate of Recognition)", issuer: "IHSA", year: "2023" },
    { name: "Lead-Safe Certified", issuer: "EPA", year: "2022" },
    { name: "Master Painters Institute (MPI)", issuer: "MPI", year: "2021" },
    { name: "OGCA Member", issuer: "Ontario General Contractors Association", year: "2020" }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Certifications & Insurance | Ascent Group Construction"
        description="View our comprehensive insurance coverage, certifications, and compliance documentation. $5M liability, WSIB certified, fully bonded and insured."
        canonical="https://ascentgroupconstruction.com/company/certifications-insurance"
      />
      <Navigation />

      <PageHeader
        eyebrow="Company Credentials"
        title="Certifications & Insurance"
        description="Fully licensed, insured, and certified for your peace of mind"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/about" },
          { label: "Certifications & Insurance" }
        ]}
      />

      {/* Insurance Coverage Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Insurance Coverage</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive insurance protection for every project, from small residential work to $10M+ commercial developments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert) => (
              <Card key={cert.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Shield className="h-8 w-8 text-primary" />
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {cert.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{cert.title}</CardTitle>
                  <p className="text-2xl font-bold text-primary">{cert.coverage}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{cert.description}</p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Valid Until:</strong> {cert.expiry}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-recognized qualifications demonstrating our commitment to excellence and safety
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {professionalCerts.map((cert) => (
              <Card key={cert.name} className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">Certified {cert.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Download Documentation</h2>
            <p className="text-muted-foreground mb-8">
              Need copies for your RFP or project file? Download current certificates instantly.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" size="lg" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Insurance Certificate
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                WSIB Clearance
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                All Certifications
              </Button>
            </div>

            <div className="mt-8 p-6 bg-muted rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                All certificates are current and updated automatically. 
                <br />For verification or additional documentation, <a href="/contact" className="text-primary hover:underline">contact our office</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CertificationsInsurance;