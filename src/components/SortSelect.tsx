import React from 'react';
import { SortAsc } from 'lucide-react';
import { SortOption } from '../types/hashtag';

interface SortSelectProps {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

export function SortSelect({ sortBy, onSortChange }: SortSelectProps) {
  return (
    <div className="flex items-center space-x-2">
      <SortAsc className="w-5 h-5 text-gray-500" />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="rounded-lg border border-gray-200 py-2 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
      >
        <option value="trending">Trending First</option>
        <option value="engagement">Highest Engagement</option>
        <option value="posts">Most Posts</option>
        <option value="views">Most Views</option>
      </select>
    </div>
  );
}