import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Hammer, 
  Lightbulb, 
  Shield, 
  Workflow, 
  Trees,
  Cog,
  FileCheck,
  Layers,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Construction Management",
      description: "Acting as your trusted representative, we oversee every aspect of your project from inception to completion. Our construction management services include cost control, schedule management, quality assurance, and risk mitigation. We utilize industry-leading platforms like Procore and Autodesk Construction Cloud for real-time project insights and seamless collaboration.",
      features: [
        "CM at Risk and Multi-Prime delivery methods",
        "Real-time cost and schedule tracking",
        "Quality control and safety management",
        "Comprehensive project documentation"
      ]
    },
    {
      icon: Hammer,
      title: "General Contracting",
      description: "As your general contractor, we coordinate all trades, suppliers, and construction activities to deliver your project efficiently. We handle procurement, scheduling, supervision, and ensure all work meets specifications and codes. Our experienced team manages everything from permits to final inspection.",
      features: [
        "Complete trade coordination",
        "Material procurement and logistics",
        "Code compliance and permitting",
        "On-site supervision and quality control"
      ]
    },
    {
      icon: Lightbulb,
      title: "Design-Build Solutions",
      description: "Our integrated design-build approach combines design and construction under one contract, streamlining communication and accelerating project delivery. This single-source solution reduces risk, controls costs, and fosters collaboration between designers and builders from day one.",
      features: [
        "Integrated design and construction",
        "Faster project delivery timelines",
        "Enhanced cost control",
        "Single point of accountability"
      ]
    },
    {
      icon: Workflow,
      title: "Pre-Construction Services",
      description: "Success starts with thorough planning. Our pre-construction services include feasibility studies, cost estimation, value engineering, scheduling, and risk assessment. We help you make informed decisions before breaking ground, setting your project up for success.",
      features: [
        "Detailed cost estimating",
        "Constructability reviews",
        "Value engineering analysis",
        "Schedule development and risk assessment"
      ]
    },
    {
      icon: Shield,
      title: "VDC & BIM Services",
      description: "Leveraging Virtual Design and Construction (VDC) and Building Information Modeling (BIM), we create detailed 3D models that enable clash detection, coordination, and visualization before construction begins. This technology reduces rework, prevents delays, and improves overall project quality.",
      features: [
        "3D/4D modeling and coordination",
        "Clash detection and resolution",
        "Laser scanning and as-built documentation",
        "Multi-discipline coordination"
      ]
    },
    {
      icon: Trees,
      title: "Sustainable Building",
      description: "We're committed to environmentally responsible construction. Our sustainable building services include green building certification support (LEED, Green Globe), energy-efficient design implementation, sustainable materials sourcing, and waste reduction strategies.",
      features: [
        "LEED certification support",
        "Energy efficiency optimization",
        "Sustainable materials selection",
        "Waste management and recycling"
      ]
    },
    {
      icon: Cog,
      title: "Modular & Prefabrication",
      description: "Reduce on-site construction time and improve quality with our modular and prefabrication services. Off-site fabrication of building components allows for better quality control, reduced site congestion, and faster project completion.",
      features: [
        "Off-site component fabrication",
        "Quality control in controlled environment",
        "Reduced site congestion",
        "Accelerated project schedules"
      ]
    },
    {
      icon: FileCheck,
      title: "Project Management",
      description: "Our dedicated project managers ensure seamless coordination of all project activities, stakeholders, and resources. We provide clear communication, proactive problem-solving, and ensure your project stays on track from start to finish.",
      features: [
        "Dedicated project management team",
        "Stakeholder communication and coordination",
        "Budget and schedule management",
        "Regular progress reporting"
      ]
    },
    {
      icon: Layers,
      title: "Facilities Management",
      description: "Our relationship doesn't end at project completion. We offer ongoing facilities management services including maintenance, asset management, and lifecycle planning to help you maximize the value of your investment.",
      features: [
        "Preventive maintenance programs",
        "Asset management and tracking",
        "Lifecycle planning and capital forecasting",
        "Emergency response services"
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Comprehensive Construction Services</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              From initial planning to final handover and beyond, we deliver full-spectrum construction management services powered by industry-leading technology and decades of expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Highlight */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Powered by Industry-Leading Technology</h2>
            <p className="text-muted-foreground mb-6">
              We leverage platforms like Procore, Autodesk Construction Cloud, and Bluebeam to provide real-time project insights, seamless collaboration, and digital documentation management.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
              <span>• Procore</span>
              <span>• Autodesk Construction Cloud</span>
              <span>• Bluebeam</span>
              <span>• BIM 360</span>
              <span>• Navisworks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.title}
                className="hover:shadow-xl transition-all border-t-4 border-t-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base pt-2">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discuss Your Project?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Contact us today to learn how our services can help bring your vision to life.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
