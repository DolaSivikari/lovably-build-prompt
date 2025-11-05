import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { PageTransition, ParallaxSection, ScrollReveal, StaggerContainer } from "@/components/animations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/ui/Button";
import { Zap, Sparkles, Wind, Eye } from "lucide-react";

/**
 * Showcase page demonstrating all animation utilities
 * This page serves as both documentation and testing ground
 */
const AnimationShowcase = () => {
  const features = [
    { icon: Zap, title: "Fast Performance", description: "60fps animations using requestAnimationFrame" },
    { icon: Sparkles, title: "Beautiful Effects", description: "Professional parallax and transitions" },
    { icon: Wind, title: "Smooth Motion", description: "Optimized for all devices" },
    { icon: Eye, title: "Accessible", description: "Respects reduced motion preferences" },
  ];

  const cardItems = [
    { id: 1, title: "Stagger Item 1", color: "from-blue-500 to-blue-600" },
    { id: 2, title: "Stagger Item 2", color: "from-purple-500 to-purple-600" },
    { id: 3, title: "Stagger Item 3", color: "from-pink-500 to-pink-600" },
    { id: 4, title: "Stagger Item 4", color: "from-orange-500 to-orange-600" },
    { id: 5, title: "Stagger Item 5", color: "from-green-500 to-green-600" },
    { id: 6, title: "Stagger Item 6", color: "from-teal-500 to-teal-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Animation System Showcase"
        description="Comprehensive demonstration of parallax effects, stagger animations, and page transitions"
      />
      <Navigation />

      <PageTransition type="fade">
        <main className="flex-1">
          {/* Hero with Parallax Background */}
          <ParallaxSection speed="slow" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 z-10" />
            
            {/* Parallax decorative elements */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl parallax-float" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl parallax-float" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-20 container mx-auto px-4 text-center text-primary-foreground">
              <ScrollReveal direction="up">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Advanced Animation System
                </h1>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={200}>
                <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                  Parallax, stagger, transitions, and scroll reveals
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={400}>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" variant="secondary">
                    View Components
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Read Docs
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </ParallaxSection>

          {/* Features Grid with Stagger */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <ScrollReveal direction="up">
                <div className="text-center mb-12">
                  <Badge variant="primary" className="mb-4">Features</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Why Use This Animation System?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Professional animations that are performant and accessible
                  </p>
                </div>
              </ScrollReveal>

              <StaggerContainer type="scale" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                  <Card key={feature.title} className="text-center border-2 hover:border-primary/30 card-hover">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale-icon">
                        <feature.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* Parallax Layers Demo */}
          <section className="py-20 bg-muted/30 relative overflow-hidden">
            <ParallaxSection speed="slow">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-2xl" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent rounded-full blur-3xl" />
              </div>
            </ParallaxSection>

            <div className="container mx-auto px-4 relative z-10">
              <ScrollReveal direction="left">
                <div className="max-w-3xl">
                  <Badge variant="success" className="mb-4">Parallax Effect</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Multi-Layer Depth
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    The background elements move at different speeds as you scroll, 
                    creating an immersive 3D-like effect. This technique adds depth 
                    and visual interest to your pages.
                  </p>
                  <Button variant="primary">Learn More About Parallax</Button>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Stagger Animation Demo */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <ScrollReveal direction="up">
                <div className="text-center mb-12">
                  <Badge variant="info" className="mb-4">Stagger Animations</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Sequential Reveals
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Items animate in sequence for a polished, professional look
                  </p>
                </div>
              </ScrollReveal>

              <StaggerContainer type="fade" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {cardItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden border-2 hover:border-primary/30 card-hover">
                    <div className={`h-32 bg-gradient-to-br ${item.color}`} />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Each card animates with a slight delay, creating a cascade effect
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* Scroll Reveals Demo */}
          <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <ScrollReveal direction="left">
                  <Card className="p-8 border-2">
                    <Badge variant="warning" className="mb-4">Scroll Reveal</Badge>
                    <h3 className="text-2xl font-bold mb-4">From Left</h3>
                    <p className="text-muted-foreground">
                      Content slides in from the left side as you scroll down the page.
                      Perfect for alternating content layouts.
                    </p>
                  </Card>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={200}>
                  <Card className="p-8 border-2">
                    <Badge variant="success" className="mb-4">Scroll Reveal</Badge>
                    <h3 className="text-2xl font-bold mb-4">From Right</h3>
                    <p className="text-muted-foreground">
                      Content slides in from the right side, creating a balanced 
                      and dynamic scrolling experience.
                    </p>
                  </Card>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="up" delay={400}>
                <div className="text-center mt-12">
                  <Card className="inline-block p-8 border-2">
                    <Badge variant="primary" className="mb-4">Scroll Reveal</Badge>
                    <h3 className="text-2xl font-bold mb-4">From Bottom</h3>
                    <p className="text-muted-foreground">
                      The classic reveal animation that fades and slides up.
                    </p>
                  </Card>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Special Effects Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <ScrollReveal direction="up">
                <div className="text-center mb-12">
                  <Badge variant="danger" className="mb-4">Special Effects</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Advanced Animations
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <ScrollReveal direction="up" delay={0}>
                  <Card className="p-6 text-center border-2">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full pulse-glow flex items-center justify-center">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Pulse Glow</h3>
                    <p className="text-sm text-muted-foreground">
                      Attention-grabbing pulsing effect
                    </p>
                  </Card>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={200}>
                  <Card className="p-6 text-center border-2">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full parallax-float flex items-center justify-center">
                      <Wind className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Float Animation</h3>
                    <p className="text-sm text-muted-foreground">
                      Gentle floating motion
                    </p>
                  </Card>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={400}>
                  <Card className="p-6 text-center border-2 relative overflow-hidden spotlight-effect">
                    <div className="relative z-10">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Spotlight</h3>
                      <p className="text-sm text-muted-foreground">
                        Rotating spotlight effect
                      </p>
                    </div>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Documentation CTA */}
          <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <ScrollReveal direction="up">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
                  Check out the complete documentation for implementation details and examples
                </p>
                <Button size="lg" variant="secondary">
                  View Animation Guide
                </Button>
              </ScrollReveal>
            </div>
          </section>
        </main>
      </PageTransition>

      <Footer />
    </div>
  );
};

export default AnimationShowcase;
