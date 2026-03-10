'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const userLevel = 12;
const currentXP = 2450;
const xpToNextLevel = 3000;
const totalXP = 18500;

const levelBenefits = [
  { level: 1, title: 'Newcomer', xp: 0, benefits: ['Basic access', 'Comment on series'] },
  { level: 5, title: 'Reader', xp: 1000, benefits: ['Create lists', 'Follow users'] },
  { level: 10, title: 'Fan', xp: 5000, benefits: ['Upload content', 'Create series'] },
  { level: 15, title: 'Super Fan', xp: 15000, benefits: ['Verified badge', 'Priority support'] },
  { level: 20, title: 'Legend', xp: 50000, benefits: ['Exclusive features', 'Community leader'] },
];

const xpHistory = [
  { id: 1, action: 'Read chapter', xp: 10, time: '2 hours ago' },
  { id: 2, action: 'Daily login', xp: 50, time: '5 hours ago' },
  { id: 3, action: 'Liked a comment', xp: 5, time: '1 day ago' },
  { id: 4, action: 'Completed achievement', xp: 100, time: '2 days ago' },
  { id: 5, action: 'Shared a series', xp: 15, time: '3 days ago' },
];

const badges = [
  { id: 1, name: 'Early Adopter', icon: 'Star', earned: true },
  { id: 2, name: 'Top Reader', icon: 'Trophy', earned: true },
  { id: 3, name: 'Social Star', icon: 'Heart', earned: true },
  { id: 4, name: 'Creator', icon: 'Upload', earned: true },
  { id: 5, name: 'Event Winner', icon: 'Calendar', earned: false },
];

export default function LevelsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'badges'>('overview');

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      Star: <Icons.Star className="w-6 h-6" />,
      Trophy: <Icons.Trophy className="w-6 h-6" />,
      Heart: <Icons.Heart className="w-6 h-6" />,
      Upload: <Icons.Upload className="w-6 h-6" />,
      Calendar: <Icons.Calendar className="w-6 h-6" />,
    };
    return icons[iconName] || <Icons.Star className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/profile" className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Levels & XP</h1>
        </div>
      </div>

      {/* Level Card */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          {/* Current Level */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
              {userLevel}
            </div>
            <div>
              <div className="text-sm opacity-90">Current Level</div>
              <div className="text-2xl font-bold">Level {userLevel}</div>
              <div className="text-sm opacity-90">{totalXP.toLocaleString()} Total XP</div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="bg-white/20 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Level {userLevel + 1}</span>
              <span>{currentXP} / {xpToNextLevel} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-white rounded-full h-3 transition-all" 
                style={{ width: `${(currentXP / xpToNextLevel) * 100}%` }}
              />
            </div>
            <div className="text-sm mt-2 opacity-90">{xpToNextLevel - currentXP} XP to next level</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {(['overview', 'history', 'badges'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${
                activeTab === tab 
                  ? 'border-red-500 text-red-500' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="px-4 space-y-4">
          <h3 className="font-semibold">Level Benefits</h3>
          {levelBenefits.map((level, index) => (
            <div 
              key={level.level}
              className={`flex items-center gap-4 p-4 rounded-xl border ${
                userLevel >= level.level 
                  ? 'bg-white dark:bg-gray-800 border-green-200 dark:border-green-800' 
                  : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                userLevel >= level.level 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-500' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}>
                {level.level}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{level.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{level.xp.toLocaleString()} XP required</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {level.benefits.map((benefit, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              {userLevel >= level.level && (
                <Icons.Check className="w-5 h-5 text-green-500" />
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="px-4 space-y-3">
          {xpHistory.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <div className="font-medium">{item.action}</div>
                <div className="text-sm text-gray-500">{item.time}</div>
              </div>
              <div className="text-green-500 font-semibold">+{item.xp} XP</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="px-4">
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id}
                className={`flex flex-col items-center p-4 rounded-xl ${
                  badge.earned 
                    ? 'bg-white dark:bg-gray-800 border-2 border-yellow-400' 
                    : 'bg-gray-100 dark:bg-gray-800/50 opacity-50'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${
                  badge.earned ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-200 text-gray-400'
                }`}>
                  {getIconComponent(badge.icon)}
                </div>
                <span className="text-sm font-medium text-center">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
