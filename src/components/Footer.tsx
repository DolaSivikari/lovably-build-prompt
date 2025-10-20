import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Building2, Wrench, BookOpen, Clock, Shield, Award, CheckCircle2 } from "lucide-react";
import ascentLogo from "@/assets/ascent-logo.png";
import SEO from "@/components/SEO";
import FooterNavCard from "@/components/footer/FooterNavCard";
import SocialMediaButton from "@/components/footer/SocialMediaButton";
import NewsletterBackend from "@/components/footer/NewsletterBackend";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import companyCredentials from "@/data/company-credentials.json";

const Footer = () => {
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .eq('is_active', true)
        .single();
      
      if (data) setSiteSettings(data);
    };

    fetchSiteSettings();
  }, []);
  // Enhanced ProfessionalService schema
  const citationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://ascentgroupconstruction.com/#organization",
    name: "Ascent Group Construction",
    image: "https://ascentgroupconstruction.com/og-image.jpg",
    email: "info@ascentgroupconstruction.com",
    areaServed: {
      "@type": "State",
      name: "Ontario",
      "@id": "https://en.wikipedia.org/wiki/Ontario"
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    serviceType: [
      "Commercial Painting",
      "Residential Painting", 
      "Condo Painting",
      "Stucco & EIFS",
      "Masonry Restoration",
      "Metal Cladding",
      "Parking Garage Restoration"
    ],
    priceRange: "$$-$$$",
  };

  const companyLinks = [
    { to: "/about", label: "About Us" },
    { to: "/values", label: "Our Values" },
    { to: "/our-process", label: "Our Process" },
    { to: "/sustainability", label: "Sustainability" },
    { to: "/safety", label: "Safety" },
  ];

  const resourceLinks = [
    { to: "/blog", label: "Blog" },
    { to: "/case-studies", label: "Case Studies" },
    { to: "/faq", label: "FAQ" },
    { to: "/projects", label: "Projects" },
  ];

  const clientTypes = [
    { to: "/homeowners", label: "Homeowners", icon: Building2 },
    { to: "/property-managers", label: "Property Managers", icon: Building2 },
    { to: "/commercial-clients", label: "Commercial Clients", icon: Building2 },
  ];

  const contactLinks = [
    { to: "/contact", label: "Contact Us" },
    { to: "/estimate", label: "Get Estimate" },
  ];

  const careersLinks = [
    { to: "/careers", label: "Careers" },
    { to: "/careers#benefits", label: "Benefits" },
    { to: "/careers#positions", label: "Open Positions" },
  ];

  return (
    <>
      <SEO structuredData={citationSchema} />
      <footer className="w-full bg-white border-t border-border relative" role="contentinfo">
        
        {/* Newsletter Signup */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-8">
            <NewsletterBackend />
          </div>
        </div>

        {/* Trust Bar - Company Credentials */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">WSIB Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">15+ Years Excellence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">$5M Liability Coverage</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* PCL-style 4-column footer layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Logo & Tagline */}
            <div>
              <Link to="/" className="inline-block mb-4">
                <img 
                  src={ascentLogo} 
                  alt="Ascent Group Construction" 
                  className="h-24 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional construction services delivering excellence across the Greater Toronto Area since 2009.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <nav aria-label="Quick links">
                <ul className="space-y-2">
                  <li><Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
                  <li><Link to="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projects</Link></li>
                  <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link to="/our-process" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Process</Link></li>
                  <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                  <li><Link to="/case-studies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
                </ul>
              </nav>
            </div>

            {/* Column 3: Sectors */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Sectors
              </h3>
              <nav aria-label="Client sectors">
                <ul className="space-y-2">
                  <li><Link to="/homeowners" className="text-sm text-muted-foreground hover:text-primary transition-colors">Homeowners</Link></li>
                  <li><Link to="/property-managers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Property Managers</Link></li>
                  <li><Link to="/commercial-clients" className="text-sm text-muted-foreground hover:text-primary transition-colors">Commercial Clients</Link></li>
                  <li><Link to="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
                </ul>
              </nav>
            </div>

            {/* Column 4: Contact & Social */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Contact
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{siteSettings?.address || 'Greater Toronto Area, Ontario'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <a href={`tel:${siteSettings?.phone?.replace(/[^0-9+]/g, '') || '+14165551234'}`} className="hover:text-primary transition-colors">
                    {siteSettings?.phone || '(416) 555-1234'}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <a href={`mailto:${siteSettings?.email || 'info@ascentgroupconstruction.com'}`} className="hover:text-primary transition-colors break-all">
                    {siteSettings?.email || 'info@ascentgroupconstruction.com'}
                  </a>
                </div>
                
                {/* Social Icons */}
                <div className="flex gap-3 pt-2">
                  <a href="https://www.linkedin.com/company/ascent-group-construction" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://www.facebook.com/ascentgroupconstruction" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="https://twitter.com/ascentgroupca" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="https://www.instagram.com/ascentgroupconstruction" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-muted-foreground">
                &copy; {new Date().getFullYear()} Ascent Group Construction. All rights reserved.
              </p>
              <nav aria-label="Legal navigation" className="flex gap-6 text-muted-foreground">
                <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
