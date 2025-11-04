import { useState } from "react";
import { Phone, MessageCircle, X, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useCompanySettings } from "@/hooks/useCompanySettings";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useCompanySettings();

  const sanitizePhoneNumber = (rawPhone: string): string | null => {
    // Remove all non-digits except +
    const cleaned = rawPhone.replace(/[^\d+]/g, '');
    
    // Ensure it starts with country code
    let withCountryCode = cleaned;
    if (!cleaned.startsWith('+')) {
      // Assume North American number if no country code
      withCountryCode = cleaned.startsWith('1') ? `+${cleaned}` : `+1${cleaned}`;
    }
    
    // Validate: must be + followed by 1-3 digit country code, then 7-15 digits
    if (!/^\+\d{8,18}$/.test(withCountryCode)) {
      console.error('Invalid phone format:', withCountryCode);
      return null;
    }
    
    // Additional validation: check reasonable length ranges
    const digitCount = withCountryCode.replace(/\D/g, '').length;
    if (digitCount < 8 || digitCount > 18) {
      console.error('Phone number length out of range:', digitCount);
      return null;
    }
    
    return withCountryCode;
  };

  const handleWhatsAppClick = () => {
    if (!settings?.phone) return;
    
    const validPhone = sanitizePhoneNumber(settings.phone);
    
    if (!validPhone) {
      console.error('Cannot open WhatsApp with invalid phone number');
      return;
    }
    
    const message = encodeURIComponent("Hi, I'd like to inquire about your construction services.");
    window.open(`https://wa.me/${validPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const displayPhone = settings?.phone ? settings.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : '';
  const telLink = settings?.phone ? `tel:${settings.phone}` : '#';

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-fixed">
      {isOpen && (
        <div className="mb-4 bg-background border border-border rounded-lg shadow-2xl p-4 space-y-3 animate-scale-in w-[280px]">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            aria-label="Close contact menu"
          >
            <X className="h-4 w-4" />
          </button>
          
          <h3 className="font-semibold text-foreground pr-6">Contact Us</h3>
          
          <a
            href={telLink}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group min-h-[48px]"
          >
            <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 shrink-0">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Call Us</div>
              <div className="text-sm text-muted-foreground">{displayPhone}</div>
            </div>
          </a>

          <a
            onClick={(e) => {
              e.preventDefault();
              handleWhatsAppClick();
            }}
            href="#"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group cursor-pointer min-h-[48px]"
          >
            <div className="p-2 bg-green-500/10 rounded-full group-hover:bg-green-500/20 shrink-0">
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">WhatsApp</div>
              <div className="text-sm text-muted-foreground">Chat with us</div>
            </div>
          </a>

          <Link
            to="/contact"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group min-h-[48px]"
            onClick={() => setIsOpen(false)}
          >
            <div className="p-2 bg-secondary/10 rounded-full group-hover:bg-secondary/20 shrink-0">
              <Mail className="h-5 w-5 text-secondary" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Email Form</div>
              <div className="text-sm text-muted-foreground">Send a message</div>
            </div>
          </Link>
        </div>
      )}

      <Button
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 min-h-[56px] min-w-[56px] rounded-full shadow-2xl bg-primary hover:bg-primary/90 hover:scale-110 transition-all"
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
