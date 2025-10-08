import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import ascentLogo from "@/assets/ascent-logo.png";
import SEO from "@/components/SEO";

const Footer = () => {
  // Enhanced LocalBusiness schema with citations
  const citationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ascentgroupconstruction.com/#organization",
    name: "Ascent Group Construction",
    image: "https://ascentgroupconstruction.com/og-image.jpg",
    telephone: "+14165557246",
    email: "info@ascentgroupconstruction.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Industrial Parkway",
      addressLocality: "Mississauga",
      addressRegion: "ON",
      postalCode: "L5T 1A1",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6532,
      longitude: -79.3832,
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
    sameAs: [
      "https://www.facebook.com/ascentgroup",
      "https://www.linkedin.com/company/ascentgroup",
      "https://twitter.com/ascentgroup",
      "https://instagram.com/ascentgroup",
    ],
    priceRange: "$$$$",
  };

  return (
    <>
      <SEO structuredData={citationSchema} />
      <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4 group">
              <img 
                src={ascentLogo} 
                alt="Ascent Group Construction" 
                className="h-36 w-auto brightness-0 invert hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]"
              />
            </Link>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Expert painting and exterior finishing services across the GTA. Quality craftsmanship and exceptional results since 2009.
            </p>
            <nav aria-label="Social media">
              <div className="flex gap-2 touch-group">
                <a href="#" className="hover:text-secondary transition-colors touch-target" aria-label="Visit us on LinkedIn">
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#" className="hover:text-secondary transition-colors touch-target" aria-label="Follow us on Twitter">
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#" className="hover:text-secondary transition-colors touch-target" aria-label="Like us on Facebook">
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav aria-label="Quick navigation">
              <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/values" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Our Values
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link to="/our-process" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
            </nav>
          </div>

          {/* Who We Serve */}
          <div>
            <h3 className="font-semibold mb-4">Who We Serve</h3>
            <nav aria-label="Client services">
              <ul className="space-y-2 text-sm">
              <li>
                <Link to="/homeowners" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Homeowners
                </Link>
              </li>
              <li>
                <Link to="/property-managers" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Property Managers
                </Link>
              </li>
              <li>
                <Link to="/commercial-clients" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Commercial Clients
                </Link>
              </li>
              <li>
                <Link to="/estimate" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Get Estimate
                </Link>
              </li>
            </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Serving the Greater Toronto Area</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(416) 555-PAINT</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@ascengroup.ca</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Ascen Group Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
