import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SearchResult {
  id: string;
  type: 'client' | 'project' | 'estimate' | 'invoice';
  title: string;
  subtitle?: string;
  link: string;
}

export function useBusinessSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchTerm = `%${searchQuery.toLowerCase()}%`;
    const allResults: SearchResult[] = [];

    try {
      // Search clients
      const { data: clients } = await supabase
        .from('clients')
        .select('id, name, email')
        .or(`name.ilike.${searchTerm},email.ilike.${searchTerm}`)
        .limit(5);

      if (clients) {
        allResults.push(
          ...clients.map((c) => ({
            id: c.id,
            type: 'client' as const,
            title: c.name,
            subtitle: c.email,
            link: `/business/clients/${c.id}`,
          }))
        );
      }

      // Search projects
      const { data: projects } = await supabase
        .from('projects')
        .select('id, title, client_name, project_status')
        .or(`title.ilike.${searchTerm},client_name.ilike.${searchTerm}`)
        .limit(5);

      if (projects) {
        allResults.push(
          ...projects.map((p) => ({
            id: p.id,
            type: 'project' as const,
            title: p.title,
            subtitle: `${p.client_name || 'No client'} - ${p.project_status || 'No status'}`,
            link: `/admin/projects/${p.id}`,
          }))
        );
      }

      // Search estimates
      const { data: estimates } = await supabase
        .from('estimates')
        .select('id, estimate_number, status, clients(name)')
        .or(`estimate_number.ilike.${searchTerm}`)
        .limit(5);

      if (estimates) {
        allResults.push(
          ...estimates.map((e: any) => ({
            id: e.id,
            type: 'estimate' as const,
            title: `Estimate ${e.estimate_number}`,
            subtitle: `${e.clients?.name || 'No client'} - ${e.status}`,
            link: `/business/estimates/${e.id}`,
          }))
        );
      }

      // Search invoices
      const { data: invoices } = await supabase
        .from('invoices')
        .select('id, invoice_number, status, clients(name)')
        .or(`invoice_number.ilike.${searchTerm}`)
        .limit(5);

      if (invoices) {
        allResults.push(
          ...invoices.map((i: any) => ({
            id: i.id,
            type: 'invoice' as const,
            title: `Invoice ${i.invoice_number}`,
            subtitle: `${i.clients?.name || 'No client'} - ${i.status}`,
            link: `/business/invoices/${i.id}`,
          }))
        );
      }

      setResults(allResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, search]);

  return { results, loading };
}
