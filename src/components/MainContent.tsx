import React, { useState, useMemo } from 'react';
import { StatsOverview } from './StatsOverview';
import { HashtagGraph } from './HashtagGraph';
import { EmergingOpportunities } from './EmergingOpportunities';
import { HashtagList } from './HashtagList';
import { FilterBar } from './FilterBar';
import { useHashtags } from '../hooks/useHashtags';
import { SortOption } from '../types/hashtag';

export function MainContent() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('trending');

  const { hashtags, filteredHashtags } = useHashtags({
    selectedPlatform,
    searchTerm,
    sortBy,
  });

  return (
    <>
      <StatsOverview hashtags={filteredHashtags} />
      <HashtagGraph hashtags={hashtags} platform={selectedPlatform} />
      <EmergingOpportunities hashtags={hashtags} platform={selectedPlatform} />
      
      <FilterBar
        selectedPlatform={selectedPlatform}
        searchTerm={searchTerm}
        sortBy={sortBy}
        onPlatformChange={setSelectedPlatform}
        onSearchChange={setSearchTerm}
        onSortChange={setSortBy}
      />
      
      <HashtagList hashtags={filteredHashtags} />
    </>
  );
}