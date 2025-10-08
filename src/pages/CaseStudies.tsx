import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Ruler, Clock, ArrowRight, FileText } from "lucide-react";
import caseStudiesData from "@/data/case-studies.json";

const CaseStudies = () => {
  const [filter, setFilter] = useState("all");

  const caseStudiesArray = Object.entries(caseStudiesData.caseStudies).map(([id, study]) => ({
    id,
    ...study
  }));

  const categories = ["all", ...Array.from(new Set(caseStudiesArray.map(s => s.category)))];

  const filteredStudies = filter === "all" 
    ? caseStudiesArray 
    : caseStudiesArray.filter(s => s.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="min-h-screen">
      <SEO 
        title="Case Studies - Project Deep Dives"
        description="Discover how Ascen Group tackles complex painting and finishing challenges with innovative solutions and expert craftsmanship across the GTA."
        keywords="case studies, project portfolio, painting projects, construction case studies, GTA projects"
      />
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-24">
          <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                <FileText className="w-10 h-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Project Deep Dives
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                Discover how we tackle complex painting and finishing challenges with innovative solutions and expert craftsmanship
              </p>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-12 bg-background sticky top-16 z-40 border-b">
          <div className="container mx-auto px-4">
            <Tabs value={filter} onValueChange={setFilter} className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="text-base py-3 capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredStudies.map((study, index) => (
                <Link key={study.id} to={`/case-study/${study.id}`}>
                  <Card 
                    className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={study.heroImage}
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-secondary text-primary">{study.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {study.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{study.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4" />
                          <span>{study.size}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{study.duration}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {study.challenge}
                      </p>

                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        Read Full Case Study <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredStudies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No case studies found in this category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              See how we can bring the same level of expertise and attention to detail to your next project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/estimate">
                  Get Free Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;
