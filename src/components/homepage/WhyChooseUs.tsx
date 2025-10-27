import { Building2, FileCheck, Users, ClipboardCheck, BadgeCheck, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

const differentiators = [
  {
    icon: Building2,
    title: "Industry-Leading Experience Since 2008",
    description: "With over 15 years of specialized construction experience across Ontario, we've successfully completed over 500 commercial, residential, and industrial projects. Our track record includes high-rise condominiums, commercial office buildings, retail centers, parking structures, and institutional facilities throughout the Greater Toronto Area.",
    highlight: "500+ Projects Completed",
  },
  {
    icon: BadgeCheck,
    title: "Fully Licensed, Insured & WSIB Compliant",
    description: "We maintain comprehensive general liability insurance coverage up to $5 million, full WSIB compliance for worker protection, and all required municipal licensing across Ontario. Our bonding capacity and insurance certifications meet the strictest requirements for commercial and institutional projects.",
    highlight: "$5M Liability Coverage",
  },
  {
    icon: ClipboardCheck,
    title: "Comprehensive Service Portfolio",
    description: "From commercial and residential painting to exterior building envelope systems including stucco, EIFS, masonry restoration, metal cladding, waterproofing, and parking garage restoration - we provide complete turnkey solutions. Our in-house capabilities eliminate coordination issues and ensure consistent quality standards across all project phases.",
    highlight: "21 Specialized Services",
  },
  {
    icon: FileCheck,
    title: "Quality Assurance & Material Warranties",
    description: "We exclusively use premium-grade materials from trusted manufacturers, backed by comprehensive product warranties. Our quality control protocols include multi-stage inspections, documented progress reports, and long-term workmanship guarantees. Every project receives detailed documentation and maintenance recommendations for optimal longevity.",
    highlight: "Premium Materials Only",
  },
  {
    icon: Users,
    title: "Transparent Communication & Project Management",
    description: "Our dedicated project managers provide consistent communication from estimate through completion. You'll receive detailed proposals with itemized pricing, scheduled progress updates, photo documentation, and proactive solutions for any site challenges. We prioritize transparency in timelines, costs, and decision-making throughout your project.",
    highlight: "Dedicated Project Managers",
  },
  {
    icon: Headphones,
    title: "Responsive Support & Emergency Services",
    description: "Beyond standard business hours, we offer priority response for urgent building maintenance issues including water infiltration, structural concerns, and emergency repairs. Our team provides rapid assessment, temporary protection measures, and expedited permanent solutions to minimize disruption and protect your property investment.",
    highlight: "24/7 Emergency Response",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Why Leading Organizations Choose Us</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Ontario's Most Trusted Construction Partner
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            We deliver exceptional construction services backed by industry-leading credentials, comprehensive warranties, 
            and transparent project management. Our proven track record across the Greater Toronto Area speaks to our 
            commitment to quality, safety, and client satisfaction.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className={`group hover:shadow-lg hover:border-primary/20 transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-foreground leading-tight">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                    {item.description}
                  </p>
                  
                  {/* Highlight Badge */}
                  <div className="pt-4 border-t border-border">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {item.highlight}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Summary - SEO Enhancement */}
        <div className="max-w-4xl mx-auto mt-12 sm:mt-16 p-6 sm:p-8 bg-muted/30 border border-border rounded-xl">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center">
            <strong className="text-foreground">Serving the Greater Toronto Area</strong> including Toronto, Mississauga, 
            Brampton, Vaughan, Markham, Richmond Hill, Oakville, Burlington, and surrounding municipalities. Our comprehensive 
            construction services support property managers, commercial building owners, developers, general contractors, and 
            homeowners with professional solutions for painting, exterior systems, waterproofing, and structural restoration projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
