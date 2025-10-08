import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { faqSchema } from "@/utils/structured-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          question: "How long has Ascent Group Construction been in business?",
          answer: "Ascent Group Construction was founded in 2009 and has been providing expert construction services across the Greater Toronto Area for over 15 years. We've successfully completed over 500 projects."
        },
        {
          question: "What areas do you serve?",
          answer: "We serve the entire Greater Toronto Area (GTA) including Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, and surrounding municipalities."
        },
        {
          question: "Are you licensed and insured?",
          answer: "Yes, we are fully licensed, bonded, and insured with comprehensive liability and workers' compensation coverage. We can provide proof of insurance upon request."
        },
      ],
    },
    {
      category: "Services & Pricing",
      questions: [
        {
          question: "What services do you offer?",
          answer: "We offer a comprehensive range of services including commercial painting, residential painting, condo painting, masonry restoration, stucco & EIFS, metal cladding, parking garage restoration, and tile & flooring installation."
        },
        {
          question: "How do you price your projects?",
          answer: "We provide detailed, transparent quotes based on project scope, materials, labor, and timeline. We offer free on-site consultations and written estimates. Our pricing is competitive and includes all materials, labor, and cleanup."
        },
        {
          question: "Do you offer free estimates?",
          answer: "Yes! We provide free, no-obligation estimates for all projects. You can request an estimate through our website, by phone, or schedule an on-site consultation."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including checks, bank transfers, and credit cards. For larger projects, we typically work with a deposit and progress payments schedule."
        },
      ],
    },
    {
      category: "Project Details",
      questions: [
        {
          question: "How long will my project take?",
          answer: "Project duration varies based on size and complexity. A typical residential painting project takes 3-7 days, while commercial projects can range from 1-4 weeks. We provide detailed timelines during the estimate phase."
        },
        {
          question: "Do I need to move furniture?",
          answer: "We handle furniture protection and minor moving. For residential projects, we recommend clearing small valuables and fragile items. Our team will protect and cover all remaining furniture and flooring."
        },
        {
          question: "Will there be a lot of disruption?",
          answer: "We strive to minimize disruption to your daily operations or home life. We work efficiently, maintain a clean work site, and can schedule work during off-hours for commercial projects if needed."
        },
        {
          question: "What if I'm not satisfied with the work?",
          answer: "Client satisfaction is our top priority. We conduct thorough walk-throughs before project completion and address any concerns immediately. We also offer warranties on all workmanship."
        },
      ],
    },
    {
      category: "Materials & Quality",
      questions: [
        {
          question: "What brands of paint do you use?",
          answer: "We work with premium paint brands including Benjamin Moore, Sherwin-Williams, and Dulux. We select products based on your specific needs, budget, and project requirements."
        },
        {
          question: "Can I choose my own paint colors?",
          answer: "Absolutely! We offer professional color consultation services to help you select the perfect colors. You can choose any color from our partner brands' extensive palettes."
        },
        {
          question: "Do you use eco-friendly materials?",
          answer: "Yes, we prioritize sustainability and offer eco-friendly, low-VOC, and zero-VOC paint options. We're committed to environmentally responsible construction practices."
        },
        {
          question: "What warranty do you provide?",
          answer: "We provide comprehensive warranties on all workmanship and materials. Typical warranties range from 2-5 years depending on the project type and materials used."
        },
      ],
    },
    {
      category: "Scheduling & Availability",
      questions: [
        {
          question: "How far in advance should I book?",
          answer: "We recommend booking 2-4 weeks in advance for residential projects and 4-8 weeks for large commercial projects. However, we can often accommodate urgent requests."
        },
        {
          question: "Do you work year-round?",
          answer: "Yes, we operate year-round. While some exterior work is weather-dependent, we can perform most interior projects in any season."
        },
        {
          question: "Can you work on weekends or after hours?",
          answer: "Yes, we offer flexible scheduling including weekends and evening work for commercial clients who need minimal disruption to business operations."
        },
      ],
    },
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  // Create FAQ schema from all questions
  const allFAQs = faqCategories.flatMap(cat => 
    cat.questions.map(q => ({
      question: q.question,
      answer: q.answer
    }))
  );

  return (
    <>
      <SEO
        title="Frequently Asked Questions - Ascent Group Construction"
        description="Find answers to common questions about our construction services, pricing, project timelines, and more. Expert guidance for your construction projects."
        keywords="construction FAQ, painting questions, project timeline, GTA construction, service pricing"
        structuredData={faqSchema(allFAQs)}
      />

      <main className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get answers to common questions about our services, processes, and what to expect when working with Ascent Group Construction.
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {filteredFAQs.map((category, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, qIdx) => (
                      <AccordionItem
                        key={qIdx}
                        value={`${idx}-${qIdx}`}
                        className="border border-border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-2">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No questions found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 text-center bg-primary/5 border border-primary/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our team is here to help.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="tel:4165557246"
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-primary rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                >
                  Call (416) 555-PAINT
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FAQ;
