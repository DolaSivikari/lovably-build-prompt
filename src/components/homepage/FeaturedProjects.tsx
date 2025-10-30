import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, DollarSign, Clock } from "lucide-react";

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location?: string;
  featured_image?: string;
}

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // @ts-expect-error - Bypassing Supabase's deep type inference (known TS2589 issue)
        const { data, error } = await supabase
          .from('projects')
          .select('id, slug, title, category, location, featured_image')
          .eq('publish_state', 'published')
          .eq('is_featured', true)
          .order('display_order')
          .limit(3);

        if (data && !error) {
          setProjects(data as Project[]);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading featured projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-1 bg-primary/10 text-primary">Portfolio Showcase</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforming commercial spaces across Ontario with precision and expertise
          </p>
        </div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-700 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/50">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Featured Image */}
                  <div className="relative h-96 md:h-auto">
                    {project.featured_image && (
                      <img
                        src={project.featured_image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-4">
                      {project.category}
                    </Badge>

                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <div className="space-y-3 mb-6">
                      {project.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{project.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span>$250K+ Project Value</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Completed On Schedule</span>
                      </div>
                    </div>

                    <Button asChild size="lg" className="w-full md:w-auto group">
                      <Link to={`/projects/${project.slug}`}>
                        View Project Details
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="shadow-lg border-2 hover:border-primary">
            <Link to="/projects">
              Explore All Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
