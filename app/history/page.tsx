'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

interface HistoryItem {
  id: string;
  title: string;
  slug: string;
  cover: string;
  chapter: number;
  progress: number;
  lastRead: string;
  type: 'comic' | 'novel';
}

const historyData: HistoryItem[] = [
  { id: '1', title: 'Solo Leveling', slug: 'solo-leveling', cover: 'https://picsum.photos/seed/solo/300/450', chapter: 45, progress: 65, lastRead: '2 hours ago', type: 'comic' },
  { id: '2', title: 'Tower of God', slug: 'tower-of-god', cover: 'https://picsum.photos/seed/tower/300/450', chapter: 120, progress: 30, lastRead: '5 hours ago', type: 'comic' },
  { id: '3', title: 'The Beginning After The End', slug: 'tbate', cover: 'https://picsum.photos/seed/tbate/300/450', chapter: 89, progress: 85, lastRead: '1 day ago', type: 'novel' },
  { id: '4', title: 'Omniscient Reader', slug: 'orv', cover: 'https://picsum.photos/seed/orv/300/450', chapter: 55, progress: 42, lastRead: '2 days ago', type: 'comic' },
  { id: '5', title: 'Lore Olympus', slug: 'lore-olympus', cover: 'https://picsum.photos/seed/lore/300/450', chapter: 230, progress: 92, lastRead: '3 days ago', type: 'comic' },
  { id: '6', title: 'Noblesse', slug: 'noblesse', cover: 'https://picsum.photos/seed/nob/300/450', chapter: 15, progress: 15, lastRead: '1 week ago', type: 'comic' },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState<'all' | 'comic' | 'novel'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'progress'>('recent');

  const filtered = historyData
    .filter(item => filter === 'all' || item.type === filter)
    .sort((a, b) => sortBy === 'recent' ? 0 : b.progress - a.progress);

  const totalHours = 127;
  const totalChapters = 554;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Icons.ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Reading History</h1>
          </div>
          <button className="text-red-500 font-medium text-sm">Clear All</button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 px-4 pb-4">
          <div className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-3 text-white">
            <p className="text-2xl font-bold">{totalHours}h</p>
            <p className="text-xs opacity-80">Total Reading</p>
          </div>
          <div className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 text-white">
            <p className="text-2xl font-bold">{totalChapters}</p>
            <p className="text-xs opacity-80">Chapters Read</p>
          </div>
          <div className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-3 text-white">
            <p className="text-2xl font-bold">{historyData.length}</p>
            <p className="text-xs opacity-80">Series</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-4 pb-4">
          {(['all', 'comic', 'novel'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === f
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {f === 'all' ? 'All' : f === 'comic' ? 'Comics' : 'Novels'}
            </button>
          ))}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'progress')}
            className="ml-auto px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
          >
            <option value="recent">Recently Read</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>

      {/* History List */}
      <div className="p-4 space-y-3">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/read/${item.slug}/${item.chapter}`}
            className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {/* Cover */}
            <div className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={item.cover} alt={item.title} fill className="object-cover" />
              <div className="absolute top-1 left-1">
                <span className="text-xs bg-black/70 text-white px-1.5 py-0.5 rounded">
                  {item.type === 'comic' ? '🎨' : '📝'}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold truncate">{item.title}</h3>
              <p className="text-sm text-gray-500">Chapter {item.chapter}</p>
              
              {/* Progress Bar */}
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{item.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-2">📅 {item.lastRead}</p>
            </div>

            {/* Continue Button */}
            <div className="flex items-center">
              <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                <Icons.Play className="w-4 h-4" />
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-4">📚</span>
          <h3 className="text-xl font-bold mb-2">No reading history</h3>
          <p className="text-gray-500 mb-4">Start reading to see your history here</p>
          <Link href="/" className="px-6 py-2 bg-red-500 text-white rounded-full font-medium">
            Browse Comics
          </Link>
        </div>
      )}
    </div>
  );
}
