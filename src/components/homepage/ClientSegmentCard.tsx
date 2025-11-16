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
    <Card className="group h-full border border-construction-orange/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:border-construction-orange/40 hover:shadow-xl hover:shadow-construction-orange/20 transition-all duration-300 hover:scale-[1.02] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-construction-orange/0 to-construction-orange/0 group-hover:from-construction-orange/10 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="p-6 h-full flex flex-col relative z-10">
        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-construction-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-construction-orange/15 transition-colors duration-300">
            <Icon className="w-6 h-6 text-construction-orange" />
          </div>
          <h3 className="text-xl font-bold text-foreground leading-tight">
            {title}
          </h3>
        </div>

        {/* Services List */}
        <ul className="space-y-3 mb-6 flex-1">
          {services.map((service, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-construction-orange flex-shrink-0 mt-0.5" />
              <span>{service}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button asChild className="w-full bg-construction-orange hover:bg-construction-orange/90">
          <Link to={ctaUrl}>{ctaText}</Link>
        </Button>
      </div>
    </Card>
  );
};

export default ClientSegmentCard;
