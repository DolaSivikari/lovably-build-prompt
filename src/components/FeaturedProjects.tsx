import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectInstitutional from "@/assets/project-institutional.jpg";

const FeaturedProjects = () => {
  const projects = [
    {
      image: projectCommercial,
      title: "Downtown Office Tower",
      location: "Toronto, ON",
      category: "Commercial",
      size: "450,000 sq ft",
      description: "Modern 24-story office building featuring sustainable design and smart building technology.",
    },
    {
      image: projectIndustrial,
      title: "Industrial Manufacturing Facility",
      location: "Mississauga, ON",
      category: "Industrial",
      size: "280,000 sq ft",
      description: "State-of-the-art production facility with advanced automation and logistics infrastructure.",
    },
    {
      image: projectInstitutional,
      title: "Regional Healthcare Centre",
      location: "Ottawa, ON",
      category: "Institutional",
      size: "320,000 sq ft",
      description: "Comprehensive medical facility with cutting-edge patient care spaces and medical technology.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing our commitment to quality, innovation, and excellence in every project we undertake
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className="overflow-hidden group hover:shadow-xl transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.location} • {project.size}</p>
                <p className="text-sm mb-4">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/projects">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
