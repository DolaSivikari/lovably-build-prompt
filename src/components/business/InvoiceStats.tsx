import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, AlertCircle, DollarSign } from "lucide-react";
import { formatCurrency } from "@/utils/currency";

interface InvoiceStatsProps {
  total: number;
  paid: number;
  overdue: number;
  outstanding: number;
  totalRevenue: number;
}

export const InvoiceStats = ({
  total,
  paid,
  overdue,
  outstanding,
  totalRevenue,
}: InvoiceStatsProps) => {
  const stats = [
    {
      label: "Total Invoices",
      value: total,
      icon: FileText,
      color: "text-primary",
    },
    {
      label: "Paid",
      value: paid,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Overdue",
      value: overdue,
      icon: AlertCircle,
      color: "text-destructive",
    },
    {
      label: "Outstanding",
      value: formatCurrency(outstanding),
      icon: DollarSign,
      color: "text-amber-500",
      isAmount: true,
    },
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "text-green-500",
      isAmount: true,
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
    </div>
  );
};
