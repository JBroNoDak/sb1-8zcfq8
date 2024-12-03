import { TikTokAPI } from 'tiktok-api';
import { Hashtag } from '../types/hashtag';

const tiktokClient = new TikTokAPI({
  apiKey: import.meta.env.VITE_TIKTOK_API_KEY,
  apiSecret: import.meta.env.VITE_TIKTOK_API_SECRET,
});

export async function fetchTikTokTrends(): Promise<Hashtag[]> {
  try {
    const response = await tiktokClient.getHashtagTrends();
    
    return response.data.map((item: any) => ({
      id: `tiktok-${item.id}`,
      tag: item.name,
      platform: 'tiktok',
      posts: item.video_count,
      views: item.view_count,
      engagement: calculateEngagement(item.view_count, item.video_count),
      trending: true,
    }));
  } catch (error) {
    console.error('TikTok API Error:', error);
    throw error;
  }
}

function calculateEngagement(views: number, posts: number): number {
  if (!posts) return 0;
  return Number(((views / posts) * 100).toFixed(1));
}