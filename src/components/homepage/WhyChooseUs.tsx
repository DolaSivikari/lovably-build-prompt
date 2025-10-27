import { Award, Shield, Clock, Wrench, TrendingUp, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

const differentiators = [
  {
    icon: Award,
    title: "15+ Years of Excellence",
    description: "Established reputation across Ontario with hundreds of successful projects",
    color: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: Wrench,
    title: "Comprehensive Services",
    description: "21 specialized services under one roof - your single trusted partner",
    color: "from-green-500/10 to-green-600/5",
  },
  {
    icon: Shield,
    title: "Licensed & Fully Insured",
    description: "$5M liability coverage, WSIB compliant, bonded for your protection",
    color: "from-purple-500/10 to-purple-600/5",
  },
  {
    icon: TrendingUp,
    title: "Quality Materials",
    description: "Premium products with manufacturer warranties for lasting results",
    color: "from-orange-500/10 to-orange-600/5",
  },
  {
    icon: Clock,
    title: "On-Time, On-Budget",
    description: "Transparent pricing and detailed project management you can count on",
    color: "from-red-500/10 to-red-600/5",
  },
  {
    icon: Phone,
    title: "24/7 Emergency Response",
    description: "Available when you need us most with rapid response capabilities",
    color: "from-cyan-500/10 to-cyan-600/5",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Why Choose Ascent Group Construction
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We combine experience, expertise, and commitment to deliver exceptional results on every project
          </p>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="max-w-6xl mx-auto">
          {/* Featured Item - Larger */}
          <div className="mb-6">
            <Card
              className={`group hover:shadow-xl transition-all duration-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "0ms" }}
            >
              <CardContent className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${differentiators[0].color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Award className="w-10 h-10 text-primary" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                      {differentiators[0].title}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {differentiators[0].description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Remaining Items - Smaller Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.slice(1).map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index + 1}
                  className={`group hover:shadow-lg transition-all duration-300 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
