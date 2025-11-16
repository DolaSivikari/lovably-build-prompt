import { Button } from "@/ui/Button";
import { ArrowRight, Building, HardHat, Award, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { organizationSchema } from "@/utils/structured-data";

export default function CompanyIntroduction() {
  const schema = organizationSchema({
    name: "Ascent Group Construction",
    description: "Lead/specialty contractor for building envelope & restoration in Toronto (GTA) — façade remediation, waterproofing, sealants, EIFS/stucco, masonry, concrete & parking-garage repair.",
    url: typeof window !== "undefined" ? window.location.origin : "",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Section Header - Enterprise Style */}
          <div className="max-w-3xl mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Building Envelope & Restoration Specialists in Toronto (GTA)
            </h2>
            <div className="h-1 w-16 bg-construction-orange mb-8"></div>
          </div>

          {/* Three-Column Layout with Quick Facts Sidebar */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
            
            {/* Main Content */}
            <div className="lg:col-span-12 space-y-4">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">Lead/specialty contractor</span> for façade remediation, waterproofing, sealant replacement, EIFS/stucco, masonry restoration, concrete & parking‑garage repair—serving the GTA and Golden Horseshoe.
              </p>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">Ascent Group Construction</span> protects buildings from water intrusion, façade deterioration, and structural wear. We act as the <span className="text-foreground font-semibold">lead contractor</span> for envelope and exterior restoration scopes—planning access and safety, self‑performing the core trades, and communicating clearly from <span className="text-foreground font-semibold">site walk to closeout</span>.
              </p>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">Envelope is our focus—this is all we do.</span> From assessment and scope development to submittals, sequencing, and turnover, we follow consultant/EOR details and manufacturer requirements. We work safely in <span className="text-foreground font-semibold">occupied buildings</span>, document progress with <span className="text-foreground font-semibold">photo logs</span>, and provide <span className="text-foreground font-semibold">applicable manufacturer and workmanship warranties</span>.
              </p>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                We <span className="text-foreground font-semibold">self‑perform key trades</span>—sealants/caulking, EIFS & stucco, masonry repairs and tuckpointing, waterproofing & protective coatings, concrete and <span className="text-foreground font-semibold">parking‑garage rehabilitation</span>—coordinating trusted partners only when needed. <span className="text-foreground font-semibold">One accountable team</span> for your envelope scope, whether you're managing an existing asset, planning a phased restoration, or delivering a new build.
              </p>
            </div>

            {/* Bottom Section - Key Highlights (Full Width) */}
            <div className="lg:col-span-12 mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Highlight 1 */}
              <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-construction-orange/10 flex items-center justify-center border border-construction-orange/20">
                  <Building className="w-6 h-6 text-construction-orange" />
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
                  <HardHat className="w-6 h-6 text-steel-blue" />
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
                <h3 className="text-lg font-bold text-foreground mb-2">Building Our Credentials</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Licensed business with WSIB registration and insurance in progress. Committed to safety, 
                  quality documentation, and professional execution on every project.
                </p>
                </div>
              </div>

              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="max-w-3xl mb-8">
            <p className="text-base text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">Service Area:</span> Toronto, Mississauga, Brampton, Vaughan/Markham, Oakville/Burlington, Hamilton & the GTA/Golden Horseshoe. Typical availability for site assessments: <span className="text-foreground font-semibold">48–72 hours</span>.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="primary">
              <Link to="/contact" className="inline-flex items-center gap-2">
                Request Site Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/services">
                View Services
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/for-general-contractors">
                For GCs: Request Unit Pricing
              </Link>
            </Button>
          </div>

        </div>
      </section>
    </>
  );
}
