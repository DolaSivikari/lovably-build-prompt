export interface NavItem {
  name: string;
  link: string;
  description?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigationStructure = {
  services: [
    {
      title: "By Client Type",
      items: [
        { name: "Residential", link: "/services/residential", description: "Homeowners & small properties" },
        { name: "Commercial", link: "/services/commercial", description: "Offices, retail & hospitality" },
        { name: "Multi-Unit", link: "/services/multi-unit", description: "Condos & apartment buildings" },
        { name: "Industrial", link: "/services/industrial", description: "Warehouses & facilities" },
      ]
    },
    {
      title: "Quick Links",
      items: [
        { name: "View All Services", link: "/services" },
        { name: "Request Quote", link: "/estimate" },
      ]
    }
  ],
  projects: [
    {
      title: "Browse Projects",
      items: [
        { name: "All Projects", link: "/projects" },
        { name: "Residential Projects", link: "/projects?category=Residential" },
        { name: "Commercial Projects", link: "/projects?category=Commercial" },
        { name: "Multi-Unit Projects", link: "/projects?category=Multi-Unit" },
        { name: "Case Studies", link: "/case-studies" },
      ]
    }
  ],
  company: [
    {
      title: "About Us",
      items: [
        { name: "Our Story", link: "/about" },
        { name: "Our Team", link: "/company/our-team" },
        { name: "Safety & Compliance", link: "/safety" },
        { name: "Certifications & Insurance", link: "/company/certifications-insurance" },
        { name: "Equipment & Resources", link: "/company/equipment-resources" },
      ]
    },
    {
      title: "Who We Serve",
      items: [
        { name: "Homeowners", link: "/homeowners" },
        { name: "Property Managers", link: "/property-managers" },
        { name: "Commercial Clients", link: "/commercial-clients" },
      ]
    },
    {
      title: "Careers",
      items: [
        { name: "Join Our Team", link: "/careers" },
      ]
    }
  ],
  resources: [
    {
      title: "For Clients",
      items: [
        { name: "FAQ", link: "/faq" },
        { name: "Our Process", link: "/our-process" },
        { name: "Warranties & Guarantees", link: "/resources/warranties" },
        { name: "Financing Options", link: "/resources/financing" },
        { name: "Service Areas", link: "/resources/service-areas" },
      ]
    },
    {
      title: "Resources",
      items: [
        { name: "Blog & News", link: "/blog" },
        { name: "Case Studies", link: "/case-studies" },
      ]
    },
    {
      title: "For Contractors",
      items: [
        { name: "Contractor Portal", link: "/resources/contractor-portal", description: "RFP documents & certifications" },
      ]
    }
  ]
};