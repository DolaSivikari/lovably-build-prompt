import { Shield, Award, CheckCircle2, Building2, Download, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const CertificationsInsurance = () => {
  const insuranceCoverage = [
    { label: "Commercial General Liability", value: "$5,000,000", icon: Shield },
    { label: "WSIB Coverage", value: "Fully Compliant", icon: CheckCircle2 },
    { label: "Umbrella Policy", value: "$10,000,000", icon: Shield },
    { label: "Professional Liability", value: "$2,000,000", icon: Building2 },
  ];

  const bondingCapacity = [
    { label: "Single Project Bonding", value: "Up to $10M", icon: Award },
    { label: "Aggregate Bonding", value: "Up to $25M", icon: Award },
    { label: "Surety Company", value: "A-Rated Provider", icon: CheckCircle2 },
  ];

  const certifications = [
    {
      title: "WSIB Certificate of Clearance",
      description: "Current and active Workplace Safety & Insurance Board clearance certificate",
      icon: Shield,
    },
    {
      title: "COR (Certificate of Recognition)",
      description: "Safety Excellence certification demonstrating commitment to workplace safety",
      icon: Award,
    },
    {
      title: "BILD Member",
      description: "Building Industry & Land Development Association member in good standing",
      icon: Building2,
    },
    {
      title: "GVCA Member",
      description: "Georgian & Verulam Construction Association active member",
      icon: CheckCircle2,
    },
    {
      title: "Master Painters Association",
      description: "Certified member of the Master Painters Association",
      icon: Award,
    },
  ];

  const documents = [
    { name: "Certificate of Insurance", size: "2MB" },
    { name: "WSIB Clearance", size: "1MB" },
    { name: "Safety Manual", size: "5MB" },
    { name: "Bonding Letter", size: "500KB" },
    { name: "Company Profile", size: "3MB" },
  ];

  return (
    <>
      <SEO 
        title="Certifications & Insurance Coverage | Ascent Group Construction"
        description="Licensed, bonded, and fully insured with $5M liability coverage. View our certifications including WSIB, COR, and industry memberships."
        keywords="insurance, certifications, WSIB, bonded, licensed, COR certificate"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <PageHeader
          title="Certifications & Insurance Coverage"
          description="Licensed, Bonded, and Fully Insured for Your Peace of Mind"
        />

        <main id="main-content" className="container mx-auto px-4 py-12 space-y-16">
          {/* Insurance Coverage Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Insurance Coverage</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insuranceCoverage.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <div className="text-2xl font-bold text-foreground mb-2">{item.value}</div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Bonding Capacity Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Bonding Capacity</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {bondingCapacity.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                      <div className="text-xl font-bold text-foreground mb-2">{item.value}</div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Active Certifications Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Active Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <Icon className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Manufacturer Certifications Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Manufacturer Certifications</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Benjamin Moore</h3>
                  <p className="text-sm text-muted-foreground">Certified Applicator</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Sherwin-Williams</h3>
                  <p className="text-sm text-muted-foreground">ProPainter Certified</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">EIFS Industry</h3>
                  <p className="text-sm text-muted-foreground">Members Association</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Download Center Section */}
          <section className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Document Download Center</h2>
            <p className="text-muted-foreground mb-8">Download our certificates and documentation for your records</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-between h-auto py-4"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">PDF • {doc.size}</div>
                    </div>
                  </div>
                  <Download className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Need Our Insurance Certificates?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Request our complete documentation package through the Contractor Portal or contact us directly.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/resources/contractor-portal">Visit Contractor Portal</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CertificationsInsurance;
