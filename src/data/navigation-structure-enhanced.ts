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
          description: "Professional interior and exterior painting for all property types",
          subItems: [
            { name: "Commercial Painting", link: "/services/commercial-painting", description: "High-quality commercial painting services" },
            { name: "Residential Painting", link: "/services/residential-painting", description: "Expert residential painting solutions" },
            { name: "Condo & Multi-Unit Painting", link: "/services/condo-multi-unit", description: "Specialized condo painting services" },
          ],
        },
        {
          title: "Exterior Systems",
          description: "Comprehensive building envelope solutions and restoration",
          subItems: [
            { name: "Stucco & EIFS", link: "/services/stucco-eifs", description: "Expert stucco application and repair" },
            { name: "Metal Cladding", link: "/services/metal-cladding", description: "Durable metal cladding installation" },
            { name: "Masonry", link: "/services/masonry", description: "Professional masonry services" },
            { name: "Sealants & Caulking", link: "/services/sealants", description: "Weather-resistant sealing solutions" },
          ],
        },
        {
          title: "Specialty Services",
          description: "Specialized construction and restoration services",
          subItems: [
            { name: "Parking Garage Coating", link: "/services/parking-garage", description: "Complete parking structure restoration" },
            { name: "Tile & Flooring", link: "/services/tile-flooring", description: "Professional flooring installation" },
            { name: "Suite Buildouts", link: "/services/suite-buildouts", description: "Custom suite construction" },
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
