export interface SubItem {
  name: string;
  link: string;
  description?: string;
}

export interface CategoryItem {
  title: string;
  description: string;
  link: string;
  subItems: SubItem[];
}

export interface MegaMenuData {
  [key: string]: CategoryItem[];
}

export const megaMenuData: MegaMenuData = {
  services: [
    {
      title: "Painting Services",
      description: "Professional painting solutions for commercial, residential, and institutional properties.",
      link: "/services",
      subItems: [
        { name: "Commercial Painting", link: "/services/commercial-painting" },
        { name: "Residential Painting", link: "/services/residential-painting" },
        { name: "Condo Painting", link: "/services/condo-painting" },
      ],
    },
    {
      title: "Restoration",
      description: "Expert restoration services to preserve and protect your building's structural integrity.",
      link: "/services",
      subItems: [
        { name: "Masonry & Restoration", link: "/services/masonry" },
        { name: "Stucco & EIFS", link: "/services/stucco-eifs" },
        { name: "Metal Cladding", link: "/services/metal-cladding" },
      ],
    },
    {
      title: "Specialty Services",
      description: "Specialized solutions for complex infrastructure and flooring projects.",
      link: "/services",
      subItems: [
        { name: "Parking Garage Restoration", link: "/services/parking-garage" },
        { name: "Tile & Flooring", link: "/services/tile-flooring" },
      ],
    },
  ],
  about: [
    {
      title: "Company",
      description: "Learn about our commitment to excellence, quality craftsmanship, and sustainable practices.",
      link: "/about",
      subItems: [
        { name: "About Us", link: "/about" },
        { name: "Our Values", link: "/values" },
        { name: "Sustainability", link: "/sustainability" },
        { name: "Safety", link: "/safety" },
      ],
    },
    {
      title: "Resources",
      description: "Explore our project showcase, insights, and industry expertise.",
      link: "/case-studies",
      subItems: [
        { name: "Case Studies", link: "/case-studies" },
        { name: "Blog", link: "/blog" },
        { name: "Our Process", link: "/our-process" },
        { name: "Projects", link: "/projects" },
      ],
    },
    {
      title: "Get Involved",
      description: "Join our team or get in touch to discuss your next project.",
      link: "/careers",
      subItems: [
        { name: "Careers", link: "/careers" },
        { name: "Contact Us", link: "/contact" },
      ],
    },
  ],
};
