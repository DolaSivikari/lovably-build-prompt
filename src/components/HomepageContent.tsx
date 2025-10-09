import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HomepageContent = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          Professional Painting & Exterior Finishing Across Ontario
        </h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
          <p>
            With 15+ years of hands-on experience across Ontario, Ascent Group Construction specializes in commercial painting, 
            residential painting, condo restoration, stucco & EIFS, masonry repair, metal cladding, and parking garage restoration. 
            We blend quality craftsmanship with transparent project management to deliver results that last.
          </p>
          
          <p>
            From initial consultation to final walkthrough, our team focuses on premium materials, clear communication, 
            and on-time delivery. Every project includes comprehensive warranties and detailed documentation—so you can 
            trust that your investment is protected and your vision becomes reality.
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
