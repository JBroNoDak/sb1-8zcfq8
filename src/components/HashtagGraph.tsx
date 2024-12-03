import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Hashtag } from '../types/hashtag';

interface HashtagGraphProps {
  hashtags: Hashtag[];
  platform: string;
}

export function HashtagGraph({ hashtags, platform }: HashtagGraphProps) {
  const topHashtags = hashtags
    .filter(h => platform === 'all' || h.platform === platform)
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 10)
    .map(hashtag => ({
      name: hashtag.tag,
      engagement: hashtag.engagement,
      posts: hashtag.posts / 1000000, // Convert to millions
      platform: hashtag.platform,
    }));

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Top 10 Hashtags Performance</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topHashtags}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={70}
              interval={0}
            />
            <YAxis yAxisId="left" label={{ value: 'Engagement Rate (%)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Posts (millions)', angle: 90, position: 'insideRight' }} />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'posts') return [`${value.toFixed(1)}M`, 'Posts'];
                return [`${value}%`, 'Engagement Rate'];
              }}
            />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="engagement" 
              fill="#3b82f6" 
              name="Engagement Rate"
            />
            <Bar 
              yAxisId="right"
              dataKey="posts" 
              fill="#10b981" 
              name="Posts"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}