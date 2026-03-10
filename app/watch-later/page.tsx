'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const watchLater = [
  { id: 1, slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', chapters: 179, type: 'comic', updated: '2 hours ago' },
  { id: 2, slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', chapters: 180, type: 'comic', updated: '1 day ago' },
  { id: 3, slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', chapters: 580, type: 'comic', updated: '3 days ago' },
  { id: 4, slug: 'noble-assassin', title: 'Noble Assassin', cover: 'https://picsum.photos/seed/noble/300/450', author: 'Redice', chapters: 85, type: 'comic', updated: '1 week ago' },
];

export default function WatchLaterPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/profile" className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Watch Later</h1>
          <span className="text-sm text-gray-500">({watchLater.length})</span>
        </div>
      </div>

      {/* Watch Later List */}
      <div className="p-4 space-y-4">
        {watchLater.map((item) => (
          <Link key={item.id} href={`/series/${item.slug}`} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="relative w-24 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src={item.cover} 
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {item.chapters}ch
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.author}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full capitalize">{item.type}</span>
                <span className="text-xs text-gray-500">{item.updated}</span>
              </div>
            </div>
            <button className="self-center p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
              <Icons.Check className="w-5 h-5 text-green-500" />
            </button>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {watchLater.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Icons.Bookmark className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500">No items saved for later</p>
          <Link href="/" className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
            Browse Series
          </Link>
        </div>
      )}
    </div>
  );
}
