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
          title: "Painting Services",
          description: "Commercial, residential, multi-unit & parking garage solutions",
          subItems: [
            { name: "Painting Services", link: "/services/painting", description: "Complete painting & coating solutions", badge: "popular" },
          ],
        },
        {
          title: "Exterior Systems",
          description: "Complete exterior cladding and building envelope solutions",
          subItems: [
            { name: "Exterior Cladding Systems", link: "/services/exterior-cladding", description: "Siding and metal cladding solutions", badge: "popular" },
            { name: "Building Envelope Systems", link: "/services/building-envelope", description: "Stucco, EIFS & weatherproofing", badge: "popular" },
            { name: "Masonry", link: "/services/masonry", description: "Professional masonry services" },
            { name: "Waterproofing", link: "/services/waterproofing", description: "Complete waterproofing solutions" },
            { name: "Roofing Services", link: "/services/roofing", description: "Professional roofing installation" },
          ],
        },
        {
          title: "Specialty Services",
          description: "Interior buildouts and specialized construction services",
          subItems: [
            { name: "Interior Buildouts & Finishing", link: "/services/interior-buildouts", description: "Complete interior construction", badge: "popular" },
            { name: "Tile & Flooring", link: "/services/tile-flooring", description: "Professional flooring installation" },
            { name: "Windows & Doors", link: "/services/windows-doors", description: "Expert installation services" },
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
            { name: "Homeowners", link: "/homeowners" },
            { name: "Property Managers", link: "/property-managers" },
            { name: "Commercial Clients", link: "/commercial-clients" },
            { name: "Developers & Contractors", link: "/company/developers", badge: "new" },
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
            { name: "Safety & Compliance", link: "/safety" },
            { name: "Sustainability", link: "/sustainability" },
            { name: "Certifications & Insurance", link: "/company/certifications-insurance", badge: "important" },
            { name: "Equipment & Resources", link: "/company/equipment-resources" },
            { name: "Careers", link: "/careers" },
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
