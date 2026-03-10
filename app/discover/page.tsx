'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const trendingSeries = [
  { id: 1, slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', views: '2.5M', type: 'comic' },
  { id: 2, slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', views: '2.1M', type: 'comic' },
  { id: 3, slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', views: '1.8M', type: 'comic' },
  { id: 4, slug: 'lunar-star', title: 'Lunar Star', cover: 'https://picsum.photos/seed/lunar/300/450', author: 'Kakao', views: '1.5M', type: 'novel' },
];

const categories = [
  { id: 'ranking', label: 'Ranking', icon: 'Trophy', href: '/ranking', color: 'bg-yellow-500' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'Leaderboard', href: '/leaderboard', color: 'bg-blue-500' },
  { id: 'trending', label: 'Trending', icon: 'Trending', href: '/trending', color: 'bg-red-500' },
  { id: 'shorts', label: 'Shorts', icon: 'Shorts', href: '/shorts', color: 'bg-purple-500' },
  { id: 'events', label: 'Events', icon: 'Calendar', href: '/events', color: 'bg-green-500' },
  { id: 'news', label: 'News', icon: 'Newspaper', href: '/news', color: 'bg-orange-500' },
  { id: 'community', label: 'Community', icon: 'Group', href: '/community', color: 'bg-pink-500' },
];

const genres = [
  'Action', 'Romance', 'Fantasy', 'Sci-Fi', 'Horror', 'Comedy', 
  'Drama', 'Mystery', 'Adventure', 'Slice of Life', 'Sports', 'Music'
];

export default function DiscoverPage() {
  const [activeGenre, setActiveGenre] = useState('All');
  const allGenres = ['All', ...genres];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <h1 className="text-xl font-bold">Discover</h1>
      </div>

      {/* Quick Access Cards */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link key={cat.id} href={cat.href} className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mb-2`}>
                {cat.icon === 'Trophy' && <Icons.Trophy className="w-7 h-7 text-white" />}
                {cat.icon === 'Leaderboard' && <Icons.Leaderboard className="w-7 h-7 text-white" />}
                {cat.icon === 'Trending' && <Icons.Trending className="w-7 h-7 text-white" />}
                {cat.icon === 'Shorts' && <Icons.Shorts className="w-7 h-7 text-white" />}
                {cat.icon === 'Calendar' && <Icons.Calendar className="w-7 h-7 text-white" />}
                {cat.icon === 'Newspaper' && <Icons.Newspaper className="w-7 h-7 text-white" />}
                {cat.icon === 'Group' && <Icons.Globe className="w-7 h-7 text-white" />}
              </div>
              <span className="text-xs font-medium">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Genre Pills */}
      <div className="px-4 pb-3 overflow-x-auto">
        <div className="flex gap-2">
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeGenre === genre 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Trending Now</h2>
          <Link href="/trending" className="text-sm text-red-500 font-medium">See All</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {trendingSeries.map((series) => (
            <Link key={series.id} href={`/series/${series.slug}`} className="group">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                <Image 
                  src={series.cover} 
                  alt={series.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                  #{series.id}
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                  {series.views}
                </div>
              </div>
              <h3 className="font-semibold text-sm truncate">{series.title}</h3>
              <p className="text-xs text-gray-500">{series.author}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Gaming Section */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Gaming Rewards</h2>
          <Link href="/daily-rewards" className="text-sm text-red-500 font-medium">See All</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/daily-rewards" className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
            <Icons.Rewards className="w-8 h-8 mb-2" />
            <div className="font-bold">Daily Rewards</div>
            <div className="text-sm opacity-90">Claim your coins</div>
          </Link>
          <Link href="/battle-pass" className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
            <Icons.BattlePass className="w-8 h-8 mb-2" />
            <div className="font-bold">Battle Pass</div>
            <div className="text-sm opacity-90">Earn rewards</div>
          </Link>
          <Link href="/quests" className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-4 text-white">
            <Icons.Target className="w-8 h-8 mb-2" />
            <div className="font-bold">Quests</div>
            <div className="text-sm opacity-90">Complete missions</div>
          </Link>
          <Link href="/achievements" className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
            <Icons.Trophy className="w-8 h-8 mb-2" />
            <div className="font-bold">Achievements</div>
            <div className="text-sm opacity-90">Earn badges</div>
          </Link>
        </div>
      </div>

      {/* Top Creators */}
      <div className="px-4 mt-6 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Top Creators</h2>
          <Link href="/community" className="text-sm text-red-500 font-medium">See All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="flex flex-col items-center min-w-[80px]">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 mb-2" />
              <span className="text-sm font-medium">Creator {i}</span>
              <span className="text-xs text-gray-500">10K followers</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
