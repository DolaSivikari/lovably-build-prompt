import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Home,
  PaintBucket,
  Paintbrush,
  CheckCircle,
  DollarSign,
  Clock,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";

const HomeownerServices = () => {
  const features = [
    { icon: Shield, title: "Fully Insured", description: "$5M liability coverage" },
    { icon: Star, title: "Trusted Reviews", description: "4.9/5 stars on Google" },
    { icon: Clock, title: "Fast Quotes", description: "Response within 24 hours" },
    { icon: DollarSign, title: "Fair Pricing", description: "Transparent estimates" },
  ];

  const services = [
    {
      icon: Paintbrush,
      title: "Interior Painting",
      description: "Transform your living spaces with professional interior painting",
      link: "/services/residential",
    },
    {
      icon: PaintBucket,
      title: "Exterior Painting",
      description: "Protect and beautify your home's exterior",
      link: "/services/residential",
    },
    {
      icon: Home,
      title: "Stucco & EIFS",
      description: "Expert stucco repair and installation",
      link: "/services/residential",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Homeowner Painting Services | Ascent Group Construction"
        description="Transform your home with Ontario's trusted painters. Professional interior & exterior painting, stucco services. Free quotes. Financing available."
        canonical="https://ascentgroupconstruction.com/homeowner-services"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent via-accent/90 to-primary py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Home className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Home with Ontario's Trusted Painters
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Professional painting services for homeowners across the GTA
            </p>
            <Button asChild size="lg" className="bg-white text-accent hover:bg-white/90">
              <Link to="/contact?type=residential">
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional solutions for every part of your home
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button asChild variant="link" className="p-0">
                    <Link to={service.link}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Homeowners Trust Ascent Group
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "15+ years serving homeowners across Ontario",
                "Professional, courteous, and respectful crews",
                "Free detailed estimates with no obligation",
                "Quality materials from trusted brands",
                "Clean workspace - we respect your home",
                "Flexible financing options available",
                "2-year workmanship warranty",
                "Clear communication throughout project",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get your free, no-obligation quote today. We'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact?type=residential">
                  Get Free Quote
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/resources/financing">
                  View Financing Options
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Or call us: <a href="tel:+14165550000" className="text-primary font-semibold">(416) 555-PAINT</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeownerServices;
