import { Link, LinkProps } from "react-router-dom";
import { ReactNode } from "react";

// Known route patterns - add more as routes are added
const KNOWN_ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/:slug",
  "/services/general-contracting",
  "/services/construction-management",
  "/services/design-build",
  "/markets/multi-family",
  "/markets/commercial",
  "/markets/institutional",
  "/markets/industrial",
  "/projects",
  
  "/blog",
  "/blog/:slug",
  "/contact",
  "/estimate",
  "/careers",
  "/faq",
  "/safety",
  "/prequalification",
  "/capabilities",
  "/sustainability",
  "/how-we-work",
  "/our-process",
  "/values",
  "/markets/multi-family",
  "/commercial-clients",
  "/property-managers",
  "/company/team",
  "/company/certifications-insurance",
  "/company/equipment-resources",
  "/company/developers",
  "/resources/service-areas",
  "/resources/warranties",
  "/resources/financing",
  "/resources/contractor-portal",
  "/admin",
];

interface AppLinkProps extends Omit<LinkProps, "to"> {
  to: string;
  children: ReactNode;
}

/**
 * Safe link wrapper with route validation in dev mode
 */
export const AppLink = ({ to, children, ...props }: AppLinkProps) => {
  // Validate internal links in development
  if (process.env.NODE_ENV === "development" && to.startsWith("/")) {
    const isKnown = KNOWN_ROUTES.some(route => {
      const pattern = route.replace(/:[\w]+/g, "[^/]+");
      return new RegExp(`^${pattern}$`).test(to);
    });
    
    if (!isKnown) {
      console.warn(`[AppLink] Unknown route: ${to}`);
    }
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};
