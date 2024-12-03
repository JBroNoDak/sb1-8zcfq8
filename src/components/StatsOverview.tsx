import React from 'react';
import { Hashtag } from '../types/hashtag';
import { BarChart2, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';

interface StatsOverviewProps {
  hashtags: Hashtag[];
}

export function StatsOverview({ hashtags }: StatsOverviewProps) {
  const trendingCount = hashtags.filter(h => h.trending).length;
  const avgEngagement = (hashtags.reduce((acc, h) => acc + h.engagement, 0) / hashtags.length);
  const totalPosts = hashtags.reduce((acc, h) => acc + h.posts, 0);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(num);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center space-x-3 text-blue-500 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg">Trending Now</h3>
        </div>
        <div className="text-3xl font-bold text-gray-800">
          <AnimatedCounter value={trendingCount} />
        </div>
      </motion.div>
      
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center space-x-3 text-green-500 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <BarChart2 className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg">Avg. Engagement</h3>
        </div>
        <div className="text-3xl font-bold text-gray-800">
          <AnimatedCounter 
            value={avgEngagement} 
            formatter={(v) => `${v.toFixed(1)}%`}
          />
        </div>
      </motion.div>
      
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center space-x-3 text-purple-500 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg">Total Posts</h3>
        </div>
        <div className="text-3xl font-bold text-gray-800">
          <AnimatedCounter 
            value={totalPosts} 
            formatter={formatNumber}
          />
        </div>
      </motion.div>
    </div>
  );
}