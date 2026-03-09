'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface BattlePassTier {
  tier: number;
  freeReward: { type: string; amount: number; icon: string };
  premiumReward: { type: string; amount: number; icon: string };
  xpRequired: number;
}

const tiers: BattlePassTier[] = [
  { tier: 1, freeReward: { type: 'coins', amount: 100, icon: '🪙' }, premiumReward: { type: 'gems', amount: 10, icon: '💎' }, xpRequired: 0 },
  { tier: 2, freeReward: { type: 'coins', amount: 150, icon: '🪙' }, premiumReward: { type: 'avatar', amount: 1, icon: '👤' }, xpRequired: 1000 },
  { tier: 3, freeReward: { type: 'xp', amount: 200, icon: '⭐' }, premiumReward: { type: 'frame', amount: 1, icon: '🖼️' }, xpRequired: 2000 },
  { tier: 4, freeReward: { type: 'coins', amount: 200, icon: '🪙' }, premiumReward: { type: 'gems', amount: 25, icon: '💎' }, xpRequired: 3000 },
  { tier: 5, freeReward: { type: 'badge', amount: 1, icon: '🏅' }, premiumReward: { type: 'chest', amount: 1, icon: '🎁' }, xpRequired: 4000 },
  { tier: 6, freeReward: { type: 'coins', amount: 250, icon: '🪙' }, premiumReward: { type: 'color', amount: 1, icon: '🎨' }, xpRequired: 5000 },
  { tier: 7, freeReward: { type: 'xp', amount: 300, icon: '⭐' }, premiumReward: { type: 'gems', amount: 50, icon: '💎' }, xpRequired: 6000 },
  { tier: 8, freeReward: { type: 'coins', amount: 300, icon: '🪙' }, premiumReward: { type: 'avatar', amount: 1, icon: '👤' }, xpRequired: 7000 },
  { tier: 9, freeReward: { type: 'badge', amount: 1, icon: '🏅' }, premiumReward: { type: 'frame', amount: 1, icon: '🖼️' }, xpRequired: 8000 },
  { tier: 10, freeReward: { type: 'chest', amount: 1, icon: '🎁' }, premiumReward: { type: 'legendary', amount: 1, icon: '👑' }, xpRequired: 10000 },
];

export default function BattlePass({ onClose }: { onClose: () => void }) {
  const [isPremium, setIsPremium] = useState(false);
  const [currentXP, setCurrentXP] = useState(4500);
  const [claimed, setClaimed] = useState<number[]>([]);

  const handleClaim = (tier: number) => {
    if (!claimed.includes(tier) && currentXP >= tiers[tier - 1].xpRequired) {
      setClaimed([...claimed, tier]);
    }
  };

  const currentTier = tiers.find(t => currentXP >= t.xpRequired) || tiers[0];
  const nextTier = tiers.find(t => t.xpRequired > currentXP) || tiers[tiers.length - 1];
  const progress = ((currentXP - currentTier.xpRequired) / (nextTier.xpRequired - currentTier.xpRequired)) * 100 || 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl">
              ⚔️
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Battle Pass</h2>
              <p className="text-slate-400 text-sm">Season 1: Epic Adventure</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <Icons.X className="w-6 h-6" />
          </button>
        </div>

        {/* Premium Toggle */}
        <div className="flex items-center justify-between bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👑</span>
            <div>
              <p className="text-white font-bold">Premium Pass</p>
              <p className="text-slate-400 text-xs">Unlock exclusive rewards!</p>
            </div>
          </div>
          <button 
            onClick={() => setIsPremium(!isPremium)}
            className={`w-14 h-8 rounded-full transition-colors ${isPremium ? 'bg-green-500' : 'bg-slate-600'}`}
          >
            <motion.div 
              animate={{ x: isPremium ? 24 : 4 }}
              className="w-6 h-6 bg-white rounded-full"
            />
          </button>
        </div>

        {/* XP Progress */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">Level {currentTier.tier}</span>
            <span className="text-yellow-400 font-bold">{currentXP} / {nextTier.xpRequired} XP</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
            />
          </div>
        </div>

        {/* Tiers */}
        <div className="space-y-3">
          {tiers.map((tier) => {
            const isUnlocked = currentXP >= tier.xpRequired;
            const isClaimed = claimed.includes(tier.tier);
            
            return (
              <div 
                key={tier.tier}
                className={`relative rounded-xl overflow-hidden ${isUnlocked ? 'bg-slate-800' : 'bg-slate-800/50'}`}
              >
                {/* Tier Number */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-slate-700 flex flex-col items-center justify-center">
                  <span className={`text-2xl font-bold ${isUnlocked ? 'text-yellow-400' : 'text-slate-500'}`}>
                    {tier.tier}
                  </span>
                </div>

                <div className="pl-20 pr-4 py-3">
                  <div className="flex justify-between items-center">
                    {/* Free Reward */}
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tier.freeReward.icon}</span>
                      <div>
                        <p className="text-slate-400 text-xs">Free</p>
                        <p className="text-white text-sm font-medium">
                          {tier.freeReward.amount} {tier.freeReward.type}
                        </p>
                      </div>
                    </div>

                    {/* Premium Reward */}
                    <div className="flex items-center gap-2">
                      {isPremium && (
                        <>
                          <span className="text-xl">{tier.premiumReward.icon}</span>
                          <div>
                            <p className="text-yellow-400 text-xs">Premium</p>
                            <p className="text-white text-sm font-medium">
                              {tier.premiumReward.amount} {tier.premiumReward.type}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Claim Button */}
                    {isUnlocked && (
                      <button
                        onClick={() => handleClaim(tier.tier)}
                        disabled={isClaimed}
                        className={`px-4 py-2 rounded-lg font-bold text-sm ${
                          isClaimed 
                            ? 'bg-green-500/50 text-green-400' 
                            : 'bg-yellow-500 hover:bg-yellow-400 text-black'
                        }`}
                      >
                        {isClaimed ? '✓' : 'Claim'}
                      </button>
                    )}
                  </div>
                </div>

                {/* XP Required */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <span className="text-xs text-slate-500">{tier.xpRequired} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
