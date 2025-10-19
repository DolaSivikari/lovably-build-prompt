import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectInstitutional from "@/assets/project-institutional.jpg";
import OptimizedImage from "./OptimizedImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

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
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing our commitment to quality, innovation, and excellence in every project we undertake
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {projects.map((project, index) => {
            const ProjectCard = ({ children }: { children: React.ReactNode }) => {
              const cardRef = useRef<HTMLDivElement>(null);
              const { scrollYProgress } = useScroll({
                target: cardRef,
                offset: ["start end", "end start"]
              });
              const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);

              return (
                <Card 
                  ref={cardRef}
                  className={`overflow-hidden group hover:shadow-xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden h-64">
                    <motion.div
                      style={{ y: prefersReducedMotion ? 0 : imageY }}
                      className="h-full w-full"
                    >
                      <OptimizedImage
                        src={project.image}
                        alt={`${project.title} - ${project.category} construction project featuring modern architecture in ${project.location}`}
                        width={800}
                        height={600}
                        className="w-full h-full transition-transform group-hover:scale-110 duration-500"
                        objectFit="cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                    <div className="absolute top-4 right-4 z-10">
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
              );
            };

            return <ProjectCard key={project.title}>{null}</ProjectCard>;
          })}
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
