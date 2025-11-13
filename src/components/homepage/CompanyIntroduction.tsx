import { Button } from "@/ui/Button";
import { ArrowRight, Building2, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { organizationSchema } from "@/utils/structured-data";

export default function CompanyIntroduction() {
  const schema = organizationSchema({
    name: "Ascent Group Construction",
    description: "Prime specialty contractor for building envelope restoration, façade remediation, and parking garage rehabilitation across Ontario and the GTA.",
    url: typeof window !== "undefined" ? window.location.origin : "",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="py-12 md:py-16 bg-background texture-blueprint">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Section Header - Enterprise Style */}
          <div className="max-w-3xl mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight font-playfair">
              Ontario's Envelope & Restoration Specialists
            </h2>
            <div className="h-1 w-16 bg-construction-orange mb-8"></div>
          </div>

          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-12">
            
            {/* Left Column - Main Content */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">Ascent Group Construction</span> is a{" "}
                <span className="text-foreground font-semibold">prime specialty contractor</span> delivering{" "}
                <span className="text-foreground font-semibold">building envelope restoration, façade remediation, and parking garage rehabilitation</span>{" "}
                across Ontario and the GTA.
              </p>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                We manage specialty projects from pre-construction planning through execution and closeout, 
                specializing in building envelope systems, restoration, and waterproofing with a systematic 
                approach that ensures quality, schedule adherence, and cost control.
              </p>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Our self-performed capabilities include stucco and EIFS systems, masonry restoration, 
                sealant replacement, parking structure rehabilitation, waterproofing, and exterior envelope upgrades—delivering 
                prime specialty services and trade package support for developers and building owners across the GTA.
              </p>
            </div>

            {/* Right Column - Key Highlights */}
            <div className="space-y-6">
              
              {/* Highlight 1 */}
              <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-construction-orange/10 flex items-center justify-center border border-construction-orange/20">
                  <Building2 className="w-6 h-6 text-construction-orange" />
                </div>
              </div>
                <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Complete Services</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Prime specialty contractor with self-perform trades delivering 
                  schedule certainty and quality control across building envelope and restoration projects.
                </p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-steel-blue/10 flex items-center justify-center border border-steel-blue/20">
                  <Users className="w-6 h-6 text-steel-blue" />
                </div>
              </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Proven Track Record</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    15+ years of experience with proven on-time, on-budget delivery serving developers, 
                    property managers, and institutional clients across the Greater Toronto Area.
                  </p>
                </div>
              </div>

              {/* Highlight 3 */}
              <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-construction-orange/10 flex items-center justify-center border border-construction-orange/20">
                  <Award className="w-6 h-6 text-construction-orange" />
                </div>
              </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Licensed & Certified</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    COR-certified, WSIB compliant, and committed to safety, sustainability, and 
                    long-term performance through precision craftsmanship and trusted partnerships.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Service Areas */}
          <div className="max-w-3xl mb-8">
            <p className="text-base text-muted-foreground leading-relaxed">
              Serving <span className="text-foreground font-semibold">Toronto, Mississauga, Brampton, Vaughan, Markham</span>, 
              and the <span className="text-foreground font-semibold">Greater Toronto Area</span> with comprehensive 
              construction solutions built on precision, reliability, and lasting value.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="primary">
              <Link to="/about" className="inline-flex items-center gap-2">
                Learn About Our Team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/capabilities">
                See Our Work
              </Link>
            </Button>
          </div>

        </div>
      </section>
    </>
  );
}
