import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Shield, FileText, Users, Wrench, Download, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ForGeneralContractors = () => {
  const tradePackages = [
    "Façade remediation and cladding repairs",
    "EIFS / stucco installation and repair",
    "Sealant (caulking) replacement programs",
    "Masonry restoration and tuckpointing",
    "Balcony waterproofing systems",
    "Protective coatings (interior/exterior)",
    "Commercial and residential painting",
    "Tile and flooring installation",
    "Interior finishing and buildouts",
  ];

  const whyWorkWithUs = [
    {
      icon: Clock,
      title: "Fast Quote Turnaround",
      description: "Unit pricing and competitive bids within 48-72 hours on active tenders",
    },
    {
      icon: Users,
      title: "Self-Performed Work",
      description: "85% of work done by our 10-person crew—minimal sub-tiers, direct accountability",
    },
    {
      icon: Shield,
      title: "Safety Compliance",
      description: "Licensed business with site-specific safety plans and WSIB compliance in progress",
    },
    {
      icon: FileText,
      title: "Clear Communication",
      description: "Dedicated project lead, progress reporting, and prompt RFI responses",
    },
    {
      icon: CheckCircle,
      title: "Professional Documentation",
      description: "Complete closeout packages with product data sheets and warranty information",
    },
    {
      icon: Wrench,
      title: "Trade Specialization",
      description: "Focused on envelope and interior trades we execute well—no scope creep",
    },
  ];

  const processSteps = [
    {
      number: "1",
      title: "Tender Review",
      description: "We review your bid package and clarify scope, exclusions, and site requirements",
    },
    {
      number: "2",
      title: "Unit Rate Submission",
      description: "Competitive pricing broken down by trade and activity with clear assumptions",
    },
    {
      number: "3",
      title: "Award & Mobilization",
      description: "Coordinate with your site superintendent for access, safety, and schedule alignment",
    },
    {
      number: "4",
      title: "Execution",
      description: "Daily reporting, photo documentation, and material compliance verification",
    },
    {
      number: "5",
      title: "Closeout",
      description: "Final walkthrough, warranty paperwork, and material certifications delivered",
    },
  ];

  return (
    <>
      <SEO 
        title="Trade Partner for General Contractors"
        description="Ascent Group provides building envelope and interior trade services as a reliable subcontractor partner for general contractors across Ontario. Fast quotes, self-performed work, and professional execution."
        keywords="general contractor partner, trade subcontractor, envelope trades, GTA subcontractor, unit pricing, tender packages"
      />
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-background via-background to-construction-orange/5">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <Breadcrumb 
              items={[
                { label: "Home", href: "/" },
                { label: "For General Contractors" }
              ]} 
            />
            <div className="max-w-4xl mx-auto text-center mt-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Trade Partner for Envelope & Interior Work
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Your reliable subcontractor for building envelope and interior trade packages across Ontario
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="#contact">Request Unit Pricing</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#trade-packages">View Trade Packages</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trade Packages Section */}
        <section id="trade-packages" className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trade Packages We Execute
              </h2>
              <p className="text-lg text-muted-foreground">
                Specialized envelope and interior trades for commercial, multi-family, and institutional projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {tradePackages.map((pkg, index) => (
                <Card key={index} className="p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-construction-orange flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{pkg}</span>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-lg max-w-3xl mx-auto text-center">
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-foreground">Typical Project Scope:</strong>
              </p>
              <p className="text-muted-foreground">
                Trade package values: $25k - $75k+ | Mid-rise to high-rise projects (5-30 storeys) | New construction and occupied building restoration
              </p>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why GCs Work With Us
              </h2>
              <p className="text-lg text-muted-foreground">
                Professional execution, clear communication, and reliable trade-level expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyWorkWithUs.map((item, index) => (
                <Card key={index} className="p-6">
                  <item.icon className="w-8 h-8 text-construction-orange mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Process for GC Partners
              </h2>
              <p className="text-lg text-muted-foreground">
                From tender review to project closeout—clear steps for seamless collaboration
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {processSteps.map((step, index) => (
                <Card key={index} className="p-6 flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-construction-orange text-white flex items-center justify-center font-bold text-xl">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Building Credentials Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 border-l-4 border-l-construction-orange">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Building Our Credentials
                </h2>
                <p className="text-muted-foreground mb-6">
                  Ascent Group was established in 2025 by construction professionals with 15+ years of industry experience. We're actively building our prequalification documentation and working toward full compliance:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Licensed Business (Registered)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">10-Person Self-Performed Crew</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <span className="text-foreground">WSIB Clearance (In Progress)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <span className="text-foreground">Liability Insurance (Finalizing)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <span className="text-foreground">COR Certification (Pursuing)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Site Safety Plans & Procedures</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  We understand that prequalification requirements vary by GC and project size. We're transparent about where we are in our credentialing process and committed to meeting your specific requirements.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get Started
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Add us to your bidders list or request unit pricing on active tenders
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 text-center">
                  <Download className="w-8 h-8 text-construction-orange mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Download Company Info</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Company profile, services list, and current credentials status
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/contact">Request Info Package</Link>
                  </Button>
                </Card>

                <Card className="p-6 text-center">
                  <FileText className="w-8 h-8 text-construction-orange mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Request Unit Pricing</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Send us your tender package for competitive pricing
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/contact">Submit Tender Request</Link>
                  </Button>
                </Card>
              </div>

              <div className="p-6 bg-muted/50 rounded-lg">
                <p className="text-sm font-semibold text-foreground mb-2">Contact for Tendering:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:estimating@ascentgroupconstruction.com" className="hover:text-construction-orange transition-colors">
                      estimating@ascentgroupconstruction.com
                    </a>
                  </div>
                  <div className="hidden sm:block text-muted-foreground/50">|</div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Response Time: 48-72 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ForGeneralContractors;
