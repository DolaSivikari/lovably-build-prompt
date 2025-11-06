import { LucideIcon } from "lucide-react";

export interface SubItem {
  name: string;
  link: string;
  description?: string;
  badge?: "new" | "popular" | "important";
}

export interface AccordionCategory {
  title: string;
  description?: string;
  subItems: SubItem[];
}

export interface Section {
  sectionTitle: string;
  sectionLink?: string;
  categories: AccordionCategory[];
}

export interface MegaMenuDataEnhanced {
  [key: string]: Section[];
}

export const megaMenuDataEnhanced: MegaMenuDataEnhanced = {
  services: [
    {
      sectionTitle: "Primary Services",
      sectionLink: "/services",
      categories: [
        {
          title: "General Contracting & Construction Management",
          description: "Full project delivery from permits to turnkey",
          subItems: [
            {
              name: "General Contracting",
              link: "/services/general-contracting",
              description: "Full project delivery from permits to turnkey",
              badge: "popular",
            },
            {
              name: "Construction Management",
              link: "/services/construction-management",
              description: "Professional CM services for complex projects",
            },
            {
              name: "Design-Build Services",
              link: "/services/design-build",
              description: "Integrated project delivery",
            },
          ],
        },
        {
          title: "Self-Perform Trades",
          description: "Comprehensive building envelope and specialty trades",
          subItems: [
            {
              name: "Building Envelope Solutions",
              link: "/services/building-envelope",
              description: "Comprehensive envelope systems",
              badge: "popular",
            },
            {
              name: "Exterior Envelope Systems",
              link: "/services/exterior-envelope",
              description: "Complete building envelope solutions",
            },
            {
              name: "Exterior Cladding",
              link: "/services/exterior-cladding",
              description: "Metal cladding and masonry systems",
            },
            {
              name: "Interior Buildouts",
              link: "/services/interior-buildouts",
              description: "Commercial interior construction",
            },
          ],
        },
        {
          title: "Specialty Services",
          description: "Advanced construction solutions",
          subItems: [
            {
              name: "Parking Garage Restoration",
              link: "/services/parking-rehabilitation",
              description: "Complete garage restoration",
            },
            {
              name: "Waterproofing Systems",
              link: "/services/waterproofing",
              description: "Building envelope protection",
            },
            {
              name: "Masonry & Structural",
              link: "/services/masonry-restoration",
              description: "Structural masonry and repair",
            },
            {
              name: "EIFS & Stucco",
              link: "/services/eifs-stucco",
              description: "Exterior insulation systems",
            },
            {
              name: "Metal Cladding",
              link: "/services/metal-cladding",
              description: "Metal panel systems",
            },
          ],
        },
      ],
    },
  ],
  markets: [
    {
      sectionTitle: "Markets We Serve",
      sectionLink: "/markets",
      categories: [
        {
          title: "By Sector",
          description: "Specialized construction solutions by industry",
          subItems: [
            {
              name: "Multi-Family Residential",
              link: "/markets/multi-family",
              description: "Condos, apartments, student housing",
            },
            {
              name: "Commercial Construction",
              link: "/markets/commercial",
              description: "Office buildings, retail, mixed-use",
            },
            {
              name: "Institutional",
              link: "/markets/institutional",
              description: "Schools, hospitals, government",
            },
            {
              name: "Industrial",
              link: "/markets/industrial",
              description: "Warehouses, manufacturing facilities",
            },
            {
              name: "Healthcare Facilities",
              link: "/markets/healthcare",
              description: "Hospitals and medical centers",
              badge: "new",
            },
            {
              name: "Education",
              link: "/markets/education",
              description: "K-12 schools and universities",
              badge: "new",
            },
            {
              name: "Retail",
              link: "/markets/retail",
              description: "Shopping centers and stores",
            },
            {
              name: "Hospitality",
              link: "/markets/hospitality",
              description: "Hotels and resorts",
            },
          ],
        },
        {
          title: "Client Solutions",
          description: "Tailored services for different client types",
          subItems: [
            {
              name: "For Developers",
              link: "/company/developers",
              description: "New construction and repositioning",
              badge: "popular",
            },
            {
              name: "For Property Managers",
              link: "/property-managers",
              description: "Building maintenance and capital projects",
            },
            {
              name: "For Commercial Clients",
              link: "/commercial-clients",
              description: "Tenant improvements and renovations",
            },
            {
              name: "Multi-Family",
              link: "/markets/multi-family",
              description: "Multi-family construction solutions",
            },
          ],
        },
      ],
    },
  ],
  projects: [
    {
      sectionTitle: "Projects",
      sectionLink: "/projects",
      categories: [
        {
          title: "Browse by Type",
          subItems: [
            { name: "All Projects", link: "/projects" },
            {
              name: "Residential Projects",
              link: "/projects?client_type=homeowner",
            },
            {
              name: "Commercial Projects",
              link: "/projects?client_type=commercial",
            },
            {
              name: "Multi-Unit Projects",
              link: "/projects?client_type=developer",
              badge: "popular",
            },
            { name: "Blog & Case Studies", link: "/blog" },
          ],
        },
      ],
    },
  ],
  company: [
    {
      sectionTitle: "About Ascent Group",
      sectionLink: "/about",
      categories: [
        {
          title: "Our Company",
          subItems: [
            {
              name: "About Us",
              link: "/about",
              description: "Our story and values",
            },
            {
              name: "Leadership Team",
              link: "/company/team",
              description: "Meet our experienced team",
              badge: "new",
            },
            {
              name: "Our Process",
              link: "/our-process",
              description: "How we deliver projects",
            },
            { name: "Values", link: "/values", description: "What drives us" },
          ],
        },
        {
          title: "Credentials & Compliance",
          subItems: [
            {
              name: "Pre-Qualification Package",
              link: "/prequalification",
              description: "Download contractor qualifications",
              badge: "important",
            },
            {
              name: "Capabilities Overview",
              link: "/capabilities",
              description: "Project delivery methods",
              badge: "new",
            },
            {
              name: "Safety & Compliance",
              link: "/safety",
              description: "Safety programs and statistics",
            },
            {
              name: "Certifications & Insurance",
              link: "/company/certifications-insurance",
              description: "Licenses and coverage",
            },
          ],
        },
        {
          title: "Resources",
          subItems: [
            {
              name: "Equipment & Resources",
              link: "/company/equipment-resources",
              description: "Our self-perform capabilities",
            },
            {
              name: "For Developers",
              link: "/company/developers",
              description: "Partnership opportunities",
            },
            {
              name: "Sustainability",
              link: "/sustainability",
              description: "Environmental commitment",
            },
            { name: "Careers", link: "/careers", description: "Join our team" },
          ],
        },
      ],
    },
  ],
  resources: [
    {
      sectionTitle: "Support & Resources",
      categories: [
        {
          title: "Resources",
          subItems: [
            {
              name: "FAQ",
              link: "/faq",
              description: "Frequently asked questions",
            },
            {
              name: "Service Areas",
              link: "/resources/service-areas",
              description: "Where we work",
            },
            {
              name: "Warranties & Guarantees",
              link: "/resources/warranties",
              description: "Project warranties",
              badge: "new",
            },
            {
              name: "Financing Options",
              link: "/resources/financing",
              description: "Flexible payment solutions",
              badge: "new",
            },
            {
              name: "Blog & Insights",
              link: "/blog",
              description: "Industry knowledge",
            },
          ],
        },
        {
          title: "For Professionals",
          subItems: [
            {
              name: "Contractor Portal",
              link: "/resources/contractor-portal",
              description: "Trade partner resources",
              badge: "important",
            },
            {
              name: "Submit RFP",
              link: "/submit-rfp",
              description: "Request for proposal",
            },
            {
              name: "Request Proposal",
              link: "/estimate",
              description: "Get detailed estimate",
            },
          ],
        },
      ],
    },
  ],
};
