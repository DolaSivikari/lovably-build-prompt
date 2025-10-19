import { Card, CardContent } from "@/components/ui/card";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  title?: string;
  description?: string;
  steps: Step[];
  className?: string;
}

const ProcessSteps = ({
  title,
  description,
  steps,
  className = ""
}: ProcessStepsProps) => {
  return (
    <section className={`py-16 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="text-center mb-12 max-w-4xl mx-auto">
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="font-bold mb-2 text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
