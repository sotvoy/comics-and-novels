'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const achievements = [
  { id: 1, name: 'First Read', desc: 'Read your first chapter', icon: '📖', completed: true },
  { id: 2, name: 'Bookworm', desc: 'Read 100 chapters', icon: '📚', completed: true },
  { id: 3, name: 'Social Butterfly', desc: 'Follow 10 creators', icon: '🦋', completed: true },
  { id: 4, name: 'Fan Favorite', desc: 'Get 100 likes', icon: '❤️', completed: true },
  { id: 5, name: 'Night Owl', desc: 'Read at midnight', icon: '🦉', completed: false },
  { id: 6, name: 'Collector', desc: 'Bookmark 50 series', icon: '📌', completed: false },
];

const demoUploads = [
  { id: '1', slug: 'my-series-1', title: 'My Comic Series', cover: 'https://picsum.photos/seed/my1/300/450', chapters: 25, likes: 1200 },
  { id: '2', slug: 'my-series-2', title: 'The Hero Returns', cover: 'https://picsum.photos/seed/my2/300/450', chapters: 50, likes: 3500 },
];

const demoHistory = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', chapter: 45, progress: 65 },
  { id: '2', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', chapter: 120, progress: 30 },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('uploads');
  const user = { 
    username: 'SOT VOY', 
    email: 'demo@cn.com', 
    level: 25, 
    exp: 12500, 
    maxExp: 15000,
    followers: 1234, 
    following: 567, 
    uploads: 12,
    avatar: 'https://picsum.photos/seed/avatar/200/200',
    badges: ['🌟', '🔥', '💎', '⚡']
  };

  const tabs = [
    { id: 'uploads', label: 'Uploads' },
    { id: 'history', label: 'History' },
    { id: 'achievements', label: 'Achievements' },
  ];

  const completedAchievements = achievements.filter(a => a.completed).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header Banner */}
      <div className="relative h-32 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="absolute -bottom-12 left-4">
          <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-gray-200">
            <Image src={user.avatar} alt={user.username} fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 pt-14 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{user.username}</h1>
              <div className="flex gap-1">
                {user.badges.map((badge, i) => (
                  <span key={i} className="text-lg">{badge}</span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500">@{user.username.toLowerCase().replace(' ', '_')}</p>
          </div>
          <Link href="/settings" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Icons.Settings />
          </Link>
        </div>

        {/* Level Progress */}
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Level {user.level}</span>
            <span className="text-xs text-gray-500">{user.exp} / {user.maxExp} XP</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ width: `${(user.exp / user.maxExp) * 100}%` }} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="font-bold text-lg">{user.followers}</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="font-bold text-lg">{user.following}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="font-bold text-lg">{user.uploads}</p>
            <p className="text-xs text-gray-500">Uploads</p>
          </div>
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="font-bold text-lg">{completedAchievements}</p>
            <p className="text-xs text-gray-500">Badges</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 py-2 bg-red-500 text-white rounded-lg font-medium">Edit Profile</button>
          <button className="flex-1 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg font-medium">Share</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'uploads' && (
          <div className="grid grid-cols-2 gap-4">
            {demoUploads.map((series) => (
              <Link key={series.id} href={`/series/${series.slug}`} className="block">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                  <Image src={series.cover} alt={series.title} fill className="object-cover" />
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{series.title}</h3>
                <p className="text-xs text-gray-500">{series.chapters} chapters • {series.likes} likes</p>
              </Link>
            ))}
            <Link href="/creator" className="flex flex-col items-center justify-center aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-red-500">
              <Icons.Plus />
              <span className="text-sm mt-2">Upload New</span>
            </Link>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            {demoHistory.map((item) => (
              <Link key={item.id} href={`/read/${item.slug}/1`} className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="relative w-16 aspect-[3/4] rounded overflow-hidden flex-shrink-0">
                  <Image src={item.cover} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">Chapter {item.chapter}</p>
                  <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
                <Icons.ArrowRight className="text-gray-400" />
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl ${
                  achievement.completed
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30'
                    : 'bg-gray-100 dark:bg-gray-800 opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className="font-semibold text-sm">{achievement.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{achievement.desc}</p>
                {achievement.completed && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">Completed</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
