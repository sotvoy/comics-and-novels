'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  progress: number;
  target: number;
  reward: {
    type: 'coins' | 'gems' | 'xp';
    amount: number;
  };
  isCompleted: boolean;
}

const quests: Quest[] = [
  { id: '1', title: 'Daily Reader', description: 'Read 5 chapters today', type: 'daily', progress: 3, target: 5, reward: { type: 'coins', amount: 100 }, isCompleted: false },
  { id: '2', title: 'Chapter Complete', description: 'Finish reading 1 chapter', type: 'daily', progress: 1, target: 1, reward: { type: 'xp', amount: 50 }, isCompleted: true },
  { id: '3', title: 'Social Butterfly', description: 'Like 10 comics/novels', type: 'daily', progress: 10, target: 10, reward: { type: 'gems', amount: 5 }, isCompleted: true },
  { id: '4', title: 'Weekly Explorer', description: 'Read from 3 different genres', type: 'weekly', progress: 2, target: 3, reward: { type: 'coins', amount: 500 }, isCompleted: false },
  { id: '5', title: 'Weekly Completionist', description: 'Finish 20 chapters this week', type: 'weekly', progress: 15, target: 20, reward: { type: 'gems', amount: 25 }, isCompleted: false },
  { id: '6', title: 'Series Hunter', description: 'Follow 5 new series', type: 'weekly', progress: 3, target: 5, reward: { type: 'xp', amount: 200 }, isCompleted: false },
  { id: '7', title: 'First Achievement', description: 'Complete your first quest', type: 'special', progress: 1, target: 1, reward: { type: 'gems', amount: 10 }, isCompleted: true },
  { id: '8', title: 'Dedicated Reader', description: 'Login for 7 consecutive days', type: 'special', progress: 5, target: 7, reward: { type: 'coins', amount: 1000 }, isCompleted: false },
];

const userStats = {
  level: 15,
  xp: 2450,
  xpToNext: 3000,
  coins: 12500,
  gems: 45,
  streak: 12,
};

export default function QuestsPage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'special'>('daily');

  const filteredQuests = quests.filter(q => q.type === activeTab);
  const completedCount = quests.filter(q => q.isCompleted).length;

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'coins': return <Icons.Heart className="w-4 h-4 text-yellow-500" />;
      case 'gems': return <Icons.Star className="w-4 h-4 text-purple-500" />;
      case 'xp': return <Icons.Zap className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Icons.ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Quests</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <Icons.Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{userStats.streak}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-2 px-4 pb-4">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-3 text-white">
            <Icons.Heart className="w-5 h-5 mb-1" />
            <p className="text-lg font-bold">{userStats.coins.toLocaleString()}</p>
            <p className="text-xs opacity-80">Coins</p>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-3 text-white">
            <Icons.Star className="w-5 h-5 mb-1" />
            <p className="text-lg font-bold">{userStats.gems}</p>
            <p className="text-xs opacity-80">Gems</p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl p-3 text-white col-span-2">
            <div className="flex items-center justify-between mb-1">
              <Icons.Zap className="w-5 h-5" />
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Lv.{userStats.level}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full mt-1">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${(userStats.xp / userStats.xpToNext) * 100}%` }}
              />
            </div>
            <p className="text-xs mt-1">{userStats.xp}/{userStats.xpToNext} XP</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          {(['daily', 'weekly', 'special'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-500'
              }`}
            >
              {tab}
              <span className="ml-1 text-xs">
                ({quests.filter(q => q.type === tab && q.isCompleted).length}/{quests.filter(q => q.type === tab).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="p-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Daily Progress</span>
            <span className="text-sm text-gray-500">{completedCount}/{quests.length} Completed</span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / quests.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Quests List */}
      <div className="p-4 space-y-3">
        {filteredQuests.map((quest, index) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-2xl border-2 ${
              quest.isCompleted 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Quest Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                quest.isCompleted 
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {quest.isCompleted ? (
                  <Icons.Check className="w-6 h-6" />
                ) : (
                  <Icons.Flag className="w-6 h-6" />
                )}
              </div>

              {/* Quest Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">{quest.title}</h3>
                  {quest.isCompleted && (
                    <span className="text-xs px-2 py-0.5 bg-green-500 text-white rounded-full">Completed</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2">{quest.description}</p>
                
                {/* Progress */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{quest.progress}/{quest.target}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        quest.isCompleted 
                          ? 'bg-green-500' 
                          : 'bg-gradient-to-r from-red-500 to-orange-500'
                      }`}
                      style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Reward */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-500">Reward:</span>
                    {getRewardIcon(quest.reward.type)}
                    <span className="font-bold">{quest.reward.amount}</span>
                    <span className="text-gray-500 capitalize">{quest.reward.type}</span>
                  </div>
                  {!quest.isCompleted && (
                    <button className="px-4 py-1.5 bg-red-500 text-white rounded-full text-sm font-medium">
                      Go
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredQuests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Icons.Flag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">No quests available</h3>
          <p className="text-gray-500">Check back later for new quests</p>
        </div>
      )}
    </div>
  );
}
