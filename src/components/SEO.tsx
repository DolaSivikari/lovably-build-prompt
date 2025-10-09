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
  title = "Ascent Group Construction | Professional Painting & Exterior Finishing Ontario",
  description = "Expert painting and exterior finishing services across Ontario. Specializing in commercial, residential, condo painting, stucco, EIFS, and masonry. 15+ years experience, fully insured.",
  keywords = "painting contractor ontario, commercial painting toronto, residential painting, condo painting GTA, stucco EIFS, masonry restoration, parking garage restoration, metal cladding, exterior finishing, painting services ontario",
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
    telephone: "+1-416-555-1234",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
      width: "250",
      height: "60"
    },
    image: `${siteUrl}/og-image.jpg`,
    email: "info@ascentgroupconstruction.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Greater Toronto Area",
      addressLocality: "Toronto",
      addressRegion: "ON",
      postalCode: "",
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
        "@id": "https://en.wikipedia.org/wiki/Toronto"
      },
      {
        "@type": "City",
        name: "Mississauga",
        "@id": "https://en.wikipedia.org/wiki/Mississauga"
      },
      {
        "@type": "City",
        name: "Brampton",
        "@id": "https://en.wikipedia.org/wiki/Brampton"
      },
      {
        "@type": "City",
        name: "Vaughan",
        "@id": "https://en.wikipedia.org/wiki/Vaughan"
      },
      {
        "@type": "State",
        name: "Ontario",
        "@id": "https://en.wikipedia.org/wiki/Ontario"
      }
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00"
      }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@ascentgroupconstruction.com",
      availableLanguage: ["English"],
      areaServed: "CA"
    },
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
