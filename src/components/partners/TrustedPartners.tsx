import { ExternalLink, Building2, Factory, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Partner {
  name: string;
  url: string;
  category: "installation" | "fabrication" | "affiliations";
}

interface TrustedPartnersProps {
  variant?: "simple" | "grouped";
  background?: "default" | "muted";
  showDescription?: boolean;
}

const partners: Partner[] = [
  { name: "Noble Exteriors", url: "https://www.nobleexteriors.ca/", category: "installation" },
  { name: "Eagle Contracting Inc.", url: "https://eaglecontractinginc.ca/services/", category: "installation" },
  { name: "Eagle Cladding", url: "https://eaglecladding.com/", category: "installation" },
  { name: "Miral Cladding", url: "https://miralcladding.com/", category: "fabrication" },
  { name: "Elips Yapı", url: "https://elipsyapi.com.tr/", category: "fabrication" },
  { name: "OSTIM", url: "https://ostim.ca/services/", category: "fabrication" },
  { name: "My Silverstone Ltd.", url: "http://www.mysilverstoneltd.com/", category: "fabrication" },
  { name: "Durmus Group", url: "https://www.durmusgroup.ca/", category: "fabrication" },
  { name: "SKOCC", url: "https://skocc.ca/", category: "fabrication" },
  { name: "MÜSİAD Canada", url: "https://musiadcanada.org/", category: "affiliations" },
];

const categoryConfig = {
  installation: {
    title: "Installation & Contracting",
    icon: Building2,
    description: "Trusted partners for professional installation and contracting services"
  },
  fabrication: {
    title: "Fabrication & Supply",
    icon: Factory,
    description: "Quality materials and fabrication from specialized suppliers"
  },
  affiliations: {
    title: "Affiliations & Community",
    icon: Users,
    description: "Professional associations and industry memberships"
  }
};

export function TrustedPartners({ 
  variant = "simple", 
  background = "default",
  showDescription = true 
}: TrustedPartnersProps) {
  const sectionClasses = cn(
    "py-24",
    background === "muted" && "bg-muted/30"
  );

  const PartnerCard = ({ partner }: { partner: Partner }) => (
    <Card className="group hover:shadow-lg hover:border-primary/30 transition-all h-full">
      <CardContent className="p-6 flex items-center justify-between h-full">
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full gap-3"
        >
          <span className="font-medium text-sm md:text-base group-hover:text-primary transition-colors">
            {partner.name}
          </span>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
        </a>
      </CardContent>
    </Card>
  );

  const renderGrouped = () => {
    const categories = ["installation", "fabrication", "affiliations"] as const;
    
    return (
      <div className="space-y-16">
        {categories.map((category) => {
          const categoryPartners = partners.filter(p => p.category === category);
          const config = categoryConfig[category];
          const IconComponent = config.icon;
          
          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{config.title}</h3>
                  {showDescription && (
                    <p className="text-sm text-muted-foreground">{config.description}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryPartners.map((partner) => (
                  <PartnerCard key={partner.name} partner={partner} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSimple = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {partners.map((partner) => (
        <PartnerCard key={partner.name} partner={partner} />
      ))}
    </div>
  );

  return (
    <section className={sectionClasses}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted Partners & Affiliations
            </h2>
            {showDescription && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Delivering excellence through collaboration with specialized fabricators, 
                installers, suppliers, and industry associations
              </p>
            )}
          </div>

          {variant === "grouped" ? renderGrouped() : renderSimple()}

          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              Company names and logos are property of their respective owners. 
              Relationships may include partnerships, affiliations, and professional associations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
