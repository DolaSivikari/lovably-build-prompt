import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeAndValidate } from '@/utils/sanitize';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProcessTimelineStep from "@/components/ProcessTimelineStep";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { InteractiveLightbox } from "@/components/InteractiveLightbox";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ArrowRight, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import OptimizedImage from "@/components/OptimizedImage";

interface ProcessStep {
  type: string;
  step_number: number;
  title: string;
  description: string;
  duration?: string;
  image_url?: string;
  image_alt?: string;
}

interface GalleryImage {
  id: string;
  url: string;
  category: 'before' | 'after' | 'process' | 'gallery';
  caption?: string;
  order: number;
  featured: boolean;
}

interface Service {
  id: string;
  name: string;
  slug: string;
  category?: string;
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
  challenge?: string;
  results?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  project_images?: GalleryImage[]; // New unified gallery
  services?: Service[]; // Services provided
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;

      try {
        // Fetch project
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .eq("publish_state", "published")
          .single();

        if (error) throw error;

        // Fetch project images
        const { data: images, error: imagesError } = await supabase
          .from("project_images")
          .select("*")
          .eq("project_id", data.id)
          .order("display_order");

        // Fetch project services
        const { data: projectServices } = await supabase
          .from("project_services")
          .select("service_id, services(id, name, slug, category)")
          .eq("project_id", data.id);

        const projectData: ProjectData = {
          ...(data as any),
          before_images: (data.before_images as any) || [],
          after_images: (data.after_images as any) || [],
          content_blocks: (data.content_blocks as any) || [],
          seo_keywords: (data.seo_keywords as any) || [],
          project_images: images?.map((img: any) => ({
            id: img.id,
            url: img.url,
            category: img.category,
            caption: img.caption,
            order: img.display_order,
            featured: img.featured
          })) || [],
          services: projectServices?.map((ps: any) => ps.services).filter(Boolean) || []
        };

        setProject(projectData);
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
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Skeleton className="h-96" />
            <div className="lg:col-span-3 space-y-4">
              <Skeleton className="h-48" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
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
        description={project.seo_description || project.summary || ""}
        keywords={project.seo_keywords?.join(", ")}
        ogImage={project.featured_image}
      />
      
      <div className="min-h-screen flex flex-col pt-20">
        <Navigation />
        
        {/* Breadcrumb */}
        <div className="border-b border-border/50 bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">
                Home
              </button>
              <ChevronRight className="h-4 w-4" />
              <button onClick={() => navigate("/projects")} className="hover:text-foreground transition-colors">
                Projects
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{project.title}</span>
            </div>
          </div>
        </div>

        {/* Compact Header */}
        <div className="border-b border-border/50 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {project.category && (
                  <Badge variant="secondary">
                    {project.category}
                  </Badge>
                )}
                {project.services && project.services.length > 0 && (
                  <>
                    {project.services.map((service) => (
                      <Badge 
                        key={service.id} 
                        variant="outline"
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => navigate(`/services/${service.slug}`)}
                      >
                        {service.name}
                      </Badge>
                    ))}
                  </>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-lg md:text-xl text-muted-foreground">
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {project.featured_image && (
          <div className="container mx-auto px-4 py-8">
            <div 
              className="relative w-full aspect-[4/3] md:aspect-[2/1] overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxOpen(true);
                }
              }}
              aria-label="Click to view full image"
            >
              <OptimizedImage
                src={project.featured_image}
                alt={project.title}
                width={1200}
                height={600}
                className="w-full h-full object-contain object-center rounded-lg transition-transform duration-300 group-hover:scale-105"
                objectFit="contain"
                priority
              />
            </div>

            {/* Lightbox for full-screen view */}
            <InteractiveLightbox
              images={[
                {
                  src: project.featured_image,
                  alt: project.title,
                  caption: project.title,
                },
              ]}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
              initialIndex={0}
            />
          </div>
        )}

        {/* Main Content - Two Column Layout */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <ProjectSidebar
                clientName={project.client_name}
                location={project.location}
                startDate={project.start_date}
                completionDate={project.completion_date}
                projectSize={project.project_size}
                budgetRange={project.budget_range}
                category={project.category}
                status={project.status}
              />
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3 space-y-12">
              {/* Project Summary */}
              {project.summary && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Project Overview</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.summary}
                  </p>
                </section>
              )}

              {/* The Challenge */}
              {project.challenge && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">The Challenge</h2>
                  <div 
                    className="prose prose-lg max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: sanitizeAndValidate(project.challenge || '').sanitized }}
                  />
                </section>
              )}

              {/* The Solution */}
              {project.description && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">The Solution</h2>
                  <div 
                    className="prose prose-lg max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: sanitizeAndValidate(project.description || '').sanitized }}
                  />
                </section>
              )}

              {/* The Results */}
              {project.results && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">The Results</h2>
                  <div 
                    className="prose prose-lg max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: sanitizeAndValidate(project.results || '').sanitized }}
                  />
                </section>
              )}

              {/* Enhanced Project Gallery - New unified gallery system */}
              {project.project_images && project.project_images.length > 0 && (
                <ProjectGallery
                  images={project.project_images}
                  projectTitle={project.title}
                  showBeforeAfter={true}
                  showProcessSteps={true}
                />
              )}

              {/* Legacy Before & After (fallback for old projects) */}
              {(!project.project_images || project.project_images.length === 0) &&
               project.before_images && project.before_images.length > 0 && 
               project.after_images && project.after_images.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Before & After</h2>
                  <div className="space-y-8">
                    {project.before_images.map((beforeImg: any, index: number) => {
                      const afterImg = project.after_images?.[index];
                      if (!afterImg) return null;
                      
                      return (
                        <div key={index} className="space-y-4">
                          <BeforeAfterSlider
                            beforeImage={beforeImg.url}
                            afterImage={afterImg.url}
                            altBefore={beforeImg.alt || "Before image"}
                            altAfter={afterImg.alt || "After image"}
                          />
                          {(beforeImg.caption || afterImg.caption) && (
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div className="text-center italic">{beforeImg.caption}</div>
                              <div className="text-center italic">{afterImg.caption}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Project Process Timeline */}
              {processSteps.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Project Process</h2>
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
            </main>
          </div>

          {/* CTA Section */}
          <Card className="mt-16 bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need a Similar Project?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how we can bring your vision to life with the same quality and professionalism
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/estimate")}
                  className="group"
                >
                  Request Free Estimate
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/contact")}
                >
                  Contact Our Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}
