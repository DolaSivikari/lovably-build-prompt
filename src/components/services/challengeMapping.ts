import { TrendingUp, Home, Building2, Leaf } from "lucide-react";

export interface Challenge {
  id: string;
  label: string;
  icon: typeof Home;
  description: string;
  color: string;
  tags: string[];
}

export const CHALLENGES: Challenge[] = [
  {
    id: "housing",
    label: "Housing Shortage",
    icon: Home,
    description: "Addressing Ontario's residential construction needs",
    color: "hsl(var(--primary))",
    tags: ["housing"]
  },
  {
    id: "envelope",
    label: "Building Envelope",
    icon: Building2,
    description: "Solving the building envelope crisis",
    color: "hsl(var(--accent))",
    tags: ["envelope"]
  },
  {
    id: "infrastructure",
    label: "Infrastructure Gap",
    icon: TrendingUp,
    description: "Bridging commercial & institutional needs",
    color: "hsl(var(--chart-2))",
    tags: ["infrastructure"]
  },
  {
    id: "sustainability",
    label: "Sustainable Solutions",
    icon: Leaf,
    description: "Green building & efficiency services",
    color: "hsl(var(--chart-3))",
    tags: ["sustainability"]
  }
];

export const getChallengeById = (id: string) => 
  CHALLENGES.find(c => c.id === id);

export const getChallengeColor = (tag: string): string => {
  const challenge = CHALLENGES.find(c => c.tags.includes(tag));
  return challenge?.color || "hsl(var(--muted))";
};
