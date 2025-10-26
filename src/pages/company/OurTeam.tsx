import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Linkedin, Mail, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const OurTeam = () => {
  const leadership = [
    {
      name: "Michael Chen",
      title: "President & CEO",
      experience: "25+ years",
      credentials: ["MBA", "Licensed Contractor"],
      bio: "Founded Ascent Group in 2009 with a vision to deliver excellence in construction services. Previous experience includes senior roles at major GTA contractors.",
      image: "/placeholder.svg",
      linkedin: "#"
    },
    {
      name: "Sarah Thompson",
      title: "VP Operations",
      experience: "18+ years",
      credentials: ["P.Eng", "PMP"],
      bio: "Oversees all project execution, ensuring quality control and on-time delivery. Expertise in large-scale commercial and multi-unit developments.",
      image: "/placeholder.svg",
      linkedin: "#"
    },
    {
      name: "David Martinez",
      title: "Director of Safety",
      experience: "20+ years",
      credentials: ["COR™ Auditor", "NCSO"],
      bio: "Leads our safety-first culture with comprehensive training programs and site management. Maintains our perfect safety record across 500+ projects.",
      image: "/placeholder.svg",
      linkedin: "#"
    }
  ];

  const projectManagers = [
    { name: "James Wilson", title: "Senior Project Manager", specialization: "Commercial & Multi-Unit", years: "12+" },
    { name: "Lisa Patel", title: "Project Manager", specialization: "Residential & Restoration", years: "8+" },
    { name: "Robert Kim", title: "Project Manager", specialization: "Industrial & Specialty Coatings", years: "10+" }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Team | Ascent Group Construction"
        description="Meet the leadership and project management team behind 500+ successful projects. Combined 100+ years of construction experience."
        canonical="https://ascentgroupconstruction.com/company/our-team"
      />
      <Navigation />

      <PageHeader
        eyebrow="Meet Our Team"
        title="Leadership & Expertise"
        description="100+ years of combined construction experience"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/about" },
          { label: "Our Team" }
        ]}
      />

      {/* Leadership Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Executive Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Seasoned professionals with decades of industry experience and proven track records
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leadership.map((member) => (
              <Card key={member.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.title}</p>
                  <Badge variant="outline" className="mb-4">{member.experience} Experience</Badge>
                  
                  <div className="flex gap-2 justify-center mb-4 flex-wrap">
                    {member.credentials.map((cred) => (
                      <Badge key={cred} variant="secondary">{cred}</Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>

                  <div className="flex gap-3 justify-center">
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={`${member.name} LinkedIn profile`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="/contact"
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Management Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Management Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dedicated professionals managing your project from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projectManagers.map((pm) => (
              <Card key={pm.name}>
                <CardContent className="pt-6">
                  <Award className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-bold text-lg mb-1">{pm.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-2">{pm.title}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Specialization:</strong> {pm.specialization}
                  </p>
                  <Badge variant="outline">{pm.years} Experience</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">30+</div>
              <p className="text-primary-foreground/80">Team Members</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <p className="text-primary-foreground/80">Years Combined Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-primary-foreground/80">Certified Professionals</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-primary-foreground/80">Projects Delivered</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurTeam;