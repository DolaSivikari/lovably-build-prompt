import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const HomepageContent = () => {
  const [content, setContent] = useState({
    headline: "Ontario's Envelope & Restoration Contractor",
    subheadline: "Delivering commercial, multi-family, and institutional projects on-time and on-budget since 2009",
    hero_description: "With 15+ years of building envelope and restoration expertise across Ontario, Ascent Group Construction specializes in self-performed specialty trades for commercial, institutional, and multi-family projects. We deliver quality results through transparent project management and proven construction methodologies.",
    cta_primary_text: "Submit RFP",
    cta_primary_url: "/submit-rfp",
    cta_secondary_text: "Request Proposal",
    cta_secondary_url: "/contact",
    cta_tertiary_text: "View Projects",
    cta_tertiary_url: "/projects"
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data } = await supabase
        .from('homepage_settings')
        .select('*')
        .eq('is_active', true)
        .single();

      if (data) {
        setContent({
          headline: data.headline || content.headline,
          subheadline: data.subheadline || content.subheadline,
          hero_description: data.hero_description || content.hero_description,
          cta_primary_text: data.cta_primary_text || content.cta_primary_text,
          cta_primary_url: data.cta_primary_url || content.cta_primary_url,
          cta_secondary_text: data.cta_secondary_text || content.cta_secondary_text,
          cta_secondary_url: data.cta_secondary_url || content.cta_secondary_url,
          cta_tertiary_text: data.cta_tertiary_text || content.cta_tertiary_text,
          cta_tertiary_url: data.cta_tertiary_url || content.cta_tertiary_url,
        });
      }
    } catch (error) {
      console.error('Error loading homepage content:', error);
    }
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          {content.headline}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-6">
          {content.subheadline}
        </p>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
          <p>
            {content.hero_description}
          </p>
          
          <p>
            From pre-construction planning to final closeout, our team delivers excellence through comprehensive project management, 
            quality control, and proven construction methods. Every project is backed by detailed documentation, comprehensive warranties, 
            and our commitment to safety and client satisfaction.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-8 not-prose">
            <Link 
              to={content.cta_primary_url} 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-[var(--radius-sm)] hover:bg-primary/90 link-hover font-semibold"
            >
              {content.cta_primary_text}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to={content.cta_secondary_url} 
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-[var(--radius-sm)] hover:bg-secondary/90 link-hover font-semibold"
            >
              {content.cta_secondary_text}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to={content.cta_tertiary_url} 
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-[var(--radius-sm)] hover:bg-primary hover:text-primary-foreground link-hover font-semibold"
            >
              {content.cta_tertiary_text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageContent;
