'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const analyticsData = {
  overview: {
    totalViews: 125000,
    totalSubscribers: 1234,
    totalWatchTime: '45.2K',
    revenue: 0,
    viewsGrowth: 12.5,
    subscribersGrowth: 8.3,
    watchTimeGrowth: 15.7,
  },
  videos: [
    { id: '1', title: 'Solo Leveling Chapter 1', views: 15000, likes: 1200, comments: 234, thumbnail: 'https://picsum.photos/seed/v1/320/180' },
    { id: '2', title: 'Tower of God Episode 5', views: 12500, likes: 980, comments: 187, thumbnail: 'https://picsum.photos/seed/v2/320/180' },
    { id: '3', title: 'The Beginning After The End', views: 10200, likes: 850, comments: 156, thumbnail: 'https://picsum.photos/seed/v3/320/180' },
    { id: '4', title: 'Omniscient Reader Chapter 2', views: 9800, likes: 720, comments: 123, thumbnail: 'https://picsum.photos/seed/v4/320/180' },
    { id: '5', title: ' Lore Olympus Episode 3', views: 8500, likes: 650, comments: 98, thumbnail: 'https://picsum.photos/seed/v5/320/180' },
  ],
  demographics: {
    age: [
      { range: '13-17', percentage: 15 },
      { range: '18-24', percentage: 35 },
      { range: '25-34', percentage: 30 },
      { range: '35-44', percentage: 12 },
      { range: '45+', percentage: 8 },
    ],
    gender: [
      { type: 'Male', percentage: 65 },
      { type: 'Female', percentage: 30 },
      { type: 'Other', percentage: 5 },
    ],
    topCountries: [
      { country: 'United States', percentage: 35 },
      { country: 'South Korea', percentage: 20 },
      { country: 'Japan', percentage: 15 },
      { country: 'Philippines', percentage: 10 },
      { country: 'Indonesia', percentage: 8 },
    ],
  },
  traffic: [
    { source: 'Browse Features', views: 45000, percentage: 36 },
    { source: 'Search', views: 35000, percentage: 28 },
    { source: 'External', views: 20000, percentage: 16 },
    { source: 'Suggested', views: 15000, percentage: 12 },
    { source: 'Notifications', views: 10000, percentage: 8 },
  ],
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('28');
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Content' },
    { id: 'audience', label: 'Audience' },
    { id: 'traffic', label: 'Traffic' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Link href="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Icons.ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Analytics</h1>
          </div>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
          >
            <option value="7">Last 7 days</option>
            <option value="28">Last 28 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-red-500 text-red-500' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Total Views</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalViews)}</p>
                <p className="text-xs text-green-500 mt-1">↑ {analyticsData.overview.viewsGrowth}%</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Subscribers</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalSubscribers)}</p>
                <p className="text-xs text-green-500 mt-1">↑ {analyticsData.overview.subscribersGrowth}%</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Watch Time</p>
                <p className="text-2xl font-bold">{analyticsData.overview.totalWatchTime}</p>
                <p className="text-xs text-green-500 mt-1">↑ {analyticsData.overview.watchTimeGrowth}%</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Revenue</p>
                <p className="text-2xl font-bold">${analyticsData.overview.revenue}</p>
                <p className="text-xs text-gray-500 mt-1">No data</p>
              </div>
            </div>

            {/* Views Chart Placeholder */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold mb-4">Views Over Time</h3>
              <div className="h-48 flex items-end justify-between gap-1">
                {[65, 45, 78, 52, 88, 72, 95, 68, 82, 75, 90, 85, 70, 92, 80].map((height, i) => (
                  <div key={i} className="flex-1 bg-red-500 rounded-t" style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>

            {/* Top Performing Content */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold mb-4">Top Performing Content</h3>
              <div className="space-y-3">
                {analyticsData.videos.slice(0, 3).map((video, index) => (
                  <div key={video.id} className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">{index + 1}</span>
                    <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{video.title}</p>
                      <p className="text-xs text-gray-500">{formatNumber(video.views)} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {analyticsData.videos.map((video, index) => (
              <div key={video.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <span className="text-lg font-bold text-gray-400 w-6">{index + 1}</span>
                <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{video.title}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>{formatNumber(video.views)} views</span>
                    <span>{formatNumber(video.likes)} likes</span>
                    <span>{video.comments} comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Audience Tab */}
        {activeTab === 'audience' && (
          <div className="space-y-6">
            {/* Age Distribution */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold mb-4">Age Distribution</h3>
              <div className="space-y-3">
                {analyticsData.demographics.age.map((item) => (
                  <div key={item.range} className="flex items-center gap-3">
                    <span className="w-16 text-sm text-gray-500">{item.range}</span>
                    <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold mb-4">Gender</h3>
              <div className="flex gap-4">
                {analyticsData.demographics.gender.map((item) => (
                  <div key={item.type} className="flex-1 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                        <circle cx="40" cy="40" r="35" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray={`${item.percentage * 2.2} 220`} />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-bold">{item.percentage}%</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.type}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Countries */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold mb-4">Top Countries</h3>
              <div className="space-y-3">
                {analyticsData.demographics.topCountries.map((item, index) => (
                  <div key={item.country} className="flex items-center gap-3">
                    <span className="text-lg">{index === 0 ? '🇺🇸' : index === 1 ? '🇰🇷' : index === 2 ? '🇯🇵' : index === 3 ? '🇵🇭' : '🇮🇩'}</span>
                    <span className="flex-1 text-sm">{item.country}</span>
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="text-sm font-medium w-10 text-right">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Traffic Tab */}
        {activeTab === 'traffic' && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold mb-4">Traffic Sources</h3>
              <div className="space-y-4">
                {analyticsData.traffic.map((item) => (
                  <div key={item.source}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{item.source}</span>
                      <span className="text-sm font-medium">{formatNumber(item.views)} views ({item.percentage}%)</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
