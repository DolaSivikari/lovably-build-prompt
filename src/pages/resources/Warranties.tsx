import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Shield, CheckCircle2, XCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Warranties = () => {
  const warranties = [
    {
      type: "Workmanship Warranty",
      duration: "5 Years",
      coverage: "Comprehensive",
      description: "All workmanship defects including application issues, preparation failures, and installation errors"
    },
    {
      type: "Material Warranty",
      duration: "10-25 Years",
      coverage: "Manufacturer-Backed",
      description: "Full manufacturer warranties on all materials used, transferred directly to property owner"
    },
    {
      type: "Structural Warranty",
      duration: "2 Years",
      coverage: "Building Code Compliance",
      description: "Coverage for structural repairs including stucco systems, masonry, and exterior cladding"
    }
  ];

  const covered = [
    "Peeling or flaking paint",
    "Color fading (beyond normal weathering)",
    "Application defects",
    "Surface preparation issues",
    "Adhesion failures",
    "Installation errors",
    "Material defects (manufacturer warranty)",
    "Stucco cracking due to workmanship"
  ];

  const notCovered = [
    "Damage from accidents or abuse",
    "Normal wear and tear",
    "Acts of nature (storms, hail, flooding)",
    "Third-party modifications",
    "Lack of proper maintenance",
    "Damage from pests or wildlife",
    "Changes in substrate (building settling)",
    "Cosmetic preferences or style changes"
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Warranties & Guarantees | Ascent Group Construction"
        description="Comprehensive workmanship and material warranties. 5-year workmanship warranty, 10-25 year material warranties, and structural guarantees."
        canonical="https://ascentgroupconstruction.com/resources/warranties"
      />
      <Navigation />

      <PageHeader
        eyebrow="Your Protection"
        title="Warranties & Guarantees"
        description="Industry-leading warranty coverage for peace of mind"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/faq" },
          { label: "Warranties" }
        ]}
      />

      {/* Warranty Types */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Warranty Coverage</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We stand behind every project with comprehensive warranty protection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {warranties.map((warranty) => (
              <Card key={warranty.type} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <Badge variant="outline" className="w-fit mb-2">{warranty.coverage}</Badge>
                  <CardTitle className="text-xl">{warranty.type}</CardTitle>
                  <p className="text-2xl font-bold text-primary">{warranty.duration}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{warranty.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Covered */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Covered */}
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle className="text-2xl">What's Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {covered.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Not Covered */}
            <Card>
              <CardHeader>
                <XCircle className="h-10 w-10 text-red-600 mb-2" />
                <CardTitle className="text-2xl">Exclusions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {notCovered.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to File a Claim */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">How to File a Warranty Claim</h2>
              <p className="text-muted-foreground">
                Simple 3-step process to get your issue resolved quickly
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                    1
                  </div>
                  <h3 className="font-bold text-center mb-2">Contact Us</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Email warranty@ascentgroup.ca with photos and project details
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                    2
                  </div>
                  <h3 className="font-bold text-center mb-2">Assessment</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    We'll review within 48 hours and schedule an inspection if needed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                    3
                  </div>
                  <h3 className="font-bold text-center mb-2">Resolution</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Approved claims repaired within 2 weeks at no cost to you
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-muted rounded-lg text-center">
              <h3 className="font-bold mb-2">Maintenance Requirements</h3>
              <p className="text-sm text-muted-foreground">
                To maintain warranty validity, surfaces must be cleaned annually and inspected for damage. 
                Minor maintenance like caulking and touch-ups may be required and are not covered under warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Warranties;