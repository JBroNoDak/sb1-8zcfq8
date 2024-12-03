import React from 'react';
import { Hashtag } from '../types/hashtag';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface EmergingOpportunitiesProps {
  hashtags: Hashtag[];
  platform: string;
}

export function EmergingOpportunities({ hashtags, platform }: EmergingOpportunitiesProps) {
  const emergingHashtags = hashtags
    .filter(h => (platform === 'all' || h.platform === platform) && h.trending)
    .sort((a, b) => a.posts - b.posts)
    .slice(0, 5);

  if (emergingHashtags.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-lg mb-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Sparkles className="w-6 h-6 text-amber-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Top TikTok Hashtags & Trending Instagram Hashtags</h2>
      </div>

      <div className="space-y-4">
        {emergingHashtags.map((hashtag, index) => (
          <motion.div
            key={hashtag.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-medium">#{hashtag.tag}</span>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  hashtag.platform === 'tiktok'
                    ? "bg-black text-white"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                )}>
                  {hashtag.platform === 'tiktok' ? 'Latest TikTok Trends' : 'Viral Instagram Hashtags'}
                </span>
              </div>
              <div className="flex items-center text-green-500">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Trending Now</span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Current Posts</p>
                <p className="text-lg font-semibold">{new Intl.NumberFormat('en-US', { notation: 'compact' }).format(hashtag.posts)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement Rate</p>
                <p className="text-lg font-semibold">{hashtag.engagement}%</p>
              </div>
            </div>

            <div className="mt-3">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((hashtag.posts / 1000000000) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Hashtag Tracker: Usage compared to top hashtags</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}