'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface DailyReward {
  day: number;
  reward: { type: string; amount: number; icon: string };
  claimed: boolean;
}

const rewards: DailyReward[] = [
  { day: 1, reward: { type: 'coins', amount: 100, icon: '🪙' }, claimed: false },
  { day: 2, reward: { type: 'coins', amount: 150, icon: '🪙' }, claimed: false },
  { day: 3, reward: { type: 'gems', amount: 10, icon: '💎' }, claimed: false },
  { day: 4, reward: { type: 'coins', amount: 200, icon: '🪙' }, claimed: false },
  { day: 5, reward: { type: 'xp', amount: 50, icon: '⭐' }, claimed: false },
  { day: 6, reward: { type: 'gems', amount: 25, icon: '💎' }, claimed: false },
  { day: 7, reward: { type: 'chest', amount: 1, icon: '🎁' }, claimed: false },
];

export default function DailyRewards({ onClose }: { onClose: () => void }) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState<number[]>([]);
  const [streak, setStreak] = useState(3);
  const [totalCoins, setTotalCoins] = useState(1250);
  const [totalGems, setTotalGems] = useState(50);
  const [totalXP, setTotalXP] = useState(450);

  const handleClaim = async () => {
    setClaiming(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const reward = rewards.find(r => r.day === selectedDay);
    if (reward) {
      if (reward.reward.type === 'coins') setTotalCoins(prev => prev + reward.reward.amount);
      if (reward.reward.type === 'gems') setTotalGems(prev => prev + reward.reward.amount);
      if (reward.reward.type === 'xp') setTotalXP(prev => prev + reward.reward.amount);
      if (reward.reward.type === 'chest') alert('🎁 Premium Chest Unlocked!');
    }
    
    setClaimed(prev => [...prev, selectedDay]);
    setClaiming(false);
    
    if (selectedDay < 7) {
      setSelectedDay(selectedDay + 1);
    }
  };

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
        className="bg-gradient-to-b from-violet-900 to-purple-900 rounded-3xl p-6 w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Daily Rewards</h2>
            <p className="text-violet-300 text-sm">7 Day Login Bonus</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <Icons.X className="w-6 h-6" />
          </button>
        </div>

        {/* Streak & Balance */}
        <div className="flex justify-between items-center bg-white/10 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-white font-bold">{streak} Day Streak</p>
              <p className="text-violet-300 text-xs">Keep logging in!</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
              <span>🪙</span>
              <span className="text-yellow-400 font-bold">{totalCoins}</span>
            </div>
            <div className="flex items-center gap-1 bg-blue-500/20 px-3 py-1 rounded-full">
              <span>💎</span>
              <span className="text-blue-400 font-bold">{totalGems}</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {rewards.map((reward) => (
            <button
              key={reward.day}
              onClick={() => !claimed.includes(reward.day) && setSelectedDay(reward.day)}
              disabled={claimed.includes(reward.day)}
              className={`
                relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all
                ${selectedDay === reward.day ? 'bg-yellow-500 scale-110 shadow-lg shadow-yellow-500/50' : ''}
                ${claimed.includes(reward.day) ? 'bg-green-500/50 opacity-50' : 'bg-white/10 hover:bg-white/20'}
                ${reward.day <= streak ? 'ring-2 ring-green-400' : ''}
              `}
            >
              <span className="text-xs text-violet-200">Day {reward.day}</span>
              <span className="text-xl">{reward.reward.icon}</span>
              {claimed.includes(reward.day) && (
                <span className="absolute -top-1 -right-1 text-green-400">✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Selected Reward */}
        <div className="bg-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-300 text-sm">Day {selectedDay} Reward</p>
              <p className="text-3xl font-bold text-white">
                {rewards[selectedDay - 1].reward.amount} {rewards[selectedDay - 1].reward.icon}
              </p>
              <p className="text-violet-300 text-sm capitalize">{rewards[selectedDay - 1].reward.type}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClaim}
              disabled={claimed.includes(selectedDay) || claiming}
              className={`
                px-8 py-3 rounded-xl font-bold text-lg
                ${claimed.includes(selectedDay) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                }
              `}
            >
              {claiming ? 'Claiming...' : claimed.includes(selectedDay) ? 'Claimed!' : 'Claim'}
            </motion.button>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center">
          <p className="text-violet-300 text-sm mb-2">
            {claimed.length}/7 days completed • {(7 - streak) > 0 ? `${7 - streak} days until streak resets` : 'Streak complete!'}
          </p>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(claimed.length / 7) * 100}%` }}
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
