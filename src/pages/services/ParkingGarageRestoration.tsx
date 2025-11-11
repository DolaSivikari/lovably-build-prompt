import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Award, FileCheck, Building2 } from "lucide-react";

export default function ParkingGarageRestoration() {
  return (
    <>
      <SEO
        title="Parking Garage Restoration | Spall Repair, Joint Systems & Traffic Coatings | Ontario"
        description="Prime contractor for parking structure restoration: concrete spall repair, expansion joint systems, traffic coatings, line marking. $25k-$150k projects. Ontario & GTA."
        keywords="parking garage restoration, spall repair, joint systems, traffic coatings, concrete repair, Ontario"
      />
      <Navigation />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-muted">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Parking Garage Restoration</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Prime contractor for parking structure restoration including concrete spall repair, 
              expansion joint replacement, traffic coating systems, and comprehensive line marking across Ontario and the GTA.
            </p>
          </div>
        </section>

        {/* Problem-Solution */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">What We Solve</h2>
            <ul className="space-y-3 mb-8 text-muted-foreground">
              <li>• Concrete spalling and rebar exposure from salt/freeze-thaw damage</li>
              <li>• Failed expansion joints allowing water infiltration and structural movement</li>
              <li>• Deteriorated traffic coatings requiring replacement or restoration</li>
              <li>• Worn or missing line markings and safety striping</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">Our Process</h2>
            <ol className="space-y-3 mb-8 text-muted-foreground">
              <li><strong>1. Site Walk</strong> — Structural assessment within 48–72h of request</li>
              <li><strong>2. Scope Development</strong> — Condition survey with photo documentation</li>
              <li><strong>3. Submittals</strong> — Repair methods and material specs within 48h</li>
              <li><strong>4. Execution</strong> — Phased repairs with traffic control and safety protocols</li>
              <li><strong>5. Closeout</strong> — Final walkthrough and warranty documentation</li>
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
