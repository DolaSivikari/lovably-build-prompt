import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Award, CheckCircle, ArrowRight } from "lucide-react";
import heroPremiumVideo from "@/assets/hero-premium.mp4";
import heroConstructionImage from "@/assets/hero-construction.jpg";
import { motion, useScroll, useTransform } from "framer-motion";

const SimplifiedHero = () => {
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with Parallax */}
      <motion.div 
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover scale-110"
          poster={heroConstructionImage}
        >
          <source src={heroPremiumVideo} type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content with Fade on Scroll */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 text-center text-white"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
        >
          <Award className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold">15+ Years of Excellence in the GTA</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Ontario's Premier Construction Partner
          <span className="block text-accent mt-3">for Complex Commercial Projects</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed opacity-90"
        >
          Trusted by EllisDon, PCL, and Madison Group for $10M+ projects—delivering excellence on time, on budget, since 2009
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button size="lg" asChild className="group bg-accent hover:bg-accent/90 text-primary shadow-xl hover:shadow-2xl transition-all">
            <Link to="/projects" className="flex items-center gap-2">
              View $20M+ Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm shadow-xl">
            <Link to="/estimate">Request Proposal</Link>
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap gap-8 justify-center text-sm"
        >
          <div className="flex items-center gap-2 group cursor-default">
            <Shield className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <Award className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
            <span>500+ Projects</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <CheckCircle className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
            <span>$50M+ Delivered</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-slide-up" />
        </div>
      </div>
    </section>
  );
};

export default SimplifiedHero;
