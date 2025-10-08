import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Building2, Hammer, Lightbulb, Shield, Workflow, Trees } from "lucide-react";

const ServicesPreview = () => {
  const services = [
    {
      icon: Building2,
      title: "Construction Management",
      description: "Expert oversight from planning through completion, ensuring quality and timeline adherence.",
    },
    {
      icon: Hammer,
      title: "General Contracting",
      description: "Comprehensive contracting services coordinating all trades and suppliers for seamless execution.",
    },
    {
      icon: Lightbulb,
      title: "Design-Build",
      description: "Integrated approach combining design and construction for faster delivery and cost efficiency.",
    },
    {
      icon: Workflow,
      title: "Pre-Construction Services",
      description: "Strategic planning, cost estimation, and risk assessment to set your project up for success.",
    },
    {
      icon: Shield,
      title: "VDC & BIM Services",
      description: "Advanced 3D modeling and coordination to reduce conflicts and improve project outcomes.",
    },
    {
      icon: Trees,
      title: "Sustainable Building",
      description: "Green building practices and LEED certification support for environmentally responsible projects.",
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Construction Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From initial concept to final handover, we deliver full-spectrum construction management services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="hover:shadow-lg transition-shadow animate-fade-in border-l-4 border-l-primary"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <service.icon className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link to="/services">Explore All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
