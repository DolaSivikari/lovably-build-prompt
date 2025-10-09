import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ClipboardCheck,
  Users,
  Hammer,
  CheckCircle,
  Phone,
  Calendar,
  Shield,
  Sparkles,
} from "lucide-react";
import { generateHowToSchema } from "@/utils/faq-schema";

const HowWeWork = () => {
  const processSteps = [
    {
      icon: Phone,
      title: "Initial Contact",
      description: "Reach out via phone, email, or our online form",
      details:
        "Share your project details, timeline, and any specific requirements. We respond within 24 hours to schedule your consultation.",
      time: "Day 1",
    },
    {
      icon: ClipboardCheck,
      title: "Site Assessment",
      description: "Free on-site consultation and detailed inspection",
      details:
        "Our experts visit your location to assess surfaces, measure spaces, discuss color preferences, and understand your vision. We identify any prep work needed and discuss timeline options.",
      time: "Day 2-3",
    },
    {
      icon: Calendar,
      title: "Detailed Proposal",
      description: "Transparent quote with comprehensive scope of work",
      details:
        "Receive a detailed breakdown covering materials, labor, timeline, and warranties. No hidden fees. We explain every aspect and answer all your questions.",
      time: "Day 4-5",
    },
    {
      icon: Users,
      title: "Project Planning",
      description: "Schedule coordination and preparation",
      details:
        "Once approved, we schedule your project, coordinate our team, and confirm all details. You'll receive a dedicated project manager as your point of contact.",
      time: "Day 6-7",
    },
    {
      icon: Hammer,
      title: "Professional Execution",
      description: "Expert craftsmanship with daily progress updates",
      details:
        "Our skilled crews arrive on time, protect your property, and work efficiently. We maintain site cleanliness daily and provide regular progress updates. Quality control checks at every phase.",
      time: "Week 2+",
    },
    {
      icon: CheckCircle,
      title: "Final Inspection",
      description: "Walkthrough and satisfaction guarantee",
      details:
        "Complete final walkthrough with you to ensure every detail meets our high standards. Address any concerns immediately. Provide care instructions and warranty documentation.",
      time: "Final Day",
    },
  ];

  const howToSchema = generateHowToSchema({
    name: "How Ascent Group Construction Works",
    description:
      "Our comprehensive 6-step process for painting and exterior finishing projects across Ontario",
    totalTime: "P14D",
    steps: processSteps.map((step) => ({
      name: step.title,
      text: step.details,
    })),
  });

  return (
    <div className="min-h-screen">
      <SEO
        title="How We Work - Our Process | Ascent Group Construction"
        description="Discover our proven 6-step process for painting and exterior finishing projects. From initial consultation to final inspection, we ensure quality and transparency every step of the way."
        keywords="construction process, painting process, project workflow, how we work, Ontario contractors"
        structuredData={howToSchema}
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Proven Process
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Transparency, communication, and quality craftsmanship at every
                step. Here's exactly how we transform your space from start to
                finish.
              </p>
              <Link to="/estimate">
                <Button size="lg" variant="secondary">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {processSteps.map((step, index) => (
                <Card
                  key={index}
                  className="hover:shadow-elegant transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <step.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-2xl">
                            {index + 1}. {step.title}
                          </CardTitle>
                          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {step.time}
                          </span>
                        </div>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.details}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Our Commitments to You
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: "Quality Guarantee",
                  description:
                    "Comprehensive warranty on all labor and materials. We stand behind our work 100%.",
                },
                {
                  icon: Calendar,
                  title: "Timeline Commitment",
                  description:
                    "We provide realistic schedules and stick to them. Your time is valuable to us.",
                },
                {
                  icon: Users,
                  title: "Clear Communication",
                  description:
                    "Dedicated project manager, daily updates, and always available to answer questions.",
                },
              ].map((commitment, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <commitment.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>{commitment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {commitment.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience the Ascent Group difference. Contact us today for your
              free consultation and detailed quote.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" variant="secondary">
                  Get Free Estimate
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowWeWork;
