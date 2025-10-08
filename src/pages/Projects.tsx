import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Ruler, Search, Filter, ArrowRight } from "lucide-react";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectInstitutional from "@/assets/project-institutional.jpg";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const projects = [
    {
      image: projectCommercial,
      title: "Downtown Office Tower",
      location: "Toronto, ON",
      category: "Commercial",
      size: "450,000 sq ft",
      year: "2023",
      value: "$180M",
      tags: ["LEED Gold", "Office", "Toronto"],
      description: "A flagship 24-story office development in Toronto's financial district featuring sustainable design, smart building technology, and premium amenities. The project achieved LEED Gold certification and was delivered 3 months ahead of schedule.",
      highlights: [
        "LEED Gold certified",
        "Advanced HVAC and energy systems",
        "Integrated parking structure",
        "Rooftop amenity spaces"
      ]
    },
    {
      image: projectIndustrial,
      title: "Advanced Manufacturing Facility",
      location: "Mississauga, ON",
      category: "Industrial",
      size: "280,000 sq ft",
      year: "2023",
      value: "$95M",
      tags: ["Manufacturing", "Automation", "Mississauga"],
      description: "State-of-the-art production facility designed for advanced manufacturing operations. Features include high-bay spaces, integrated material handling systems, and sophisticated environmental controls.",
      highlights: [
        "Automated material handling",
        "Heavy-duty floor loading capacity",
        "Clean room manufacturing areas",
        "Advanced logistics integration"
      ]
    },
    {
      image: projectInstitutional,
      title: "Regional Healthcare Centre",
      location: "Ottawa, ON",
      category: "Institutional",
      size: "320,000 sq ft",
      year: "2024",
      value: "$240M",
      tags: ["Healthcare", "Medical", "Ottawa"],
      description: "Comprehensive medical facility providing advanced patient care across multiple specialties. The project integrated complex medical systems, specialized infrastructure, and healing-focused design principles.",
      highlights: [
        "300+ patient rooms",
        "8 operating theatres",
        "Emergency and trauma center",
        "Advanced medical imaging suite"
      ]
    },
    {
      image: projectCommercial,
      title: "Mixed-Use Development",
      location: "Vancouver, BC",
      category: "Commercial",
      size: "520,000 sq ft",
      year: "2022",
      value: "$220M",
      tags: ["Mixed-Use", "Retail", "Vancouver"],
      description: "Urban mixed-use development combining retail, office, and residential spaces. The project transformed an underutilized site into a vibrant community hub with emphasis on pedestrian connectivity.",
      highlights: [
        "Ground floor retail spaces",
        "12 floors of office space",
        "200 residential units",
        "Public plaza and streetscapes"
      ]
    },
    {
      image: projectIndustrial,
      title: "Distribution Centre",
      location: "Calgary, AB",
      category: "Industrial",
      size: "385,000 sq ft",
      year: "2023",
      value: "$72M",
      tags: ["Logistics", "Distribution", "Calgary"],
      description: "Modern logistics facility with high-efficiency design optimized for contemporary supply chain operations. Features automated systems and sustainable building practices.",
      highlights: [
        "Cross-dock operations capability",
        "32 loading docks",
        "Automated sortation systems",
        "Solar panel installation"
      ]
    },
    {
      image: projectInstitutional,
      title: "University Research Building",
      location: "Waterloo, ON",
      category: "Institutional",
      size: "175,000 sq ft",
      year: "2022",
      value: "$135M",
      tags: ["Education", "Research", "Waterloo"],
      description: "Cutting-edge research facility housing laboratories, collaborative workspaces, and specialized equipment. The building supports interdisciplinary research with flexible lab configurations.",
      highlights: [
        "Wet and dry lab spaces",
        "Vivarium facilities",
        "Clean room laboratories",
        "Collaborative research commons"
      ]
    }
  ];

  const categories = ["All", "Commercial", "Industrial", "Institutional"];
  const years = ["All", "2024", "2023", "2022"];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesYear = selectedYear === "All" || project.year === selectedYear;

    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-charcoal text-white py-20 mt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 36px),
                             repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 36px)`
          }} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-3 px-4 py-1.5 bg-white/5 backdrop-blur-sm border border-cream/20 rounded-full">
            <span className="text-cream font-semibold text-sm tracking-wider uppercase">Our Work</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Project Portfolio</h1>
          <p className="text-xl max-w-3xl mx-auto text-cream/90 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Explore our diverse portfolio of successfully delivered projects across commercial, industrial, and institutional sectors throughout Canada.
          </p>
        </div>
      </section>

      {/* Filters Section - Sticky */}
      <section className="sticky top-16 z-40 bg-charcoal/95 backdrop-blur-sm border-b border-cream/20 py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/60" />
              <Input
                type="text"
                placeholder="Search projects, locations, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-cream/20 text-cream placeholder:text-cream/50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-cream/60" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-cream/60" />
              <div className="flex gap-2">
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(year)}
                    className="transition-all"
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Counter */}
          <div className="mt-4 text-sm text-cream/70">
            Showing <span className="font-semibold text-cream">{filteredProjects.length}</span> of{" "}
            <span className="font-semibold text-cream">{projects.length}</span> projects
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-br from-charcoal via-primary-dark to-primary">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-cream/70 mb-4">No projects found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedYear("All");
                }}
                className="border-cream/30 text-cream hover:bg-cream/10"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredProjects.map((project, index) => (
                <Card 
                  key={project.title}
                  className="overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-fade-in bg-white/5 backdrop-blur-sm border-cream/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent group-hover:from-charcoal/90 transition-all duration-300" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-terracotta/90 text-cream border-0">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="bg-charcoal/80 backdrop-blur-sm text-cream border-cream/20">
                          {project.year}
                        </Badge>
                      </div>
                      {/* CTA Button - Reveals on Hover */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <Button size="sm" className="shadow-lg bg-cream text-charcoal hover:bg-cream/90">
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center bg-charcoal/40">
                      <h3 className="text-2xl font-bold mb-4 text-cream group-hover:text-white transition-colors">{project.title}</h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs bg-white/5 text-cream/80 border-cream/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-cream/70">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Ruler className="h-4 w-4" />
                          {project.size}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {project.year}
                        </div>
                        <div className="font-semibold text-cream">
                          {project.value}
                        </div>
                      </div>
                      <p className="mb-4 text-cream/80 leading-relaxed">{project.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2 text-cream">Project Highlights:</h4>
                        <ul className="space-y-1">
                          {project.highlights.map((highlight) => (
                            <li key={highlight} className="text-sm flex items-start gap-2 text-cream/70">
                              <span className="text-terracotta mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
