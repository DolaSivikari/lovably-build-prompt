import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

const SEO = ({
  title = "Ascen Group Construction | Commercial & Institutional Building Ontario",
  description = "Professional construction management services in Ontario. Specializing in commercial, industrial, and institutional projects with LEED certification support. 25+ years experience.",
  keywords = "construction management ontario, commercial construction toronto, industrial building, institutional construction, LEED certification, design-build, BIM services, general contractor ontario",
  ogImage = "/og-image.jpg",
  canonical,
}: SEOProps) => {
  const fullTitle = title.includes("Ascen") ? title : `${title} | Ascen Group Construction`;
  const siteUrl = window.location.origin;
  const currentUrl = canonical || window.location.href;

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
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GeneralContractor",
          "name": "Ascen Group Construction",
          "description": description,
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Toronto",
            "addressRegion": "ON",
            "addressCountry": "CA"
          },
          "areaServed": {
            "@type": "State",
            "name": "Ontario"
          },
          "priceRange": "$$$$"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
