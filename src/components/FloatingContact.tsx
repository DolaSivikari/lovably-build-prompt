import { useState } from "react";
import { Phone, MessageCircle, X, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phone = "14165557246";

  const handleWhatsAppClick = () => {
    // Validate and sanitize phone number (remove all non-digits except +)
    const sanitizedPhone = phone.replace(/[^\d+]/g, '');
    
    // Ensure phone starts with country code
    const validPhone = sanitizedPhone.startsWith('+') ? sanitizedPhone : `+${sanitizedPhone}`;
    
    // Validate format (must be 10-15 digits after country code)
    if (!/^\+\d{10,15}$/.test(validPhone)) {
      console.error('Invalid WhatsApp phone number format');
      return;
    }
    
    const message = encodeURIComponent("Hi, I'd like to inquire about your construction services.");
    window.open(`https://wa.me/${validPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-fixed">
      {isOpen && (
        <div className="mb-4 bg-background border border-border rounded-lg shadow-2xl p-4 space-y-3 animate-scale-in">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            aria-label="Close contact menu"
          >
            <X className="h-4 w-4" />
          </button>
          
          <h3 className="font-semibold text-foreground pr-6">Contact Us</h3>
          
          <a
            href="tel:4165557246"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
          >
            <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Call Us</div>
              <div className="text-xs text-muted-foreground">(416) 555-PAINT</div>
            </div>
          </a>

          <a
            onClick={(e) => {
              e.preventDefault();
              handleWhatsAppClick();
            }}
            href="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group cursor-pointer"
          >
            <div className="p-2 bg-green-500/10 rounded-full group-hover:bg-green-500/20">
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">WhatsApp</div>
              <div className="text-xs text-muted-foreground">Chat with us</div>
            </div>
          </a>

          <Link
            to="/contact"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            <div className="p-2 bg-secondary/10 rounded-full group-hover:bg-secondary/20">
              <Mail className="h-5 w-5 text-secondary" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Email Form</div>
              <div className="text-xs text-muted-foreground">Send a message</div>
            </div>
          </Link>
        </div>
      )}

      <Button
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 hover:scale-110 transition-all"
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Phone className="h-6 w-6 animate-pulse" />
        )}
      </Button>
    </div>
  );
};

export default FloatingContact;
