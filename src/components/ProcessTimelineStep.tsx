import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Clock, CheckCircle2, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessTimelineStepProps {
  step: number;
  icon: LucideIcon;
  title: string;
  duration: string;
  description: string;
  details: string[];
  deliverables: string[];
  image?: string;
  isLeft: boolean;
}

const ProcessTimelineStep = ({
  step,
  icon: Icon,
  title,
  duration,
  description,
  details,
  deliverables,
  image,
  isLeft,
}: ProcessTimelineStepProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("flex items-center gap-8 mb-16 relative", isLeft ? "flex-row" : "flex-row-reverse")}>
      {/* Timeline connector dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary border-4 border-background z-10 shadow-lg" />
      
      {/* Content Card */}
      <Card className={cn(
        "w-[calc(50%-4rem)] hover:shadow-xl transition-all duration-300",
        isExpanded && "ring-2 ring-primary"
      )}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">Step {step}</Badge>
                <CardTitle className="text-xl">{title}</CardTitle>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{description}</p>
          
          {image && (
            <div className="rounded-lg overflow-hidden">
              <img src={image} alt={title} className="w-full h-48 object-cover" />
            </div>
          )}
          
          {isExpanded && (
            <div className="space-y-4 animate-accordion-down">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  What We Do
                </h4>
                <ul className="space-y-2">
                  {details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">What You Get</h4>
                <div className="flex flex-wrap gap-2">
                  {deliverables.map((item, idx) => (
                    <Badge key={idx} variant="secondary">{item}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full"
          >
            {isExpanded ? "Show Less" : "Show More"}
            <ChevronDown className={cn(
              "ml-2 h-4 w-4 transition-transform",
              isExpanded && "rotate-180"
            )} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessTimelineStep;
