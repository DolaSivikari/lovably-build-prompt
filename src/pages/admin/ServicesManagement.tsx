import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceAnalyticsDashboard } from "@/components/admin/ServiceAnalyticsDashboard";
import { FeaturedServicesManager } from "@/components/admin/FeaturedServicesManager";
import { PromotionsManager } from "@/components/admin/PromotionsManager";
import { BarChart, Star, Megaphone, TestTube } from "lucide-react";

export default function ServicesManagement() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Services Management</h1>
        <p className="text-muted-foreground">
          Manage Popular Services, analytics, promotions, and A/B testing
        </p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="featured" className="gap-2">
            <Star className="h-4 w-4" />
            Featured Services
          </TabsTrigger>
          <TabsTrigger value="promotions" className="gap-2">
            <Megaphone className="h-4 w-4" />
            Promotions
          </TabsTrigger>
          <TabsTrigger value="abtests" className="gap-2">
            <TestTube className="h-4 w-4" />
            A/B Tests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <ServiceAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <FeaturedServicesManager />
        </TabsContent>

        <TabsContent value="promotions" className="space-y-6">
          <PromotionsManager />
        </TabsContent>

        <TabsContent value="abtests" className="space-y-6">
          <div className="text-center py-12 text-muted-foreground">
            <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>A/B Testing framework coming soon...</p>
            <p className="text-sm mt-2">
              Test different Popular Services variations and measure performance
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
