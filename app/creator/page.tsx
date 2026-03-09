'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const stats = {
  views: 125000,
  likes: 45000,
  followers: 1234,
  earnings: 250,
};

const mySeries = [
  { id: '1', slug: 'my-series-1', title: 'My Comic Series', cover: 'https://picsum.photos/seed/my1/300/450', chapters: 25, status: 'ongoing', views: 50000 },
  { id: '2', slug: 'my-series-2', title: 'The Hero Returns', cover: 'https://picsum.photos/seed/my2/300/450', chapters: 50, status: 'ongoing', views: 75000 },
];

const recentChapters = [
  { id: '1', series: 'My Comic Series', title: 'Chapter 25', views: 5000, date: '2 hours ago' },
  { id: '2', series: 'The Hero Returns', title: 'Chapter 50', views: 7500, date: '1 day ago' },
];

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 pt-20">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full border-4 border-white/30 overflow-hidden">
            <Image src="https://picsum.photos/seed/creator/200/200" alt="Creator" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Creator Studio</h1>
            <p className="text-white/80">@SOT VOY</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 p-4 -mt-8">
        {[
          { label: 'Views', value: '125K', icon: Icons.Eye },
          { label: 'Likes', value: '45K', icon: Icons.Heart },
          { label: 'Followers', value: '1.2K', icon: Icons.Profile },
          { label: 'Earnings', value: '$250', icon: Icons.Wallet },
        ].map((stat, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-center">
            <stat.icon className="w-5 h-5 mx-auto mb-1 text-red-500" />
            <p className="font-bold">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto hide-scrollbar">
          {['overview', 'series', 'chapters', 'analytics', 'earnings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[80px] py-3 text-xs font-medium border-b-2 capitalize ${
                activeTab === tab
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/creator/create" className="flex items-center gap-3 p-4 bg-red-500 text-white rounded-xl">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icons.Plus />
                </div>
                <div>
                  <p className="font-semibold">New Series</p>
                  <p className="text-xs text-white/80">Create comic/novel</p>
                </div>
              </Link>
              <Link href="/publish-art" className="flex items-center gap-3 p-4 bg-blue-500 text-white rounded-xl">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icons.Edit />
                </div>
                <div>
                  <p className="font-semibold">Publish Art</p>
                  <p className="text-xs text-white/80">Upload artwork</p>
                </div>
              </Link>
            </div>

            {/* My Series */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">My Series</h2>
                <Link href="/creator/series" className="text-sm text-red-500">See all</Link>
              </div>
              <div className="space-y-3">
                {mySeries.map((series) => (
                  <Link key={series.id} href={`/creator/series/${series.id}`} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <div className="relative w-16 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={series.cover} alt={series.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-1">{series.title}</h3>
                      <p className="text-xs text-gray-500">{series.chapters} chapters • {series.views.toLocaleString()} views</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-green-500 text-white text-xs rounded">{series.status}</span>
                    </div>
                    <Icons.ArrowRight />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Chapters */}
            <div>
              <h2 className="font-semibold mb-3">Recent Chapters</h2>
              <div className="space-y-2">
                {recentChapters.map((chapter) => (
                  <div key={chapter.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <div>
                      <p className="text-sm font-medium">{chapter.series}</p>
                      <p className="text-xs text-gray-500">{chapter.title} • {chapter.views.toLocaleString()} views</p>
                    </div>
                    <span className="text-xs text-gray-400">{chapter.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'series' && (
          <div className="grid grid-cols-2 gap-4">
            {mySeries.map((series) => (
              <Link key={series.id} href={`/creator/series/${series.id}`} className="block">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                  <Image src={series.cover} alt={series.title} fill className="object-cover" />
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{series.title}</h3>
                <p className="text-xs text-gray-500">{series.chapters} chapters</p>
              </Link>
            ))}
            <Link href="/creator/new" className="flex flex-col items-center justify-center aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-red-500">
              <Icons.Plus />
              <span className="text-sm mt-2">New Series</span>
            </Link>
          </div>
        )}

        {activeTab === 'chapters' && (
          <div className="space-y-3">
            {recentChapters.map((chapter) => (
              <div key={chapter.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div>
                  <p className="text-sm font-medium">{chapter.series}</p>
                  <p className="text-xs text-gray-500">{chapter.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{chapter.views.toLocaleString()} views</span>
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                    <Icons.Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.Chart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold mb-2">Analytics Coming Soon</h3>
            <p className="text-sm text-gray-500">Detailed analytics will be available soon</p>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl">
              <p className="text-sm">Total Earnings</p>
              <p className="text-3xl font-bold">$250.00</p>
              <p className="text-xs text-white/80">This month</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <span className="text-sm">Chapter 25</span>
                <span className="font-medium">$50.00</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <span className="text-sm">Chapter 50</span>
                <span className="font-medium">$75.00</span>
              </div>
            </div>
            <button className="w-full py-3 bg-red-500 text-white rounded-xl font-medium">Withdraw Earnings</button>
          </div>
        )}
      </div>
    </div>
  );
}
