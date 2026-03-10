'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface AnalyticsData {
  views: number[];
  likes: number[];
  comments: number[];
  followers: number[];
  labels: string[];
}

interface SeriesAnalytics {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  earnings: number;
  trend: number;
}

// Demo analytics data
const demoAnalytics: AnalyticsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  views: [12000, 15000, 11000, 18000, 22000, 25000, 20000],
  likes: [1200, 1500, 1100, 1800, 2200, 2500, 2000],
  comments: [120, 150, 110, 180, 220, 250, 200],
  followers: [50, 75, 45, 90, 120, 150, 110],
};

const demoSeriesAnalytics: SeriesAnalytics[] = [
  { id: '1', title: 'Solo Leveling', views: 125000, likes: 45000, comments: 12000, earnings: 250, trend: 12 },
  { id: '2', title: 'Tower of God', views: 98000, likes: 32000, comments: 8500, earnings: 180, trend: -5 },
  { id: '3', title: 'Omniscient Reader', views: 87000, likes: 28000, comments: 7200, earnings: 150, trend: 8 },
];

interface CreatorAnalyticsProps {
  userId?: string;
  timeRange?: '7d' | '30d' | '90d';
}

export default function CreatorAnalytics({ 
  userId, 
  timeRange: initialRange = '7d' 
}: CreatorAnalyticsProps) {
  const [timeRange, setTimeRange] = useState(initialRange);
  const [activeMetric, setActiveMetric] = useState<'views' | 'likes' | 'comments'>('views');
  const [isLoading, setIsLoading] = useState(false);
  const [analytics] = useState<AnalyticsData>(demoAnalytics);
  const [seriesAnalytics] = useState<SeriesAnalytics[]>(demoSeriesAnalytics);

  // Calculate totals
  const totals = {
    views: analytics.views.reduce((a, b) => a + b, 0),
    likes: analytics.likes.reduce((a, b) => a + b, 0),
    comments: analytics.comments.reduce((a, b) => a + b, 0),
    followers: analytics.followers.reduce((a, b) => a + b, 0),
  };

  // Find max value for chart scaling
  const maxValue = Math.max(...analytics[activeMetric]);
  
  // Calculate trend percentage
  const currentValue = analytics[activeMetric][analytics[activeMetric].length - 1];
  const previousValue = analytics[activeMetric][analytics[activeMetric].length - 2];
  const trendPercent = ((currentValue - previousValue) / previousValue * 100).toFixed(1);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Analytics Overview</h2>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: totals.views, icon: Icons.Eye, color: 'text-blue-500' },
          { label: 'Total Likes', value: totals.likes, icon: Icons.Heart, color: 'text-red-500' },
          { label: 'Comments', value: totals.comments, icon: Icons.Comment, color: 'text-green-500' },
          { label: 'New Followers', value: totals.followers, icon: Icons.Profile, color: 'text-purple-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className={`text-xs font-medium ${parseFloat(trendPercent) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {parseFloat(trendPercent) >= 0 ? '+' : ''}{trendPercent}%
              </span>
            </div>
            <p className="text-2xl font-bold">{formatNumber(stat.value)}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Performance Chart</h3>
          <div className="flex gap-2">
            {(['views', 'likes', 'comments'] as const).map((metric) => (
              <button
                key={metric}
                onClick={() => setActiveMetric(metric)}
                className={`px-3 py-1 text-xs font-medium rounded-full capitalize transition-colors ${
                  activeMetric === metric
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-48 flex items-end gap-2">
          {analytics.labels.map((label, index) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(analytics[activeMetric][index] / maxValue) * 100}%` }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`w-full rounded-t-lg ${
                  activeMetric === 'views' ? 'bg-blue-500' :
                  activeMetric === 'likes' ? 'bg-red-500' : 'bg-green-500'
                }`}
              />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
          <span>Lowest: {formatNumber(Math.min(...analytics[activeMetric]))}</span>
          <span className="text-gray-300">|</span>
          <span>Highest: {formatNumber(Math.max(...analytics[activeMetric]))}</span>
          <span className="text-gray-300">|</span>
          <span>Average: {formatNumber(Math.round(analytics[activeMetric].reduce((a, b) => a + b, 0) / analytics[activeMetric].length))}</span>
        </div>
      </div>

      {/* Series Performance Table */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <h3 className="font-semibold mb-4">Series Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 font-medium">Series</th>
                <th className="pb-3 font-medium">Views</th>
                <th className="pb-3 font-medium">Likes</th>
                <th className="pb-3 font-medium">Comments</th>
                <th className="pb-3 font-medium">Earnings</th>
                <th className="pb-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {seriesAnalytics.map((series) => (
                <tr key={series.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 font-medium">{series.title}</td>
                  <td className="py-3">{formatNumber(series.views)}</td>
                  <td className="py-3">{formatNumber(series.likes)}</td>
                  <td className="py-3">{formatNumber(series.comments)}</td>
                  <td className="py-3">${series.earnings}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 ${series.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {series.trend >= 0 ? (
                        <Icons.Trending className="w-4 h-4" />
                      ) : (
                        <Icons.Trending className="w-4 h-4 rotate-180" />
                      )}
                      {Math.abs(series.trend)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Content */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Top Performing Chapters */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
          <h3 className="font-semibold mb-4">Top Chapters This Week</h3>
          <div className="space-y-3">
            {[
              { title: 'Solo Leveling Ch. 179', views: 25000, likes: 5000 },
              { title: 'Tower of God Ch. 580', views: 22000, likes: 4500 },
              { title: 'Omniscient Reader Ch. 180', views: 18000, likes: 3800 },
            ].map((chapter, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <span className="font-medium text-sm">{chapter.title}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatNumber(chapter.views)} views</p>
                  <p className="text-xs text-gray-500">{formatNumber(chapter.likes)} likes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Insights */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
          <h3 className="font-semibold mb-4">Audience Insights</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Mobile Users</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-blue-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Desktop Users</span>
                <span className="font-medium">24%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-[24%] bg-green-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Tablet Users</span>
                <span className="font-medium">8%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-[8%] bg-purple-500 rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Top Country</span>
              <span className="font-medium">🇺🇸 United States (45%)</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Top Genre Interest</span>
              <span className="font-medium">Action/Fantasy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
