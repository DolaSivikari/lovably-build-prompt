import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Building2,
  Shield,
  CheckCircle,
  FileText,
  Clock,
  Users,
  Truck,
  Award,
  Download,
  ArrowRight,
} from "lucide-react";

const DeveloperServices = () => {
  const capabilities = [
    { icon: Building2, value: "1,000+ Units", label: "Completed Annually" },
    { icon: Users, value: "35+", label: "Full-Time Professionals" },
    { icon: Shield, value: "$5M", label: "Bonding Capacity" },
    { icon: Clock, value: "15", label: "Concurrent Projects" },
  ];

  const whyChooseUs = [
    "Proven track record with 1,000+ units completed annually",
    "Bonding capacity up to $5M for large projects",
    "Dedicated commercial estimator for RFP response",
    "Fast RFP response time (48 hours guaranteed)",
    "Safety-first culture with COR certification",
    "Rigorous quality control processes",
    "Volume pricing available for multi-phase projects",
    "Single point of contact for simplified coordination",
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Developer & Contractor Services | Ascent Group Construction"
        description="Trusted by Ontario's leading developers. 1,000+ units completed annually. $5M bonding capacity. Fast RFP response. Download our contractor package."
        canonical="https://ascentgroupconstruction.com/developer-services"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              For Developers & General Contractors
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trusted by Ontario's Leading Developers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Large-scale construction expertise with proven capacity
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {capabilities.map((cap, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur border-white/20">
                  <CardContent className="p-6 text-center">
                    <cap.icon className="w-8 h-8 mx-auto mb-2 text-white" />
                    <div className="text-2xl font-bold text-white mb-1">{cap.value}</div>
                    <div className="text-sm text-white/80">{cap.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/resources/contractor-portal">
                  <Download className="mr-2 h-5 w-5" />
                  Download Contractor Package
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact?type=commercial">
                  Request Proposal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Ascent */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Developers Choose Ascent Group
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {whyChooseUs.map((reason, index) => (
                <Card key={index}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Large-Scale Construction Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive solutions for multi-unit and commercial projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Building2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Multi-Unit Services</h3>
                <p className="text-muted-foreground mb-4">
                  1,000+ unit projects, high-rise towers, apartment complexes, and condominium developments.
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link to="/services/multi-unit">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Truck className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">New Construction</h3>
                <p className="text-muted-foreground mb-4">
                  Builder partnerships, complete paint schedules, multi-building coordination.
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link to="/services/multi-unit">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Commercial Projects</h3>
                <p className="text-muted-foreground mb-4">
                  Office buildings, retail plazas, industrial facilities, and institutional work.
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link to="/services/commercial">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* RFP Ready Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Bid?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download our complete contractor package with all the documentation you need for RFPs and pre-qualification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/resources/contractor-portal">
                  <Download className="mr-2 h-5 w-5" />
                  Contractor Portal
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact?type=commercial">
                  Contact Our Estimator
                </Link>
              </Button>
            </div>

            <div className="mt-12 p-6 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Direct Contact</p>
              <p className="font-semibold">Commercial Estimator</p>
              <p className="text-muted-foreground">Phone: (416) 555-COMM</p>
              <p className="text-muted-foreground">Email: estimator@ascentgroupconstruction.com</p>
              <p className="text-sm text-primary font-medium mt-2">RFP Response: 48 Hours Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DeveloperServices;
