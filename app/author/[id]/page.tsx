'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const authorData = {
  id: '1',
  name: 'Chugong',
  avatar: 'https://picsum.photos/seed/chugong/400/400',
  banner: 'https://picsum.photos/seed/authorbanner/1200/400',
  bio: 'Creator of Solo Leveling and many other popular webtoons. Award-winning digital content creator.',
  followers: 500000,
  following: 120,
  views: 125000000,
  level: 25,
  badges: ['🏆', '⭐', '🔥', '💎'],
  joined: '2020',
  series: [
    { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', chapters: 179, likes: 125000, status: 'ongoing' },
    { id: '2', slug: 'solo-leveling-r', title: 'Solo Leveling: R', cover: 'https://picsum.photos/seed/solor/300/450', chapters: 50, likes: 45000, status: 'ongoing' },
    { id: '3', slug: 'the-slayer', title: 'The Slayer', cover: 'https://picsum.photos/seed/slayer/300/450', chapters: 30, likes: 28000, status: 'completed' },
  ]
};

export default function AuthorPage() {
  const [activeTab, setActiveTab] = useState('series');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Banner */}
      <div className="relative h-40 md:h-56">
        <Image src={authorData.banner} alt={authorData.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="relative px-4 -mt-16">
        <div className="flex items-end gap-4">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden">
            <Image src={authorData.avatar} alt={authorData.name} fill className="object-cover" />
          </div>
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold">{authorData.name}</h1>
              {authorData.badges.map((badge, i) => (
                <span key={i} className="text-lg">{badge}</span>
              ))}
            </div>
            <p className="text-sm text-gray-500">@{authorData.name.toLowerCase()} • Level {authorData.level}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="font-bold text-sm">{(authorData.followers / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="font-bold text-sm">{authorData.following}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="font-bold text-sm">{(authorData.views / 1000000).toFixed(0)}M</p>
            <p className="text-xs text-gray-500">Views</p>
          </div>
          <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="font-bold text-sm">{authorData.series.length}</p>
            <p className="text-xs text-gray-500">Series</p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{authorData.bio}</p>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 py-2 bg-red-500 text-white rounded-xl font-medium">Follow</button>
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <Icons.Share />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mt-6">
        <div className="flex overflow-x-auto hide-scrollbar">
          {['series', 'community', 'about'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 capitalize ${
                activeTab === tab
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'series' && (
          <div className="grid grid-cols-2 gap-4">
            {authorData.series.map((series) => (
              <Link key={series.id} href={`/series/${series.slug}`} className="block">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                  <Image src={series.cover} alt={series.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 text-xs rounded ${series.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
                      {series.status}
                    </span>
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{series.title}</h3>
                <p className="text-xs text-gray-500">{series.chapters} chapters • {(series.likes / 1000).toFixed(0)}K likes</p>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="text-center py-8">
            <p className="text-gray-500">No posts yet</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <h3 className="font-medium mb-2">Joined</h3>
              <p className="text-sm text-gray-500">{authorData.joined}</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <h3 className="font-medium mb-2">Total Works</h3>
              <p className="text-sm text-gray-500">{authorData.series.length} series</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
