import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Shield, Award, FileCheck, Building2, Wrench, Target, Briefcase, ChevronDown } from "lucide-react";
import ascentLogo from "@/assets/ascent-logo.png";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [footerSettings, setFooterSettings] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [siteData, footerData, servicesData] = await Promise.all([
          supabase.from('site_settings').select('*').eq('is_active', true).single(),
          supabase.from('footer_settings').select('*').eq('is_active', true).single(),
          supabase.from('services').select('name, slug, service_tier').eq('publish_state', 'published').order('service_tier, name')
        ]);
        
        if (siteData.data) setSiteSettings(siteData.data);
        if (footerData.data) setFooterSettings(footerData.data);
        if (servicesData.data) setServices(servicesData.data);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Get data from admin-managed settings
  const quickLinks = (footerSettings?.quick_links as any[]) || [];
  const sectorsLinks = (footerSettings?.sectors_links as any[]) || [];
  const trustBarItems = (footerSettings?.trust_bar_items as any[]) || [];
  
  const contactInfo = footerSettings?.contact_info || {};
  const socialMedia = footerSettings?.social_media || {};
  
  // Primary source: site_settings, fallback to footer_settings
  const address = siteSettings?.address || contactInfo.address || '';
  const phone = siteSettings?.phone || contactInfo.phone || '';
  const email = siteSettings?.email || contactInfo.email || '';
  const linkedinUrl = socialMedia.linkedin || '';

  // Static fallback links if admin hasn't configured them
  const companyLinks = quickLinks.length > 0 ? quickLinks : [
    { label: "About", href: "/about" },
    { label: "Leadership", href: "/company/team" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const marketLinks = sectorsLinks.length > 0 ? sectorsLinks : [
    { label: "Multi-Family", href: "/markets/multi-family" },
    { label: "Commercial", href: "/markets/commercial" },
    { label: "Institutional", href: "/markets/institutional" },
    { label: "Industrial", href: "/markets/industrial" },
  ];

  const projectLinks = [
    { label: "Featured Projects", href: "/projects" },
    { label: "Commercial", href: "/projects?type=commercial" },
    { label: "Residential", href: "/projects?type=residential" },
  ];

  // Use trust bar items from admin if available, otherwise show default certifications
  const displayTrustItems = trustBarItems.length > 0;
  const certifications = [
    { icon: Shield, title: "COR Certified", subtitle: "Safety Excellence" },
    { icon: FileCheck, title: "WSIB Compliant", subtitle: "Full Coverage" },
    { icon: Award, title: "$5M+ Insured", subtitle: "Liability" },
    { icon: Building2, title: "TCA Member", subtitle: "Since 2009" },
  ];

  const citationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://ascentgroupconstruction.com/#organization",
    name: "Ascent Group Construction",
    image: "https://ascentgroupconstruction.com/og-image.jpg",
    email: "info@ascentgroupconstruction.com",
    areaServed: { "@type": "State", name: "Ontario" },
    address: { "@type": "PostalAddress", addressRegion: "ON", addressCountry: "CA" },
    serviceType: ["General Contracting", "Construction Management", "Design-Build Services"],
    priceRange: "$$-$$$",
  };

  if (loading) {
    return (
      <>
        <SEO structuredData={citationSchema} />
        <footer className="w-full bg-background border-t border-border">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </footer>
      </>
    );
  }

  return (
    <>
      <SEO structuredData={citationSchema} />
      <footer className="w-full bg-background border-t border-border">
        
        {/* Footer Layout */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          
          {/* Mobile: Accordion-style footer */}
          <div className="md:hidden space-y-3 mb-8">
            <Accordion type="multiple" className="space-y-3">
              {/* Company Section */}
              <AccordionItem value="company" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">Company</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <nav className="space-y-1">
                    {companyLinks.map((link, index) => (
                      <Link 
                        key={index}
                        to={link.href} 
                        className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-all active:scale-95"
                        style={{ touchAction: 'manipulation' }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </AccordionContent>
              </AccordionItem>
              
              {/* Services Section */}
              <AccordionItem value="services" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Wrench className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">Services</span>
                    <Badge variant="secondary" className="ml-auto mr-2 text-xs">
                      {services.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <nav className="grid grid-cols-2 gap-2">
                    {services.map((service, index) => (
                      <Link 
                        key={index}
                        to={`/services/${service.slug}`}
                        className="py-2.5 px-3 text-xs text-muted-foreground hover:text-primary bg-background/50 hover:bg-muted rounded-md transition-all active:scale-95 border border-border/30"
                        style={{ touchAction: 'manipulation' }}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </nav>
                </AccordionContent>
              </AccordionItem>

              {/* Markets Section */}
              <AccordionItem value="markets" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">Markets</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <nav className="space-y-1">
                    {marketLinks.map((link, index) => (
                      <Link 
                        key={index}
                        to={link.href} 
                        className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-all active:scale-95"
                        style={{ touchAction: 'manipulation' }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </AccordionContent>
              </AccordionItem>

              {/* Projects Section */}
              <AccordionItem value="projects" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">Projects</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <nav className="space-y-1">
                    {projectLinks.map((link, index) => (
                      <Link 
                        key={index}
                        to={link.href} 
                        className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-all active:scale-95"
                        style={{ touchAction: 'manipulation' }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </AccordionContent>
              </AccordionItem>

              {/* Certifications Section */}
              <AccordionItem value="certifications" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">{displayTrustItems ? 'Credentials' : 'Certifications'}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  {displayTrustItems ? (
                    <div className="space-y-3">
                      {trustBarItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-md border border-border/30">
                          <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-foreground">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {certifications.map((cert, index) => {
                        const Icon = cert.icon;
                        return (
                          <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-md border border-border/30">
                            <Icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-semibold text-foreground">{cert.title}</div>
                              <div className="text-xs text-muted-foreground">{cert.subtitle}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Contact Card - Always visible on mobile */}
            <div className="mt-4 p-4 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-lg border border-primary/20">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-foreground">
                <Phone className="h-4 w-4 text-primary" />
                Get In Touch
              </h3>
              <div className="space-y-2.5 text-sm">
                {phone && (
                  <a 
                    href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors min-h-[44px] active:scale-95"
                    style={{ touchAction: 'manipulation' }}
                  >
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium">{phone}</span>
                  </a>
                )}
                {email && (
                  <a 
                    href={`mailto:${email}`} 
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors min-h-[44px] active:scale-95"
                    style={{ touchAction: 'manipulation' }}
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span>{email}</span>
                  </a>
                )}
                {address && (
                  <div className="flex items-start gap-2 text-muted-foreground pt-1">
                    <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed">{address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop: 5-Column Grid */}
          <div className="hidden md:grid md:grid-cols-5 gap-8 mb-12">
            
            {/* Column 1: Company */}
            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Company
              </h3>
              <nav>
                <ul className="space-y-2">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary link-hover">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Services
              </h3>
              <nav>
                <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link to={`/services/${service.slug}`} className="text-sm text-muted-foreground hover:text-primary link-hover">
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3: Markets */}
            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Markets
              </h3>
              <nav>
                <ul className="space-y-2">
                  {marketLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary link-hover">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 4: Projects */}
            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">
                Projects
              </h3>
              <nav>
                <ul className="space-y-2">
                  {projectLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary link-hover">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 5: Certifications & Affiliations */}
            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">
                {displayTrustItems ? 'Credentials' : 'Certifications'}
              </h3>
              {displayTrustItems ? (
                <div className="space-y-3">
                  {trustBarItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {certifications.map((cert, index) => {
                    const Icon = cert.icon;
                    return (
                      <div key={index} className="flex items-start gap-2">
                        <Icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-foreground">{cert.title}</div>
                          <div className="text-xs text-muted-foreground">{cert.subtitle}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              {/* Logo & Service Area */}
              <div className="flex-1">
                <Link to="/" className="inline-block mb-3">
                  <img src={ascentLogo} alt="Ascent Group Construction" className="h-16 w-auto" />
                </Link>
                <p className="text-sm text-muted-foreground max-w-md">
                  Serving Toronto, Mississauga, Brampton, Vaughan, Markham & the Greater Toronto Area
                </p>
              </div>

              {/* Contact */}
              <div className="flex flex-col items-start md:items-end gap-2 text-sm text-muted-foreground">
                {address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{address}</span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-primary link-hover">
                      {phone}
                    </a>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${email}`} className="hover:text-primary link-hover">
                      {email}
                    </a>
                  </div>
                )}
                {linkedinUrl && (
                  <div className="flex gap-3 mt-2">
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary link-hover" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Ascent Group Construction. All rights reserved.</p>
              <nav className="flex gap-6">
                <Link to="/privacy" className="hover:text-primary link-hover">Privacy</Link>
                <Link to="/terms" className="hover:text-primary link-hover">Terms</Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
