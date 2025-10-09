import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FilterBar from "@/components/FilterBar";
import ProjectCard from "@/components/ProjectCard";
import ProjectFeaturedCard from "@/components/ProjectFeaturedCard";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import { Building2, Home, School, Factory, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import caseStudiesData from "@/data/case-studies.json";

const categories = [
  { label: "All Projects", value: "All", icon: Building2 },
  { label: "Commercial", value: "Commercial", icon: Building2 },
  { label: "Residential", value: "Residential", icon: Home },
  { label: "Institutional", value: "Institutional", icon: School },
  { label: "Industrial", value: "Industrial", icon: Factory },
];

const years = ["All", "2024", "2023"];

// Convert case studies to projects format
const allProjects = Object.entries(caseStudiesData.caseStudies).map(([slug, study]: [string, any]) => ({
  title: study.title,
  category: study.category.split('/')[0], // Take first category if multiple
  location: study.location,
  year: study.date,
  size: study.size,
  duration: study.duration,
  image: study.heroImage,
  images: study.images || [],
  tags: [study.category, study.duration, study.size],
  description: study.challenge,
  highlights: study.results,
  slug: slug,
  featured: slug === "heritage-building-restoration" ? "Heritage Award" : 
            slug === "luxury-condo-restoration" ? "Excellence Award" :
            slug === "downtown-office-renovation" ? "Featured Project" : undefined
}));

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(6);

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

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Projects - 500+ Completed | Ascen Group"
        description="Browse our portfolio of 500+ successfully completed construction and painting projects across the GTA. Commercial, residential, institutional, and industrial work."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Our <span className="text-primary">Project Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore 500+ successful projects across the GTA
            </p>
            
            {/* Animated Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">$2B+</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Spotlight */}
      {featuredProjects.length > 0 && (
        <section className="py-12 bg-muted/30">
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
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {visibleProjects.length === 0 ? (
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
                    onViewDetails={() => handleViewDetails(project)}
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

      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />

      <Footer />
    </div>
  );
};

export default Projects;
