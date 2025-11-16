import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/ui/Button";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const PartnerPermissions = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from("partner_permissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  const addPartner = async () => {
    const name = prompt("Partner name:");
    if (!name) return;

    try {
      const { error } = await supabase
        .from("partner_permissions")
        .insert({ partner_name: name, permission_status: "pending" });

      if (error) throw error;
      toast.success("Partner added");
      fetchPartners();
    } catch (error) {
      toast.error("Failed to add partner");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Partner Logo Permissions</h1>
        <Button onClick={addPartner}>
          <Plus className="mr-2 h-4 w-4" />
          Add Partner
        </Button>
      </div>

      <div className="bg-card rounded-lg border">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-4">Partner Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Permission Date</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className="border-b">
                <td className="p-4">{partner.partner_name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    partner.permission_status === 'approved' ? 'bg-green-100 text-green-800' :
                    partner.permission_status === 'denied' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {partner.permission_status}
                  </span>
                </td>
                <td className="p-4">
                  {partner.permission_date ? new Date(partner.permission_date).toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartnerPermissions;
