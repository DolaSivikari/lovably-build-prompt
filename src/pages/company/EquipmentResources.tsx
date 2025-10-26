/**
 * Equipment & Resources - Phase 1 (CRITICAL)
 * Showcases capacity, equipment inventory, and resources
 */
import { useState } from "react";
import { Truck, Wrench, Users, Building2, Zap, Network } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const EquipmentResources = () => {
  const capacityHighlights = [
    { value: "35+", label: "Full-Time Professionals", icon: Users },
    { value: "15", label: "Concurrent Projects", icon: Building2 },
    { value: "$5M", label: "Bonding Capacity", icon: Badge },
    { value: "200+", label: "Units Per Month", icon: Zap },
  ];

  const accessEquipment = [
    { name: "Scissor Lifts", quantity: "12 units", details: "Up to 40 ft working height" },
    { name: "Boom Lifts", quantity: "8 units", details: "Articulating & telescopic" },
    { name: "Scaffolding", quantity: "50,000 sq ft", details: "Frame and system scaffolding" },
    { name: "Swing Stages", quantity: "6 units", details: "High-rise access" },
  ];

  const applicationEquipment = [
    { name: "Airless Sprayers", quantity: "25 units", details: "Commercial-grade Graco & Titan" },
    { name: "HVLP Spray Systems", quantity: "15 units", details: "Fine finish applications" },
    { name: "Texture Machines", quantity: "8 units", details: "Drywall and ceiling texture" },
    { name: "Plural Component Sprayers", quantity: "4 units", details: "Specialized coatings" },
  ];

  const preparationEquipment = [
    { name: "Pressure Washers", quantity: "18 units", details: "Commercial hot/cold water" },
    { name: "Sanders & Grinders", quantity: "30+ units", details: "Surface preparation" },
    { name: "Drywall Tools", quantity: "Full inventory", details: "Professional finishing" },
  ];

  const transportation = [
    { name: "Trucks", quantity: "12 units", details: "3/4 ton to 5-ton trucks" },
    { name: "Cargo Vans", quantity: "8 units", details: "Fully equipped service vans" },
    { name: "Warehouse Space", quantity: "10,000 sq ft", details: "Material storage & staging" },
    { name: "Job Site Containers", quantity: "20 units", details: "Secure on-site storage" },
  ];

  const softwareTools = [
    "Procore Project Management",
    "On-Screen Takeoff Estimation",
    "TSheets Time Tracking",
    "Microsoft Teams Communication",
    "QuickBooks Enterprise",
    "Safety Management Platform",
  ];

  const materialPartners = [
    "Sherwin-Williams (Preferred Account)",
    "Benjamin Moore (Authorized Dealer)",
    "Dulux Professional",
    "Dryvit Systems",
    "BASF Construction Chemicals",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Equipment & Resources - Capacity for Large Projects | Ascent Group"
        description="View our equipment inventory, resources, and capacity. 35+ professionals, modern equipment fleet, and the capability to handle 1,000+ unit projects."
      />
      <Navigation />

      <PageHeader
        title="Equipment & Resources"
        description="Capacity to Handle 1,000+ Unit Projects"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/about" },
          { label: "Equipment & Resources" },
        ]}
      />

      {/* Capacity Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capacityHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <div className="text-4xl font-bold text-primary mb-2">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment Inventory */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Equipment Inventory</h2>
              <p className="text-muted-foreground">
                Modern, well-maintained equipment fleet for maximum efficiency
              </p>
            </div>

            <Tabs defaultValue="access" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="access">Access Equipment</TabsTrigger>
                <TabsTrigger value="application">Application</TabsTrigger>
                <TabsTrigger value="preparation">Preparation</TabsTrigger>
                <TabsTrigger value="transportation">Transportation</TabsTrigger>
              </TabsList>

              <TabsContent value="access" className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {accessEquipment.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <Badge variant="secondary">{item.quantity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.details}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="application" className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {applicationEquipment.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <Badge variant="secondary">{item.quantity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.details}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="preparation" className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {preparationEquipment.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <Badge variant="secondary">{item.quantity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.details}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transportation" className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {transportation.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <Badge variant="secondary">{item.quantity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.details}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technology & Software</h2>
              <p className="text-muted-foreground">
                Industry-leading tools for project management and efficiency
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {softwareTools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{tool}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Material Partnerships */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Material Partnerships</h2>
              <p className="text-muted-foreground">
                Preferred pricing and priority access through established partnerships
              </p>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {materialPartners.map((partner, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg">
                      <Network className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="font-medium text-lg">{partner}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Badge variant="secondary" className="text-base px-6 py-2">
                    Volume Pricing Available for Large Projects
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subcontractor Network */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subcontractor Network</h2>
            <p className="text-muted-foreground mb-8">
              Vetted network of 20+ specialized trades for comprehensive project delivery
            </p>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                    <div className="font-semibold mb-1">20+ Specialized Trades</div>
                    <div className="text-sm text-muted-foreground">Fully vetted partners</div>
                  </div>
                  <div>
                    <Building2 className="w-12 h-12 text-primary mx-auto mb-3" />
                    <div className="font-semibold mb-1">GTA Coverage</div>
                    <div className="text-sm text-muted-foreground">Complete geographic reach</div>
                  </div>
                  <div>
                    <Badge className="w-12 h-12 flex items-center justify-center text-primary mx-auto mb-3">QA</Badge>
                    <div className="font-semibold mb-1">Quality Assurance</div>
                    <div className="text-sm text-muted-foreground">Rigorous standards</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EquipmentResources;
