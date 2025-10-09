import { LucideIcon } from "lucide-react";

export interface SubItem {
  name: string;
  link: string;
  description?: string;
}

export interface AccordionCategory {
  title: string;
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
          subItems: [
            { name: "Commercial Painting", link: "/services/commercial" },
            { name: "Residential Painting", link: "/services/painting" },
            { name: "Condo Painting", link: "/services/condo" },
            { name: "Popcorn Ceiling Removal", link: "/services/popcorn-ceiling" },
          ],
        },
        {
          title: "Exterior Systems",
          subItems: [
            { name: "Stucco & EIFS", link: "/services/stucco" },
            { name: "Metal Cladding", link: "/services/metal-cladding" },
            { name: "Masonry & Restoration", link: "/services/masonry" },
            { name: "Sealants & Caulking", link: "/services/sealants" },
          ],
        },
        {
          title: "Specialty Services",
          subItems: [
            { name: "Parking Garage Restoration", link: "/services/parking-garage" },
            { name: "Tile & Flooring", link: "/services/tile-flooring" },
            { name: "Suite Buildouts", link: "/services/suite-buildouts" },
          ],
        },
      ],
    },
  ],
  whoWeServe: [
    {
      sectionTitle: "Who We Serve",
      categories: [
        {
          title: "Homeowners",
          subItems: [
            { name: "View Residential Solutions", link: "/homeowners" },
          ],
        },
        {
          title: "Property Managers",
          subItems: [
            { name: "View Property Management Solutions", link: "/property-managers" },
          ],
        },
        {
          title: "Commercial Clients",
          subItems: [
            { name: "View Commercial Solutions", link: "/commercial-clients" },
          ],
        },
      ],
    },
  ],
  blog: [
    {
      sectionTitle: "Articles & Insights",
      sectionLink: "/blog",
      categories: [
        {
          title: "Articles & Insights",
          subItems: [
            { name: "Blog & Resources", link: "/blog" },
            { name: "View All Articles", link: "/blog" },
            { name: "Case Studies", link: "/case-studies" },
          ],
        },
      ],
    },
    {
      sectionTitle: "Company",
      categories: [
        {
          title: "About Us",
          subItems: [
            { name: "Our Process", link: "/how-we-work" },
            { name: "Our Values", link: "/values" },
            { name: "Safety", link: "/safety" },
            { name: "Sustainability", link: "/sustainability" },
          ],
        },
      ],
    },
  ],
};
