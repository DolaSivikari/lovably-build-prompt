import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigationHistory } from './useNavigationHistory';
import { getAllNavigationItems, SearchResult } from './useNavigationSearch';

interface Recommendation extends SearchResult {
  score: number;
}

export function useRecommendations() {
  const { history } = useNavigationHistory();

  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ['navigation-recommendations', history.length],
    queryFn: async () => {
      // Get user's recent search keywords
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

      const { data: searches } = await supabase
        .from('search_analytics')
        .select('search_query')
        .gte('created_at', fourteenDaysAgo.toISOString())
        .not('search_query', 'is', null)
        .limit(20);

      const searchKeywords = searches?.map(s => s.search_query.toLowerCase()) || [];
      const viewedPaths = history.map(h => h.path);
      const allNavigationItems = getAllNavigationItems();

      // Score each navigation item
      const scored: Recommendation[] = allNavigationItems.map(item => {
        let score = 0;

        // Match against search keywords
        searchKeywords.forEach(keyword => {
          if (item.name.toLowerCase().includes(keyword) ||
              item.category.toLowerCase().includes(keyword)) {
            score += 3;
          }
        });

        // Boost related categories to viewed pages
        if (history.some(h => h.category === item.category)) {
          score += 2;
        }

        // Popular items get a small boost
        if (item.badge === 'popular') {
          score += 1;
        }

        return {
          ...item,
          score
        };
      });

      // Filter out recently viewed and low scores
      const filtered = scored
        .filter(item => !viewedPaths.includes(item.link) && item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);

      return filtered;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: history.length > 0
  });

  return { recommendations, isLoading };
}
