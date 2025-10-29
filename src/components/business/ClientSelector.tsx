import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Client {
  id: string;
  contact_name: string;
  company_name: string | null;
  client_type: string;
}

interface ClientSelectorProps {
  value: string | null;
  onChange: (clientId: string | null) => void;
  onCreateNew?: () => void;
  disabled?: boolean;
}

export const ClientSelector = ({ value, onChange, onCreateNew, disabled = false }: ClientSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('business_clients')
        .select('id, contact_name, company_name, client_type')
        .order('contact_name');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedClient = clients.find((client) => client.id === value);

  const getClientDisplay = (client: Client) => {
    if (client.company_name) {
      return `${client.company_name} (${client.contact_name})`;
    }
    return client.contact_name;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-slate-800/50 border-slate-700 hover:bg-slate-700/50"
          disabled={disabled}
        >
          {selectedClient ? getClientDisplay(selectedClient) : 'Select client...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-slate-800 border-slate-700" align="start">
        <Command className="bg-slate-800">
          <CommandInput placeholder="Search clients..." className="border-slate-700" />
          <CommandEmpty>
            <div className="p-4 text-center text-sm text-slate-400">
              No clients found.
              {onCreateNew && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setOpen(false);
                    onCreateNew();
                  }}
                  className="mt-2 w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Client
                </Button>
              )}
            </div>
          </CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {onCreateNew && (
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onCreateNew();
                }}
                className="text-blue-400 hover:bg-slate-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Client
              </CommandItem>
            )}
            {clients.map((client) => (
              <CommandItem
                key={client.id}
                value={getClientDisplay(client)}
                onSelect={() => {
                  onChange(client.id);
                  setOpen(false);
                }}
                className="hover:bg-slate-700"
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === client.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <div className="flex flex-col">
                  <span>{getClientDisplay(client)}</span>
                  <span className="text-xs text-slate-400">{client.client_type}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
