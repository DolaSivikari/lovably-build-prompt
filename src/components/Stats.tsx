import { Users, Building, Award, TrendingUp } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Building,
      value: "500+",
      label: "Projects Completed",
      description: "Across commercial, industrial, and institutional sectors",
    },
    {
      icon: Users,
      value: "200+",
      label: "Skilled Professionals",
      description: "Dedicated team of experts committed to excellence",
    },
    {
      icon: Award,
      value: "98%",
      label: "Client Satisfaction",
      description: "Proven track record of delivering on promises",
    },
    {
      icon: TrendingUp,
      value: "$2B+",
      label: "Projects Delivered",
      description: "Total value of successfully completed work",
    },
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proven Track Record</h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Numbers that demonstrate our commitment to excellence and client success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-secondary rounded-full">
                  <stat.icon className="h-8 w-8 text-secondary-foreground" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-primary-foreground/70">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
