import { TrendingUp, Shield, Users, FileText, CheckCircle2, ArrowRight, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import heroImage from "@/assets/hero-construction-management.jpg";

const ConstructionManagement = () => {
  const whatWeDeliver = [
    { icon: TrendingUp, title: "Budget Stewardship", description: "Proactive cost tracking, value engineering, and transparent reporting keeping projects within budget." },
    { icon: Shield, title: "Risk Management", description: "Comprehensive risk identification, mitigation strategies, and contingency planning protecting owner interests." },
    { icon: Users, title: "Trade Coordination", description: "Expert scheduling, conflict resolution, and quality oversight ensuring seamless multi-trade execution." },
    { icon: FileText, title: "Document Control", description: "Complete project documentation, RFI management, and change order processing with full transparency." }
  ];

  const howWeWork = [
    { phase: "Pre-Construction", activities: ["Detailed cost estimating and budget development", "Constructability reviews and value engineering", "Schedule development and critical path analysis", "Trade partner prequalification and bidding"] },
    { phase: "Execution", activities: ["Daily progress monitoring and reporting", "Budget tracking and cost control measures", "Quality assurance and safety compliance", "Proactive issue resolution and coordination"] },
    { phase: "Closeout", activities: ["Punch list management and completion", "Final cost reconciliation and documentation", "Warranty coordination and owner training", "Post-occupancy support and lessons learned"] }
  ];

  const caseStudies = [
    { title: "Commercial Office Expansion", location: "Toronto, ON", size: "$8.5M budget", duration: "16 months", description: "CM-at-Risk delivery of 55,000 sq ft office addition with occupied building coordination and phased completion." },
    { title: "Multi-Family Development", location: "Mississauga, ON", size: "$12M budget", duration: "20 months", description: "Agency CM for 140-unit mid-rise residential project with design-assist and fast-track scheduling." },
    { title: "Institutional Renovation", location: "Brampton, ON", size: "$6M budget", duration: "14 months", description: "CM/Advisor role for heritage building modernization with complex permitting and stakeholder coordination." }
  ];

  return (
    <div className="min-h-screen">
      <SEO title="Construction Management Toronto | CM Services Ontario" description="Expert construction management with budget stewardship, risk mitigation, and schedule control. CM-at-Risk and Agency CM delivery across commercial, multi-family, and institutional projects." keywords="construction management, CM-at-Risk, Agency CM, Toronto construction manager" />
      <Navigation />
      <PageHero.Root backgroundImage={heroImage}>
        <PageHero.Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Construction Management" }]} />
        <PageHero.Title>Construction Management</PageHero.Title>
        <PageHero.Subtitle>Cost clarity, schedule certainty, and risk management throughout your project.</PageHero.Subtitle>
        <PageHero.Stats stats={[{ value: "98%", label: "Budget Accuracy" }, { value: "ZERO", label: "Cost Overruns" }, { value: "200+", label: "CM Projects" }, { value: "$1.5B+", label: "Managed Value" }]} />
        <PageHero.CTAs primaryText="Request CM Proposal" primaryHref="/contact" secondaryText="View CM Projects" secondaryHref="/projects" />
      </PageHero.Root>
      <main>
        <section className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-foreground mb-4">Expert CM Services</h2><p className="text-lg text-muted-foreground max-w-3xl mx-auto">Professional construction management protecting owner interests through proactive oversight and transparent controls.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{whatWeDeliver.map((item, index) => { const Icon = item.icon; return (<Card key={index} className="hover:shadow-lg transition-shadow"><CardHeader><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"><Icon className="w-6 h-6 text-primary" /></div><CardTitle className="text-lg">{item.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{item.description}</p></CardContent></Card>);})}</div></div></section>
        <section className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-foreground mb-4">Our CM Process</h2><p className="text-lg text-muted-foreground max-w-3xl mx-auto">Structured methodology ensuring cost control, quality outcomes, and on-schedule delivery.</p></div><div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">{howWeWork.map((phase, index) => (<Card key={index}><CardHeader><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{index + 1}</div><CardTitle className="text-xl">{phase.phase}</CardTitle></div></CardHeader><CardContent><ul className="space-y-2">{phase.activities.map((activity, actIndex) => (<li key={actIndex} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span className="text-sm text-muted-foreground">{activity}</span></li>))}</ul></CardContent></Card>))}</div></div></section>
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto text-center"><h2 className="text-foreground mb-6">CM with Self-Perform Capabilities</h2><p className="text-lg text-muted-foreground mb-8 leading-relaxed">Our unique combination of CM expertise and self-perform capabilities delivers superior outcomes through better cost control, schedule flexibility, quality assurance, and single accountability.</p></div></div></section>
        <section className="py-20 bg-background"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-foreground mb-4">CM Project Portfolio</h2><p className="text-lg text-muted-foreground max-w-3xl mx-auto">Recent construction management projects demonstrating our cost control and delivery expertise.</p></div><div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">{caseStudies.map((project, index) => (<Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1"><CardHeader><CardTitle className="text-lg">{project.title}</CardTitle><div className="flex flex-wrap gap-2 mt-2"><span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{project.location}</span><span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{project.size}</span></div></CardHeader><CardContent><p className="text-sm text-muted-foreground mb-3">{project.description}</p><div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="w-3 h-3" /><span>Delivered in {project.duration}</span></div></CardContent></Card>))}</div><div className="text-center mt-8"><Button asChild variant="outline" size="lg"><Link to="/projects">View All CM Projects</Link></Button></div></div></section>
        <section className="py-16 bg-primary text-primary-foreground"><div className="container mx-auto px-4 text-center"><h2 className="text-3xl font-bold mb-4">Ready to Partner with Our CM Team?</h2><p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">Request a construction management proposal and let's discuss how we can deliver your project on budget and on schedule.</p><div className="flex flex-wrap gap-4 justify-center"><Button asChild size="lg" variant="secondary"><Link to="/contact">Request CM Proposal<ArrowRight className="ml-2 w-4 h-4" /></Link></Button><Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link to="/about">Talk to a CM Professional</Link></Button></div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default ConstructionManagement;
