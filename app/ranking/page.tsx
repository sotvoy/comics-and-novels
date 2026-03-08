'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const rankings = {
  comics: [
    { rank: 1, slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', points: 1250000 },
    { rank: 2, slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', points: 980000 },
    { rank: 3, slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', points: 870000 },
    { rank: 4, slug: 'noblesse', title: 'Noblesse', cover: 'https://picsum.photos/seed/noblesse/300/450', author: 'Son JaeHo', points: 750000 },
    { rank: 5, slug: 'god-of-high-school', title: 'The God of High School', cover: 'https://picsum.photos/seed/godhs/300/450', author: 'Yongje Park', points: 620000 },
    { rank: 6, slug: 'sweet-home', title: 'Sweet Home', cover: 'https://picsum.photos/seed/sweet/300/450', author: 'Kim Carnby', points: 550000 },
    { rank: 7, slug: 'lookism', title: 'Lookism', cover: 'https://picsum.photos/seed/lookism/300/450', author: 'Park Hye-jin', points: 480000 },
    { rank: 8, slug: 'the-begin-after-the-end', title: 'The Beginning After The End', cover: 'https://picsum.photos/seed/tbate/300/450', author: 'TurtleMe', points: 420000 },
  ],
  novels: [
    { rank: 1, slug: 'lunar-star', title: 'Lunar Star', cover: 'https://picsum.photos/seed/lunar/300/450', author: 'Kakao', points: 950000 },
    { rank: 2, slug: 'dragon-ascension', title: 'Dragon Ascension', cover: 'https://picsum.photos/seed/dragon/300/450', author: 'Webnovel', points: 780000 },
    { rank: 3, slug: 'rebirth-throne', title: 'Rebirth of the Divine Throne', cover: 'https://picsum.photos/seed/rebirth/300/450', author: 'MTT', points: 650000 },
    { rank: 4, slug: 'martial-peak', title: 'Martial Peak', cover: 'https://picsum.photos/seed/martial/300/450', author: 'Kuang Shang', points: 520000 },
    { rank: 5, slug: 'lord-of-mysteries', title: 'Lord of the Mysteries', cover: 'https://picsum.photos/seed/lotm/300/450', author: 'Cuttlefish', points: 450000 },
  ],
};

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState('comics');
  const [timeFilter, setTimeFilter] = useState('all');

  const currentRanking = rankings[activeTab as keyof typeof rankings];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
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

      <div className="p-4">
        {/* Time Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
          {[
            { id: 'all', label: 'All Time' },
            { id: 'year', label: 'This Year' },
            { id: 'month', label: 'This Month' },
            { id: 'week', label: 'This Week' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setTimeFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${
                timeFilter === filter.id
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Top 3 */}
        <div className="flex justify-center items-end gap-2 mb-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-28 rounded-lg overflow-hidden mb-2 border-2 border-gray-300">
              <Image src={currentRanking[1].cover} alt={currentRanking[1].title} fill className="object-cover" />
            </div>
            <span className="text-2xl">🥈</span>
            <p className="text-xs font-medium text-center mt-1 line-clamp-1 w-20">{currentRanking[1].title}</p>
            <p className="text-xs text-gray-500">{currentRanking[1].points.toLocaleString()}</p>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-4">
            <div className="relative w-24 h-36 rounded-lg overflow-hidden mb-2 border-2 border-yellow-400 shadow-lg shadow-yellow-400/30">
              <Image src={currentRanking[0].cover} alt={currentRanking[0].title} fill className="object-cover" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">👑</div>
            </div>
            <span className="text-3xl">🥇</span>
            <p className="text-sm font-bold text-center mt-1 line-clamp-1 w-24">{currentRanking[0].title}</p>
            <p className="text-xs text-gray-500">{currentRanking[0].points.toLocaleString()}</p>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-28 rounded-lg overflow-hidden mb-2 border-2 border-amber-600">
              <Image src={currentRanking[2].cover} alt={currentRanking[2].title} fill className="object-cover" />
            </div>
            <span className="text-2xl">🥉</span>
            <p className="text-xs font-medium text-center mt-1 line-clamp-1 w-20">{currentRanking[2].title}</p>
            <p className="text-xs text-gray-500">{currentRanking[2].points.toLocaleString()}</p>
          </div>
        </div>

        {/* Ranking List */}
        <div className="space-y-3">
          {currentRanking.slice(3).map((item) => (
            <Link key={item.rank} href={`/series/${item.slug}`} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <span className="w-8 text-center font-bold text-gray-400">#{item.rank}</span>
              <div className="relative w-14 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.cover} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.author}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-red-500">{item.points.toLocaleString()}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
