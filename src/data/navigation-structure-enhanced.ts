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
      sectionTitle: "Our Services",
      sectionLink: "/services",
      categories: [
        {
          title: "General Contracting",
          description: "Full-service project management and construction oversight",
          subItems: [
            { name: "General Contracting", link: "/services/general-contracting", description: "Complete project delivery", badge: "new" },
            { name: "Construction Management", link: "/services/construction-management", description: "Expert oversight & coordination", badge: "new" },
            { name: "Design-Build Services", link: "/services/design-build", description: "Integrated project delivery", badge: "new" },
          ],
        },
        {
          title: "Self-Perform Trades",
          description: "In-house specialty construction services",
          subItems: [
            { name: "Painting Services", link: "/services/painting", description: "Commercial & multi-unit painting", badge: "popular" },
            { name: "Exterior Envelope Systems", link: "/services/exterior-envelope", description: "Stucco, EIFS & weatherproofing", badge: "popular" },
            { name: "Exterior Cladding Systems", link: "/services/exterior-cladding", description: "Metal cladding & siding", badge: "popular" },
            { name: "Interior Buildouts & Finishing", link: "/services/interior-buildouts", description: "Complete interior construction" },
          ],
        },
        {
          title: "Specialty Services",
          description: "Additional construction capabilities",
          subItems: [
            { name: "Masonry", link: "/services/masonry", description: "Repair & restoration" },
            { name: "Waterproofing", link: "/services/waterproofing", description: "Complete waterproofing" },
            { name: "Roofing Services", link: "/services/roofing", description: "Professional roofing" },
            { name: "Tile & Flooring", link: "/services/tile-flooring", description: "Flooring installation" },
            { name: "Windows & Doors", link: "/services/windows-doors", description: "Installation services" },
            { name: "Sustainable Building", link: "/services/sustainable-construction", description: "Eco-friendly construction" },
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
            { name: "Residential Projects", link: "/projects?client_type=homeowner" },
            { name: "Commercial Projects", link: "/projects?client_type=commercial" },
            { name: "Multi-Unit Projects", link: "/projects?client_type=developer", badge: "popular" },
            { name: "Blog & Case Studies", link: "/blog" },
          ],
        },
      ],
    },
  ],
  company: [
    {
      sectionTitle: "About",
      categories: [
        {
          title: "Company",
          subItems: [
            { name: "About Us", link: "/about" },
            { name: "Our Team", link: "/company/team", badge: "new" },
            { name: "Our Process", link: "/our-process" },
            { name: "Capabilities", link: "/capabilities", badge: "new" },
          ],
        },
      ],
    },
    {
      sectionTitle: "Who We Serve",
      categories: [
        {
          title: "Client Types",
          subItems: [
            { name: "Developers & Contractors", link: "/company/developers", badge: "important" },
            { name: "Property Managers", link: "/property-managers" },
            { name: "Commercial Clients", link: "/commercial-clients" },
            { name: "Homeowners", link: "/homeowners" },
          ],
        },
      ],
    },
    {
      sectionTitle: "Credentials",
      categories: [
        {
          title: "Excellence",
          subItems: [
            { name: "Pre-Qualification Package", link: "/prequalification", badge: "important" },
            { name: "Safety & Compliance", link: "/safety", badge: "new" },
            { name: "Certifications & Insurance", link: "/company/certifications-insurance" },
            { name: "Equipment & Resources", link: "/company/equipment-resources" },
            { name: "Sustainability", link: "/sustainability" },
            { name: "Careers", link: "/careers" },
          ],
        },
      ],
    },
  ],
  markets: [
    {
      sectionTitle: "Markets We Serve",
      categories: [
        {
          title: "Industry Sectors",
          subItems: [
            { name: "Multi-Family Residential", link: "/markets/multi-family-residential", description: "Condos, apartments & multi-unit", badge: "popular" },
            { name: "Commercial Construction", link: "/markets/commercial-construction", description: "Office, retail & mixed-use", badge: "popular" },
            { name: "Institutional Projects", link: "/markets/institutional", description: "Schools, healthcare & civic" },
            { name: "Industrial Facilities", link: "/markets/industrial", description: "Warehouses & manufacturing" },
          ],
        },
      ],
    },
  ],
  resources: [
    {
      sectionTitle: "Support",
      categories: [
        {
          title: "Resources",
          subItems: [
            { name: "FAQ", link: "/faq" },
            { name: "Warranties & Guarantees", link: "/resources/warranties", badge: "new" },
            { name: "Financing Options", link: "/resources/financing", badge: "new" },
            { name: "Service Areas", link: "/resources/service-areas" },
            { name: "Blog", link: "/blog" },
          ],
        },
      ],
    },
    {
      sectionTitle: "B2B Resources",
      categories: [
        {
          title: "For Professionals",
          subItems: [
            { name: "Contractor Portal", link: "/resources/contractor-portal", badge: "important" },
            { name: "Get an Estimate", link: "/estimate", badge: "new" },
          ],
        },
      ],
    },
  ],
};
