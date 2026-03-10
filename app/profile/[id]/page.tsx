'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const USER_DATA = {
  name: 'MangaReader',
  username: '@mangareader',
  avatar: 'https://i.pravatar.cc/150?u=mangareader',
  cover: 'https://picsum.photos/seed/cover/1200/400',
  bio: '📚 Webtoon enthusiast | 🔥 Following 200+ series | 💬 Love discussing plot theories',
  followers: 12450,
  following: 342,
  joinedDate: 'January 2024',
  isFollowing: false,
  stats: {
    chaptersRead: 4523,
    hoursSpent: 1250,
    seriesCompleted: 89
  },
  badges: ['Early Adopter', 'Top Reader', 'Verified']
};

const USER_SERIES = [
  { id: 1, title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo1/300/400', chapters: 179, likes: 245000 },
  { id: 2, title: 'Tower of God', cover: 'https://picsum.photos/seed/tower1/300/400', chapters: 621, likes: 189000 },
  { id: 3, title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni1/300/400', chapters: 98, likes: 156000 },
  { id: 4, title: 'Lookism', cover: 'https://picsum.photos/seed/look1/300/400', chapters: 412, likes: 312000 },
];

const USER_ACTIVITY = [
  { id: 1, type: 'comment', series: 'Solo Leveling', chapter: 175, time: '2 hours ago', likes: 45 },
  { id: 2, type: 'review', series: 'Tower of God', rating: 5, time: '1 day ago', likes: 123 },
  { id: 3, type: 'like', series: 'Omniscient Reader', time: '2 days ago', likes: 12 },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('series');
  const [isFollowing, setIsFollowing] = useState(USER_DATA.isFollowing);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64">
        <Image
          src={USER_DATA.cover}
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          {/* Avatar */}
          <div className="relative">
            <Image
              src={USER_DATA.avatar}
              alt={USER_DATA.name}
              width={100}
              height={100}
              className="rounded-full border-4 border-white dark:border-gray-900"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold dark:text-white">{USER_DATA.name}</h1>
              {USER_DATA.badges.map((badge, i) => (
                <span key={i} className="px-2 py-0.5 bg-yellow-400 text-black text-xs rounded-full font-medium">
                  {badge}
                </span>
              ))}
            </div>
            <p className="text-gray-500">{USER_DATA.username}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                isFollowing 
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300' 
                  : 'bg-red-500 text-white'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            <button className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
              <Icons.MessageCircle className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
              <Icons.Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-700 dark:text-gray-300">{USER_DATA.bio}</p>

        {/* Stats */}
        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <p className="text-xl font-bold dark:text-white">{USER_DATA.followers.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold dark:text-white">{USER_DATA.following}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold dark:text-white">{USER_DATA.stats.chaptersRead.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Chapters Read</p>
          </div>
        </div>

        {/* Joined */}
        <p className="mt-4 text-sm text-gray-500">📅 Joined {USER_DATA.joinedDate}</p>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex px-4 gap-6">
          {['series', 'activity', 'about'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 font-medium transition-colors ${
                activeTab === tab 
                  ? 'text-red-500 border-b-2 border-red-500' 
                  : 'text-gray-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'series' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {USER_SERIES.map((series) => (
              <Link key={series.id} href={`/series/${series.title.toLowerCase().replace(/ /g, '-')}`} className="group">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                  <Image
                    src={series.cover}
                    alt={series.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium text-sm dark:text-white line-clamp-1">{series.title}</h3>
                <p className="text-xs text-gray-500">{series.chapters} chapters</p>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            {USER_ACTIVITY.map((activity) => (
              <div key={activity.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">
                    {activity.type === 'comment' ? '💬' : activity.type === 'review' ? '⭐' : '❤️'}
                  </span>
                  <span className="font-medium dark:text-white">
                    {activity.type === 'comment' && `Commented on ${activity.series} Ch.${activity.chapter}`}
                    {activity.type === 'review' && `Reviewed ${activity.series}`}
                    {activity.type === 'like' && `Liked ${activity.series}`}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{activity.time}</span>
                  <span className="flex items-center gap-1">
                    <Icons.Heart className="w-4 h-4" /> {activity.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold mb-2 dark:text-white">Reading Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-red-500">{USER_DATA.stats.chaptersRead}</p>
                  <p className="text-sm text-gray-500">Chapters</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-500">{USER_DATA.stats.hoursSpent}</p>
                  <p className="text-sm text-gray-500">Hours</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-500">{USER_DATA.stats.seriesCompleted}</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
