import { Card } from "@/components/ui/card";
import { Button } from "@/ui/Button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomepageContent = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Homepage Content Management</h1>
        <p className="text-muted-foreground">Edit homepage sections and content</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-3">Why Choose Us Section</h2>
          <p className="text-muted-foreground mb-4">
            Manage the 6 differentiator cards highlighting your competitive advantages
          </p>
          <Button asChild>
            <Link to="/admin/homepage-why-choose-us">
              Edit Why Choose Us <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-3">Company Overview Hub</h2>
          <p className="text-muted-foreground mb-4">
            Edit the tabbed content section (Our Approach, Values, Promise)
          </p>
          <Button asChild>
            <Link to="/admin/homepage-company-overview">
              Edit Company Overview <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default HomepageContent;
