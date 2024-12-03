import React from 'react';
import { Hash, TrendingUp } from 'lucide-react';
import { Hashtag } from '../types/hashtag';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface HashtagCardProps {
  hashtag: Hashtag;
  index: number;
}

export function HashtagCard({ hashtag, index }: HashtagCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Hash className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold">{hashtag.tag}</h3>
        </div>
        {hashtag.trending && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center text-red-500 bg-red-50 px-3 py-1 rounded-full"
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Trending</span>
          </motion.div>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Posts</span>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-medium"
          >
            {formatNumber(hashtag.posts)}
          </motion.span>
        </div>
        {hashtag.views && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Views</span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-medium"
            >
              {formatNumber(hashtag.views)}
            </motion.span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Engagement</span>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={cn(
              "font-medium px-2 py-1 rounded-full text-sm",
              hashtag.engagement > 5 
                ? "bg-green-100 text-green-700" 
                : "bg-yellow-100 text-yellow-700"
            )}
          >
            {hashtag.engagement}%
          </motion.span>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 pt-4 border-t"
      >
        <span className={cn(
          "px-4 py-1.5 rounded-full text-sm font-medium",
          hashtag.platform === 'tiktok' 
            ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white" 
            : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
        )}>
          {hashtag.platform}
        </span>
      </motion.div>
    </motion.div>
  );
}