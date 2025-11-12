import { Link } from "react-router-dom";
import { Building2, Wrench, Phone, Mail, MapPin, Linkedin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MinimalMobileFooterProps {
  companyLinks: Array<{ label: string; href: string }>;
  services: Array<{ name: string; slug: string; service_tier?: string }>;
  marketLinks: Array<{ label: string; href: string }>;
  projectLinks: Array<{ label: string; href: string }>;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
  certifications: Array<{
    icon: LucideIcon;
    title: string;
    subtitle: string;
  }>;
  displayTrustItems: boolean;
  trustBarItems: Array<{
    label: string;
    value: string;
  }>;
  logoUrl?: string;
  serviceAreaText?: string;
  linkedinUrl?: string;
  foundedYear?: number;
}

export function MinimalMobileFooter({
  companyLinks,
  services,
  marketLinks,
  projectLinks,
  contactInfo,
  certifications,
  displayTrustItems,
  trustBarItems,
  logoUrl,
  serviceAreaText,
  linkedinUrl,
  foundedYear = 2009
}: MinimalMobileFooterProps) {
  // Get top 6 services for display
  const topServices = services.slice(0, 6);
  
  // Combine all navigation links for the Navigation accordion
  const allNavLinks = [
    { label: "Why Specialty Contractor?", href: "/why-specialty-contractor" },
    ...companyLinks.slice(0, 5),
    ...marketLinks,
    ...projectLinks
  ];

  return (
    <div className="md:hidden space-y-3">
      
      {/* Logo and Service Area */}
      {logoUrl && (
        <div className="text-center pb-3 border-b border-border/50">
          <Link to="/" className="inline-block mb-3">
            <img src={logoUrl} alt="Ascent Group Construction" className="h-14 w-auto mx-auto" />
          </Link>
          {serviceAreaText && (
            <p className="text-xs text-muted-foreground">
              {serviceAreaText}
            </p>
          )}
        </div>
      )}
      
      {/* Accordion with 2 sections */}
      <Accordion type="single" collapsible className="space-y-2">
        
        {/* Section 1: Navigation */}
        <AccordionItem value="navigation" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50">
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Navigation</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <nav className="space-y-1">
              {allNavLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.href}
                  className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </AccordionContent>
        </AccordionItem>
        
        {/* Section 2: Services */}
        <AccordionItem value="services" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50">
            <div className="flex items-center gap-3">
              <Wrench className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Services</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <nav className="grid grid-cols-2 gap-2">
              {topServices.map((service, index) => (
                <Link 
                  key={index}
                  to={`/services/${service.slug}`}
                  className="py-2 px-3 text-xs bg-muted/30 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
            <Link 
              to="/services"
              className="block mt-3 text-sm font-medium text-primary text-center hover:text-primary/80 transition-colors"
            >
              View All Services →
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Get Started Card */}
      <Card className="p-3 space-y-2">
        <h3 className="text-sm font-bold text-foreground">Get Started</h3>
        <Link 
          to="/estimate"
          className="block w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-3 rounded-md text-center font-semibold"
        >
          Request a Proposal
        </Link>
        <Link 
          to="/emergency-maintenance"
          className="block w-full border border-border hover:bg-muted/50 transition-colors px-4 py-2 rounded-md text-center text-sm"
        >
          Emergency Services (48-72h)
        </Link>
      </Card>

      {/* Certifications Strip (horizontal scroll) */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-muted">
        <div className="flex gap-4 pb-2">
          {displayTrustItems ? (
            trustBarItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 min-w-[160px] p-3 bg-muted/30 rounded-lg border border-border/50">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-4 w-4 rounded-full bg-primary/30" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground">{item.value}</div>
                </div>
              </div>
            ))
          ) : (
            certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="flex items-center gap-2 min-w-[160px] p-3 bg-muted/30 rounded-lg border border-border/50">
                  <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-foreground">{cert.title}</div>
                    <div className="text-[10px] text-muted-foreground">{cert.subtitle}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Contact Information Bar - Above Legal */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
          {contactInfo.address && (
            <>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="text-center">{contactInfo.address}</span>
              </div>
              <span>•</span>
            </>
          )}
          {contactInfo.phone && (
            <>
              <a 
                href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {contactInfo.phone}
              </a>
              <span>•</span>
            </>
          )}
          {contactInfo.email && (
            <>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {contactInfo.email}
              </a>
              <span>•</span>
            </>
          )}
          {linkedinUrl && (
            <>
              <a 
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
              <span>•</span>
            </>
          )}
          <span>Mon-Fri: 7am-6pm EST</span>
          <span>•</span>
          <span>Emergency: 24/7</span>
        </div>
      </div>
      
      {/* Simplified Legal Section */}
      <div className="mt-4 pt-4 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground mb-3">
          © {new Date().getFullYear()} Ascent Group Construction<br/>
          Ontario Licensed & Insured • WSIB Compliant
        </p>
        <nav className="flex justify-center gap-6 text-xs">
          <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
          <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          <Link to="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">Accessibility</Link>
        </nav>
      </div>
    </div>
  );
}
