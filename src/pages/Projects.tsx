import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Ruler } from "lucide-react";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectInstitutional from "@/assets/project-institutional.jpg";

const Projects = () => {
  const projects = [
    {
      image: projectCommercial,
      title: "Downtown Office Tower",
      location: "Toronto, ON",
      category: "Commercial",
      size: "450,000 sq ft",
      year: "2023",
      value: "$180M",
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
      description: "Cutting-edge research facility housing laboratories, collaborative workspaces, and specialized equipment. The building supports interdisciplinary research with flexible lab configurations.",
      highlights: [
        "Wet and dry lab spaces",
        "Vivarium facilities",
        "Clean room laboratories",
        "Collaborative research commons"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block mb-3 px-4 py-1.5 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
            <span className="text-secondary font-semibold text-sm tracking-wider uppercase">Our Work</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Project Portfolio</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Explore our diverse portfolio of successfully delivered projects across commercial, industrial, and institutional sectors throughout Canada.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {projects.map((project, index) => (
              <Card 
                key={project.title}
                className="overflow-hidden hover:shadow-xl transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-secondary text-secondary-foreground">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
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
                      <div className="font-semibold text-primary">
                        {project.value}
                      </div>
                    </div>
                    <p className="mb-4 text-muted-foreground">{project.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Project Highlights:</h4>
                      <ul className="space-y-1">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
