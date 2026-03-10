'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icons from '@/components/ui/Icons';

interface BattlePassTier {
  tier: number;
  freeReward: string;
  freeIcon: string;
  premiumReward: string;
  premiumIcon: string;
  unlocked: boolean;
}

const tiers: BattlePassTier[] = [
  { tier: 1, freeReward: '100 Coins', freeIcon: '🪙', premiumReward: '200 Coins', premiumIcon: '🪙', unlocked: true },
  { tier: 2, freeReward: '50 Gems', freeIcon: '💎', premiumReward: '100 Gems', premiumIcon: '💎', unlocked: true },
  { tier: 3, freeReward: '100 XP', freeIcon: '⚡', premiumReward: '250 XP', premiumIcon: '⚡', unlocked: true },
  { tier: 4, freeReward: '150 Coins', freeIcon: '🪙', premiumReward: '300 Coins', premiumIcon: '🪙', unlocked: true },
  { tier: 5, freeReward: '75 Gems', freeIcon: '💎', premiumReward: '150 Gems + Badge', premiumIcon: '🏆', unlocked: true },
  { tier: 6, freeReward: '200 XP', freeIcon: '⚡', premiumReward: '500 XP', premiumIcon: '⚡', unlocked: false },
  { tier: 7, freeReward: '200 Coins', freeIcon: '🪙', premiumReward: '400 Coins', premiumIcon: '🪙', unlocked: false },
  { tier: 8, freeReward: '100 Gems', freeIcon: '💎', premiumReward: '200 Gems', premiumIcon: '💎', unlocked: false },
  { tier: 9, freeReward: '300 XP', freeIcon: '⚡', premiumReward: '750 XP', premiumIcon: '⚡', unlocked: false },
  { tier: 10, freeReward: '250 Coins', freeIcon: '🪙', premiumReward: '500 Coins + VIP', premiumIcon: '👑', unlocked: false },
];

export default function BattlePassPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [currentXP, setCurrentXP] = useState(4500);
  const maxXP = 10000;
  const level = Math.floor(currentXP / 1000) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/profile" className="p-2 bg-white/10 rounded-lg">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Battle Pass</h1>
          <button className="px-3 py-1 bg-white/20 rounded-lg text-sm">
            Season 3
          </button>
        </div>

        {/* Season Progress */}
        <div className="bg-black/30 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold">Level {level}</span>
            <span className="text-sm text-white/70">{currentXP} / {maxXP} XP</span>
          </div>
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all"
              style={{ width: `${(currentXP / maxXP) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/50">
            <span>Season Ends: 15 days</span>
            <span>Premium: $4.99/mo</span>
          </div>
        </div>
      </div>

      {/* Premium Toggle */}
      <div className="p-4">
        <button 
          onClick={() => setIsPremium(!isPremium)}
          className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${
            isPremium 
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
              : 'bg-white/10 border border-white/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👑</span>
            <div className="text-left">
              <p className="font-bold">Premium Pass</p>
              <p className="text-xs text-white/70">Unlock premium rewards</p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors ${isPremium ? 'bg-green-500' : 'bg-gray-600'}`}>
            <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${isPremium ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </div>
        </button>
      </div>

      {/* Tiers */}
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-bold mb-4">Season Rewards</h2>
        {tiers.map((tier) => (
          <div 
            key={tier.tier}
            className={`relative p-4 rounded-2xl border-2 transition-all ${
              tier.unlocked 
                ? 'bg-white/10 border-yellow-500/50' 
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            {/* Tier Number */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-700">
              {tier.tier}
            </div>

            <div className="flex items-center justify-between pl-6">
              {/* Free Reward */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tier.freeIcon}</span>
                <div>
                  <p className="font-bold text-sm">{tier.freeReward}</p>
                  <p className="text-xs text-white/50">Free</p>
                </div>
              </div>

              {/* VS */}
              <span className="text-white/30 text-xs">VS</span>

              {/* Premium Reward */}
              <div className={`flex items-center gap-2 ${isPremium ? '' : 'opacity-50'}`}>
                <span className="text-2xl">{tier.premiumIcon}</span>
                <div>
                  <p className="font-bold text-sm">{tier.premiumReward}</p>
                  <p className="text-xs text-yellow-300">Premium</p>
                </div>
                {isPremium && tier.unlocked && (
                  <Icons.CheckCircle className="w-5 h-5 text-green-400" />
                )}
              </div>
            </div>

            {tier.unlocked && (
              <div className="absolute top-2 right-2">
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Unlocked</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Missions */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Daily Missions</h2>
        <div className="space-y-3">
          {[
            { task: 'Read 3 chapters', progress: 2, max: 3, xp: 100 },
            { task: 'Like 5 series', progress: 5, max: 5, xp: 50 },
            { task: 'Share to social', progress: 0, max: 1, xp: 25 },
          ].map((mission, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{mission.task}</span>
                <span className="text-yellow-400 text-sm">+{mission.xp} XP</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                  style={{ width: `${(mission.progress / mission.max) * 100}%` }}
                />
              </div>
              <p className="text-xs text-white/50 mt-1">{mission.progress}/{mission.max}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA */}
      <div className="p-4">
        <Link 
          href="/settings" 
          className="block w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl text-center font-bold text-black"
        >
          Get Premium - $4.99/mo 🎖️
        </Link>
      </div>
    </div>
  );
}
