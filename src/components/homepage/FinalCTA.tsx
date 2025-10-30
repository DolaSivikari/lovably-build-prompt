import { FileText, Download, CheckCircle, ArrowRight, BookOpen, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PackageRequestDialog from "@/components/PackageRequestDialog";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Prequalification Package */}
          <Card className="border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8 lg:p-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-primary" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Contractor Package
              </h2>
              <p className="text-muted-foreground mb-6">
                Everything you need to prequalify us for your next project
              </p>

              <div className="space-y-2 mb-8">
                {[
                  "Insurance certificates & bonding",
                  "Safety certifications (COR, WSIB)",
                  "Financial statements",
                  "Equipment & crew capacity",
                  "References from similar projects",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <Button size="lg" asChild className="w-full group">
                  <Link to="/resources/contractor-portal">
                    <Download className="mr-2 w-5 h-5" />
                    Request Package
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full">
                  <Link to="/resources/contractor-portal">
                    View All Documents
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resources & Content */}
          <Card className="border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-8 lg:p-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Resources & Insights
              </h2>
              <p className="text-muted-foreground mb-6">
                Expert guidance, project stories, and industry knowledge
              </p>

              <div className="space-y-2 mb-8">
                {[
                  "Construction best practices",
                  "Project case studies",
                  "Cost estimation guides",
                  "Material selection tips",
                  "Maintenance schedules",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <Button size="lg" asChild className="w-full group">
                  <Link to="/blog">
                    <BookOpen className="mr-2 w-5 h-5" />
                    Explore Articles
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full">
                  <Link to="/estimate">
                    <Calculator className="mr-2 w-5 h-5" />
                    Get Free Estimate
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
