import { Shield, Award, CheckCircle2, FileCheck } from "lucide-react";

const certifications = [
  {
    icon: Shield,
    title: "COR Certified",
    description: "Certificate of Recognition - Safety Excellence",
    color: "text-accent"
  },
  {
    icon: FileCheck,
    title: "WSIB Compliant",
    description: "Full workplace safety insurance",
    color: "text-accent"
  },
  {
    icon: Award,
    title: "Licensed & Bonded",
    description: "$5M+ liability coverage across Ontario",
    color: "text-accent"
  },
  {
    icon: CheckCircle2,
    title: "Industry Member",
    description: "Toronto Construction Association",
    color: "text-accent"
  }
];

const CertificationBadges = () => {
  return (
    <section className="py-12 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Certified & Trusted
          </h2>
          <p className="text-muted-foreground">
            Industry-leading credentials and memberships
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-accent/10 border border-accent/20 mb-4">
                  <Icon className={`w-8 h-8 ${cert.color}`} />
                </div>
                <h3 className="font-bold text-foreground mb-1">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {cert.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CertificationBadges;
