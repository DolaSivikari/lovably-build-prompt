import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";
import { trackOutboundLink } from "@/lib/analytics";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const reviewPlatforms = [
  {
    name: "Google",
    icon: "🔍",
    url: "https://g.page/r/YOUR_GOOGLE_PLACE_ID/review",
    description: "Leave a review on Google Business Profile",
    color: "bg-blue-500"
  },
  {
    name: "HomeStars",
    icon: "⭐",
    url: "https://homestars.com/companies/YOUR_COMPANY_ID",
    description: "Share your experience on HomeStars",
    color: "bg-orange-500"
  },
  {
    name: "TrustedPros",
    icon: "🏆",
    url: "https://trustedpros.ca/company/YOUR_COMPANY_ID",
    description: "Write a review on TrustedPros",
    color: "bg-green-500"
  },
  {
    name: "Houzz",
    icon: "🏠",
    url: "https://www.houzz.com/professionals/YOUR_COMPANY_ID",
    description: "Rate us on Houzz",
    color: "bg-teal-500"
  },
  {
    name: "Facebook",
    icon: "📘",
    url: "https://www.facebook.com/YOUR_PAGE/reviews",
    description: "Leave a Facebook recommendation",
    color: "bg-blue-600"
  }
];

const Reviews = () => {
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('r');

  useEffect(() => {
    // Track that user clicked review link
    if (requestId) {
      supabase
        .from('review_requests')
        .update({ 
          status: 'clicked',
          clicked_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .then(({ error }) => {
          if (error) console.error('Error tracking review click:', error);
        });
    }
  }, [requestId]);

  const handlePlatformClick = async (platform: string, url: string) => {
    trackOutboundLink(url, `${platform} Review`);
    
    // Track which platform was chosen
    if (requestId) {
      await supabase
        .from('review_requests')
        .update({ 
          status: 'completed',
          platform: platform.toLowerCase(),
          completed_at: new Date().toISOString()
        })
        .eq('id', requestId);
    }
  };

  return (
    <>
      <SEO
        title="Leave a Review | Ascent Group Construction"
        description="Share your experience with Ascent Group Construction. Your feedback helps other property owners make informed decisions."
        keywords="review, testimonial, feedback, customer experience"
      />
      <Navigation />
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Share Your Experience"
          description="We'd love to hear about your project! Your review helps other property owners make confident decisions."
        />

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h2 className="text-3xl font-bold mb-4">Thank You for Choosing Ascent Group!</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your feedback takes just 2 minutes and makes a huge difference. Choose your preferred platform below:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {reviewPlatforms.map((platform) => (
                <Card key={platform.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`${platform.color} text-white p-3 rounded-lg text-2xl`}>
                        {platform.icon}
                      </div>
                      <CardTitle>{platform.name}</CardTitle>
                    </div>
                    <CardDescription>{platform.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handlePlatformClick(platform.name, platform.url)}
                      asChild
                    >
                      <a 
                        href={platform.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Leave Review
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">🎁 Quarterly $100 Gift Card Draw</h3>
                <p className="text-sm text-muted-foreground">
                  As a thank you, all reviewers are automatically entered into our quarterly gift card draw. 
                  We'll contact you by email if you win!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Reviews;
