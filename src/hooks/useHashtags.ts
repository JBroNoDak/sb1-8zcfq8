import { useMemo, useState, useEffect } from 'react';
import { getTrendingHashtags } from '../services/hashtagService';
import { trendingHashtags as mockData } from '../data/mockData';
import { Hashtag, SortOption } from '../types/hashtag';

interface UseHashtagsProps {
  selectedPlatform: string;
  searchTerm: string;
  sortBy: SortOption;
}

export function useHashtags({ selectedPlatform, searchTerm, sortBy }: UseHashtagsProps) {
  const [hashtags, setHashtags] = useState<Hashtag[]>(mockData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getTrendingHashtags();
        setHashtags(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch hashtag data');
        setHashtags(mockData);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    
    // Set up periodic refresh every 15 minutes
    const refreshInterval = setInterval(fetchData, 1000 * 60 * 15);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const filteredHashtags = useMemo(() => {
    let filtered = hashtags.filter(hashtag => 
      (selectedPlatform === 'all' || hashtag.platform === selectedPlatform) &&
      hashtag.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'trending') {
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      }
      if (sortBy === 'views' && a.views && b.views) {
        return b.views - a.views;
      }
      if (sortBy === 'engagement') {
        return b.engagement - a.engagement;
      }
      return b.posts - a.posts;
    });
  }, [hashtags, selectedPlatform, searchTerm, sortBy]);

  return {
    hashtags,
    filteredHashtags,
    isLoading,
    error,
  };
}