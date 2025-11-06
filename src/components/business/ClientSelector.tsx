import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  name: string;
  company: string | null;
}

interface ClientSelectorProps {
  value?: string;
  onChange: (value: string) => void;
}

export const ClientSelector = ({ value, onChange }: ClientSelectorProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("id, name, company")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      toast({
        title: "Error loading clients",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select value={value} onValueChange={onChange} disabled={loading}>
      <SelectTrigger>
        <SelectValue placeholder={loading ? "Loading..." : "Select a client"} />
      </SelectTrigger>
      <SelectContent>
        {clients.map((client) => (
          <SelectItem key={client.id} value={client.id}>
            {client.company ? `${client.name} (${client.company})` : client.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
