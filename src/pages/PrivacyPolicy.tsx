import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Privacy Policy"
        description="Learn how Ascent Group Construction collects, uses, and protects your personal information."
      />
      <Navigation />

      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your privacy is important to us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" }
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
                    <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                    <p className="text-muted-foreground mb-4">
                      We collect information you provide directly to us, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Name, email address, phone number, and mailing address</li>
                      <li>Project details and service inquiries</li>
                      <li>Payment and billing information</li>
                      <li>Communications with our team</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                    <p className="text-muted-foreground mb-4">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process and complete transactions</li>
                      <li>Send you estimates, invoices, and project updates</li>
                      <li>Respond to your inquiries and provide customer support</li>
                      <li>Send marketing communications (with your consent)</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                    <p className="text-muted-foreground mb-4">
                      We do not sell your personal information. We may share your information with:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Service providers who assist in our operations</li>
                      <li>Professional advisors (lawyers, accountants)</li>
                      <li>Government authorities when required by law</li>
                      <li>Business partners with your consent</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                    <p className="text-muted-foreground">
                      We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
                    <p className="text-muted-foreground">
                      We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings. Disabling cookies may limit your ability to use certain features of our website.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
                    <p className="text-muted-foreground">
                      Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
                    <p className="text-muted-foreground mb-4">
                      Under applicable privacy laws, you have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Request deletion of your information</li>
                      <li>Object to processing of your information</li>
                      <li>Withdraw consent (where applicable)</li>
                      <li>Receive a copy of your information</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                    <p className="text-muted-foreground">
                      Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                    <p className="text-muted-foreground">
                      We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                    <p className="text-muted-foreground mb-4">
                      If you have questions about this Privacy Policy or our privacy practices, please contact us:
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

export default PrivacyPolicy;
