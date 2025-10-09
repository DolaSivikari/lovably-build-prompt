import { useState, useEffect } from "react";
import { Phone, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileStickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-background/95 backdrop-blur-md border-t border-border shadow-lg px-4 py-3">
        <div className="flex gap-3">
          <Button
            asChild
            size="lg"
            className="flex-1 gap-2"
            variant="default"
          >
            <a href="tel:+14165551234">
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="flex-1 gap-2"
            variant="secondary"
          >
            <Link to="/estimate">
              <MessageSquare className="h-5 w-5" />
              Get Quote
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
