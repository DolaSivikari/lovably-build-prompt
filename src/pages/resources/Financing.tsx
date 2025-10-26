import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { CreditCard, CheckCircle2, Calculator, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Financing = () => {
  const plans = [
    {
      name: "6 Months Same as Cash",
      rate: "0% APR",
      minProject: "$2,500",
      features: ["No interest if paid in full within 6 months", "No hidden fees", "Quick approval"]
    },
    {
      name: "12-Month Plan",
      rate: "4.99% APR",
      minProject: "$5,000",
      features: ["Low monthly payments", "Fixed rate", "No prepayment penalty"]
    },
    {
      name: "24-Month Plan",
      rate: "6.99% APR",
      minProject: "$10,000",
      features: ["Extended payment period", "Manageable monthly payments", "Fixed rate guarantee"]
    },
    {
      name: "36-Month Plan",
      rate: "8.99% APR",
      minProject: "$15,000",
      features: ["Lowest monthly payment option", "Ideal for large projects", "Budget-friendly terms"]
    }
  ];

  const requirements = [
    "Valid government-issued ID",
    "Proof of income (recent pay stubs or tax returns)",
    "Credit score of 620 or higher",
    "Ontario resident",
    "Minimum project value of $2,500"
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Financing Options | Ascent Group Construction"
        description="Flexible financing plans for your construction project. 0% APR for 6 months, low monthly payments, quick approval within 24 hours."
        canonical="https://ascentgroupconstruction.com/resources/financing"
      />
      <Navigation />

      <PageHeader
        eyebrow="Flexible Payment Options"
        title="Financing Solutions"
        description="Make your project affordable with flexible payment plans"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/faq" },
          { label: "Financing" }
        ]}
      />

      {/* Hero Benefits */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-1">24hr Approval</h3>
                <p className="text-sm text-muted-foreground">Fast decision process</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <CreditCard className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-1">0% APR Option</h3>
                <p className="text-sm text-muted-foreground">6 months same as cash</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Calculator className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-1">No Hidden Fees</h3>
                <p className="text-sm text-muted-foreground">Transparent pricing</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-1">Flexible Terms</h3>
                <p className="text-sm text-muted-foreground">6 to 36 months</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financing Plans */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Financing Plans</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for your budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  {plan.rate === "0% APR" && (
                    <Badge className="w-fit mb-2 bg-green-100 text-green-700 border-green-200">
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">{plan.rate}</span>
                    <span className="text-muted-foreground">starting from</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Min. project: {plan.minProject}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Application Requirements</h2>
              <p className="text-muted-foreground">What you'll need to apply</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">How It Works</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  1
                </div>
                <h3 className="font-bold mb-2">Get Your Quote</h3>
                <p className="text-sm text-muted-foreground">
                  Receive detailed project estimate from Ascent Group
                </p>
              </div>

              <div>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  2
                </div>
                <h3 className="font-bold mb-2">Apply for Financing</h3>
                <p className="text-sm text-muted-foreground">
                  Complete simple online application, decision within 24 hours
                </p>
              </div>

              <div>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  3
                </div>
                <h3 className="font-bold mb-2">Start Your Project</h3>
                <p className="text-sm text-muted-foreground">
                  Once approved, we schedule and begin work immediately
                </p>
              </div>
            </div>

            <Button size="lg">Apply for Financing</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Financing;