import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Award, FileCheck, Building2 } from "lucide-react";

export default function FacadeRemediation() {
  return (
    <>
      <SEO
        title="Façade Remediation Programs | EIFS, Stucco & Masonry Restoration | Ontario"
        description="Prime contractor for façade remediation: EIFS repair, stucco refinish, masonry restoration, architectural coatings. $25k-$150k projects. Ontario & GTA."
        keywords="facade remediation, EIFS repair, stucco repair, masonry restoration, building envelope, Ontario"
      />
      <Navigation />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-muted">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Façade Remediation Programs</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Prime contractor for EIFS/stucco repair and refinish, masonry restoration and tuckpointing, 
              architectural coatings, and cladding repairs across Ontario and the GTA.
            </p>
          </div>
        </section>

        {/* Problem-Solution */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">What We Solve</h2>
            <ul className="space-y-3 mb-8 text-muted-foreground">
              <li>• Water intrusion and envelope failures in aging EIFS/stucco systems</li>
              <li>• Deteriorated masonry joints and spalling brick/block</li>
              <li>• Failed architectural coatings requiring refinish or restoration</li>
              <li>• Cladding defects and delamination requiring repair</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Our Process</h2>
            <ol className="space-y-3 mb-8 text-muted-foreground">
              <li><strong>1. Site Walk</strong> — Diagnostic assessment within 48–72h of request</li>
              <li><strong>2. Scope Development</strong> — Photo-documented reports with itemized scopes</li>
              <li><strong>3. Submittals</strong> — Material specs and warranties within 48h of approval</li>
              <li><strong>4. Execution</strong> — Self-performed trades with daily photo logs</li>
              <li><strong>5. Closeout</strong> — Final walk, warranty documents, and maintenance plans</li>
            </ol>

            <h2 className="text-2xl font-bold mb-4">Typical Project Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-muted-foreground"><strong>Project Size:</strong> $25k–$150k</p>
                <p className="text-muted-foreground"><strong>Building Types:</strong> Condos, commercial, parkades</p>
              </div>
              <div>
                <p className="text-muted-foreground"><strong>Site Walk:</strong> 48–72h</p>
                <p className="text-muted-foreground"><strong>Submittals:</strong> 48h from approval</p>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-6 mb-8 py-6 border-y border-border">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold">WSIB Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold">CGL $5M</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold">Bonding Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold">COR-Eligible</span>
              </div>
            </div>

            <Button asChild size="lg" className="mt-8">
              <Link to="/quote">Request Project Quote</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
