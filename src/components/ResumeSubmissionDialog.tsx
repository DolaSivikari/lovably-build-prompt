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
import { Loader2 } from "lucide-react";

interface ResumeSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle?: string;
}

const ResumeSubmissionDialog = ({ open, onOpenChange, jobTitle }: ResumeSubmissionDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverMessage: "",
    portfolioLinks: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert portfolio links string to array
      const portfolioArray = formData.portfolioLinks
        .split('\n')
        .map(link => link.trim())
        .filter(link => link.length > 0);

      const { error } = await supabase
        .from("resume_submissions")
        .insert([{
          applicant_name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          cover_message: formData.coverMessage || null,
          portfolio_links: portfolioArray.length > 0 ? portfolioArray : null,
          job_id: null, // Can be linked to specific job postings in the future
          status: "new"
        }]);

      if (error) throw error;

      // Send email notifications
      try {
        await supabase.functions.invoke('send-resume-notification', {
          body: {
            applicantName: formData.name,
            email: formData.email,
            phone: formData.phone,
            coverMessage: formData.coverMessage,
            jobTitle: jobTitle
          }
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the submission if email fails
      }

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. Check your email for confirmation. We'll review your application and get back to you soon.",
      });

      // Reset form and close dialog
      setFormData({ name: "", email: "", phone: "", coverMessage: "", portfolioLinks: "" });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting resume:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {jobTitle ? `Apply for: ${jobTitle}` : "Submit Your Application"}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your resume and application. We'll get back to you soon!
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
            <Label htmlFor="coverMessage">Cover Letter / Message</Label>
            <Textarea
              id="coverMessage"
              value={formData.coverMessage}
              onChange={(e) => setFormData({ ...formData, coverMessage: e.target.value })}
              placeholder="Tell us about your experience and why you'd be a great fit..."
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolioLinks">
              Portfolio / Resume Links
              <span className="text-xs text-muted-foreground ml-2">(one per line)</span>
            </Label>
            <Textarea
              id="portfolioLinks"
              value={formData.portfolioLinks}
              onChange={(e) => setFormData({ ...formData, portfolioLinks: e.target.value })}
              placeholder="https://linkedin.com/in/yourprofile&#10;https://drive.google.com/your-resume"
              className="min-h-[80px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Add links to your LinkedIn, resume, portfolio, or other relevant documents
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-primary"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeSubmissionDialog;
