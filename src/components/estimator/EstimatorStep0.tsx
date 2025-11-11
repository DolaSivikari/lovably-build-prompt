import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Wrench, AlertCircle, Calculator } from "lucide-react";

interface EstimatorStep0Props {
  data: {
    quoteType: string;
  };
  onChange: (field: string, value: any) => void;
}

const quoteTypes = [
  {
    id: "specialty_prime",
    title: "Prime Specialty Project",
    description: "Building envelope, façade restoration, waterproofing — we'll prime contract the full project.",
    icon: DollarSign,
    range: "$25k–$150k",
    color: "bg-primary/10 border-primary hover:border-primary/50",
  },
  {
    id: "trade_package",
    title: "Trade Package for GC",
    description: "You're the GC? We'll provide unit rates for EIFS, sealants, painting, masonry.",
    icon: Wrench,
    range: "Fast turnaround",
    color: "bg-secondary/10 border-secondary hover:border-secondary/50",
  },
  {
    id: "emergency",
    title: "Emergency/Maintenance",
    description: "Urgent leak repair, emergency sealant work, or after-hours maintenance program.",
    icon: AlertCircle,
    range: "48–72h response",
    color: "bg-destructive/10 border-destructive hover:border-destructive/50",
  },
  {
    id: "general",
    title: "General Estimate",
    description: "Not sure which category? Start here for a general project assessment.",
    icon: Calculator,
    range: "All projects",
    color: "bg-muted border-border hover:border-primary/30",
  },
];

const EstimatorStep0 = ({ data, onChange }: EstimatorStep0Props) => {
  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">What type of quote do you need?</h2>
        <p className="text-muted-foreground">
          Select the option that best describes your project requirements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quoteTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = data.quoteType === type.id;

          return (
            <Card
              key={type.id}
              className={`p-6 cursor-pointer transition-all ${type.color} ${
                isSelected ? "ring-2 ring-primary shadow-lg" : ""
              }`}
              onClick={() => onChange("quoteType", type.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-background"}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{type.title}</h3>
                    <Badge variant={isSelected ? "default" : "outline"}>
                      {type.range}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EstimatorStep0;