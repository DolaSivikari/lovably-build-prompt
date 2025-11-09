import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InsightsFeed from "@/components/insights/InsightsFeed";
import SEO from "@/components/SEO";
import SkipLink from "@/components/SkipLink";

const Insights = () => {
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <SEO
        title="Industry Insights & Construction Trends | Ascent Group"
        description="Expert perspectives on construction industry trends, innovations, project management best practices, and building sector insights from Ascent Group Construction."
        canonical="/insights"
      />
      
      <Navigation />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-primary/5 to-background border-b">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Industry Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with expert analysis, project updates, and construction industry trends from our team of professionals.
            </p>
          </div>
        </section>

        {/* Insights Feed */}
        <InsightsFeed 
          limit={24}
          showFilters={true}
          showPinnedFirst={true}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Insights;
