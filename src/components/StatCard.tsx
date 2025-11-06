import { useCountUp } from "@/hooks/useCountUp";

interface StatCardProps {
  stat: {
    value: number;
    suffix: string;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  index: number;
  isVisible: boolean;
}

const StatCard = ({ stat, index, isVisible }: StatCardProps) => {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <div
      className={`relative text-center group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Circular progress ring with floating effect */}
      <div className="relative inline-flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        {/* Outer glow */}
        <div
          className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            width: "160px",
            height: "160px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Progress ring */}
        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
            opacity="0.2"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 70}`}
            strokeDashoffset={`${2 * Math.PI * 70 * (1 - (isVisible ? 0.75 : 0))}`}
            className="transition-all duration-2000 ease-out"
            style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))" }}
          />
        </svg>

        {/* Icon integrated into ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            <div className="relative bg-card border-2 border-primary/50 rounded-full p-5 shadow-xl group-hover:shadow-2xl group-hover:border-primary transition-all duration-500">
              <stat.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated number with 3D effect */}
      <div
        className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-br from-primary via-primary to-primary/70 bg-clip-text text-transparent group-hover:scale-110 transition-all duration-500"
        style={{
          textShadow: "0 2px 20px hsl(var(--primary) / 0.3)",
          transform: isVisible ? "none" : "rotateX(90deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {count}
        {stat.suffix}
      </div>

      <div className="text-xl font-semibold mb-2 text-foreground">
        {stat.label}
      </div>
      <p className="text-sm text-muted-foreground max-w-[200px] mx-auto leading-relaxed">
        {stat.description}
      </p>

      {/* Connection dot on timeline */}
      <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50 group-hover:scale-150 transition-transform duration-300" />
    </div>
  );
};

export default StatCard;
