import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    summary?: string;
    excerpt?: string;
    published_at?: string;
    date?: string;
    category: string;
    featured_image?: string;
    image?: string;
    author?: string;
  };
}

const BlogCard = ({ post }: BlogCardProps) => {
  const date = post.published_at || post.date || new Date().toISOString();
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const excerpt = post.summary || post.excerpt || '';
  const image = post.featured_image || post.image || '';

  return (
    <Link to={`/blog/${post.slug}`}>
      <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-secondary text-primary">{post.category}</Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
