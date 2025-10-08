import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { landingMenuItems } from "@/data/landing-menu";
import heroConstruction from "@/assets/hero-construction.jpg";
import heroVideo from "@/assets/hero-construction-video.mp4";

const NumberedLandingHero = () => {
  return (
    <section className="landing-hero">
      {/* Background Video */}
      <div className="landing-hero__background">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroConstruction}
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="landing-hero__overlay" />

      {/* Numbered Navigation Menu */}
      <div className="landing-hero__content">
        <nav 
          className="landing-menu" 
          role="navigation" 
          aria-label="Main landing navigation"
        >
          {landingMenuItems.map((item, index) => (
            <Link
              key={item.number}
              to={item.link}
              className="landing-menu-item group"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <span className="landing-menu-item__number">
                {item.number}
              </span>
              
              <div className="landing-menu-item__content">
                <h2 className="landing-menu-item__title">
                  {item.title}
                </h2>
                <p className="landing-menu-item__subtext">
                  {item.subtext}
                </p>
              </div>

              <div className="landing-menu-item__cta">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </nav>

        {/* Scroll Indicator */}
        <div className="landing-hero__scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default NumberedLandingHero;
