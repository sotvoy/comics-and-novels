'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const followedSeries = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', newChapters: 3, lastRead: 'Chapter 45' },
  { id: '2', slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', newChapters: 1, lastRead: 'Chapter 120' },
  { id: '3', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', newChapters: 2, lastRead: 'Chapter 300' },
  { id: '4', slug: 'noblesse', title: 'Noblesse', cover: 'https://picsum.photos/seed/noblesse/300/450', author: 'Son JaeHo', newChapters: 0, lastRead: 'Chapter 545' },
];

const followedCreators = [
  { id: '1', username: 'Chugong', avatar: 'https://picsum.photos/seed/cg/200/200', series: 3, followers: 500000 },
  { id: '2', username: 'SIU', avatar: 'https://picsum.photos/seed/siu/200/200', series: 1, followers: 300000 },
];

export default function FollowingPage() {
  const [activeTab, setActiveTab] = useState('series');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('series')}
            className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 ${
              activeTab === 'series' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'
            }`}
          >
            Series
          </button>
          <button
            onClick={() => setActiveTab('creators')}
            className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 ${
              activeTab === 'creators' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'
            }`}
          >
            Creators
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'series' && (
          <div className="space-y-3">
            {followedSeries.map((series) => (
              <Link key={series.id} href={`/series/${series.slug}`} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div className="relative w-16 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={series.cover} alt={series.title} fill className="object-cover" />
                  {series.newChapters > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {series.newChapters}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm line-clamp-1">{series.title}</h3>
                  <p className="text-xs text-gray-500">{series.author}</p>
                  <p className="text-xs text-gray-400 mt-1">{series.lastRead}</p>
                </div>
                <Icons.ArrowRight className="text-gray-400" />
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'creators' && (
          <div className="space-y-3">
            {followedCreators.map((creator) => (
              <div key={creator.id} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={creator.avatar} alt={creator.username} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">@{creator.username}</h3>
                  <p className="text-xs text-gray-500">{creator.series} series • {(creator.followers / 1000).toFixed(0)}K followers</p>
                </div>
                <button className="px-4 py-2 bg-red-500 text-white text-xs font-medium rounded-full">Following</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
