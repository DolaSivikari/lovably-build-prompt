import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePopularServices } from "@/hooks/usePopularServices";

interface EnhancedPopularServicesProps {
  onLinkClick: () => void;
}

const serviceGradients: Record<string, string> = {
  "general-contracting":
    "bg-gradient-to-br from-[hsl(24,95%,53%)] to-[hsl(20,91%,48%)]",
  waterproofing:
    "bg-gradient-to-br from-[hsl(217,91%,60%)] to-[hsl(221,83%,53%)]",
  "masonry-restoration":
    "bg-gradient-to-br from-[hsl(39,100%,50%)] to-[hsl(33,100%,50%)]",
  "parking-rehabilitation":
    "bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)]",
  "building-envelope":
    "bg-gradient-to-br from-[hsl(262,83%,58%)] to-[hsl(251,91%,60%)]",
  "exterior-cladding":
    "bg-gradient-to-br from-[hsl(336,84%,60%)] to-[hsl(346,87%,50%)]",
};

export function EnhancedPopularServices({
  onLinkClick,
}: EnhancedPopularServicesProps) {
  const { data: popularServices = [] } = usePopularServices();

  if (popularServices.length === 0) return null;

  const getServiceGradient = (link: string) => {
    const serviceKey = link.split("/").pop() || "";
    return (
      serviceGradients[serviceKey] ||
      "bg-gradient-to-br from-primary/80 to-primary"
    );
  };

  return (
    <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Popular Services
        </h4>
        <Badge variant="secondary" className="text-xs">
          Trending Now
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {popularServices.map((service) => {
          const IconComponent = service.icon;
          const gradientClass = getServiceGradient(service.link);

          return (
            <Link
              key={service.link}
              to={service.link}
              onClick={onLinkClick}
              className="group relative overflow-hidden rounded-[var(--radius-md)] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 ${gradientClass} opacity-90 group-hover:opacity-100 transition-opacity`}
              />

              {/* Glass Morphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative flex items-center gap-4 p-4 min-h-[72px]">
                <div className="flex-shrink-0 h-12 w-12 rounded-[var(--radius-sm)] bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <IconComponent className="h-7 w-7 text-white drop-shadow-md" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-base leading-tight drop-shadow-md">
                    {service.name}
                  </div>
                  {service.searchCount && service.searchCount >= 10 && (
                    <div className="text-xs text-white/90 mt-0.5 drop-shadow-sm">
                      {service.searchCount} recent searches
                    </div>
                  )}
                </div>

                {service.isTrending && (
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 animate-pulse" />
                      <div className="relative h-10 w-10 bg-white rounded-full flex flex-col items-center justify-center shadow-lg">
                        <TrendingUp className="h-4 w-4 text-[hsl(24,95%,53%)]" />
                        <span className="text-[9px] font-bold text-[hsl(24,95%,53%)]">
                          {service.trendPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
