import { BadgeCheck, Building2, ShieldCheck, Sparkles, Clock, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

const differentiators = [
  {
    icon: BadgeCheck,
    title: "Licensed Construction Excellence Across Ontario",
    shortDesc: "15+ years serving Toronto, Mississauga, Brampton & Greater Toronto Area",
    fullDesc: "Fully licensed and insured with $5M liability coverage, WSIB compliant, and municipally licensed across the Greater Toronto Area. Our proven track record includes 500+ successful commercial and residential projects throughout Ontario, from high-rise condos to industrial facilities.",
    stats: "500+ Projects | $5M Coverage",
    gradient: "from-primary/10 via-primary/5 to-transparent",
  },
  {
    icon: Building2,
    title: "Comprehensive Construction Services Under One Roof",
    shortDesc: "21+ specialized services for commercial and residential projects",
    fullDesc: "Complete construction solutions including commercial painting, masonry repair, EIFS installation, metal cladding, parking garage restoration, and waterproofing. Single point of contact eliminates coordination complexity and reduces project timelines across Toronto and the GTA.",
    stats: "21+ Services | One Partner",
    gradient: "from-secondary/10 via-secondary/5 to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "Premium Materials & Manufacturer Warranties",
    shortDesc: "Authorized contractor for industry-leading brands",
    fullDesc: "Benjamin Moore and Sherwin-Williams authorized contractor. We exclusively use premium EIFS systems, masonry supplies, and metal cladding materials backed by extended manufacturer warranties for lasting protection on all installations throughout Ontario.",
    stats: "Premium Brands | Extended Warranties",
    gradient: "from-accent/10 via-accent/5 to-transparent",
  },
  {
    icon: Clock,
    title: "On-Time, On-Budget Project Delivery",
    shortDesc: "Transparent pricing with dedicated project management",
    fullDesc: "Detailed, itemized estimates with no hidden costs. Our dedicated project managers ensure seamless coordination from start to finish. We maintain a 95% on-time completion rate across all Ontario projects, from Toronto commercial buildings to Mississauga residential developments.",
    stats: "95% On-Time | No Hidden Costs",
    gradient: "from-primary/10 via-primary/5 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Safety-First Approach to Every Project",
    shortDesc: "Zero-incident safety record with comprehensive protocols",
    fullDesc: "OSHA certified crews with continuous safety training and zero-incident safety record. Comprehensive site protection protocols and full liability coverage ensure your peace of mind on every construction project across the Greater Toronto Area.",
    stats: "OSHA Certified | Zero Incidents",
    gradient: "from-secondary/10 via-secondary/5 to-transparent",
  },
  {
    icon: Headphones,
    title: "24/7 Emergency Response Services",
    shortDesc: "Rapid response team for urgent construction emergencies",
    fullDesc: "Same-day emergency assessment and response throughout Greater Toronto Area. Our dedicated emergency response team minimizes downtime with expert repairs and restoration services. Available 24/7 for urgent construction needs in Toronto, Mississauga, Brampton, Vaughan, and Markham.",
    stats: "24/7 Available | Same-Day Response",
    gradient: "from-accent/10 via-accent/5 to-transparent",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Why Choose Ascent Group Construction in Toronto & the GTA
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            With over 15 years of experience serving Toronto, Mississauga, Brampton, Vaughan, and Markham, 
            we combine licensed expertise, comprehensive services, and unwavering commitment to deliver 
            exceptional construction results on every commercial and residential project across Ontario.
          </p>
        </div>

        {/* Cards Grid - Symmetrical Layout */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={index}
                className={`group relative transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="h-full border-2 border-transparent hover:border-primary/50 hover:shadow-2xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Animated Icon Container */}
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      {/* Animated Ring Effect */}
                      <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 blur-sm`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {item.fullDesc}
                      </p>
                    </div>

                    {/* Stats Badge */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {item.stats}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-primary/20 p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-6">
              Get a detailed, itemized estimate for your construction project in Toronto or the GTA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="min-w-[200px]">
                <Link to="/contact">Request Proposal</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-w-[200px]">
                <Link to="/projects">View Our Projects</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* SEO-Rich Bottom Content */}
        <div className="mt-12 text-center text-sm text-muted-foreground max-w-4xl mx-auto">
          <p className="leading-relaxed">
            Serving the Greater Toronto Area including Toronto, North York, Etobicoke, Scarborough, 
            Mississauga, Brampton, Vaughan, Markham, Richmond Hill, and surrounding Ontario communities 
            with professional construction services including commercial construction, exterior systems, 
            EIFS installation, stucco repair, masonry restoration, metal cladding, parking garage 
            restoration, waterproofing, and specialty construction solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
