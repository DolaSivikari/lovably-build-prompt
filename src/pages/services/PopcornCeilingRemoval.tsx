import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, CheckCircle2, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const PopcornCeilingRemoval = () => {
  const services = [
    {
      title: "Safe Removal",
      description: "Professional removal of popcorn texture using dust-containment methods and proper safety protocols.",
    },
    {
      title: "Asbestos Testing",
      description: "Comprehensive testing for asbestos content in older popcorn ceilings before removal begins.",
    },
    {
      title: "Ceiling Refinishing",
      description: "Complete refinishing with primer and paint to create a modern, smooth ceiling surface.",
    },
    {
      title: "Smooth Finish Application",
      description: "Expert application of smooth finish coatings for a sleek, contemporary ceiling appearance.",
    },
    {
      title: "Texture Alternatives",
      description: "Modern ceiling texture options including knockdown, orange peel, or custom patterns.",
    },
    {
      title: "Repair & Patch Work",
      description: "Professional repair of any ceiling damage discovered during the removal process.",
    },
  ];

  const details = [
    {
      title: "Our Popcorn Ceiling Removal Process",
      description: "We begin with a thorough inspection and asbestos testing if needed. Our team then prepares the space with complete protection of floors and furniture. Using specialized tools and dust-containment systems, we safely remove the textured coating. After removal, we repair any imperfections, apply primer, and finish with smooth paint for a modern, clean look.",
    },
    {
      title: "Benefits of Removal",
      description: "Removing popcorn ceilings instantly modernizes your space and can increase property value. Smooth ceilings are easier to clean and maintain, reflect light better for improved brightness, and eliminate the dated appearance of textured ceilings. The transformation creates a more contemporary aesthetic that appeals to modern buyers and residents.",
    },
  ];

  const advantages = [
    {
      icon: Shield,
      title: "Safe Practices",
      description: "Asbestos-certified professionals with proper safety equipment and containment procedures for all removal projects.",
    },
    {
      icon: Sparkles,
      title: "Quality Finish",
      description: "Smooth, flawless results with expert repair and finishing techniques that create a perfectly level ceiling surface.",
    },
    {
      icon: CheckCircle2,
      title: "Complete Service",
      description: "Full-service solution from initial testing through final paint application, including all repairs and cleanup.",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Popcorn Ceiling Removal Services | Modern Ceiling Solutions"
        description="Professional popcorn ceiling removal services. Safe removal, asbestos testing, smooth finishing, and ceiling refinishing for residential and commercial properties."
        keywords="popcorn ceiling removal, ceiling texture removal, asbestos testing, ceiling refinishing, smooth ceiling, ceiling modernization"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Popcorn Ceiling Removal Services
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Transform outdated textured ceilings into smooth, modern surfaces. Professional removal, testing, and refinishing for homes and commercial properties.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Popcorn Ceiling Removal Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive ceiling removal and refinishing solutions for residential and commercial properties.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {details.map((detail, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{detail.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {detail.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Ascent Advantage
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Why property owners trust us for their ceiling removal projects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <Icon className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h3 className="text-xl font-semibold mb-4">{advantage.title}</h3>
                    <p className="text-muted-foreground">{advantage.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Modernize Your Ceilings?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Get a free consultation and quote for your popcorn ceiling removal project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/estimate">
              <Button size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
                Get Free Estimate
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 shadow-lg hover:shadow-xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PopcornCeilingRemoval;
