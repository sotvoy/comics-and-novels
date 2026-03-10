'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icons from '@/components/ui/Icons';

interface Reward {
  day: number;
  reward: string;
  icon: string;
  claimed: boolean;
  locked: boolean;
}

const rewards: Reward[] = [
  { day: 1, reward: '100 Coins', icon: '🪙', claimed: false, locked: false },
  { day: 2, reward: '50 Gems', icon: '💎', claimed: false, locked: false },
  { day: 3, reward: '200 XP', icon: '⚡', claimed: false, locked: false },
  { day: 4, reward: '150 Coins', icon: '🪙', claimed: false, locked: false },
  { day: 5, reward: 'Premium Badge', icon: '🏆', claimed: false, locked: false },
  { day: 6, reward: '100 Gems', icon: '💎', claimed: false, locked: true },
  { day: 7, reward: '500 Coins + VIP', icon: '👑', claimed: false, locked: true },
];

const STREAK_STREAMS = [
  { day: 1, hours: 12, viewers: '2.5K' },
  { day: 2, hours: 8, viewers: '1.8K' },
  { day: 3, hours: 15, viewers: '3.2K' },
  { day: 4, hours: 10, viewers: '2.1K' },
  { day: 5, hours: 6, viewers: '1.5K' },
];

export default function DailyRewardsPage() {
  const [currentDay, setCurrentDay] = useState(1);
  const [coins, setCoins] = useState(1250);
  const [gems, setGems] = useState(150);
  const [xp, setXp] = useState(12500);
  const [level, setLevel] = useState(25);
  const [claimAnimation, setClaimAnimation] = useState<number | null>(null);

  const handleClaim = (day: number) => {
    if (day > currentDay || rewards[day - 1].claimed) return;
    
    setClaimAnimation(day);
    setTimeout(() => {
      setClaimAnimation(null);
      setCurrentDay(Math.min(currentDay + 1, 7));
      // Update currencies
      if (rewards[day - 1].icon === '🪙') setCoins(c => c + 100 * day);
      if (rewards[day - 1].icon === '💎') setGems(g => g + 50 * day);
      if (rewards[day - 1].icon === '⚡') setXp(x => x + 200 * day);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/profile" className="p-2 bg-white/10 rounded-lg">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Daily Rewards</h1>
          <div className="w-10" />
        </div>

        {/* User Stats */}
        <div className="flex items-center justify-around bg-white/10 rounded-2xl p-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{coins.toLocaleString()}</p>
            <p className="text-xs text-white/70">🪙 Coins</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-300">{gems}</p>
            <p className="text-xs text-white/70">💎 Gems</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-300">Lv.{level}</p>
            <p className="text-xs text-white/70">⚡ XP</p>
          </div>
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">7-Day Login Streak</h2>
        <div className="grid grid-cols-7 gap-2">
          {rewards.map((reward) => (
            <button
              key={reward.day}
              onClick={() => handleClaim(reward.day)}
              disabled={reward.claimed || reward.locked}
              className={`relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                reward.claimed 
                  ? 'bg-green-500/20 border-2 border-green-500' 
                  : reward.locked
                  ? 'bg-gray-700/50 border-2 border-gray-600 opacity-50'
                  : reward.day === currentDay
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-yellow-400 animate-pulse'
                  : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
              }`}
            >
              <span className="text-2xl mb-1">{reward.icon}</span>
              <span className="text-xs font-bold">Day {reward.day}</span>
              {reward.claimed && (
                <div className="absolute top-1 right-1 text-green-400">
                  <Icons.CheckCircle className="w-4 h-4" />
                </div>
              )}
              {claimAnimation === reward.day && (
                <div className="absolute inset-0 bg-white/30 animate-ping rounded-xl" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Current Reward */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30">
          <h3 className="text-center text-sm text-yellow-300 mb-2">TODAY'S REWARD</h3>
          <div className="text-center">
            <p className="text-4xl mb-2">{rewards[currentDay - 1].icon}</p>
            <p className="text-2xl font-bold">{rewards[currentDay - 1].reward}</p>
          </div>
          {!rewards[currentDay - 1].claimed && (
            <button
              onClick={() => handleClaim(currentDay)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold text-black hover:from-yellow-400 hover:to-orange-400 transition-all"
            >
              Claim Now! 🎁
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Reading Streak</h2>
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🔥</span>
              <div>
                <p className="font-bold text-lg">12 Days</p>
                <p className="text-xs text-white/50">Current Streak</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">45 Hours</p>
              <p className="text-xs text-white/50">This Week</p>
            </div>
          </div>
          <div className="flex items-end justify-between h-20 gap-1">
            {STREAK_STREAMS.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t"
                  style={{ height: `${(s.hours / 15) * 100}%` }}
                />
                <span className="text-[10px] mt-1">D{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VIP Banner */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-lg">👑 VIP Membership</p>
            <p className="text-xs text-white/70">Get 2x rewards & exclusive perks!</p>
          </div>
          <Link href="/settings" className="px-4 py-2 bg-white text-purple-600 rounded-lg font-bold">
            Upgrade
          </Link>
        </div>
      </div>
    </div>
  );
}
