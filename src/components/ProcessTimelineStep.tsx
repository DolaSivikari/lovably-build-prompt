import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProcessTimelineStepProps {
  step: number;
  title: string;
  duration: string;
  description: string;
  details: string[];
  deliverables: string[];
  image?: string;
}

const ProcessTimelineStep = ({
  step,
  title,
  duration,
  description,
  details,
  deliverables,
  image,
}: ProcessTimelineStepProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-12 last:mb-0">
      {/* Full-Width Image Section */}
      {image && (
        <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl mb-8">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
          
          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-7xl md:text-8xl font-bold text-primary">
                    {step.toString().padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                      {title}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm">
                      {duration}
                    </p>
                  </div>
                </div>
                <p className="text-lg md:text-xl text-primary-foreground/90">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expandable Details Card */}
      <div className="container mx-auto px-4">
        <div 
          className={cn(
            "bg-card rounded-xl border shadow-sm transition-all duration-300",
            isExpanded && "shadow-lg"
          )}
        >
          {isExpanded && (
            <div className="p-6 md:p-8 space-y-6 animate-accordion-down">
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  What We Do
                </h4>
                <ul className="space-y-3 ml-7">
                  {details.map((detail, idx) => (
                    <li key={idx} className="text-muted-foreground flex items-start gap-3">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-3">What You Get</h4>
                <div className="flex flex-wrap gap-2">
                  {deliverables.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm py-1">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full rounded-t-none py-6 text-base hover:bg-primary/5"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Hide' : 'Show'} details for step ${step}: ${title}`}
          >
            {isExpanded ? "Show Less Details" : "Show More Details"}
            <ChevronDown className={cn(
              "ml-2 h-5 w-5 transition-transform duration-300",
              isExpanded && "rotate-180"
            )} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimelineStep;
