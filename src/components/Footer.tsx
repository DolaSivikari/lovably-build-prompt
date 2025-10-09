import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Building2, Wrench, BookOpen, Clock } from "lucide-react";
import ascentLogo from "@/assets/ascent-logo.png";
import SEO from "@/components/SEO";
import NewsletterSignup from "@/components/footer/NewsletterSignup";
import FooterNavCard from "@/components/footer/FooterNavCard";
import SocialMediaButton from "@/components/footer/SocialMediaButton";
import { Button } from "@/components/ui/button";

const Footer = () => {
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
      <footer className="w-full footer-gradient-mesh text-primary-foreground relative" role="contentinfo">
        {/* Wave Divider */}
        <div className="footer-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="footer-grid-pattern" aria-hidden="true"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Newsletter Signup */}
          <NewsletterSignup />

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Left: Company Branding (4 cols) */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block mb-6 group">
                <img 
                  src={ascentLogo} 
                  alt="Ascent Group Construction" 
                  className="h-32 w-auto brightness-0 invert footer-logo-glow"
                />
              </Link>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Expert painting and exterior finishing services across Ontario. Delivering quality craftsmanship and exceptional results since 2009.
              </p>

              {/* Certifications */}
              <div className="flex gap-4 items-center opacity-70">
                <div className="text-xs text-primary-foreground/60">
                  <div className="font-semibold mb-1">Fully Insured & Licensed</div>
                  <div>WSIB Compliant</div>
                </div>
              </div>
            </div>

            {/* Center: Navigation Cards (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FooterNavCard title="Company" icon={Building2} links={companyLinks} />
              <FooterNavCard title="Resources" icon={BookOpen} links={resourceLinks} />
              <FooterNavCard title="Contact" icon={Mail} links={contactLinks} />
              <FooterNavCard title="Careers" icon={Wrench} links={careersLinks} />
              
              {/* Client Types Card */}
              <div className="footer-glass-card p-6 sm:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="h-5 w-5 text-secondary" aria-hidden="true" />
                  <h3 className="font-semibold text-primary-foreground">Who We Serve</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {clientTypes.map((client) => (
                    <Link 
                      key={client.to}
                      to={client.to}
                      className="footer-glass-card p-4 text-center group hover:scale-105"
                    >
                      <client.icon className="h-6 w-6 mx-auto mb-2 text-secondary" aria-hidden="true" />
                      <span className="text-sm text-primary-foreground/80 group-hover:text-secondary transition-colors">
                        {client.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

              {/* Right: Contact Card (3 cols) */}
            <div className="lg:col-span-3">
              <div className="footer-glass-card p-6 sticky top-4">
                <h3 className="font-semibold text-primary-foreground mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-secondary" aria-hidden="true" />
                  Contact Us
                </h3>
                
                <ul className="space-y-4 mb-6" itemScope itemType="https://schema.org/LocalBusiness">
                  <meta itemProp="name" content="Ascent Group Construction" />
                  <meta itemProp="telephone" content="+1-416-555-1234" />
                  
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 mt-0.5 text-secondary flex-shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-medium text-primary-foreground">Phone</div>
                      <a 
                        href="tel:+14165551234" 
                        className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                        itemProp="telephone"
                      >
                        (416) 555-1234
                      </a>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5 text-secondary flex-shrink-0" aria-hidden="true" />
                    <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <div className="text-sm font-medium text-primary-foreground">Service Area</div>
                      <div className="text-sm text-primary-foreground/70">
                        <span itemProp="addressRegion">Greater Toronto Area</span>, <span itemProp="addressCountry">Ontario</span>
                      </div>
                      <div className="text-xs text-primary-foreground/60 mt-1">
                        Toronto • Mississauga • Brampton • Vaughan
                      </div>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-0.5 text-secondary flex-shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-medium text-primary-foreground">Business Hours</div>
                      <div className="text-xs text-primary-foreground/70 mt-1">
                        Mon-Fri: 8:00 AM - 6:00 PM<br />
                        Sat: 9:00 AM - 4:00 PM<br />
                        Sun: Closed
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="space-y-3">
                  <Button 
                    variant="secondary" 
                    className="w-full justify-center gap-2 animate-pulse-glow"
                    asChild
                  >
                    <a href="mailto:info@ascentgroupconstruction.com">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Email Us
                    </a>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-center gap-2 bg-primary-foreground/5 hover:bg-primary-foreground/10 border-primary-foreground/20"
                    asChild
                  >
                    <Link to="/estimate">
                      Get Free Estimate
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="pt-8 border-t border-primary-foreground/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-primary-foreground/70">
                  &copy; {new Date().getFullYear()} Ascent Group Construction. All rights reserved.
                </p>
                <p className="text-xs text-primary-foreground/50 mt-1">
                  Built with Excellence, Powered by Innovation
                </p>
              </div>
              <nav aria-label="Legal navigation" className="flex gap-6 text-xs text-primary-foreground/60">
                <Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link>
                <Link to="/accessibility" className="hover:text-secondary transition-colors">Accessibility</Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
