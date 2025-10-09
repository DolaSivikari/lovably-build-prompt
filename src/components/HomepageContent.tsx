import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HomepageContent = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          Ascent Group Construction — Professional Painting & Exterior Finishing Across Ontario
        </h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
          <p>
            Ascent Group Construction delivers professional painting and exterior finishing services across Ontario. 
            With 15+ years of hands-on experience, we specialize in commercial painting, residential painting, condo 
            restoration, stucco & EIFS, masonry repair, metal cladding, and parking garage restoration — blending 
            quality craftsmanship with reliable project management.
          </p>
          
          <p>
            From initial consultation through project completion, our team focuses on premium materials, transparent 
            communication, and on-time delivery. We coordinate all aspects of your painting and finishing projects to 
            ensure budgets and schedules are respected while maintaining high standards of safety and workmanship. 
            Every project includes comprehensive warranties and detailed documentation.
          </p>
          
          <p>
            Explore our portfolio to see completed projects across the GTA that showcase attention to detail, durable 
            finishes, and modern techniques. Whether you're planning commercial building restoration, condo painting, 
            residential interior/exterior work, or specialized services like EIFS installation, Ascent delivers 
            practical solutions and quality results that stand the test of time.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-8 not-prose">
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              View Our Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
            >
              Our Services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-semibold"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageContent;
