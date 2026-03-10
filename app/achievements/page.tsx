'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const achievements = [
  { id: 1, name: 'First Read', description: 'Read your first comic', icon: 'BookOpen', progress: 100, unlocked: true, rarity: 'Common' },
  { id: 2, name: 'Bookworm', description: 'Read 10 comics', icon: 'BookOpen', progress: 100, unlocked: true, rarity: 'Common' },
  { id: 3, name: 'Bibliophile', description: 'Read 50 comics', icon: 'BookOpen', progress: 60, unlocked: false, rarity: 'Rare' },
  { id: 4, name: 'Master Reader', description: 'Read 100 comics', icon: 'Star', progress: 30, unlocked: false, rarity: 'Epic' },
  { id: 5, name: 'Legendary', description: 'Read 500 comics', icon: 'Trophy', progress: 10, unlocked: false, rarity: 'Legendary' },
  { id: 6, name: 'First Like', description: 'Like your first series', icon: 'Heart', progress: 100, unlocked: true, rarity: 'Common' },
  { id: 7, name: 'Popular', description: 'Get 100 likes on comments', icon: 'Heart', progress: 100, unlocked: true, rarity: 'Common' },
  { id: 8, name: 'Influencer', description: 'Get 1000 likes on comments', icon: 'Star', progress: 45, unlocked: false, rarity: 'Rare' },
  { id: 9, name: 'Social Butterfly', description: 'Follow 10 users', icon: 'Users', progress: 100, unlocked: true, rarity: 'Common' },
  { id: 10, name: 'Community Leader', description: 'Have 50 followers', icon: 'Group', progress: 80, unlocked: false, rarity: 'Epic' },
  { id: 11, name: 'Creator', description: 'Upload your first work', icon: 'Upload', progress: 100, unlocked: true, rarity: 'Common' },
  { id: 12, name: 'Prolific Creator', description: 'Upload 10 works', icon: 'Star', progress: 50, unlocked: false, rarity: 'Rare' },
  { id: 13, name: 'Daily Reader', description: 'Read for 7 days in a row', icon: 'Flame', progress: 100, unlocked: true, rarity: 'Common' },
  { id: 14, name: 'Dedicated Fan', description: 'Read for 30 days in a row', icon: 'Flame', progress: 70, unlocked: false, rarity: 'Epic' },
  { id: 15, name: 'Unstoppable', description: 'Read for 100 days in a row', icon: 'Zap', progress: 20, unlocked: false, rarity: 'Legendary' },
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Common': return 'bg-gray-500';
    case 'Rare': return 'bg-blue-500';
    case 'Epic': return 'bg-purple-500';
    case 'Legendary': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

const getIconComponent = (iconName: string) => {
  const icons: Record<string, JSX.Element> = {
    BookOpen: <Icons.BookOpen className="w-8 h-8" />,
    Star: <Icons.Star className="w-8 h-8" />,
    Trophy: <Icons.Trophy className="w-8 h-8" />,
    Heart: <Icons.Heart className="w-8 h-8" />,
    Users: <Icons.Users className="w-8 h-8" />,
    Group: <Icons.Group className="w-8 h-8" />,
    Upload: <Icons.Upload className="w-8 h-8" />,
    Flame: <Icons.Flame className="w-8 h-8" />,
    Zap: <Icons.Zap className="w-8 h-8" />,
  };
  return icons[iconName] || <Icons.Star className="w-8 h-8" />;
};

export default function AchievementsPage() {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  
  const filteredAchievements = achievements.filter(a => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/profile" className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Achievements</h1>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Your Progress</span>
            <Icons.Trophy className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold mb-2">{unlockedCount} / {achievements.length}</div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all" 
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
          <div className="text-sm mt-2 opacity-90">{Math.round((unlockedCount / achievements.length) * 100)}% Complete</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'unlocked', 'locked'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === f 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Achievements List */}
      <div className="px-4 space-y-3">
        {filteredAchievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`flex items-center gap-4 p-4 rounded-xl border ${
              achievement.unlocked 
                ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 opacity-60'
            }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              achievement.unlocked ? 'bg-red-100 dark:bg-red-900/30 text-red-500' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
            }`}>
              {getIconComponent(achievement.icon)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{achievement.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getRarityColor(achievement.rarity)}`}>
                  {achievement.rarity}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</p>
              {!achievement.unlocked && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-red-500 rounded-full h-1.5" 
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{achievement.progress}%</span>
                </div>
              )}
            </div>
            {achievement.unlocked && (
              <Icons.Check className="w-6 h-6 text-green-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
