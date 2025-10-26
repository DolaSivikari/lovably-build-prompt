/**
 * Certifications & Insurance - Phase 1 (CRITICAL)
 * Displays insurance coverage, bonding capacity, certifications
 */
import { Shield, Award, CheckCircle2, Download, Building2, FileCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CertificationsInsurance = () => {
  const insuranceCoverages = [
    { type: "General Liability", amount: "$5,000,000", icon: Shield },
    { type: "Automobile Insurance", amount: "$2,000,000", icon: Building2 },
    { type: "Workers' Compensation", amount: "WSIB Compliant", icon: CheckCircle2 },
    { type: "Umbrella Coverage", amount: "$10,000,000", icon: Shield },
  ];

  const certifications = [
    {
      name: "WSIB Clearance Certificate",
      status: "Active",
      expiry: "December 31, 2025",
      issuedBy: "Workplace Safety & Insurance Board",
    },
    {
      name: "COR (Certificate of Recognition)",
      status: "Active",
      expiry: "June 30, 2025",
      issuedBy: "Infrastructure Health & Safety Association",
    },
    {
      name: "Ontario Business License",
      status: "Active",
      expiry: "Ongoing",
      issuedBy: "Ontario Ministry of Public and Business Service Delivery",
    },
    {
      name: "HST Registration",
      status: "Active",
      expiry: "Ongoing",
      issuedBy: "Canada Revenue Agency",
    },
  ];

  const affiliations = [
    { name: "Ontario General Contractors Association", acronym: "OGCA" },
    { name: "Canadian Construction Association", acronym: "CCA" },
    { name: "Better Business Bureau", acronym: "BBB", rating: "A+" },
    { name: "Master Painters Association", acronym: "MPA" },
  ];

  const manufacturerCertifications = [
    "Sherwin-Williams Certified Applicator",
    "Benjamin Moore Authorized Contractor",
    "EIFS Industry Members Association",
    "Master Painters Institute Certified",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Certifications & Insurance Coverage | Ascent Group"
        description="Fully licensed, insured, and compliant. View our insurance certificates, WSIB clearance, COR certification, and bonding capacity documentation."
      />
      <Navigation />

      <PageHeader
        title="Certifications & Insurance Coverage"
        description="Fully Licensed, Insured, and Compliant"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/about" },
          { label: "Certifications & Insurance" },
        ]}
      />

      {/* Insurance Coverage Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Insurance Coverage</h2>
              <p className="text-muted-foreground">
                Comprehensive protection for every project
              </p>
            </div>

            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {insuranceCoverages.map((coverage, index) => {
                    const Icon = coverage.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{coverage.amount}</div>
                          <div className="text-sm text-muted-foreground">{coverage.type}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 flex justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Download Insurance Certificates
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bonding Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-primary" />
                  Bonding Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">$5,000,000</div>
                    <div className="text-sm text-muted-foreground">Total Bonding Capacity</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">$2,000,000</div>
                    <div className="text-sm text-muted-foreground">Single Project Limit</div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="text-sm">
                      Available for Large-Scale Projects
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Active Certifications</h2>
              <p className="text-muted-foreground">
                All certifications are current and verified
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {certifications.map((cert, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <FileCheck className="w-8 h-8 text-primary" />
                        <Badge variant="default" className="bg-green-500">
                          {cert.status}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-4">{cert.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Issued By:</span>
                        <span className="font-medium">{cert.issuedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valid Until:</span>
                        <span className="font-medium text-green-600">{cert.expiry}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Affiliations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Industry Affiliations</h2>
              <p className="text-muted-foreground">
                Proud members of leading construction organizations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {affiliations.map((affiliation, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                    <div className="font-bold text-lg mb-1">{affiliation.acronym}</div>
                    <div className="text-sm text-muted-foreground">{affiliation.name}</div>
                    {affiliation.rating && (
                      <Badge variant="secondary" className="mt-2">
                        {affiliation.rating} Rating
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturer Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Manufacturer Certifications</h2>
              <p className="text-muted-foreground">
                Certified by industry-leading manufacturers
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {manufacturerCertifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Center */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Download All Certificates</h2>
            <p className="text-muted-foreground mb-8">
              Get a complete package of all our insurance certificates, certifications, and licenses in one ZIP file.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Download className="w-5 h-5 mr-2" />
              Download All Certificates (ZIP)
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CertificationsInsurance;
