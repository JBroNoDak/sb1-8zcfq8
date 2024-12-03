import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLastUpdated } from '../hooks/useLastUpdated';

export function Header() {
  const lastUpdated = useLastUpdated();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center mb-4">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Sparkles className="w-12 h-12 text-blue-500 mr-3" />
        </motion.div>
        <h1 className="text-5xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Trending Hashtags Today
        </h1>
      </div>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
        Discover the latest TikTok trends and viral Instagram hashtags to boost your social media presence. 
        Our Social Media Trend Finder helps you stay ahead with current social media trends and popular social media tags.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Last updated: {lastUpdated} - Get trending hashtags right now!
      </p>
    </motion.div>
  );
}