import { Link } from "react-router-dom";
import { Building2, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WhoWeServe = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Who We Serve
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with developers, general contractors, property owners, and managers to deliver exceptional construction projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Developers & General Contractors */}
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <CardHeader className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">For Developers & General Contractors</CardTitle>
              <CardDescription className="text-base">
                Reliable subcontracting and trade coordination for complex projects
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Multi-unit residential construction and repositioning</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Commercial development and tenant improvements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Design-build project delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Self-perform exterior envelope and specialty trades</span>
                </li>
              </ul>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button asChild className="group">
                  <Link to="/capabilities" className="gap-2">
                    View Capabilities
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/prequalification">
                    Pre-Qualification Package
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Property Owners & Managers */}
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <CardHeader className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">For Property Owners & Managers</CardTitle>
              <CardDescription className="text-base">
                Complete project management from concept to completion
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Building envelope restoration and upgrades</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Interior and exterior renovation projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Capital improvement programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Maintenance and repair services</span>
                </li>
              </ul>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button asChild className="group">
                  <Link to="/contact" className="gap-2">
                    Request Proposal
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/projects">
                    View Our Work
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

export default WhoWeServe;
