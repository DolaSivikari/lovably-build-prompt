import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Truck, Wrench, Package, Users, Building2, Hammer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EquipmentResources = () => {
  const equipment = [
    {
      category: "Lifting Equipment",
      icon: Wrench,
      items: [
        "10x Scissor Lifts (19-32 ft)",
        "8x Boom Lifts (40-60 ft)",
        "15x Ladder Systems",
        "Complete Scaffolding Inventory"
      ]
    },
    {
      category: "Spray Equipment",
      icon: Package,
      items: [
        "12x Airless Spray Systems",
        "8x HVLP Spray Systems",
        "6x Texture Spray Equipment",
        "Industrial Paint Mixers"
      ]
    },
    {
      category: "Fleet & Transportation",
      icon: Truck,
      items: [
        "8x Cargo Vans",
        "4x Flatbed Trucks",
        "2x Mobile Tool Shops",
        "GPS-Tracked Fleet Management"
      ]
    },
    {
      category: "Specialized Tools",
      icon: Hammer,
      items: [
        "Power Tools Inventory (200+ pieces)",
        "Pressure Washers & Surface Prep",
        "Concrete Repair Equipment",
        "Waterproofing Application Systems"
      ]
    }
  ];

  const facilities = [
    {
      title: "Main Warehouse & Office",
      size: "15,000 sq ft",
      features: [
        "Climate-controlled material storage",
        "Equipment maintenance bay",
        "Project management offices",
        "Staff training center"
      ]
    },
    {
      title: "Material Staging Facilities",
      size: "Multiple locations",
      features: [
        "Strategic GTA positioning",
        "Just-in-time delivery capability",
        "Bulk material storage",
        "Quality control inspection areas"
      ]
    }
  ];

  const partnerships = [
    { name: "Benjamin Moore", type: "Premium Paint Supplier", years: "15+" },
    { name: "Sherwin-Williams", type: "Commercial Coatings", years: "15+" },
    { name: "BASF", type: "Specialty Systems", years: "10+" },
    { name: "Parex", type: "Stucco & EIFS", years: "12+" }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Equipment & Resources | Ascent Group Construction"
        description="View our comprehensive equipment inventory, facilities, and supplier partnerships. Capacity to handle up to 15 concurrent projects across the GTA."
        canonical="https://ascentgroupconstruction.com/company/equipment-resources"
      />
      <Navigation />

      <PageHeader
        eyebrow="Our Capabilities"
        title="Equipment & Resources"
        description="Industry-leading equipment and strategic partnerships"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/about" },
          { label: "Equipment & Resources" }
        ]}
      />

      {/* Equipment Inventory */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Equipment Inventory</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              $1M+ in owned equipment ensures we're ready for projects of any scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {equipment.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.category} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Facilities & Infrastructure</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strategic locations across the GTA for efficient project execution
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {facilities.map((facility) => (
              <Card key={facility.title}>
                <CardHeader>
                  <Building2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{facility.title}</CardTitle>
                  <p className="text-primary font-semibold">{facility.size}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {facility.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supplier Partnerships */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supplier Partnerships</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Long-standing relationships with industry-leading material suppliers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {partnerships.map((partner) => (
              <Card key={partner.name} className="text-center">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-1">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{partner.type}</p>
                  <p className="text-xs text-primary font-semibold">{partner.years} years partnership</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capacity Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Project Capacity</h2>
            <p className="text-primary-foreground/80">Ready to scale with your needs</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <p className="text-primary-foreground/80">Concurrent Projects</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <p className="text-primary-foreground/80">Units Simultaneously</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-primary-foreground/80">Field Personnel</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-primary-foreground/80">Emergency Response</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EquipmentResources;