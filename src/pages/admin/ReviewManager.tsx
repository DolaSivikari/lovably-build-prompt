import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, CheckCircle, XCircle, Clock, MousePointer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReviewRequest {
  id: string;
  email: string;
  client_name: string | null;
  status: string;
  platform: string | null;
  sent_at: string | null;
  clicked_at: string | null;
  completed_at: string | null;
  created_at: string;
}

const ReviewManager = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    clientName: "",
    template: "review_request_day_0"
  });

  useEffect(() => {
    loadReviewRequests();
  }, []);

  const loadReviewRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('review_requests' as any)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      toast({
        title: "Error loading review requests",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setRequests(data as any || []);
    }
    setLoading(false);
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-review-request', {
        body: {
          email: formData.email,
          clientName: formData.clientName,
          templateName: formData.template
        }
      });

      if (error) throw error;

      toast({
        title: "Review request sent!",
        description: `Email sent to ${formData.email}`
      });

      setFormData({ email: "", clientName: "", template: "review_request_day_0" });
      loadReviewRequests();
    } catch (error: any) {
      toast({
        title: "Failed to send request",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      pending: { variant: "secondary", icon: Clock },
      sent: { variant: "default", icon: Send },
      clicked: { variant: "default", icon: MousePointer },
      completed: { variant: "default", icon: CheckCircle },
      bounced: { variant: "destructive", icon: XCircle }
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const stats = {
    total: requests.length,
    sent: requests.filter(r => r.status === 'sent' || r.status === 'clicked' || r.status === 'completed').length,
    clicked: requests.filter(r => r.status === 'clicked' || r.status === 'completed').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  const conversionRate = stats.sent > 0 ? ((stats.completed / stats.sent) * 100).toFixed(1) : '0';
  const clickRate = stats.sent > 0 ? ((stats.clicked / stats.sent) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Review Request Manager</h1>
        <p className="text-muted-foreground">
          Send automated review requests and track conversion rates
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clickRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{conversionRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Send New Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send New Review Request</CardTitle>
          <CardDescription>
            Send a personalized review request email to a client
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendRequest} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="email">Client Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  required
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="template">Email Template</Label>
                <Select 
                  value={formData.template} 
                  onValueChange={(value) => setFormData({ ...formData, template: value })}
                >
                  <SelectTrigger id="template">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="review_request_day_0">Day 0 (Project Complete)</SelectItem>
                    <SelectItem value="review_request_day_14">Day 14 (Follow-up)</SelectItem>
                    <SelectItem value="review_request_day_30">Day 30 (Final Reminder)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={sending}>
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Review Request
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Review Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Review Requests</CardTitle>
          <CardDescription>Track the status of all review requests</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : requests.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No review requests yet. Send your first one above!
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Sent At</TableHead>
                  <TableHead>Completed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.client_name || '-'}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="capitalize">{request.platform || '-'}</TableCell>
                    <TableCell>
                      {request.sent_at 
                        ? new Date(request.sent_at).toLocaleDateString() 
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {request.completed_at 
                        ? new Date(request.completed_at).toLocaleDateString() 
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewManager;
