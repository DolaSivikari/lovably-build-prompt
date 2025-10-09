import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import caseStudiesData from "@/data/case-studies.json";
import OptimizedImage from "./OptimizedImage";

const CaseStudyPreview = () => {
  const caseStudies = Object.entries(caseStudiesData.caseStudies).slice(0, 2);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real projects, real results. See how we've helped our clients succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-6xl mx-auto">
          {caseStudies.map(([id, caseStudy]) => (
            <Link key={id} to={`/case-study/${id}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <OptimizedImage
                    src={caseStudy.heroImage}
                    alt={`${caseStudy.title} - ${caseStudy.category} project completed in ${caseStudy.location}`}
                    width={800}
                    height={600}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-secondary text-primary">{caseStudy.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {caseStudy.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{caseStudy.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{caseStudy.duration}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {caseStudy.challenge}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    Read full {caseStudy.category.toLowerCase()} case study <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/case-studies">
              View Case Studies <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyPreview;
