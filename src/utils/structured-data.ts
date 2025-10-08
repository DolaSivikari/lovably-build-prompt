interface OrganizationSchemaOptions {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
}

export const organizationSchema = (options?: OrganizationSchemaOptions) => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: options?.name || "Ascen Group Construction",
    description: options?.description || "Professional construction management services in Ontario. Specializing in commercial, industrial, and institutional projects with LEED certification support.",
    url: options?.url || siteUrl,
    logo: options?.logo || `${siteUrl}/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: {
      "@type": "State",
      name: "Ontario",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-416-555-7246",
      contactType: "customer service",
      email: "info@ascengroup.ca",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://www.linkedin.com/company/ascengroup",
      "https://www.facebook.com/ascengroup",
      "https://twitter.com/ascengroup",
    ],
    priceRange: "$$$$",
  };
};

interface ServiceSchemaOptions {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  url?: string;
}

export const serviceSchema = (options: ServiceSchemaOptions) => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    provider: {
      "@type": "Organization",
      name: options.provider || "Ascen Group Construction",
      url: siteUrl,
    },
    areaServed: {
      "@type": "State",
      name: options.areaServed || "Ontario",
    },
    url: options.url || siteUrl,
  };
};

interface ArticleSchemaOptions {
  title: string;
  description: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url?: string;
}

export const articleSchema = (options: ArticleSchemaOptions) => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    author: {
      "@type": "Organization",
      name: options.author || "Ascen Group Construction",
    },
    publisher: {
      "@type": "Organization",
      name: "Ascen Group Construction",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    image: options.image || `${siteUrl}/og-image.jpg`,
    url: options.url || (typeof window !== "undefined" ? window.location.href : ""),
  };
};

interface FAQItem {
  question: string;
  answer: string;
}

export const faqSchema = (faqs: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

interface BreadcrumbItem {
  name: string;
  url: string;
}

export const breadcrumbSchema = (items: BreadcrumbItem[]) => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
};

interface ProjectSchemaOptions {
  name: string;
  description: string;
  category: string;
  location: string;
  startDate?: string;
  endDate?: string;
  image?: string;
}

export const projectSchema = (options: ProjectSchemaOptions) => {
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    name: options.name,
    description: options.description,
    category: options.category,
    location: {
      "@type": "Place",
      name: options.location,
    },
    startDate: options.startDate,
    endDate: options.endDate,
    image: options.image,
  };
};
