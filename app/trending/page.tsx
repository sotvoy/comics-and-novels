'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const trendingData = {
  comics: [
    { rank: 1, slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', views: '12.5M', trending: 'up' },
    { rank: 2, slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', views: '10.2M', trending: 'up' },
    { rank: 3, slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', views: '9.8M', trending: 'down' },
    { rank: 4, slug: 'lookism', title: 'Lookism', cover: 'https://picsum.photos/seed/lookism/300/450', author: 'Park Hye-jin', views: '8.5M', trending: 'up' },
    { rank: 5, slug: 'sweet-home', title: 'Sweet Home', cover: 'https://picsum.photos/seed/sweet/300/450', author: 'Kim Carnby', views: '7.2M', trending: 'same' },
    { rank: 6, slug: 'god-of-high-school', title: 'The God of High School', cover: 'https://picsum.photos/seed/godhs/300/450', author: 'Yongje Park', views: '6.9M', trending: 'up' },
    { rank: 7, slug: 'unordinary', title: 'UnOrdinary', cover: 'https://picsum.photos/seed/unord/300/450', author: 'Uru-Chan', views: '6.1M', trending: 'down' },
    { rank: 8, slug: 'noblesse', title: 'Noblesse', cover: 'https://picsum.photos/seed/noblesse/300/450', author: 'Son JaeHo', views: '5.8M', trending: 'same' },
  ],
  novels: [
    { rank: 1, slug: 'lunar-star', title: 'Lunar Star', cover: 'https://picsum.photos/seed/lunar/300/450', author: 'Kakao', views: '8.5M', trending: 'up' },
    { rank: 2, slug: 'martial-peak', title: 'Martial Peak', cover: 'https://picsum.photos/seed/martial/300/450', author: 'Kuang Shang', views: '7.2M', trending: 'up' },
    { rank: 3, slug: 'lord-of-mysteries', title: 'Lord of the Mysteries', cover: 'https://picsum.photos/seed/lotm/300/450', author: 'Cuttlefish', views: '6.1M', trending: 'up' },
    { rank: 4, slug: 'dragon-ascension', title: 'Dragon Ascension', cover: 'https://picsum.photos/seed/dragon/300/450', author: 'Webnovel', views: '5.5M', trending: 'down' },
  ],
};

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState('comics');
  const [timeFilter, setTimeFilter] = useState('today');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 pt-20">
        <h1 className="text-2xl font-bold">Trending</h1>
        <p className="text-white/80 text-sm mt-1">See what&apos;s hot right now</p>
      </div>

      {/* Time Filter */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {[
            { id: 'today', label: 'Today' },
            { id: 'week', label: 'This Week' },
            { id: 'month', label: 'This Month' },
            { id: 'all', label: 'All Time' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setTimeFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${
                timeFilter === filter.id
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('comics')}
            className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 ${
              activeTab === 'comics' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'
            }`}
          >
            Comics
          </button>
          <button
            onClick={() => setActiveTab('novels')}
            className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 ${
              activeTab === 'novels' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'
            }`}
          >
            Novels
          </button>
        </div>
      </div>

      {/* Ranking List */}
      <div className="p-4">
        {trendingData[activeTab as keyof typeof trendingData].map((item) => (
          <Link key={item.slug} href={`/series/${item.slug}`} className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl mb-2">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
              item.rank === 1 ? 'bg-yellow-400 text-black' :
              item.rank === 2 ? 'bg-gray-300 text-black' :
              item.rank === 3 ? 'bg-amber-600 text-white' : 'bg-gray-100 dark:bg-gray-800'
            }`}>
              {item.rank}
            </div>
            <div className="relative w-16 aspect-[3/4] rounded overflow-hidden flex-shrink-0">
              <Image src={item.cover} alt={item.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.author}</p>
              <p className="text-xs text-gray-400">{item.views} views</p>
            </div>
            <div className={`text-xs ${item.trending === 'up' ? 'text-green-500' : item.trending === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
              {item.trending === 'up' ? '↑' : item.trending === 'down' ? '↓' : '→'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
