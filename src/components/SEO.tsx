import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: object | object[];
}

const SEO = ({
  title = "Ascen Group Construction | Commercial & Institutional Building Ontario",
  description = "Professional painting and exterior finishing services in the GTA. Specializing in residential, commercial painting, stucco, and EIFS with comprehensive warranties. 15+ years experience.",
  keywords = "construction management ontario, commercial construction toronto, industrial building, institutional construction, LEED certification, design-build, BIM services, general contractor ontario",
  ogImage = "/og-image.jpg",
  canonical,
  structuredData,
}: SEOProps) => {
  const fullTitle = title.includes("Ascen") ? title : `${title} | Ascen Group Construction`;
  const siteUrl = window.location.origin;
  const currentUrl = canonical || window.location.href;

  // Default organization schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "Ascen Group Construction",
    description: description,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
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

  // Combine schemas if custom structured data is provided
  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? [defaultSchema, ...structuredData]
      : [defaultSchema, structuredData]
    : [defaultSchema];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
