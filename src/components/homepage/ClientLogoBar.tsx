import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

const ClientLogoBar = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  // Placeholder client names (can be replaced with actual logos later)
  const clients = [
    "Madison Group",
    "PCL Construction",
    "EllisDon",
    "Graham Construction",
    "Bird Construction",
    "Metrus Properties",
    "Tridel",
    "Daniels Corporation"
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-12 bg-muted/30 border-y border-border/50 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
          Trusted by Leading Developers and Property Managers Across the GTA
        </p>
        
        {/* Client Names with Fade Animation */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 max-w-5xl mx-auto">
          {clients.map((client, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible 
                  ? "opacity-60 translate-y-0" 
                  : "opacity-0 translate-y-4"
              } hover:opacity-100 hover:scale-110 cursor-default`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="text-lg font-semibold text-foreground/70 whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>

        {/* Additional Trust Message */}
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-3xl mx-auto">
          Projects completed for property management firms managing 10,000+ units across the Greater Toronto Area
        </p>
      </div>
    </section>
  );
};

export default ClientLogoBar;
