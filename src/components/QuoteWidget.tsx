import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calculator, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuoteWidget = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectType: "",
    location: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to estimate page with pre-filled data
    navigate("/estimate", { state: formData });
  };

  return (
    <Card className="shadow-elegant border-primary/20">
      <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          Quick Quote Request
        </CardTitle>
        <CardDescription>Get a free estimate in under 24 hours</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type</Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) =>
                setFormData({ ...formData, projectType: value })
              }
            >
              <SelectTrigger id="projectType">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general-contracting">
                  General Contracting
                </SelectItem>
                <SelectItem value="design-build">Design-Build</SelectItem>
                <SelectItem value="construction-management">
                  Construction Management
                </SelectItem>
                <SelectItem value="interior-buildouts">
                  Interior Buildouts
                </SelectItem>
                <SelectItem value="exterior-envelope">
                  Exterior Restoration
                </SelectItem>
                <SelectItem value="tenant-improvements">
                  Tenant Improvements
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Toronto, Mississauga"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" className="w-full gap-2" size="lg">
            Request Proposal
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteWidget;
