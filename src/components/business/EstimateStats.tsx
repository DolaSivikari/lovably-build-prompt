import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, DollarSign } from "lucide-react";
import { formatCurrency } from "@/utils/currency";

interface EstimateStatsProps {
  total: number;
  draft: number;
  sent: number;
  approved: number;
  totalValue: number;
}

export const EstimateStats = ({
  total,
  draft,
  sent,
  approved,
  totalValue,
}: EstimateStatsProps) => {
  const stats = [
    {
      label: "Total Estimates",
      value: total,
      icon: FileText,
      color: "text-primary",
    },
    {
      label: "Draft",
      value: draft,
      icon: Clock,
      color: "text-muted-foreground",
    },
    {
      label: "Sent",
      value: sent,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      label: "Approved",
      value: approved,
      icon: CheckCircle,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <Icon className={`h-5 w-5 ${stat.color}`} />
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
      
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
