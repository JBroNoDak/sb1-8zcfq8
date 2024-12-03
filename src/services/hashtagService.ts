import { Hashtag } from '../types/hashtag';
import { trendingHashtags as mockData } from '../data/mockData';

const CACHE_KEY = 'hashtag-data';
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes

interface CachedData {
  data: Hashtag[];
  timestamp: number;
}

function getCachedData(): CachedData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    return JSON.parse(cached);
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

function setCachedData(data: Hashtag[]): void {
  try {
    const cacheData: CachedData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error setting cache:', error);
  }
}

export async function getTrendingHashtags(): Promise<Hashtag[]> {
  // Check cache first
  const cached = getCachedData();
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    // For now, we'll use mock data since we can't scrape directly from the browser
    // In a production environment, this would call your backend API
    const data = mockData;
    setCachedData(data);
    return data;
  } catch (error) {
    console.error('Error fetching hashtag data:', error);
    return mockData;
  }
}