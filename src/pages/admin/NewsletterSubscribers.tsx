import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Download, UserX } from "lucide-react";

const NewsletterSubscribers = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const csv = [
      ["Email", "Subscribed At", "Source", "Consent Method", "Unsubscribed"],
      ...subscribers.map(s => [
        s.email,
        new Date(s.subscribed_at).toLocaleDateString(),
        s.source,
        s.consent_method || "N/A",
        s.unsubscribed_at ? "Yes" : "No"
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString()}.csv`;
    a.click();
    toast.success("Exported successfully");
  };

  const handleUnsubscribe = async (id: string) => {
    if (!confirm("Manually unsubscribe this user?")) return;
    
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ unsubscribed_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      toast.success("User unsubscribed");
      fetchSubscribers();
    } catch (error) {
      toast.error("Failed to unsubscribe user");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-4">Email</th>
              <th className="p-4">Subscribed</th>
              <th className="p-4">Source</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id} className="border-b">
                <td className="p-4">{sub.email}</td>
                <td className="p-4">{new Date(sub.subscribed_at).toLocaleDateString()}</td>
                <td className="p-4">{sub.source}</td>
                <td className="p-4">
                  {sub.unsubscribed_at ? (
                    <span className="text-muted-foreground">Unsubscribed</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </td>
                <td className="p-4">
                  {!sub.unsubscribed_at && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleUnsubscribe(sub.id)}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterSubscribers;
