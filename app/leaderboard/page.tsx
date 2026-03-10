'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

interface LeaderboardEntry {
  rank: number;
  user: string;
  avatar: string;
  level: number;
  points: number;
  badge?: string;
  isCurrentUser?: boolean;
}

const weeklyLeaders: LeaderboardEntry[] = [
  { rank: 1, user: 'DragonSlayer', avatar: 'https://picsum.photos/seed/d1/100/100', level: 99, points: 15420, badge: '👑' },
  { rank: 2, user: 'MangaKing', avatar: 'https://picsum.photos/seed/m1/100/100', level: 87, points: 14250, badge: '🥈' },
  { rank: 3, user: 'ReaderPro', avatar: 'https://picsum.photos/seed/r1/100/100', level: 75, points: 12800, badge: '🥉' },
  { rank: 4, user: 'OtakuMaster', avatar: 'https://picsum.photos/seed/o1/100/100', level: 68, points: 11200 },
  { rank: 5, user: 'AnimeFan99', avatar: 'https://picsum.photos/seed/a1/100/100', level: 55, points: 9800 },
  { rank: 6, user: 'ComicHero', avatar: 'https://picsum.photos/seed/c1/100/100', level: 52, points: 8900 },
  { rank: 7, user: 'BookWorm', avatar: 'https://picsum.photos/seed/b1/100/100', level: 48, points: 8200 },
  { rank: 8, user: 'NovelNinja', avatar: 'https://picsum.photos/seed/n1/100/100', level: 45, points: 7500 },
  { rank: 9, user: 'ManhwaLover', avatar: 'https://picsum.photos/seed/m2/100/100', level: 42, points: 6800 },
  { rank: 10, user: 'YourName', avatar: 'https://picsum.photos/seed/y1/100/100', level: 25, points: 4500, isCurrentUser: true },
];

const monthlyLeaders = weeklyLeaders.map(l => ({ ...l, points: l.points * 4 }));
const allTimeLeaders = weeklyLeaders.map(l => ({ ...l, points: l.points * 12 }));

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');
  const [category, setCategory] = useState<'reading' | 'uploads' | 'engagement'>('reading');

  const leaders = timeFilter === 'weekly' ? weeklyLeaders : timeFilter === 'monthly' ? monthlyLeaders : allTimeLeaders;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/profile" className="p-2 bg-white/10 rounded-lg">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">🏆 Leaderboard</h1>
          <div className="w-10" />
        </div>

        {/* User Rank Card */}
        <div className="bg-black/30 rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold">
                10
              </div>
              <div className="absolute -bottom-1 -right-1 text-2xl">🎖️</div>
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">Your Rank</p>
              <p className="text-sm text-white/70">Top 15% of all readers</p>
              <p className="text-yellow-400 font-bold">4,500 pts this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4">
        {/* Time Filter */}
        <div className="flex gap-2 mb-4">
          {(['weekly', 'monthly', 'alltime'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                timeFilter === filter
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {filter === 'weekly' ? '📅 This Week' : filter === 'monthly' ? '📆 This Month' : '♾️ All Time'}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          {([
            { id: 'reading', label: '📖 Reading', icon: '📖' },
            { id: 'uploads', label: '📤 Uploads', icon: '📤' },
            { id: 'engagement', label: '💬 Engagement', icon: '💬' },
          ] as const).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex-1 py-2 rounded-lg font-medium text-xs transition-all ${
                category === cat.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="p-4">
        <div className="flex items-end justify-center gap-2 mb-4">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-2xl overflow-hidden">
                <Image src={leaders[1].avatar} alt={leaders[1].user} width={64} height={64} className="object-cover" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs font-bold">2</div>
            </div>
            <p className="font-bold text-sm">{leaders[1].user}</p>
            <p className="text-xs text-white/50">{leaders[1].points.toLocaleString()} pts</p>
            <div className="h-20 bg-gradient-to-t from-gray-400/30 to-transparent rounded-t-lg mt-2" />
          </div>

          {/* 1st Place */}
          <div className="text-center -mt-4">
            <div className="relative mb-2">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl overflow-hidden ring-4 ring-yellow-400/50">
                <Image src={leaders[0].avatar} alt={leaders[0].user} width={80} height={80} className="object-cover" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl">👑</div>
            </div>
            <p className="font-bold">{leaders[0].user}</p>
            <p className="text-xs text-white/50">{leaders[0].points.toLocaleString()} pts</p>
            <div className="h-28 bg-gradient-to-t from-yellow-500/30 to-transparent rounded-t-lg mt-2" />
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-2xl overflow-hidden">
                <Image src={leaders[2].avatar} alt={leaders[2].user} width={64} height={64} className="object-cover" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
            </div>
            <p className="font-bold text-sm">{leaders[2].user}</p>
            <p className="text-xs text-white/50">{leaders[2].points.toLocaleString()} pts</p>
            <div className="h-16 bg-gradient-to-t from-amber-600/30 to-transparent rounded-t-lg mt-2" />
          </div>
        </div>
      </div>

      {/* Rankings List */}
      <div className="p-4">
        <div className="space-y-2">
          {leaders.slice(3).map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                entry.isCurrentUser 
                  ? 'bg-red-500/20 border border-red-500/50' 
                  : 'bg-white/5'
              }`}
            >
              <span className="w-8 text-center font-bold text-white/50">{entry.rank}</span>
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src={entry.avatar} alt={entry.user} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold">{entry.user}</p>
                <p className="text-xs text-white/50">Level {entry.level}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-400">{entry.points.toLocaleString()}</p>
                <p className="text-xs text-white/50">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Info */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-4 border border-purple-500/30">
          <h3 className="font-bold mb-2">🎁 Weekly Rewards</h3>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-yellow-400 font-bold">#1</p>
              <p>500 Gems</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-gray-300 font-bold">#2</p>
              <p>300 Gems</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-amber-600 font-bold">#3</p>
              <p>150 Gems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
