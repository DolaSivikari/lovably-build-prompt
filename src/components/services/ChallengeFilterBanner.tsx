import { CHALLENGES, Challenge } from "./challengeMapping";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChallengeFilterBannerProps {
  activeChallenge: string | null;
  onChallengeClick: (challengeId: string | null) => void;
}

export const ChallengeFilterBanner = ({ 
  activeChallenge, 
  onChallengeClick 
}: ChallengeFilterBannerProps) => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Market-Aligned Capabilities
        </h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Our services address Ontario's most pressing construction challenges
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CHALLENGES.map((challenge: Challenge) => {
          const Icon = challenge.icon;
          const isActive = activeChallenge === challenge.id;
          
          return (
            <Card
              key={challenge.id}
              onClick={() => onChallengeClick(isActive ? null : challenge.id)}
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                isActive && "ring-2 ring-primary shadow-lg"
              )}
              style={isActive ? { borderColor: challenge.color } : undefined}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${challenge.color}20` }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: challenge.color }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {challenge.label}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {challenge.description}
                  </p>
                </div>
                {isActive && (
                  <div className="text-xs font-semibold text-primary">
                    ✓ Active Filter
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
