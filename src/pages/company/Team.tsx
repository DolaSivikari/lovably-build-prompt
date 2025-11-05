import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin, Mail, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data, error } = await supabase
          .from('leadership_team')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setTeamMembers(data || []);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-0">
                        <Skeleton className="aspect-square w-full" />
                        <div className="p-6">
                          <Skeleton className="h-8 w-3/4 mb-2" />
                          <Skeleton className="h-5 w-1/2 mb-4" />
                          <Skeleton className="h-20 w-full mb-6" />
                          <div className="flex gap-3">
                            <Skeleton className="h-9 flex-1" />
                            <Skeleton className="h-9 w-9" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : teamMembers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No team members available at this time.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {teamMembers.map((member) => (
                    <Card 
                      key={member.id} 
                      className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <CardContent className="p-0">
                        {/* Photo */}
                        <div className="relative overflow-hidden aspect-square">
                          {member.photo_url ? (
                            <img
                              src={member.photo_url}
                              alt={`${member.full_name}, ${member.position}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-4xl font-bold text-primary">
                                  {getInitials(member.full_name)}
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/60 via-[hsl(var(--ink))]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                            {member.full_name}
                          </h3>
                          <p className="text-sm font-semibold text-primary mb-4">
                            {member.position}
                          </p>
                          
                          {member.bio && (
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                              {member.bio}
                            </p>
                          )}

                          {/* Credentials */}
                          {member.credentials && member.credentials.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {member.credentials.map((cred: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {cred}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Notable Projects */}
                          {member.notable_projects && member.notable_projects.length > 0 && (
                            <div className="mb-4 text-xs">
                              <p className="font-semibold text-muted-foreground mb-1">Notable Projects:</p>
                              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {member.notable_projects.slice(0, 3).map((project: string, idx: number) => (
                                  <li key={idx}>{project}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Contact Buttons */}
                          <div className="flex gap-3">
                            {member.email && (
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
                            )}
                            {member.linkedin_url && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                asChild
                              >
                                <a 
                                  href={member.linkedin_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center"
                                  aria-label={`${member.full_name}'s LinkedIn profile`}
                                >
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
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
