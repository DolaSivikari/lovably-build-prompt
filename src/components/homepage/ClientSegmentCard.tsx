import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/ui/Button";
import { Link } from "react-router-dom";
import { CheckCircle2, LucideIcon } from "lucide-react";

interface ClientSegmentCardProps {
  icon: LucideIcon;
  title: string;
  services: string[];
  ctaText: string;
  ctaUrl: string;
}

const ClientSegmentCard = ({ icon: Icon, title, services, ctaText, ctaUrl }: ClientSegmentCardProps) => {
  return (
    <Card className="h-full hover-subtle border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="p-6 h-full flex flex-col">
        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-steel-blue/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-steel-blue" />
          </div>
          <h3 className="text-xl font-bold text-foreground leading-tight">
            {title}
          </h3>
        </div>

        {/* Services List */}
        <ul className="space-y-2 mb-6 flex-1">
          {services.map((service, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-steel-blue flex-shrink-0 mt-0.5" />
              <span>{service}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button asChild variant="secondary" size="sm" className="w-full">
          <Link to={ctaUrl}>{ctaText}</Link>
        </Button>
      </div>
    </Card>
  );
};

export default ClientSegmentCard;
