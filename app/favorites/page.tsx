'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const favorites = [
  { id: 1, slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', chapters: 179, type: 'comic' },
  { id: 2, slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', chapters: 180, type: 'comic' },
  { id: 3, slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', chapters: 580, type: 'comic' },
  { id: 4, slug: 'lunar-star', title: 'Lunar Star', cover: 'https://picsum.photos/seed/lunar/300/450', author: 'Kakao', chapters: 120, type: 'novel' },
  { id: 5, slug: 'noble-assassin', title: 'Noble Assassin', cover: 'https://picsum.photos/seed/noble/300/450', author: 'Redice', chapters: 85, type: 'comic' },
];

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'comics' | 'novels'>('all');

  const filteredFavorites = favorites.filter(f => {
    if (activeTab === 'all') return true;
    return f.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/profile" className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Favorites</h1>
          <span className="text-sm text-gray-500">({favorites.length})</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-2">
          {(['all', 'comics', 'novels'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === tab 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredFavorites.map((item) => (
            <Link key={item.id} href={`/series/${item.slug}`} className="group">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                <Image 
                  src={item.cover} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                  {item.type}
                </div>
              </div>
              <h3 className="font-medium text-sm truncate">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.author}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredFavorites.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Icons.Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500">No favorites yet</p>
          <Link href="/" className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
            Browse Series
          </Link>
        </div>
      )}
    </div>
  );
}
