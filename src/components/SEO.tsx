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

  // Enhanced organization schema with more details
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteUrl}/#organization`,
    name: "Ascent Group Construction",
    alternateName: "Ascent Group",
    description: description,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
      width: "250",
      height: "60"
    },
    image: `${siteUrl}/og-image.jpg`,
    telephone: "+1-416-555-7246",
    email: "info@ascentgroupconstruction.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Industrial Parkway",
      addressLocality: "Mississauga",
      addressRegion: "ON",
      postalCode: "L5T 1A1",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "43.6532",
      longitude: "-79.3832"
    },
    areaServed: [
      {
        "@type": "City",
        name: "Toronto",
      },
      {
        "@type": "City",
        name: "Mississauga",
      },
      {
        "@type": "City",
        name: "Brampton",
      },
      {
        "@type": "State",
        name: "Ontario",
      }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-416-555-7246",
      contactType: "customer service",
      email: "info@ascentgroupconstruction.com",
      availableLanguage: ["English"],
      contactOption: "TollFree",
      areaServed: "CA"
    },
    sameAs: [
      "https://www.linkedin.com/company/ascentgroup",
      "https://www.facebook.com/ascentgroup",
      "https://twitter.com/ascentgroup",
    ],
    priceRange: "$$-$$$",
    foundingDate: "2009",
    slogan: "Quality craftsmanship and exceptional results",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Painting"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Painting"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Stucco & EIFS"
          }
        }
      ]
    }
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
