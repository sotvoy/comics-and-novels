'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

// Demo data
const categories = [
  { id: 'all', label: 'All' },
  { id: 'foryou', label: 'For You' },
  { id: 'top', label: 'Top' },
  { id: 'new', label: 'New' },
  { id: 'recent', label: 'Recent' },
  { id: 'popular', label: 'Popular' },
  { id: 'ranking', label: 'Ranking' },
  { id: 'news', label: 'News' },
  { id: 'post', label: 'Post' },
  { id: 'community', label: 'Community' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'trending', label: 'Trending' },
];

// Daily Rewards Data
const dailyRewards = [
  { day: 1, reward: 10, claimed: true },
  { day: 2, reward: 20, claimed: true },
  { day: 3, reward: 30, claimed: true },
  { day: 4, reward: 50, claimed: false },
  { day: 5, reward: 100, claimed: false },
  { day: 6, reward: 150, claimed: false },
  { day: 7, reward: 300, claimed: false },
];

// Battle Pass Data
const battlePass = {
  level: 15,
  xp: 2500,
  maxXp: 3000,
  premium: true,
  rewards: [
    { level: 1, claimed: true },
    { level: 2, claimed: true },
    { level: 3, claimed: false },
  ]
};

const demoSeries = [
  {
    id: '1',
    slug: 'solo-leveling',
    title: 'Solo Leveling',
    cover: 'https://picsum.photos/seed/solo/300/450',
    author: 'Chugong',
    chapters: 179,
    likes: 125000,
    comments: 45000,
    type: 'comic' as const,
  },
  {
    id: '2',
    slug: 'omniscient-reader',
    title: 'Omniscient Reader\'s Viewpoint',
    cover: 'https://picsum.photos/seed/omni/300/450',
    author: 'Sing-Shong',
    chapters: 180,
    likes: 98000,
    comments: 32000,
    type: 'comic' as const,
  },
  {
    id: '3',
    slug: 'tower-of-god',
    title: 'Tower of God',
    cover: 'https://picsum.photos/seed/tower/300/450',
    author: 'SIU',
    chapters: 580,
    likes: 156000,
    comments: 67000,
    type: 'comic' as const,
  },
  {
    id: '4',
    slug: 'lunar-star',
    title: 'Lunar Star',
    cover: 'https://picsum.photos/seed/lunar/300/450',
    author: 'Kakao',
    chapters: 120,
    likes: 45000,
    comments: 12000,
    type: 'novel' as const,
  },
  {
    id: '5',
    slug: 'dragon-ascension',
    title: 'Dragon Ascension',
    cover: 'https://picsum.photos/seed/dragon/300/450',
    author: 'Webnovel',
    chapters: 250,
    likes: 78000,
    comments: 21000,
    type: 'novel' as const,
  },
  {
    id: '6',
    slug: 'rebirth-throne',
    title: 'Rebirth of the Divine Throne',
    cover: 'https://picsum.photos/seed/rebirth/300/450',
    author: 'MTT',
    chapters: 200,
    likes: 89000,
    comments: 28000,
    type: 'novel' as const,
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const timeAgo = (date: Date) => {
  const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDailyRewards, setShowDailyRewards] = useState(false);
  const [showBattlePass, setShowBattlePass] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Category Pills - YouTube Style */}
      <div className="sticky top-14 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-pill whitespace-nowrap ${
                selectedCategory === category.id ? 'active' : ''
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Daily Rewards Banner - Genshin/PUBG Style */}
        <section className="mb-6">
          <div 
            onClick={() => setShowDailyRewards(true)}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-4 cursor-pointer"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-10 -translate-y-10" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16" />
            </div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Daily Rewards</p>
                <h3 className="text-white font-bold text-lg">Claim Your Free Coins!</h3>
                <p className="text-white/60 text-xs mt-1">Day 4 of 7 • 50 coins ready</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎁</span>
              </div>
            </div>
          </div>
        </section>

        {/* Battle Pass Banner - Mobile Legends Style */}
        <section className="mb-6">
          <div 
            onClick={() => setShowBattlePass(true)}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 p-4 cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">PREMIUM</span>
                <span className="text-white/80 text-xs">Level {battlePass.level}</span>
              </div>
              <h3 className="text-white font-bold text-lg">Battle Pass Season 1</h3>
              <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(battlePass.xp / battlePass.maxXp) * 100}%` }} />
              </div>
              <p className="text-white/60 text-xs mt-1">{battlePass.xp}/{battlePass.maxXp} XP</p>
            </div>
          </div>
        </section>

        {/* Featured Carousel */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Featured</h2>
          <div className="flex gap-4 overflow-x-auto carousel-container pb-2 hide-scrollbar">
            {demoSeries.slice(0, 3).map((series, index) => (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="carousel-item flex-shrink-0 w-72"
              >
                <Link href={`/series/${series.slug}`}>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs rounded">
                        {series.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-1">{series.title}</h3>
                  <p className="text-xs text-gray-500">{series.author}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* New Chapters from Followed */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">New Chapters</h2>
            <Link href="/following" className="text-sm text-red-500 font-medium">
              See all
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto carousel-container pb-2 hide-scrollbar">
            {demoSeries.slice(0, 4).map((series, index) => (
              <motion.div
                key={`new-${series.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="carousel-item flex-shrink-0 w-40"
              >
                <Link href={`/series/${series.slug}`}>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-xs line-clamp-2">{series.title}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recently Added</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full">
                Recent
              </button>
              <button className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full">
                Completed
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto carousel-container pb-2 hide-scrollbar">
            {demoSeries.map((series, index) => (
              <motion.div
                key={`recent-${series.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="carousel-item flex-shrink-0 w-36"
              >
                <Link href={`/series/${series.slug}`}>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 series-card">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-xs line-clamp-2">{series.title}</h3>
                  <p className="text-xs text-gray-500">{series.chapters} ch</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Popular Now</h2>
            <Link href="/search?sort=popular" className="text-sm text-red-500 font-medium">
              More
            </Link>
          </div>
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 xs:gap-2 sm:gap-4">
            {demoSeries.slice(0, 6).map((series, index) => (
              <motion.div
                key={`popular-${series.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/series/${series.slug}`} className="flex gap-2 sm:gap-3">
                  <div className="relative w-16 xs:w-16 sm:w-20 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <h3 className="font-medium text-xs sm:text-sm line-clamp-2">{series.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{series.author}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-0.5">
                        <Icons.Heart className="w-3 h-3" /> {formatNumber(series.likes)}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Icons.Comment className="w-3 h-3" /> {formatNumber(series.comments)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Latest Updates */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Latest Updates</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                Hot
              </button>
              <button className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full">
                New
              </button>
            </div>
          </div>
          <div className="space-y-3 xs:space-y-2 sm:space-y-4">
            {demoSeries.map((series, index) => (
              <motion.div
                key={`latest-${series.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/series/${series.slug}`} className="flex gap-2 sm:gap-3">
                  <div className="relative w-20 xs:w-20 sm:w-24 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-0.5 xs:py-1">
                    <h3 className="font-semibold text-sm line-clamp-1">{series.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{series.author}</p>
                    <p className="text-xs text-gray-400 mt-1">Chapter {series.chapters - 5}</p>
                    <div className="flex items-center gap-2 xs:gap-3 mt-1 xs:mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-0.5">
                        <Icons.Heart className="w-3 h-3" /> {formatNumber(series.likes)}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Icons.Comment className="w-3 h-3" /> {formatNumber(series.comments)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start pt-1">
                    <span className="text-xs text-gray-400">{timeAgo(new Date())}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Daily Rewards Modal */}
      {showDailyRewards && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setShowDailyRewards(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Daily Rewards</h2>
              <button onClick={() => setShowDailyRewards(false)}><Icons.Close /></button>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dailyRewards.map((day, i) => (
                <div key={i} className={`flex flex-col items-center p-2 rounded-lg ${day.claimed ? 'bg-green-100 dark:bg-green-900/30' : day.reward === 50 ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  <span className="text-xs font-medium">Day {day.day}</span>
                  <span className="text-lg">🪙</span>
                  <span className="text-xs font-bold">{day.reward}</span>
                  {day.claimed && <span className="text-green-500 text-xs">✓</span>}
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl">
              Claim 50 Coins
            </button>
          </div>
        </div>
      )}

      {/* Battle Pass Modal */}
      {showBattlePass && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setShowBattlePass(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Battle Pass</h2>
              <button onClick={() => setShowBattlePass(false)}><Icons.Close /></button>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">PREMIUM</span>
                <span className="text-white/80 text-sm">Level {battlePass.level}</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(battlePass.xp / battlePass.maxXp) * 100}%` }} />
              </div>
              <p className="text-white/60 text-xs mt-1">{battlePass.xp}/{battlePass.maxXp} XP to next level</p>
            </div>
            <div className="space-y-2 mb-4">
              {[1,2,3,4,5].map(level => (
                <div key={level} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">{level}</span>
                    <span className="text-sm">Chapter Unlock</span>
                  </div>
                  <button className={`px-3 py-1 rounded-lg text-xs font-medium ${level <= battlePass.level ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    {level <= battlePass.level ? 'Claimed' : 'Locked'}
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl">
              Upgrade to Premium
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
