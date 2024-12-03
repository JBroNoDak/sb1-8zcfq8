import React from 'react';
import { motion } from 'framer-motion';
import { HashtagCard } from './HashtagCard';
import { Hashtag } from '../types/hashtag';

interface HashtagListProps {
  hashtags: Hashtag[];
}

export function HashtagList({ hashtags }: HashtagListProps) {
  if (hashtags.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <p className="text-gray-500">No hashtags found matching your criteria.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hashtags.map((hashtag, index) => (
        <HashtagCard key={hashtag.id} hashtag={hashtag} index={index} />
      ))}
    </div>
  );
}