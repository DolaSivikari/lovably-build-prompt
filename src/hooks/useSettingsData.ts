import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseSettingsDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSettingsData<T = any>(
  tableName: string,
  selectQuery: string = '*'
): UseSettingsDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: result, error: fetchError } = await (supabase as any)
        .from(tableName)
        .select(selectQuery)
        .eq('is_active', true)
        .single();

      if (fetchError) throw fetchError;
      setData(result as T);
    } catch (err) {
      setError(err as Error);
      console.error(`Error fetching ${tableName}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, refetch: fetchData };
}
