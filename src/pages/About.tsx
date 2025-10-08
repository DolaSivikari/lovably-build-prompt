import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, Users, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: CheckCircle2,
      title: "Quality First",
      description: "We never compromise on quality. Every project receives our full commitment to excellence and attention to detail.",
    },
    {
      icon: Users,
      title: "Collaborative Approach",
      description: "Success comes from strong partnerships. We work closely with clients, architects, and trades to achieve common goals.",
    },
    {
      icon: Target,
      title: "Innovation & Technology",
      description: "Embracing cutting-edge tools like BIM and digital project management to deliver smarter, more efficient results.",
    },
    {
      icon: Award,
      title: "Safety & Sustainability",
      description: "Committed to maintaining the highest safety standards while minimizing environmental impact on every project.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Building Canada's Future, One Project at a Time</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Founded on principles of integrity, innovation, and excellence, BuildCraft Management has grown from humble beginnings to become a trusted leader in Canadian construction management.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  BuildCraft Management was established with a clear vision: to transform the construction industry through exceptional project delivery, collaborative partnerships, and unwavering commitment to quality.
                </p>
                <p>
                  Drawing inspiration from industry leaders like Bird Construction's century of trust and PCL's employee-owned culture, we've built a company that values people as much as profits. Our founders brought together decades of experience from major projects across Canada.
                </p>
                <p>
                  Today, we're proud to serve clients across commercial, industrial, and institutional sectors, leveraging modern technology and proven methodologies to deliver projects that exceed expectations.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm font-medium">Years Combined Experience</div>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm font-medium">Projects Delivered</div>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">$2B+</div>
                <div className="text-sm font-medium">Total Project Value</div>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To deliver exceptional construction management services that consistently exceed client expectations through innovation, collaboration, and an unwavering commitment to quality and safety. We strive to be the partner of choice for organizations seeking reliable, professional, and results-driven construction solutions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be recognized as Canada's premier construction management firm, setting industry standards for excellence, sustainability, and technological innovation. We envision a future where every project we touch becomes a benchmark for quality and a testament to what's possible when expertise meets dedication.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every project we deliver
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
