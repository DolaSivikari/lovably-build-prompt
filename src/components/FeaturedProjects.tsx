import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  category: string | null;
  summary: string | null;
  featured_image: string | null;
  year: string | null;
}

const ProjectCard = ({ project }: { project: Project }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <Link to={`/case-study/${project.slug}`}>
      {project.featured_image && (
        <div className="relative overflow-hidden h-64">
          <OptimizedImage
            src={project.featured_image}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-full transition-transform hover:scale-105 duration-300"
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
    </Link>
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {project.location && (
          <Badge variant="outline" className="text-xs">
            {project.location}
          </Badge>
        )}
        {project.category && (
          <Badge variant="secondary" className="text-xs">
            {project.category}
          </Badge>
        )}
        {project.year && (
          <Badge variant="outline" className="text-xs">
            {project.year}
          </Badge>
        )}
      </div>
      <Link to={`/case-study/${project.slug}`}>
        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
          {project.title}
        </h3>
      </Link>
      {project.summary && (
        <p className="text-muted-foreground line-clamp-3">{project.summary}</p>
      )}
    </CardContent>
  </Card>
);

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('id, title, slug, location, category, summary, featured_image, year')
        .eq('publish_state', 'published')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchFeaturedProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing our commitment to quality, innovation, and excellence in every project we undertake
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
