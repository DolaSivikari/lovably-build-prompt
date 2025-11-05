import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Michael Chen",
    title: "President & Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "With 20+ years in commercial construction and a passion for quality craftsmanship, Michael founded Ascent Group to deliver uncompromising excellence. Off-site, he coaches youth soccer and volunteers with Habitat for Humanity.",
    linkedin: "#",
    email: "michael@ascentgroupconstruction.com"
  },
  {
    name: "Sarah Thompson",
    title: "Vice President of Operations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bio: "Sarah brings 15 years of project management expertise, ensuring every job runs smoothly from estimate to completion. She's known for her meticulous planning and client communication. An avid hiker, she's summited 40+ peaks across Ontario.",
    linkedin: "#",
    email: "sarah@ascentgroupconstruction.com"
  },
  {
    name: "David Rodriguez",
    title: "Director of Commercial Projects",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Specializing in high-rise and large-scale commercial work, David has overseen $50M+ in projects across the GTA. His technical expertise in EIFS and exterior systems is unmatched. He's also a licensed drone pilot and landscape photographer.",
    linkedin: "#",
    email: "david@ascentgroupconstruction.com"
  },
  {
    name: "Jennifer Park",
    title: "Chief Estimator",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Jennifer's precise estimates have earned client trust for over a decade. Her attention to detail ensures accurate pricing and transparent proposals. When not crunching numbers, she's teaching financial literacy workshops in the community.",
    linkedin: "#",
    email: "jennifer@ascentgroupconstruction.com"
  },
  {
    name: "Robert Martinez",
    title: "Safety Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    bio: "A former OSHA inspector with 18 years of safety management experience, Robert maintains our zero-incident record through rigorous training and protocols. He's a certified safety instructor and mentor to new construction professionals.",
    linkedin: "#",
    email: "robert@ascentgroupconstruction.com"
  }
];

const Team = () => {
  return (
    <>
      <SEO 
        title="Our Team | Ascent Group Construction"
        description="Meet the experienced professionals behind Ascent Group Construction. Our leadership team brings decades of expertise in commercial and residential construction across the Greater Toronto Area."
        canonical="/company/team"
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main id="main-content">
          <PageHeader
            title="Meet Our Team"
            description="The experienced professionals driving excellence at Ascent Group Construction"
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Company", href: "/about" },
              { label: "Our Team" }
            ]}
          />
          
          {/* Team Introduction */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Leadership That Delivers Excellence
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our team combines decades of construction expertise with a genuine passion for quality work. 
                  Each member brings specialized skills and a commitment to exceeding client expectations on every project.
                </p>
              </div>

              {/* Team Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {teamMembers.map((member, index) => (
                  <Card 
                    key={index} 
                    className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      {/* Photo */}
                      <div className="relative overflow-hidden aspect-square">
                        <img
                          src={member.image}
                          alt={`${member.name}, ${member.title}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/60 via-[hsl(var(--ink))]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-sm font-semibold text-primary mb-4">
                          {member.title}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {member.bio}
                        </p>

                        {/* Contact Buttons */}
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            asChild
                          >
                            <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email
                            </a>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <a 
                              href={member.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                              aria-label={`${member.name}'s LinkedIn profile`}
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Join Our Team CTA */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20">
                <CardContent className="p-8 md:p-12 text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Join Our Growing Team
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    We're always looking for talented professionals who share our commitment to excellence. 
                    Explore career opportunities with Ascent Group Construction.
                  </p>
                  <Button size="lg" asChild>
                    <a href="/careers">View Career Opportunities</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Team;
