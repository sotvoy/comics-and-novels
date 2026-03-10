'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const ACTIVITY_FEED = [
  {
    id: 1,
    type: 'followed',
    user: { name: 'MangaLover123', avatar: 'https://i.pravatar.cc/150?u=1', followers: 12500 },
    target: { name: 'Solo Leveling', type: 'series', cover: 'https://picsum.photos/seed/solo/200/300' },
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'commented',
    user: { name: 'AnimeFan', avatar: 'https://i.pravatar.cc/150?u=2', followers: 8900 },
    target: { name: 'Tower of God', type: 'series', cover: 'https://picsum.photos/seed/tower/200/300' },
    comment: 'This chapter was amazing! The artwork keeps getting better.',
    time: '5 hours ago'
  },
  {
    id: 3,
    type: 'liked',
    user: { name: 'ComicReader', avatar: 'https://i.pravatar.cc/150?u=3', followers: 4500 },
    target: { name: 'Omniscient Reader', type: 'series', cover: 'https://picsum.photos/seed/omni/200/300' },
    time: '8 hours ago'
  },
  {
    id: 4,
    type: 'started_reading',
    user: { name: 'WebtoonWatcher', avatar: 'https://i.pravatar.cc/150?u=4', followers: 23000 },
    target: { name: 'The Beginning After The End', type: 'series', cover: 'https://picsum.photos/seed/tbate/200/300', chapter: 156 },
    time: '12 hours ago'
  },
  {
    id: 5,
    type: 'recommended',
    user: { name: 'NovelNerd', avatar: 'https://i.pravatar.cc/150?u=5', followers: 6700 },
    target: { name: 'SSS-Class Suicide Hunter', type: 'series', cover: 'https://picsum.photos/seed/sss/200/300' },
    recommendation: 'You should read this if you love fantasy action!',
    time: '1 day ago'
  },
  {
    id: 6,
    type: 'shared',
    user: { name: 'ManhwaAddict', avatar: 'https://i.pravatar.cc/150?u=6', followers: 15000 },
    target: { name: 'Lookism', type: 'series', cover: 'https://picsum.photos/seed/look/200/300' },
    time: '1 day ago'
  },
];

const ACTIVITY_ICONS: Record<string, string> = {
  followed: '👤',
  commented: '💬',
  liked: '❤️',
  started_reading: '📖',
  recommended: '⭐',
  shared: '📤',
};

export default function ActivityFeedPage() {
  const [filter, setFilter] = useState('all');

  const filteredActivities = filter === 'all' 
    ? ACTIVITY_FEED 
    : ACTIVITY_FEED.filter(a => a.type === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 p-4">
          <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold dark:text-white">Activity Feed</h1>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {['all', 'followed', 'commented', 'liked', 'started_reading', 'recommended'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === type 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {type === 'all' ? 'All' : type === 'started_reading' ? 'Reading' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="p-4 space-y-4">
        {filteredActivities.map((activity) => (
          <div 
            key={activity.id}
            className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            {/* User Avatar */}
            <div className="relative flex-shrink-0">
              <Image
                src={activity.user.avatar}
                alt={activity.user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs">
                {ACTIVITY_ICONS[activity.type]}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm dark:text-white">
                <Link href={`/profile/${activity.user.name}`} className="font-semibold hover:underline">
                  {activity.user.name}
                </Link>
                {' '}
                {activity.type === 'followed' && 'started following'}
                {activity.type === 'commented' && 'commented on'}
                {activity.type === 'liked' && 'liked'}
                {activity.type === 'started_reading' && 'started reading'}
                {activity.type === 'recommended' && 'recommended'}
                {activity.type === 'shared' && 'shared'}
                {' '}
                <Link href={`/series/${activity.target.name.toLowerCase().replace(/ /g, '-')}`} className="font-semibold hover:underline">
                  {activity.target.name}
                </Link>
                {activity.target.chapter && <span className="text-gray-500"> Chapter {activity.target.chapter}</span>}
              </p>
              
              {activity.comment && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                  "{activity.comment}"
                </p>
              )}
              
              {activity.recommendation && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                  💡 {activity.recommendation}
                </p>
              )}

              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gray-500">{activity.time}</span>
                <button className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1">
                  <Icons.Heart className="w-3 h-3" /> Like
                </button>
                <button className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1">
                  <Icons.MessageCircle className="w-3 h-3" /> Reply
                </button>
              </div>
            </div>

            {/* Target Cover */}
            <Link href={`/series/${activity.target.name.toLowerCase().replace(/ /g, '-')}`} className="flex-shrink-0">
              <Image
                src={activity.target.cover}
                alt={activity.target.name}
                width={50}
                height={75}
                className="rounded-lg object-cover"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
