'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const bookmarkedSeries = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', lastRead: 'Chapter 45', progress: 45 },
  { id: '2', slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', lastRead: 'Chapter 120', progress: 80 },
  { id: '3', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', lastRead: 'Chapter 300', progress: 55 },
  { id: '4', slug: 'noblesse', title: 'Noblesse', cover: 'https://picsum.photos/seed/noblesse/300/450', author: 'Son JaeHo', lastRead: 'Chapter 545', progress: 100 },
];

const likedSeries = [
  { id: '5', slug: 'sweet-home', title: 'Sweet Home', cover: 'https://picsum.photos/seed/sweet/300/450', author: 'Kim Carnby', likes: 67000 },
  { id: '6', slug: 'god-of-high-school', title: 'The God of High School', cover: 'https://picsum.photos/seed/godhs/300/450', author: 'Yongje Park', likes: 78000 },
];

export default function MyListPage() {
  const [activeTab, setActiveTab] = useState('bookmarks');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 ${
              activeTab === 'bookmarks' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'
            }`}
          >
            Bookmarks
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 ${
              activeTab === 'liked' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'
            }`}
          >
            Liked
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 ${
              activeTab === 'downloads' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'
            }`}
          >
            Downloads
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'bookmarks' && (
          <div className="grid grid-cols-2 gap-4">
            {bookmarkedSeries.map((series) => (
              <div key={series.id} className="relative group">
                <Link href={`/read/${series.slug}/1`}>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                    <Image src={series.cover} alt={series.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="p-3 bg-white rounded-full"><Icons.Play /></button>
                    </div>
                    {series.progress === 100 && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs rounded">Completed</div>
                    )}
                  </div>
                  <h3 className="font-medium text-sm line-clamp-1">{series.title}</h3>
                  <p className="text-xs text-gray-500">{series.lastRead}</p>
                  <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${series.progress}%` }} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="grid grid-cols-2 gap-4">
            {likedSeries.map((series) => (
              <Link key={series.id} href={`/series/${series.slug}`}>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                  <Image src={series.cover} alt={series.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-white text-xs">
                    <Icons.Heart className="w-3 h-3" /> {(series.likes / 1000).toFixed(0)}K
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{series.title}</h3>
                <p className="text-xs text-gray-500">{series.author}</p>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Icons.Download className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold mb-2">No Downloads Yet</h3>
            <p className="text-sm text-gray-500 mb-4">Download chapters to read offline</p>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">Browse Comics</button>
          </div>
        )}
      </div>
    </div>
  );
}
