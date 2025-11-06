import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, Calendar, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import heroEducation from "@/assets/heroes/hero-education.jpg";

const Education = () => {
  const valuePropositions = [
    {
      icon: Calendar,
      title: "Summer & Break Scheduling",
      description: "Strategic project timing to complete work during school breaks with zero classroom disruption"
    },
    {
      icon: Users,
      title: "Student Safety First",
      description: "Enhanced security protocols, background checks, and continuous site monitoring for active campus environments"
    },
    {
      icon: Leaf,
      title: "Sustainable Learning Spaces",
      description: "LEED-certified materials and energy-efficient systems to create healthy, eco-friendly educational environments"
    }
  ];

  const educationProjects = [
    {
      name: "University Science Building Expansion",
      description: "New 45,000 sq ft STEM facility with specialized labs, lecture halls, and collaborative learning spaces",
      metrics: "Completed on schedule for fall semester, LEED Gold certified",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop"
    },
    {
      name: "Elementary School Modernization",
      description: "Complete renovation of 18 classrooms, new gymnasium, and cafeteria upgrade with improved accessibility",
      metrics: "$3.8M project, zero learning days lost",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop"
    },
    {
      name: "College Residence Hall Construction",
      description: "Built new 200-bed student residence with study lounges, communal kitchens, and sustainable design features",
      metrics: "8-month fast-track delivery, ENERGY STAR certified",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop"
    }
  ];

  const capabilities = [
    "Classroom and laboratory renovations",
    "Gymnasium and athletic facility construction",
    "Library and learning commons upgrades",
    "Student residence and dormitory builds",
    "Cafeteria and food service renovations",
    "Accessibility and ADA compliance upgrades",
    "HVAC and indoor air quality improvements",
    "Security system and access control installation"
  ];

  return (
    <>
      <SEO 
        title="Education Construction Services | Schools & Universities"
        description="Specialized construction services for schools, colleges, and universities. Summer scheduling, student safety protocols, sustainable learning environments across the GTA."
        canonical="/markets/education"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main id="main-content">
        <PageHeader
          eyebrow="Education Market"
          title="Transforming Learning Environments"
          description="Expert construction and renovation services for K-12 schools, colleges, and universities with strategic scheduling and student-first safety"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Markets", href: "/markets/commercial" },
            { label: "Education" }
          ]}
          variant="standard"
          backgroundImage={heroEducation}
        />

          {/* Value Propositions */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Why Educational Institutions Choose Ascent</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {valuePropositions.map((prop, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <prop.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{prop.title}</h3>
                        <p className="text-muted-foreground">{prop.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Education Projects Gallery */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">Education Project Portfolio</h2>
                  <p className="text-lg text-muted-foreground">Building the future of learning, one campus at a time</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {educationProjects.map((project, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-xl transition-all group">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                        <div className="pt-3 border-t">
                          <p className="text-xs font-semibold text-primary">{project.metrics}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Education Capabilities */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">Education-Specific Capabilities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">Planning Your Campus Project?</h2>
                <p className="text-xl mb-8 opacity-90">
                  Let's discuss how we can deliver your renovation or expansion with zero disruption to the academic calendar.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/submit-rfp">Submit RFP</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Education;
