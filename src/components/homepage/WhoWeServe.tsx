import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Users, CheckCircle, Clock, FileText, Wrench, ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

const WhoWeServe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Who We Serve
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by developers, property managers, and building owners across Ontario
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Developers & General Contractors */}
          <div
            className={`bg-card border-2 border-primary/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  For Developers & General Contractors
                </h3>
                <p className="text-muted-foreground">
                  Pre-qualified and ready to deliver your next project
                </p>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Multi-unit residential construction & renovation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Commercial developments & tenant improvements</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Design-build delivery & value engineering</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground font-semibold">RFP response within 48 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Complete pre-qualification package available</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link to="/prequalification" className="flex items-center justify-center gap-2">
                  View Capabilities
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/contact">Submit RFP</Link>
              </Button>
            </div>
          </div>

          {/* Property Owners & Managers */}
          <div
            className={`bg-card border-2 border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  For Property Owners & Managers
                </h3>
                <p className="text-muted-foreground">
                  Comprehensive building maintenance and capital projects
                </p>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary-foreground flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Building envelope restoration & repairs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary-foreground flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Tenant improvement & interior renovations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary-foreground flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Capital project planning & execution</span>
              </li>
              <li className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-secondary-foreground flex-shrink-0 mt-0.5" />
                <span className="text-foreground font-semibold">Preventive maintenance programs</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary-foreground flex-shrink-0 mt-0.5" />
                <span className="text-foreground">24/7 emergency response services</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="secondary" className="flex-1">
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  Request Proposal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
