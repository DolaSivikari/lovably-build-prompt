import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SEOChecklist from "@/components/SEOChecklist";
import { SitemapManager } from "@/components/admin/SitemapManager";

const SEODashboard = () => {
  // Track completed items - in production this would come from a database
  const completedItems = [
    "title-tags",
    "meta-desc",
    "header-tags",
    "canonical",
    "robots-txt",
    "sitemap",
    "mobile",
    "ssl",
    "keywords",
    "content",
    "images",
    "internal-links",
    "url-structure",
    "org-schema",
    "service-schema",
    "faq-schema",
    "geo-tags",
    "og-tags",
    "twitter-cards",
    "faq",
    "blog",
    "case-studies",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="SEO Dashboard - Ascent Group Construction"
        description="Track SEO implementation progress and optimization status"
      />
      <Navigation />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-3">SEO Setup Dashboard</h1>
              <p className="text-lg text-muted-foreground">
                Complete these tasks to maximize your site's visibility in search results and AI responses
              </p>
            </div>

            <SEOChecklist completedItems={completedItems} />

            <div className="mt-12">
              <SitemapManager />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SEODashboard;
