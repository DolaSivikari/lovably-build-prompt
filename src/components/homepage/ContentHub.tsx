import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, TrendingUp, BookOpen } from "lucide-react";
import OptimizedImage from "../OptimizedImage";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { resolveAssetPath } from "@/utils/assetResolver";

const categories = ["All", "Painting", "Exterior Systems", "Restoration", "Tips & Guides"];

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  featured_image: string;
  published_at: string;
}

const ContentHub = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, slug, title, summary, category, featured_image, published_at')
        .eq('publish_state', 'published')
        .order('published_at', { ascending: false })
        .limit(4);
      
      if (data) {
        setPosts(data);
      }
      setLoading(false);
    };
    
    loadPosts();
  }, []);

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1, 4);

  const filteredPosts = activeCategory === "All" 
    ? regularPosts 
    : regularPosts.filter(post => 
        post.category.toLowerCase().includes(activeCategory.toLowerCase())
      );

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Construction Intelligence
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expert Insights & Project Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry knowledge, practical tips, and inspiration from our team of construction professionals
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Hero Post */}
        {featuredPost && (
          <Link to={`/blog/${featuredPost.slug}`} className="block mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-2 hover:border-primary">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-72 md:h-auto overflow-hidden">
                    <OptimizedImage
                      src={resolveAssetPath(featuredPost.featured_image) || featuredPost.featured_image}
                      alt={featuredPost.title}
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-6 left-6 z-10">
                      <Badge className="bg-secondary text-primary text-sm px-4 py-1">
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge variant="outline" className="w-fit mb-4">
                      {featuredPost.category}
                    </Badge>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3 text-base">
                      {featuredPost.summary}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(featuredPost.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                      Read Full Article
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </Link>
        )}

        {/* Regular Post Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post, index) => {
            const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group border hover:border-primary">
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={resolveAssetPath(post.featured_image) || post.featured_image}
                        alt={`${post.title} - ${post.category}`}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-secondary/90 text-primary backdrop-blur-sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar className="w-3 h-3" />
                        <span>{formattedDate}</span>
                        <span className="mx-1">•</span>
                        <Clock className="w-3 h-3" />
                        <span>5 min</span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {post.summary}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                        Read More
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/blog">
                <BookOpen className="h-5 w-5" />
                View All Articles
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/case-studies">
                <TrendingUp className="h-5 w-5" />
                View Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHub;
