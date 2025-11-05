import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { organizationSchema } from "@/utils/structured-data";

export default function CompanyIntroduction() {
  const schema = organizationSchema({
    name: "Ascent Group Construction",
    description: "Full-service General Contractor in Toronto delivering commercial, multi-family residential, and institutional construction solutions across Ontario.",
    url: typeof window !== "undefined" ? window.location.origin : "",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
              Ontario's Trusted General Contractor
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                <strong className="text-foreground">Ascent Group Construction</strong> is a{" "}
                <strong>full-service General Contractor in Toronto</strong> delivering{" "}
                <strong>commercial, multi-family residential, and institutional construction solutions</strong>{" "}
                across Ontario. We manage projects from pre-construction planning through execution and closeout, 
                specializing in <strong>building envelope systems, restoration, and specialty construction</strong>.
              </p>

              <p className="text-lg">
                Our integrated capabilities include{" "}
                <strong>general contracting, construction management, and design-build services</strong>, 
                supported by self-perform expertise in painting, stucco and EIFS systems, masonry restoration, 
                metal cladding, parking structure rehabilitation, waterproofing, and exterior envelope upgrades. 
                This hybrid approach delivers <strong>schedule certainty</strong>, quality control, and cost efficiency 
                across every construction phase.
              </p>

              <p className="text-lg">
                With <strong>15+ years of experience</strong> and a{" "}
                <strong>proven record of on-time, on-budget delivery</strong>, Ascent partners with{" "}
                <strong>developers, property managers, institutional clients, and building owners</strong> throughout{" "}
                <strong>Toronto, Mississauga, Brampton, Vaughan, Markham</strong>, and the{" "}
                <strong>Greater Toronto Area</strong>. Our team is <strong>COR-certified</strong>,{" "}
                <strong>WSIB compliant</strong>, and committed to safety, sustainability, and long-term 
                performance—building lasting value through precision craftsmanship and trusted partnerships.
              </p>
            </div>

            <div className="mt-10 text-center">
              <Button asChild size="lg" className="group">
                <Link to="/about">
                  Learn About Our Team
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
