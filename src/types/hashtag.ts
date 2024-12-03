export interface Hashtag {
  id: string;
  tag: string;
  platform: 'tiktok' | 'instagram';
  posts: number;
  views?: number;
  engagement: number;
  trending: boolean;
  category?: string;
}

export type SortOption = 'engagement' | 'posts' | 'views' | 'trending';