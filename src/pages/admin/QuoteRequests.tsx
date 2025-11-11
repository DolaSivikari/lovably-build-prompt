import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, Mail, Phone, Building, User } from "lucide-react";

interface QuoteRequest {
  id: string;
  quote_type: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  city: string;
  lead_score: number;
  priority: string;
  status: string;
  created_at: string;
  project_address: string;
  additional_notes: string;
}

const QuoteRequests = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterQuoteType, setFilterQuoteType] = useState<string>("all");

  const { data: quotes, isLoading } = useQuery({
    queryKey: ["quote-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as QuoteRequest[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("quote_requests")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quote-requests"] });
      toast({
        title: "Status Updated",
        description: "Quote request status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getPriorityBadge = (priority: string, score: number) => {
    const colors = {
      hot: "bg-red-500/10 text-red-500 border-red-500/20",
      warm: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      cold: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };

    return (
      <Badge className={colors[priority as keyof typeof colors] || colors.cold}>
        {priority.toUpperCase()} ({score})
      </Badge>
    );
  };

  const getQuoteTypeBadge = (type: string) => {
    const labels = {
      specialty_prime: "Prime Specialty",
      trade_package: "Trade Package",
      emergency: "Emergency",
      general: "General",
    };

    return <Badge variant="outline">{labels[type as keyof typeof labels] || type}</Badge>;
  };

  const filteredQuotes = quotes?.filter((quote) => {
    if (filterPriority !== "all" && quote.priority !== filterPriority) return false;
    if (filterStatus !== "all" && quote.status !== filterStatus) return false;
    if (filterQuoteType !== "all" && quote.quote_type !== filterQuoteType) return false;
    return true;
  });

  const exportToCSV = () => {
    if (!filteredQuotes) return;

    const headers = ["Date", "Name", "Email", "Phone", "Company", "Quote Type", "Priority", "Score", "Status"];
    const rows = filteredQuotes.map((q) => [
      new Date(q.created_at).toLocaleDateString(),
      q.name,
      q.email,
      q.phone || "",
      q.company || "",
      q.quote_type,
      q.priority,
      q.lead_score,
      q.status,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quote-requests-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <AdminPageLayout title="Quote Requests" description="Manage and track quote requests with lead scoring">
      <div className="space-y-6">
        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="quoted">Quoted</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterQuoteType} onValueChange={setFilterQuoteType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Quote Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="specialty_prime">Prime Specialty</SelectItem>
                  <SelectItem value="trade_package">Trade Package</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={exportToCSV} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </Card>

        {/* Quote Requests List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredQuotes?.map((quote) => (
              <Card key={quote.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      {getPriorityBadge(quote.priority, quote.lead_score)}
                      {getQuoteTypeBadge(quote.quote_type)}
                      <span className="text-sm text-muted-foreground">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{quote.name}</p>
                          {quote.role && (
                            <p className="text-sm text-muted-foreground capitalize">{quote.role}</p>
                          )}
                        </div>
                      </div>

                      {quote.company && (
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm">{quote.company}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${quote.email}`} className="text-sm hover:text-primary">
                          {quote.email}
                        </a>
                      </div>

                      {quote.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <a href={`tel:${quote.phone}`} className="text-sm hover:text-primary">
                            {quote.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {quote.additional_notes && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">{quote.additional_notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 min-w-[160px]">
                    <Select
                      value={quote.status}
                      onValueChange={(value) =>
                        updateStatusMutation.mutate({ id: quote.id, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="won">Won</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            ))}

            {filteredQuotes?.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No quote requests found.</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </AdminPageLayout>
  );
};

export default QuoteRequests;