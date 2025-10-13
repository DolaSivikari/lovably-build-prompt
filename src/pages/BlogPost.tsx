import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ShareMenu from "@/components/blog/ShareMenu";
import ReadingProgress from "@/components/blog/ReadingProgress";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import blogData from "@/data/blog-posts-complete.json";
import OptimizedImage from "@/components/OptimizedImage";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/utils/structured-data";
import { blogFAQs } from "@/data/blog-faq-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sanitizeHTML } from "@/utils/sanitize";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogData.posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Convert markdown-like content to HTML (simple version)
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, idx) => {
        if (paragraph.startsWith('# ')) {
          return `<h1 key="${idx}" class="text-4xl font-bold mb-6 text-primary">${paragraph.slice(2)}</h1>`;
        } else if (paragraph.startsWith('## ')) {
          return `<h2 key="${idx}" class="text-3xl font-bold mb-4 mt-8 text-primary">${paragraph.slice(3)}</h2>`;
        } else if (paragraph.startsWith('### ')) {
          return `<h3 key="${idx}" class="text-2xl font-bold mb-3 mt-6">${paragraph.slice(4)}</h3>`;
        } else if (paragraph.startsWith('- **')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- **'));
          const listHtml = items.map(item => {
            const match = item.match(/- \*\*(.+?):\*\* (.+)/);
            if (match) {
              return `<li class="mb-2"><strong class="text-primary">${match[1]}:</strong> ${match[2]}</li>`;
            }
            return `<li class="mb-2">${item.slice(2)}</li>`;
          }).join('');
          return `<ul key="${idx}" class="list-none space-y-2 mb-4">${listHtml}</ul>`;
        } else if (paragraph.startsWith('- [ ]')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- [ ]'));
          const checklistHtml = items.map(item => 
            `<li class="flex items-start gap-2 mb-2">
              <input type="checkbox" class="mt-1 rounded" />
              <span>${item.slice(6)}</span>
            </li>`
          ).join('');
          return `<ul key="${idx}" class="space-y-2 mb-4">${checklistHtml}</ul>`;
        } else if (paragraph.startsWith('**')) {
          return `<p key="${idx}" class="text-lg font-semibold mb-4">${paragraph.replace(/\*\*/g, '')}</p>`;
        } else {
          return `<p key="${idx}" class="text-foreground/90 leading-relaxed mb-4">${paragraph}</p>`;
        }
      })
      .join('');
  };

  // Improved related articles logic: same category, then by date
  const relatedPosts = blogData.posts
    .filter(p => p.id !== post.id && p.category === post.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  // If not enough same-category posts, add recent posts from other categories
  if (relatedPosts.length < 3) {
    const otherPosts = blogData.posts
      .filter(p => p.id !== post.id && p.category !== post.category)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...otherPosts);
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Get FAQs for this blog post
  const faqs = blogFAQs[post.slug] || [];
  const schemas: any[] = [
    articleSchema({
      title: post.title,
      description: post.excerpt,
      author: post.author,
      datePublished: post.date,
      image: post.image,
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.category, url: `/blog?category=${encodeURIComponent(post.category)}` },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
  ];
  
  if (faqs.length > 0) {
    schemas.push(faqSchema(faqs));
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={`${post.category}, ${post.tags.join(', ')}`}
        structuredData={schemas}
      />
      <ReadingProgress />
      <Navigation />
      
      <main>
        {/* Hero Section with Full-Bleed Image */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <OptimizedImage
              src={post.image}
              alt={`${post.title} - Comprehensive guide on ${post.category.toLowerCase()}`}
              priority={true}
              width={1920}
              height={1080}
              className="w-full h-full"
              objectFit="cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
          
          <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-12">
            <div className="max-w-4xl">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: post.category, href: `/blog?category=${encodeURIComponent(post.category)}` },
                  { label: post.title },
                ]}
              />
              
              <Badge className="mb-4 bg-secondary text-primary">{post.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(formatContent(post.content)) }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Share this article</h3>
                <ShareMenu />
              </div>
            </div>

            {/* FAQ Section */}
            {faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {/* CTA */}
            <div className="mt-12 p-8 bg-muted rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Need Professional Help?</h3>
              <p className="text-muted-foreground mb-6">
                Our team is ready to bring your project to life with expert craftsmanship and attention to detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/estimate">
                  <Button size="lg" className="btn-hero">
                    Get Free Estimate
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-muted py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedPosts.map((relatedPost) => {
                  const relatedDate = new Date(relatedPost.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                  
                  return (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video overflow-hidden">
                          <OptimizedImage
                            src={relatedPost.image}
                            alt={`${relatedPost.title} - Related article on ${relatedPost.category.toLowerCase()}`}
                            width={600}
                            height={400}
                            className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                            objectFit="cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-6">
                          <Badge variant="outline" className="mb-2">{relatedPost.category}</Badge>
                          <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{relatedDate}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
