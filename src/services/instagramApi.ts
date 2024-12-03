import Instagram from 'instagram-web-api';
import { Hashtag } from '../types/hashtag';

const client = new Instagram({
  username: import.meta.env.VITE_INSTAGRAM_USERNAME,
  password: import.meta.env.VITE_INSTAGRAM_PASSWORD,
});

export async function fetchInstagramTrends(): Promise<Hashtag[]> {
  try {
    await client.login();
    const tags = await client.getMediaByHashtag({ hashtag: 'trending' });
    
    const processedTags = new Map<string, { posts: number; engagement: number }>();
    
    // Process and aggregate hashtag data
    tags.forEach((post: any) => {
      const hashtags = extractHashtags(post.caption);
      const engagement = calculatePostEngagement(post);
      
      hashtags.forEach(tag => {
        if (processedTags.has(tag)) {
          const existing = processedTags.get(tag)!;
          processedTags.set(tag, {
            posts: existing.posts + 1,
            engagement: (existing.engagement + engagement) / 2,
          });
        } else {
          processedTags.set(tag, {
            posts: 1,
            engagement: engagement,
          });
        }
      });
    });
    
    // Convert to Hashtag array
    return Array.from(processedTags.entries()).map(([tag, data]) => ({
      id: `instagram-${tag}`,
      tag,
      platform: 'instagram',
      posts: data.posts,
      engagement: Number(data.engagement.toFixed(1)),
      trending: data.posts > 100, // Consider trending if more than 100 posts
    }));
  } catch (error) {
    console.error('Instagram API Error:', error);
    throw error;
  }
}

function extractHashtags(caption: string): string[] {
  const hashtagRegex = /#(\w+)/g;
  return Array.from(caption.matchAll(hashtagRegex), m => m[1]);
}

function calculatePostEngagement(post: any): number {
  const likes = post.likes || 0;
  const comments = post.comments || 0;
  return ((likes + comments) / post.followers) * 100;
}