import { Building2, Clock, Award, CheckCircle } from "lucide-react";
import { useCompanyStats } from "@/hooks/useCompanyStats";

interface ServiceStatsProps {
  serviceCount: number;
}

export const ServiceStats = ({ serviceCount }: ServiceStatsProps) => {
  const { yearsInBusinessFormatted, totalProjectsFormatted } = useCompanyStats();
  
  const stats = [
    {
      icon: Building2,
      label: "Specialized Services",
      value: serviceCount.toString(),
    },
    {
      icon: Award,
      label: "Years Experience",
      value: yearsInBusinessFormatted,
    },
    {
      icon: CheckCircle,
      label: "Projects Completed",
      value: totalProjectsFormatted,
    },
    {
      icon: Clock,
      label: "Support",
      value: "24/7",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border"
        >
          <div className="p-2 rounded-lg bg-primary/10">
            <stat.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
