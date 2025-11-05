import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import { Building2, Home, Factory, Clock, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description: string | null;
  icon_name: string | null;
  featured?: boolean;
  typical_timeline?: string | null;
  project_types?: string[] | null;
}

const projectTypeIcons = {
  residential: Home,
  commercial: Building2,
  industrial: Factory,
};

const categoryColors = {
  "Construction Services": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "Painting Services": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "Exterior Systems": "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  "Specialty Services": "bg-green-500/10 text-green-700 dark:text-green-400",
};

export const ServiceCard = ({
  name,
  slug,
  category,
  short_description,
  icon_name,
  featured,
  typical_timeline,
  project_types,
}: ServiceCardProps) => {
  const IconComponent = icon_name && LucideIcons[icon_name as keyof typeof LucideIcons]
    ? (LucideIcons[icon_name as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>)
    : LucideIcons.Wrench;

  const categoryColor = categoryColors[category as keyof typeof categoryColors] || "bg-muted text-muted-foreground";

  return (
    <Link to={`/services/${slug}`}>
      <Card className="group h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/50 relative overflow-hidden">
        {featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-primary text-primary-foreground shadow-md">
              Most Popular
            </Badge>
          </div>
        )}
        
        <CardContent className="p-6 flex flex-col h-full">
          {/* Icon */}
          <div className="mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
              <IconComponent className="w-7 h-7 text-primary" />
            </div>
          </div>

          {/* Service Name */}
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Category Badge */}
          <Badge variant="outline" className={`mb-3 w-fit ${categoryColor}`}>
            {category}
          </Badge>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
            {short_description || "Professional service tailored to your needs"}
          </p>

          {/* Project Types & Timeline */}
          <div className="space-y-2 pt-4 border-t">
            {project_types && project_types.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {project_types.map((type) => {
                  const Icon = projectTypeIcons[type as keyof typeof projectTypeIcons];
                  return Icon ? (
                    <div
                      key={type}
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                      title={type.charAt(0).toUpperCase() + type.slice(1)}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="capitalize">{type}</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {typical_timeline && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{typical_timeline}</span>
              </div>
            )}
          </div>

          {/* Hover CTA */}
          <div className="flex items-center gap-2 mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
