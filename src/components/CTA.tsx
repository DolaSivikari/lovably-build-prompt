import CTASection from "./sections/CTASection";

const CTA = () => {
  return (
    <CTASection
      title="Transform Your Vision Into Reality"
      description="Professional assessments, transparent pricing, and expert craftsmanship for projects of every scale. Receive your detailed estimate within 24-48 hours."
      primaryCTA={{
        label: "Request Free Estimate",
        href: "/estimate",
        variant: "secondary"
      }}
      secondaryCTA={{
        label: "View Our Portfolio",
        href: "/projects",
        variant: "outline"
      }}
    />
  );
};

export default CTA;
