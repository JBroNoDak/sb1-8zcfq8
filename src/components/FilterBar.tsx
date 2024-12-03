import React from 'react';
import { motion } from 'framer-motion';
import { PlatformFilter } from './PlatformFilter';
import { SearchBar } from './SearchBar';
import { SortSelect } from './SortSelect';
import { SortOption } from '../types/hashtag';

interface FilterBarProps {
  selectedPlatform: string;
  searchTerm: string;
  sortBy: SortOption;
  onPlatformChange: (platform: string) => void;
  onSearchChange: (term: string) => void;
  onSortChange: (option: SortOption) => void;
}

export function FilterBar({
  selectedPlatform,
  searchTerm,
  sortBy,
  onPlatformChange,
  onSearchChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
    >
      <PlatformFilter
        selectedPlatform={selectedPlatform}
        onPlatformChange={onPlatformChange}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <SortSelect sortBy={sortBy} onSortChange={onSortChange} />
      </div>
    </motion.div>
  );
}