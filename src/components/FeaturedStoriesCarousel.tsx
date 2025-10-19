import { useEffect, useRef } from "react";
import OptimizedImage from "@/components/OptimizedImage";

type Story = { 
  id?: string | number; 
  title: string; 
  image: string; 
  link?: string; 
  tag?: string;
};

interface FeaturedStoriesCarouselProps {
  items: Story[];
}

export default function FeaturedStoriesCarousel({ items }: FeaturedStoriesCarouselProps) {
  const idxRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!items || items.length < 2) return;
    
    const interval = window.setInterval(() => {
      idxRef.current = (idxRef.current + 1) % items.length;
      const el = containerRef.current;
      if (el) {
        const cards = el.querySelectorAll<HTMLElement>(".story-card");
        const next = cards[idxRef.current];
        next?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }, 3500);
    
    return () => window.clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div 
      className="featured-stories overflow-x-auto scrollbar-hide" 
      ref={containerRef}
      style={{ scrollSnapType: "x mandatory" }}
    >
      <div className="flex gap-4 items-stretch px-2 pb-2">
        {items.map((story, i) => (
          <article 
            key={story.id ?? i} 
            className="story-card min-w-[220px] snap-center"
            style={{ scrollSnapAlign: "center" }}
          >
            <a 
              href={story.link || "#"} 
              className="block rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-construction-orange"
            >
              <OptimizedImage 
                src={story.image} 
                alt={story.title} 
                width={440} 
                height={280} 
                className="w-full h-36 object-cover"
              />
              <div className="p-3">
                {story.tag && (
                  <div className="text-xs text-construction-accent uppercase tracking-wide mb-1">
                    {story.tag}
                  </div>
                )}
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {story.title}
                </h3>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
