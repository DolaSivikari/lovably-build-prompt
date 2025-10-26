/**
 * Our Team Page - Phase 1
 * Shows organizational depth and team profiles
 */
import { Linkedin, Award, Users, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const OurTeam = () => {
  const teamStats = [
    { value: "35+", label: "Team Members" },
    { value: "200+", label: "Combined Years Experience" },
    { value: "50+", label: "Trade Certifications" },
    { value: "5+", label: "Languages Spoken" },
  ];

  const leadership = [
    {
      name: "Michael Chen",
      title: "Owner & President",
      bio: "Founded Ascent Group in 2009 with a vision to provide superior construction services across Ontario. Over 20 years of experience in large-scale commercial and multi-unit projects.",
      years: "20+ years",
      certifications: ["Master Painter", "Construction Executive"],
    },
    {
      name: "Sarah Thompson",
      title: "Operations Manager",
      bio: "Oversees daily operations, project coordination, and quality control across all active projects. Ensures seamless execution from start to finish.",
      years: "15+ years",
      certifications: ["PMP Certified", "Lean Construction"],
    },
    {
      name: "David Rodriguez",
      title: "Commercial Project Manager",
      bio: "Specializes in multi-unit developments and large commercial projects. Direct contact for developers and general contractors.",
      years: "12+ years",
      certifications: ["Gold Seal Certified", "LEED Green Associate"],
    },
    {
      name: "Jennifer Park",
      title: "Safety Director",
      bio: "Responsible for safety program oversight, COR certification maintenance, and training coordination. Ensures all projects meet or exceed safety standards.",
      years: "10+ years",
      certifications: ["COR Certified", "NCSO Certified"],
    },
    {
      name: "Robert Anderson",
      title: "Lead Estimator",
      bio: "Handles all commercial estimating and RFP responses. Expert in large-scale project costing and value engineering.",
      years: "18+ years",
      certifications: ["Professional Estimator", "LEED AP"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Our Team - Experienced Construction Professionals | Ascent Group"
        description="Meet our team of experienced construction professionals. 35+ team members with 200+ combined years of experience serving Ontario."
      />
      <Navigation />

      <PageHeader
        title="Meet Our Team"
        description="Experienced Professionals Dedicated to Your Success"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/about" },
          { label: "Our Team" },
        ]}
      />

      {/* Team Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {teamStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
              <p className="text-muted-foreground">
                Experienced leaders guiding every project to success
              </p>
            </div>

            <div className="space-y-8">
              {leadership.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Photo Placeholder */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-16 h-16 text-primary" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                            <p className="text-lg text-primary font-semibold">{member.title}</p>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Linkedin className="w-4 h-4" />
                            Connect
                          </Button>
                        </div>

                        <p className="text-muted-foreground mb-4">{member.bio}</p>

                        <div className="flex flex-wrap gap-4 items-center">
                          <Badge variant="secondary" className="gap-1">
                            <Award className="w-3 h-3" />
                            {member.years}
                          </Badge>
                          {member.certifications.map((cert, certIndex) => (
                            <Badge key={certIndex} variant="outline">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
              <p className="text-muted-foreground">
                Building a team that builds excellence
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Training Programs</h3>
                  <p className="text-sm text-muted-foreground">
                    Ongoing professional development and skill enhancement
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Safety Commitment</h3>
                  <p className="text-sm text-muted-foreground">
                    COR certified with zero-incident focus
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Career Advancement</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear paths for growth and leadership opportunities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurTeam;
