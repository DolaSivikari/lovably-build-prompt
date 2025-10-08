import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ResumeSubmissionDialog from "@/components/ResumeSubmissionDialog";
import { 
  Briefcase, 
  Heart, 
  TrendingUp, 
  Users, 
  GraduationCap,
  Shield,
  Award,
  Clock,
  MapPin,
  ArrowRight
} from "lucide-react";

const Careers = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const handleApply = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setDialogOpen(true);
  };

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision coverage for you and your family"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear advancement paths with ongoing training and certification opportunities"
    },
    {
      icon: GraduationCap,
      title: "Continuous Learning",
      description: "Paid training, certifications, and attendance at industry conferences"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Industry-leading safety equipment, training, and protocols to protect our team"
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description: "Competitive PTO, flexible scheduling, and paid holidays"
    },
    {
      icon: Award,
      title: "Competitive Pay",
      description: "Industry-leading wages with performance bonuses and profit sharing"
    }
  ];

  const openPositions = [
    {
      title: "Senior Painter",
      location: "Mississauga, ON",
      type: "Full-time",
      description: "Experienced painter needed for residential and commercial projects. 5+ years experience required.",
      requirements: ["5+ years painting experience", "Valid driver's license", "Own tools preferred"]
    },
    {
      title: "Stucco/EIFS Specialist",
      location: "GTA Region",
      type: "Full-time",
      description: "Skilled EIFS and stucco technician for exterior finishing projects.",
      requirements: ["3+ years EIFS experience", "Knowledge of building envelope systems", "Safety certification"]
    },
    {
      title: "Project Estimator",
      location: "Mississauga, ON",
      type: "Full-time",
      description: "Detail-oriented estimator to prepare accurate project quotes and manage client consultations.",
      requirements: ["Construction industry experience", "Strong communication skills", "Proficiency with estimation software"]
    },
    {
      title: "Apprentice Painter",
      location: "GTA Region",
      type: "Apprenticeship",
      description: "Entry-level position for motivated individuals interested in learning the painting trade.",
      requirements: ["Willingness to learn", "Physical fitness", "Reliable transportation"]
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Careers | Join Our Team"
        description="Join Ascent Group Construction and build a rewarding career in the trades. Competitive pay, comprehensive benefits, and opportunities for growth."
        keywords="construction jobs, painter jobs, careers GTA, EIFS jobs, stucco jobs, trade careers"
      />
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block mb-3 px-4 py-1.5 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
              <span className="text-secondary font-semibold text-sm tracking-wider uppercase">Join Our Team</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Build Your Career With Us</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90 mb-8">
              Join a team that values craftsmanship, integrity, and professional growth. 
              We're always looking for talented individuals who take pride in their work.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg"
              onClick={() => handleApply("General Application")}
            >
              <Briefcase className="mr-2 w-5 h-5" />
              Apply Now
            </Button>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Ascent Group?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We invest in our people because they're the foundation of our success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Current Openings</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore opportunities to join our growing team
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="hover:shadow-lg transition-all hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Button 
                    className="bg-secondary hover:bg-secondary/90 text-primary whitespace-nowrap"
                    onClick={() => handleApply(position.title)}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold mb-2">Requirements:</p>
                      <ul className="space-y-1">
                        {position.requirements.map((req, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Our Culture</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      At Ascent Group Construction, we believe that great work comes from great teams. 
                      We foster a culture of respect, collaboration, and continuous improvement.
                    </p>
                    <p>
                      Every team member, from apprentices to senior craftsmen, plays a vital role in 
                      our success. We celebrate achievements, support each other through challenges, 
                      and maintain a safe, inclusive environment where everyone can thrive.
                    </p>
                    <p>
                      Our commitment to excellence extends beyond our projects—it's reflected in how 
                      we treat our people and invest in their futures.
                    </p>
                  </div>
                </div>
                
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-8">
                    <Users className="w-16 h-16 mb-6 text-secondary" />
                    <h3 className="text-2xl font-bold mb-4">Join Our Team Today</h3>
                    <p className="mb-6 opacity-90">
                      Don't see the perfect position? We're always interested in connecting with 
                      talented professionals. Send us your resume and let's talk about your future.
                    </p>
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="w-full"
                      onClick={() => handleApply("General Application")}
                    >
                      Submit Your Resume
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <ResumeSubmissionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        jobTitle={selectedJobTitle}
      />
      
      <Footer />
    </div>
  );
};

export default Careers;
