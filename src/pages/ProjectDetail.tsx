import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProcessTimelineStep from "@/components/ProcessTimelineStep";
import { 
  MapPin, 
  Calendar, 
  Ruler, 
  DollarSign, 
  Building2, 
  Tag,
  ArrowLeft,
  Phone,
  Mail
} from "lucide-react";
import { toast } from "sonner";

interface ProcessStep {
  type: string;
  step_number: number;
  title: string;
  description: string;
  duration?: string;
  image_url?: string;
  image_alt?: string;
}

interface ProjectData {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  summary?: string;
  featured_image?: string;
  category?: string;
  location?: string;
  project_size?: string;
  budget_range?: string;
  client_name?: string;
  duration?: string;
  start_date?: string;
  completion_date?: string;
  status?: string;
  before_images?: Array<{ url: string; alt: string; caption?: string }>;
  after_images?: Array<{ url: string; alt: string; caption?: string }>;
  content_blocks?: ProcessStep[];
  description?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .eq("publish_state", "published")
          .single();

        if (error) throw error;

        setProject(data as any);
      } catch (error: any) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project");
        navigate("/projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug, navigate]);

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-20">
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-96 w-full mb-8" />
            <Skeleton className="h-32 w-full mb-8" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!project) {
    return null;
  }

  const processSteps = (project.content_blocks || []).filter(
    (block: ProcessStep) => block.type === "process_step"
  );

  return (
    <>
      <SEO
        title={project.seo_title || project.title}
        description={project.seo_description || project.summary}
        keywords={Array.isArray(project.seo_keywords) ? project.seo_keywords.join(', ') : project.seo_keywords}
        ogImage={project.featured_image}
      />
      <Navigation />
      
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] bg-gradient-to-br from-primary/20 to-primary/5">
          {project.featured_image && (
            <img
              src={project.featured_image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
            <Button
              variant="ghost"
              onClick={() => navigate("/projects")}
              className="mb-4 w-fit"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
            
            <div className="space-y-4">
              {project.category && (
                <Badge variant="secondary" className="text-sm">
                  {project.category}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-xl text-muted-foreground max-w-3xl">
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Project Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {project.location && (
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{project.location}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {project.duration && (
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{project.duration}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {project.project_size && (
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Ruler className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Project Size</p>
                    <p className="font-semibold">{project.project_size}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {project.budget_range && (
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Range</p>
                    <p className="font-semibold">{project.budget_range}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {project.client_name && (
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-semibold">{project.client_name}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {project.status && (
              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Tag className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold capitalize">{project.status}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Project Summary */}
          {(project.summary || project.description) && (
            <section className="mb-12">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.summary || project.description}
                  </p>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Before & After Gallery */}
          {project.before_images && project.before_images.length > 0 && 
           project.after_images && project.after_images.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Before & After</h2>
              <div className="grid gap-6">
                {project.before_images.map((beforeImg, idx) => {
                  const afterImg = project.after_images?.[idx];
                  if (!afterImg) return null;
                  
                  return (
                    <Card key={idx}>
                      <CardContent className="p-6">
                        <BeforeAfterSlider
                          beforeImage={beforeImg.url}
                          afterImage={afterImg.url}
                          altBefore={beforeImg.alt || "Before"}
                          altAfter={afterImg.alt || "After"}
                        />
                        {(beforeImg.caption || afterImg.caption) && (
                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            {beforeImg.caption && <p><strong>Before:</strong> {beforeImg.caption}</p>}
                            {afterImg.caption && <p><strong>After:</strong> {afterImg.caption}</p>}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {/* Process Steps Timeline */}
          {processSteps.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Project Process</h2>
              <div className="space-y-6">
                {processSteps.map((step: ProcessStep) => (
                  <ProcessTimelineStep
                    key={step.step_number}
                    step={step.step_number}
                    title={step.title}
                    duration={step.duration || ""}
                    description={step.description}
                    details={[]}
                    deliverables={[]}
                    image={step.image_url}
                  />
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="mt-16">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Need a Similar Project?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Let's discuss how we can bring your vision to life with the same quality and attention to detail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate("/estimate")}>
                    <Mail className="mr-2 h-5 w-5" />
                    Request Estimate
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/contact")}>
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
