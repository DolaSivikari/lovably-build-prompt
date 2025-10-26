import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BlogCard from "@/components/blog/BlogCard";
import NewsletterSection from "@/components/blog/NewsletterSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  featured_image: string;
  published_at: string;
  author_id: string | null;
}

const Blog = () => {
  const [filter, setFilter] = useState<string>("all");
  const [visiblePosts, setVisiblePosts] = React.useState(6);
  const [animatedCards, setAnimatedCards] = React.useState<Set<number>>(new Set());
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadPosts = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, slug, title, summary, category, featured_image, published_at, author_id')
        .eq('publish_state', 'published')
        .order('published_at', { ascending: false });
      
      if (data) {
        setPosts(data);
      }
      setLoading(false);
    };
    
    loadPosts();
  }, []);

  const categories = ["all", ...Array.from(new Set(posts.map(p => p.category)))];
  
  const filteredPosts = filter === "all" 
    ? posts 
    : posts.filter(p => p.category === filter);

  // Limit featured posts to top 3
  const featuredPosts = posts.slice(0, 3);

  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 6, filteredPosts.length));
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setAnimatedCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('.blog-card-animate').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredPosts]);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Blog & Resources"
        description="Expert insights on painting, stucco, EIFS, and construction best practices. Tips, guides, and industry knowledge from Ascent Group Construction."
        keywords="construction blog, painting tips, stucco guides, EIFS maintenance, property management, construction industry news"
      />
      <Navigation />
      
      {loading ? (
        <div className="container mx-auto px-4 py-20 text-center">Loading...</div>
      ) : (
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block mb-3 px-4 py-1.5 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full">
              <span className="text-secondary font-semibold text-sm tracking-wider uppercase">Industry Insights</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Blog & Resources
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90 mb-8">
              Stay informed with expert guidance on construction, painting, and property maintenance from the professionals at Ascen Group.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#newsletter">
                <Button size="lg" variant="secondary" className="hover:scale-105 transition-all">
                  Subscribe to Newsletter
                </Button>
              </a>
              <Link to="/case-studies">
                <Button size="lg" variant="outline">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="container mx-auto px-4 py-20 border-b">
            <h2 className="text-3xl font-heading font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="blog-card-animate transition-all duration-600 opacity-100"
                  data-index={index}
                >
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Posts with Filter */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-heading font-bold mb-8">All Articles</h2>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
            <TabsList className="mb-12 flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category === "all" ? "All Posts" : category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={filter} className="mt-0">
              {filteredPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                      <div
                        key={post.id}
                        className={`blog-card-animate transition-all duration-600 ${
                          animatedCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        data-index={index}
                        style={{ transitionDelay: `${(index % 6) * 100}ms` }}
                      >
                        <BlogCard post={post} />
                      </div>
                    ))}
                  </div>
                  
                  {visiblePosts < filteredPosts.length && (
                    <div className="text-center mt-12">
                      <Button
                        onClick={loadMore}
                        size="lg"
                        variant="outline"
                        className="hover:bg-secondary hover:text-primary hover:border-secondary transition-all"
                      >
                        Load More Articles
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found in this category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Newsletter Signup */}
        <NewsletterSection />
      </main>
      )}
      
      <Footer />
    </div>
  );
};

export default Blog;
