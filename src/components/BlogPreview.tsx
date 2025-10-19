import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import blogData from "@/data/blog-posts-complete.json";
import OptimizedImage from "./OptimizedImage";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";

const BlogPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const featuredPosts = blogData.posts.filter(post => post.featured).slice(0, 3);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-primary mb-4">Latest Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert tips, industry knowledge, and project inspiration from our team
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {featuredPosts.map((post, index) => {
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={post.image}
                      alt={`${post.title} - Expert guide on ${post.category.toLowerCase()}`}
                      width={800}
                      height={600}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      objectFit="cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-secondary text-primary">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{formattedDate}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">
              View All Articles <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
