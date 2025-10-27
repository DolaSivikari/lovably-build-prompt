import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import FilterBar from "@/components/FilterBar";
import ProjectCard from "@/components/ProjectCard";
import ProjectFeaturedCard from "@/components/ProjectFeaturedCard";
import { Building2, Home, School, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeProjects } from "@/hooks/useRealtimeProjects";
import { resolveImagePath } from "@/utils/imageResolver";

const categories = [
  { label: "All Projects", value: "All", icon: Building2 },
  { label: "Commercial", value: "Commercial", icon: Building2 },
  { label: "Residential", value: "Residential", icon: Home },
  { label: "Institutional", value: "Institutional", icon: School },
  { label: "Industrial", value: "Industrial", icon: Factory },
];

const years = ["All", "2024", "2023", "2022", "2021"];

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(6);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from database with realtime updates
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("publish_state", "published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else if (data) {
        // Transform database projects to component format
        const projects = data.map((project: any) => ({
          title: project.title,
          category: project.category || "General",
          location: project.location || "N/A",
          year: project.year || new Date(project.created_at).getFullYear().toString(),
          size: project.project_size || "N/A",
          duration: project.duration || "N/A",
          image: resolveImagePath(project.featured_image),
          images: project.gallery || [],
          tags: project.tags || [project.category, project.duration, project.project_size].filter(Boolean),
          description: project.description || project.summary || "",
          highlights: project.summary ? [project.summary] : [],
          slug: project.slug,
          featured: project.featured,
          id: project.id,
          rawData: project,
        }));
        setAllProjects(projects);
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  // Enable realtime subscription for instant updates
  const realtimeProjects = useRealtimeProjects(allProjects.map(p => p.rawData));
  
  useEffect(() => {
    if (realtimeProjects.length > 0) {
      const transformed = realtimeProjects.map((project: any) => ({
        title: project.title,
        category: project.category || "General",
        location: project.location || "N/A",
        year: project.year || new Date(project.created_at).getFullYear().toString(),
        size: project.project_size || "N/A",
        duration: project.duration || "N/A",
        image: resolveImagePath(project.featured_image),
        images: project.gallery || [],
        tags: project.tags || [project.category, project.duration, project.project_size].filter(Boolean),
        description: project.description || project.summary || "",
        highlights: project.summary ? [project.summary] : [],
        slug: project.slug,
        featured: project.featured,
        id: project.id,
        rawData: project,
      }));
      setAllProjects(transformed);
    }
  }, [realtimeProjects]);

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || project.category.includes(selectedCategory);
    const matchesYear = selectedYear === "All" || project.year === selectedYear;

    return matchesSearch && matchesCategory && matchesYear;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured).slice(0, 3);
  const regularProjects = filteredProjects.filter(p => !p.featured);
  const visibleProjects = regularProjects.slice(0, visibleCount);

  const handleViewDetails = (slug: string) => {
    navigate(`/projects/${slug}`);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Projects - 500+ Completed | Ascen Group"
        description="Browse our portfolio of 500+ successfully completed construction and painting projects across the GTA. Commercial, residential, institutional, and industrial work."
        canonical="https://ascentgroupconstruction.com/projects"
      />
      <Navigation />

      <PageHeader
        eyebrow="Our Work"
        title="Project Portfolio"
        description="Explore 500+ successful projects across the GTA"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects" }
        ]}
        variant="with-stats"
        stats={[
          { value: "500+", label: "Projects" },
          { value: "$2B+", label: "Total Value" },
          { value: "98%", label: "Satisfaction" }
        ]}
      />

      {/* Featured Projects Spotlight */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">Showcasing our most notable work</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectFeaturedCard key={project.slug} {...project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        categories={categories}
        years={years}
        projectCount={filteredProjects.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : visibleProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No projects found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedYear("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProjects.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    {...project}
                    slug={project.slug}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < regularProjects.length && (
                <div className="text-center mt-12">
                  <Button onClick={loadMore} size="lg">
                    Load More Projects
                    <span className="ml-2">
                      ({visibleCount} of {regularProjects.length})
                    </span>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
