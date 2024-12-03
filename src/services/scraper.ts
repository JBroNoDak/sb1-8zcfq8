import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { Hashtag } from '../types/hashtag';

async function fetchHTML(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });
  return await response.text();
}

export async function scrapeTikTokTrends(): Promise<Hashtag[]> {
  try {
    // Using a TikTok hashtag discovery page
    const html = await fetchHTML('https://www.tiktok.com/discover');
    const $ = cheerio.load(html);
    const hashtags: Hashtag[] = [];
    
    // Extract trending hashtags
    $('[data-e2e="challenge-item"]').each((_, element) => {
      const tag = $(element).find('.title').text().replace('#', '');
      const views = parseInt($(element).find('.video-count').text().replace(/[^0-9]/g, '')) || 0;
      const posts = parseInt($(element).find('.post-count').text().replace(/[^0-9]/g, '')) || 0;
      
      if (tag && views) {
        hashtags.push({
          id: `tiktok-${tag}`,
          tag,
          platform: 'tiktok',
          posts,
          views,
          engagement: calculateEngagement(views, posts),
          trending: true
        });
      }
    });
    
    return hashtags;
  } catch (error) {
    console.error('Error scraping TikTok:', error);
    return [];
  }
}

export async function scrapeInstagramTrends(): Promise<Hashtag[]> {
  try {
    // Using Instagram explore page
    const html = await fetchHTML('https://www.instagram.com/explore/tags/');
    const $ = cheerio.load(html);
    const hashtags: Hashtag[] = [];
    
    // Extract trending hashtags
    $('.EZdmt').each((_, element) => {
      const tag = $(element).find('._7UhW9').text().replace('#', '');
      const posts = parseInt($(element).find('.g47SY').text().replace(/[^0-9]/g, '')) || 0;
      const engagement = parseFloat($(element).find('.qyrsm').text()) || 0;
      
      if (tag && posts) {
        hashtags.push({
          id: `instagram-${tag}`,
          tag,
          platform: 'instagram',
          posts,
          engagement,
          trending: true
        });
      }
    });
    
    return hashtags;
  } catch (error) {
    console.error('Error scraping Instagram:', error);
    return [];
  }
}

function calculateEngagement(views: number, posts: number): number {
  if (!posts) return 0;
  return Number(((views / posts) * 100).toFixed(1));
}