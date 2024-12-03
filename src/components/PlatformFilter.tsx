import React from 'react';
import { cn } from '../lib/utils';

interface PlatformFilterProps {
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
}

export function PlatformFilter({ selectedPlatform, onPlatformChange }: PlatformFilterProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onPlatformChange('all')}
        className={cn(
          "px-4 py-2 rounded-lg transition-colors",
          selectedPlatform === 'all'
            ? "bg-blue-500 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        )}
      >
        All Platforms
      </button>
      <button
        onClick={() => onPlatformChange('tiktok')}
        className={cn(
          "px-4 py-2 rounded-lg transition-colors",
          selectedPlatform === 'tiktok'
            ? "bg-black text-white"
            : "bg-gray-100 hover:bg-gray-200"
        )}
      >
        TikTok
      </button>
      <button
        onClick={() => onPlatformChange('instagram')}
        className={cn(
          "px-4 py-2 rounded-lg transition-colors",
          selectedPlatform === 'instagram'
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        )}
      >
        Instagram
      </button>
    </div>
  );
}