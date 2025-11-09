import { useState } from "react";
import { ServiceCardTier1 } from "./ServiceCardTier1";
import { ServiceCardTier3 } from "./ServiceCardTier3";
import { ServiceCategoryCard } from "./ServiceCategoryCard";
import { ServiceDetailsModal } from "./ServiceDetailsModal";
import { SERVICE_CATEGORIES, getServicesInCategory, type ServiceCategory } from "./categoryMapping";

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  category: string | null;
  icon_name: string | null;
  featured?: boolean;
  typical_timeline?: string | null;
  project_types?: string[] | null;
  service_tier?: string | null;
  challenge_tags?: string[] | null;
}

interface TieredServicesGridProps {
  services: Service[];
}

export const TieredServicesGrid = ({ services }: TieredServicesGridProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [modalServices, setModalServices] = useState<Service[]>([]);

  // Separate services by tier
  const tier1Services = services.filter(s => s.service_tier === 'primary_delivery');
  const tier2Services = services.filter(s => s.service_tier === 'self_perform');
  const tier3Services = services.filter(s => s.service_tier === 'specialized');

  const handleOpenModal = (category: ServiceCategory) => {
    const categoryServices = getServicesInCategory(category.id, tier2Services);
    setSelectedCategory(category);
    setModalServices(categoryServices);
    setModalOpen(true);
  };

  return (
    <div className="space-y-16">
      {/* Tier 1: Core Project Delivery */}
      {tier1Services.length > 0 && (
        <section>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              How We Deliver Projects
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive project delivery methods backed by 15+ years of proven execution
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tier1Services.map((service) => (
              <ServiceCardTier1 key={service.id} {...service} />
            ))}
          </div>
        </section>
      )}

      {/* Tier 2: Self-Performed Capabilities - Consolidated Categories */}
      {tier2Services.length > 0 && (
        <section>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              What Sets Us Apart
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Self-performed capabilities ensuring quality, coordination, and schedule control
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICE_CATEGORIES.map((category) => {
              const categoryServices = getServicesInCategory(category.id, tier2Services);
              const uniqueChallengeTags = Array.from(
                new Set(
                  categoryServices.flatMap(s => s.challenge_tags || [])
                )
              );
              
              return (
                <ServiceCategoryCard
                  key={category.id}
                  category={category}
                  serviceCount={categoryServices.length}
                  challengeTags={uniqueChallengeTags}
                  onClick={() => handleOpenModal(category)}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Tier 3: Specialized Services */}
      {tier3Services.length > 0 && (
        <section>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Additional Capabilities
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized services to complete your project requirements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tier3Services.map((service) => (
              <ServiceCardTier3 key={service.id} {...service} />
            ))}
          </div>
        </section>
      )}

      {/* Service Details Modal */}
      <ServiceDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedCategory}
        services={modalServices}
      />
    </div>
  );
};
