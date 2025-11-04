import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Award, MessageCircle, Shield, Heart, Leaf, HelpCircle } from "lucide-react";
import { useSettingsData } from "@/hooks/useSettingsData";
import companyData from "@/data/company-info.json";
import teamWork from "@/assets/team-work.jpg";
import CompanyTimeline from "@/components/homepage/CompanyTimeline";

const iconMap: { [key: string]: any } = {
  award: Award,
  "message-circle": MessageCircle,
  shield: Shield,
  heart: Heart,
};

const About = () => {
  const { data: aboutSettings, loading } = useSettingsData('about_page_settings');

  // Merge database settings with fallback data
  const yearsInBusiness = aboutSettings?.years_in_business || 15;
  const totalProjects = aboutSettings?.total_projects || 500;
  const satisfactionRate = aboutSettings?.satisfaction_rate || 98;

  const values = (aboutSettings?.values as any[]) || companyData.values;
  const sustainabilityData = {
    commitment: aboutSettings?.sustainability_commitment || companyData.sustainability.commitment,
    initiatives: (aboutSettings?.sustainability_initiatives as any[]) || companyData.sustainability.initiatives
  };
  const safetyData = {
    commitment: aboutSettings?.safety_commitment || companyData.safety.commitment,
    stats: (aboutSettings?.safety_stats as any[]) || [],
    programs: (aboutSettings?.safety_programs as any[]) || companyData.safety.programs
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="About Us"
        description="Learn about Ascen Group Construction - 15+ years of excellence in residential painting and stucco/EIFS services across the GTA. Meet our team and discover our values."
        keywords="about Ascen Group, construction company Mississauga, painting contractor team, company values, sustainability"
      />
      <Navigation />

      {loading ? (
        <>
          <div className="h-[400px] bg-muted animate-pulse" />
          <div className="container mx-auto px-4 py-24">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </>
      ) : (
        <>
          <PageHeader
            eyebrow="About Us"
            title="Building Excellence Since 2009"
            description="We're not just another construction company. We're your partners in creating lasting value through quality craftsmanship and innovative solutions."
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "About Us" }
            ]}
            variant="with-stats"
            stats={[
              { value: `${yearsInBusiness}+`, label: "Years" },
              { value: `${totalProjects}+`, label: "Projects" },
              { value: `${satisfactionRate}%`, label: "Satisfaction" }
            ]}
          />
        </>
      )}
      
      <main>

        {/* Company Story */}
        <section className="container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-5xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2009, Ascent Group Construction began with a simple mission: deliver exceptional painting and exterior finishing services with uncompromising quality and integrity.
                </p>
                <p>
                  What started as a small team of dedicated craftsmen has grown into one of the GTA's most trusted contractors. We've completed over 500 projects, built lasting relationships with hundreds of satisfied clients, and established a reputation for excellence that speaks for itself.
                </p>
                <p>
                  Today, we continue to uphold the same values that guided us from day one—quality first, transparent communication, unwavering commitment to safety, and complete customer satisfaction.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={teamWork}
                alt="Ascen Group Construction team working on a project"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-primary p-6 rounded-lg shadow-xl max-w-xs">
                <p className="font-bold text-lg mb-2">Our Promise</p>
                <p className="text-sm">
                  Every project completed on time, within budget, and exceeding expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PHASE 1: Company Timeline */}
        <CompanyTimeline />

        {/* Values */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision and every project
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {companyData.values.map((value, index) => {
                const IconComponent = iconMap[value.icon];
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>


        {/* Sustainability */}
        <section className="bg-muted py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Leaf className="w-8 h-8 text-sustainability" />
                <h2 className="text-5xl font-bold">Sustainability Commitment</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {companyData.sustainability.commitment}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {companyData.sustainability.initiatives.map((initiative, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">{initiative.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {initiative.description}
                    </p>
                    <div className="pt-3 border-t">
                      <p className="text-xs font-semibold text-primary">
                        Impact: {initiative.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-5xl font-bold">Safety First, Always</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                {companyData.safety.commitment}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center p-6 bg-primary text-primary-foreground">
                <div className="text-3xl font-bold mb-2">500+</div>
                <p className="text-sm opacity-90">Projects with Zero Lost-Time Incidents</p>
              </Card>
              <Card className="text-center p-6 bg-primary text-primary-foreground">
                <div className="text-3xl font-bold mb-2">2,000+</div>
                <p className="text-sm opacity-90">Hours of Safety Training Annually</p>
              </Card>
              <Card className="text-center p-6 bg-primary text-primary-foreground">
                <div className="text-3xl font-bold mb-2">100%</div>
                <p className="text-sm opacity-90">OSHA Compliance Rate</p>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {companyData.safety.programs.map((program, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">{program.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <HelpCircle className="w-8 h-8 text-primary" />
                <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                Find answers to the most common questions about our services, pricing, and process
              </p>
            </div>

            {/* General Questions */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">General</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold">
                    How long have you been in business?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Ascent Group Construction has been serving the GTA since 2009, with over 15 years of experience delivering quality painting and stucco/EIFS services.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold">
                    Are you licensed and insured?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, we are fully licensed and carry $5 million in liability insurance coverage. We also maintain WSIB coverage for all our employees. We provide certificates of insurance upon request for your peace of mind.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold">
                    Do you offer warranties?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, all our work comes with comprehensive warranties. We offer a 2-year warranty on workmanship and material warranties ranging from 5-15 years depending on the products used. All warranty details are clearly outlined in your contract.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold">
                    What areas do you serve?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We proudly serve the Greater Toronto Area (GTA) including Toronto, Mississauga, Brampton, Oakville, Burlington, Hamilton, Vaughan, Richmond Hill, and surrounding communities. Contact us to confirm service availability in your specific area.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Pricing & Estimates */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">Pricing & Estimates</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-semibold">
                    How do you calculate estimates?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our estimates are based on several factors including project size (square footage), surface condition, preparation required, type of materials selected, and project complexity. We provide detailed line-item breakdowns so you know exactly what you are paying for. For accurate pricing, we conduct an on-site assessment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left font-semibold">
                    Do you offer free estimates?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, we provide free, no-obligation estimates for all residential and commercial projects. We will visit your property, assess the work required, discuss your preferences, and provide a detailed written quote typically within 24-48 hours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left font-semibold">
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We accept various payment methods including cash, checks, credit cards (Visa, Mastercard, American Express), and e-transfers. Payment schedules are typically structured as: deposit upon contract signing, progress payments at project milestones, and final payment upon completion and your satisfaction.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left font-semibold">
                    Can I get financing?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, we offer flexible financing options through our lending partners for qualified customers. This includes low-interest payment plans and deferred payment options. Contact us to discuss financing solutions that fit your budget.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Project Process */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">Project Process</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left font-semibold">
                    How long will my project take?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Project timelines vary based on scope and size. Small interior projects (1-3 rooms) typically take 2-5 days. Full home interiors range from 5-10 business days. Exterior painting projects take 7-14 business days depending on weather. Stucco and EIFS projects can range from 2-8 weeks. We provide detailed schedules in your project proposal.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left font-semibold">
                    Will you protect my furniture and belongings?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely. We take extensive precautions to protect your property. This includes covering furniture with plastic sheeting, protecting floors with drop cloths and protective paper, masking fixtures and hardware, and sealing off work areas to minimize dust. We treat your home with the same care we would our own.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-11">
                  <AccordionTrigger className="text-left font-semibold">
                    Can I stay in my home during the work?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, most clients remain in their homes during interior projects. We work room by room to minimize disruption, use low-VOC paints to reduce odors, maintain clean work areas, and can adjust our schedule to work around your routines. For exterior projects, you can stay home with minimal impact on your daily activities.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger className="text-left font-semibold">
                    What if weather delays my exterior project?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We monitor weather forecasts closely and schedule exterior work during optimal conditions. If unexpected weather occurs, we will pause work to ensure quality and reschedule at the earliest opportunity. Weather delays do not affect your project cost, and we maintain open communication throughout any schedule adjustments.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Materials & Quality */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">Materials & Quality</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-13">
                  <AccordionTrigger className="text-left font-semibold">
                    What paint brands do you use?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We use premium paint brands including Benjamin Moore, Sherwin-Williams, and Behr. These professional-grade products provide superior coverage, durability, and color retention. We select products based on project requirements and client preferences, always using top-tier formulations for lasting results.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-14">
                  <AccordionTrigger className="text-left font-semibold">
                    Do you offer eco-friendly options?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, we offer a full range of eco-friendly options including zero-VOC and low-VOC paints, water-based coatings, and environmentally responsible disposal methods. These products are safe for families, pets, and the environment while still delivering exceptional performance and durability.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-15">
                  <AccordionTrigger className="text-left font-semibold">
                    How do you ensure quality?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Quality is our top priority. We ensure excellence through meticulous surface preparation, skilled application techniques by experienced professionals, multi-coat systems for durability, quality control inspections at each project stage, and a final walkthrough with you before project completion. Our 98% client satisfaction rate reflects our commitment to quality.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-16">
                  <AccordionTrigger className="text-left font-semibold">
                    Can you match my existing color?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, we use advanced color matching technology to perfectly match any existing color from a sample. We can also provide digital mockups of new color schemes to help you visualize options before making a final decision. Our color consultation service ensures you get exactly the look you want.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* CTA within FAQ */}
            <Card className="bg-muted/50 p-8 text-center mt-12">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6">
                We are here to help! Contact us and our friendly team will be happy to answer any additional questions you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/estimate">
                  <Button size="lg" variant="outline">
                    Get Free Estimate
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Work with Us?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Experience the Ascen Group difference—quality craftsmanship, transparent communication, and complete satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/estimate">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-8">
                  Get Free Estimate
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  View Our Work
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

export default About;
