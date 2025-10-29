import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PackageRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
}

const PackageRequestDialog = ({ open, onOpenChange, packageName }: PackageRequestDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    honeypot: "" // Honeypot for bot detection
  });

  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      toast({
        title: "Slow down!",
        description: "Please wait a moment before submitting again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit via edge function with bot protection
      const { error } = await supabase.functions.invoke('submit-form', {
        body: {
          formType: 'contact',
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: `Package Requested: ${packageName}\n\nAdditional Notes:\n${formData.notes}`,
            submission_type: 'starter_package'
          },
          honeypot: formData.honeypot
        }
      });

      if (error) {
        if (error.message?.includes('Rate limit exceeded')) {
          toast({
            title: "Too many submissions",
            description: "Please try again in a few minutes.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      // Send email notifications
      try {
        await supabase.functions.invoke('send-package-notification', {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            packageName: packageName,
            message: formData.notes
          }
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the submission if email fails
      }

      toast({
        title: "Request Submitted!",
        description: "We'll contact you within 24-48 hours with a detailed quote. Check your email for confirmation.",
      });

      // Reset form and close dialog
      setFormData({ name: "", email: "", phone: "", notes: "", honeypot: "" });
      setLastSubmitTime(now);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request: {packageName}</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you within 24-48 hours with a detailed quote.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Smith"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(416) 555-1234"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Details</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Tell us more about your project..."
              className="min-h-[100px]"
            />
          </div>

          {/* Honeypot field - hidden from users */}
          <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <Input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-primary"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PackageRequestDialog;
