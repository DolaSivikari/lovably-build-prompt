import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Terms of Service"
        description="Read the terms and conditions for using Ascent Group Construction services."
      />
      <Navigation />

      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Please read these terms carefully before using our services"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" }
        ]}
        variant="standard"
      />
      
      <main>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8 space-y-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                    <p className="text-muted-foreground">
                      By accessing or using Ascent Group Construction's services and website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">2. Services Provided</h2>
                    <p className="text-muted-foreground mb-4">
                      Ascent Group Construction provides construction services including but not limited to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Commercial and residential painting</li>
                      <li>Exterior systems (stucco, EIFS, masonry)</li>
                      <li>Metal cladding installation</li>
                      <li>Parking garage restoration</li>
                      <li>Waterproofing and related construction services</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">3. Estimates and Quotes</h2>
                    <p className="text-muted-foreground">
                      All estimates and quotes provided are valid for 30 days from the date of issuance unless otherwise specified. Final pricing may be adjusted based on actual site conditions, material costs, and scope changes. Written authorization is required before commencing work.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
                    <p className="text-muted-foreground mb-4">
                      Standard payment terms include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Deposit: 30% upon contract signing</li>
                      <li>Progress payments: As specified in contract</li>
                      <li>Final payment: Due upon project completion and client approval</li>
                      <li>Late payments may incur interest charges as per applicable law</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">5. User Responsibilities</h2>
                    <p className="text-muted-foreground mb-4">
                      Clients agree to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Provide accurate project information and site access</li>
                      <li>Obtain necessary permits where required</li>
                      <li>Remove or protect personal belongings from work areas</li>
                      <li>Communicate changes or concerns promptly</li>
                      <li>Allow reasonable access for our team during agreed hours</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">6. Project Changes</h2>
                    <p className="text-muted-foreground">
                      Any changes to the original scope of work must be documented in writing through a change order. Additional costs and timeline adjustments will be communicated and approved before proceeding with changes.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">7. Warranties</h2>
                    <p className="text-muted-foreground">
                      We provide a 2-year warranty on workmanship and honor manufacturer warranties on materials used. Warranty coverage excludes damage from normal wear, improper maintenance, or unauthorized modifications.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
                    <p className="text-muted-foreground">
                      Ascent Group Construction shall not be liable for indirect, incidental, special, or consequential damages. Our total liability is limited to the amount paid for the specific service in question. We maintain comprehensive liability insurance for project-related incidents.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">9. Force Majeure</h2>
                    <p className="text-muted-foreground">
                      We are not liable for delays or failures in performance due to circumstances beyond our reasonable control, including but not limited to weather conditions, natural disasters, labor disputes, or material shortages.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">10. Dispute Resolution</h2>
                    <p className="text-muted-foreground">
                      Any disputes arising from our services shall first be addressed through good-faith negotiation. If unresolved, disputes will be subject to mediation in Ontario, Canada. Both parties agree to make reasonable efforts to resolve disputes amicably before pursuing legal action.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">11. Intellectual Property</h2>
                    <p className="text-muted-foreground">
                      All content on our website, including text, graphics, logos, and images, is the property of Ascent Group Construction and protected by copyright laws. Unauthorized use is prohibited.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
                    <p className="text-muted-foreground">
                      These Terms of Service are governed by the laws of Ontario, Canada. Any legal proceedings shall take place in the courts of Ontario.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">13. Changes to Terms</h2>
                    <p className="text-muted-foreground">
                      We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of modified terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
                    <p className="text-muted-foreground mb-4">
                      For questions about these Terms of Service, please contact us:
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="font-semibold mb-2">Ascent Group Construction</p>
                      <p className="text-muted-foreground">Email: info@ascentgroupconstruction.com</p>
                      <p className="text-muted-foreground">Phone: (416) 555-1234</p>
                      <p className="text-muted-foreground">Address: Greater Toronto Area, Ontario</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
