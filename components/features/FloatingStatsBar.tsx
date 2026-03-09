'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  coins: number;
  gems: number;
  streak: number;
  rank: string;
}

export default function FloatingStatsBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const stats: UserStats = {
    level: 15,
    xp: 2450,
    xpToNext: 3000,
    coins: 1250,
    gems: 50,
    streak: 7,
    rank: 'Diamond'
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      ref={dragRef}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed z-40 cursor-move"
      style={{ 
        left: position.x, 
        top: position.y,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Collapsed Bar */}
      {!isExpanded && (
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-full px-4 py-2 shadow-lg flex items-center gap-3"
          onClick={() => setIsExpanded(true)}
        >
          {/* Level Badge */}
          <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
            <span className="text-yellow-400 font-bold text-sm">Lv.{stats.level}</span>
          </div>
          
          {/* XP Bar Mini */}
          <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
              style={{ width: `${(stats.xp / stats.xpToNext) * 100}%` }}
            />
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">🪙{stats.coins}</span>
            <span className="text-blue-300 text-sm">💎{stats.gems}</span>
            <span className="text-orange-400 text-sm">🔥{stats.streak}</span>
          </div>
        </motion.div>
      )}

      {/* Expanded Panel */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-b from-violet-900 to-purple-900 rounded-2xl shadow-2xl w-64 overflow-hidden"
        >
          {/* Header */}
          <div 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 cursor-grab active:cursor-grabbing"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">⚔️</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Player Stats</p>
                  <p className="text-yellow-200 text-xs">Rank: {stats.rank}</p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="text-white/70 hover:text-white"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Level Progress */}
          <div className="p-4 border-b border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-bold">Level {stats.level}</span>
              <span className="text-violet-300 text-sm">{stats.xp} / {stats.xpToNext} XP</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(stats.xp / stats.xpToNext) * 100}%` }}
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
              />
            </div>
            <p className="text-violet-300 text-xs mt-2">
              {(stats.xpToNext - stats.xp)} XP to Level {stats.level + 1}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="p-4 grid grid-cols-2 gap-3">
            <div className="bg-yellow-500/20 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">🪙</p>
              <p className="text-yellow-400 font-bold">{stats.coins}</p>
              <p className="text-violet-300 text-xs">Coins</p>
            </div>
            <div className="bg-blue-500/20 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">💎</p>
              <p className="text-blue-400 font-bold">{stats.gems}</p>
              <p className="text-violet-300 text-xs">Gems</p>
            </div>
            <div className="bg-orange-500/20 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">🔥</p>
              <p className="text-orange-400 font-bold">{stats.streak}</p>
              <p className="text-violet-300 text-xs">Day Streak</p>
            </div>
            <div className="bg-purple-500/20 rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">🏆</p>
              <p className="text-purple-400 font-bold">#{42}</p>
              <p className="text-violet-300 text-xs">Global Rank</p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <button className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 py-2 rounded-lg text-sm font-medium">
              Daily
            </button>
            <button className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-2 rounded-lg text-sm font-medium">
              Battle Pass
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
