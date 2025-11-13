import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ValuePillar {
  id: string;
  title: string;
  description: string;
  icon_name: string | null;
  display_order: number;
}

const ValuePillars = () => {
  const { data: pillars, isLoading } = useQuery({
    queryKey: ["value-pillars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("value_pillars")
        .select("*")
        .eq("is_active", true)
        .order("display_order");

      if (error) throw error;
      return data as ValuePillar[];
    },
  });

  if (isLoading) {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!pillars || pillars.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-muted/30 texture-blueprint">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon_name
              ? (LucideIcons[pillar.icon_name as keyof typeof LucideIcons] as LucideIcon)
              : null;

            return (
              <Card key={pillar.id} className="border-border/40 bg-card hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex flex-col items-start gap-4">
                    {IconComponent && (
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuePillars;
