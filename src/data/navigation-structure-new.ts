/**
 * New Navigation Structure - Phase 2
 * Restructured for dual-audience strategy
 */

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export interface NavDropdown {
  label: string;
  items: (NavLink | NavSubmenu)[];
}

export interface NavSubmenu {
  label: string;
  items: NavLink[];
}

export const navigationStructure = {
  services: {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Residential Services", href: "/services/residential" },
      { label: "Commercial Services", href: "/services/commercial" },
      { label: "Multi-Unit Services", href: "/services/multi-unit", badge: "Popular" },
      { label: "Industrial Services", href: "/services/industrial" },
      { label: "View All Services", href: "/services" },
    ],
  },
  projects: {
    label: "Projects",
    dropdown: [
      { label: "All Projects", href: "/projects" },
      { label: "Residential Projects", href: "/projects?client_type=homeowner" },
      { label: "Commercial Projects", href: "/projects?client_type=commercial" },
      { label: "Multi-Unit Projects", href: "/projects?client_type=developer" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  company: {
    label: "Company",
    dropdown: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/company/our-team", badge: "New" },
      {
        label: "Who We Serve",
        submenu: [
          { label: "Homeowners", href: "/homeowners" },
          { label: "Property Managers", href: "/property-managers" },
          { label: "Commercial Clients", href: "/commercial-clients" },
          { label: "Developers & Contractors", href: "/developer-services" },
        ],
      },
      { label: "Safety & Compliance", href: "/safety" },
      { label: "Certifications & Insurance", href: "/company/certifications-insurance", badge: "New" },
      { label: "Equipment & Resources", href: "/company/equipment-resources", badge: "New" },
      { label: "Careers", href: "/careers" },
    ],
  },
  resources: {
    label: "Resources",
    dropdown: [
      { label: "FAQ", href: "/faq" },
      { label: "Our Process", href: "/our-process" },
      { label: "Warranties & Guarantees", href: "/resources/warranties" },
      { label: "Financing Options", href: "/resources/financing" },
      { label: "Service Areas", href: "/resources/service-areas" },
      { label: "Blog", href: "/blog" },
      { label: "Contractor Portal", href: "/resources/contractor-portal", badge: "Important" },
    ],
  },
};
