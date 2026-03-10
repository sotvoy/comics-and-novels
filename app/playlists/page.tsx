'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: string;
  count: number;
  items: string[];
  isPublic: boolean;
  createdAt: string;
}

const playlists: Playlist[] = [
  {
    id: '1',
    title: '🔥 Trending Now',
    description: 'Most popular series this week',
    cover: 'https://picsum.photos/seed/tr1/400/225',
    count: 15,
    items: ['https://picsum.photos/seed/t1/100/150', 'https://picsum.photos/seed/t2/100/150', 'https://picsum.photos/seed/t3/100/150'],
    isPublic: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: '📚 To Read Later',
    description: 'Saved for later',
    cover: 'https://picsum.photos/seed/rl1/400/225',
    count: 8,
    items: ['https://picsum.photos/seed/r1/100/150', 'https://picsum.photos/seed/r2/100/150', 'https://picsum.photos/seed/r3/100/150'],
    isPublic: true,
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    title: '❤️ Favorites',
    description: 'My all-time favorites',
    cover: 'https://picsum.photos/seed/fav1/400/225',
    count: 12,
    items: ['https://picsum.photos/seed/f1/100/150', 'https://picsum.photos/seed/f2/100/150', 'https://picsum.photos/seed/f3/100/150'],
    isPublic: false,
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    title: '🎮 Action Series',
    description: 'All action-packed adventures',
    cover: 'https://picsum.photos/seed/ac1/400/225',
    count: 20,
    items: ['https://picsum.photos/seed/a1/100/150', 'https://picsum.photos/seed/a2/100/150', 'https://picsum.photos/seed/a3/100/150'],
    isPublic: true,
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    title: '💕 Romance Collection',
    description: 'Sweet romance stories',
    cover: 'https://picsum.photos/seed/rom1/400/225',
    count: 7,
    items: ['https://picsum.photos/seed/ro1/100/150', 'https://picsum.photos/seed/ro2/100/150', 'https://picsum.photos/seed/ro3/100/150'],
    isPublic: true,
    createdAt: '2024-02-15'
  },
];

export default function PlaylistsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');

  const filtered = playlists.filter(p => 
    filter === 'all' ? true : filter === 'public' ? p.isPublic : !p.isPublic
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Icons.ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">📋 My Playlists</h1>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
          >
            <Icons.Plus /> New Playlist
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 px-4 pb-4">
          <div className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-3 text-white">
            <p className="text-2xl font-bold">{playlists.length}</p>
            <p className="text-xs opacity-80">Playlists</p>
          </div>
          <div className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-3 text-white">
            <p className="text-2xl font-bold">{playlists.reduce((a, p) => a + p.count, 0)}</p>
            <p className="text-xs opacity-80">Total Items</p>
          </div>
          <div className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-3 text-white">
            <p className="text-2xl font-bold">{playlists.filter(p => p.isPublic).length}</p>
            <p className="text-xs opacity-80">Public</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-4 pb-4">
          {(['all', 'public', 'private'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === f
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {f === 'all' ? '🌟 All' : f === 'public' ? '🌐 Public' : '🔒 Private'}
            </button>
          ))}
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
          >
            {/* Cover */}
            <div className="relative aspect-video">
              <Image src={playlist.cover} alt={playlist.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="p-4 bg-white/90 rounded-full">
                  <Icons.Play className="w-8 h-8 text-black" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                {playlist.count} items
              </div>
              {!playlist.isPublic && (
                <div className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded">
                  <Icons.Lock className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">{playlist.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{playlist.description}</p>
                </div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                  <Icons.MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Created {playlist.createdAt}</p>
            </div>
          </div>
        ))}

        {/* Create New Card */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600"
        >
          <Icons.PlusCircle className="w-12 h-12 text-gray-400" />
          <span className="text-gray-500 font-medium">Create New Playlist</span>
        </button>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Playlist</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Playlist Name</label>
                <input
                  type="text"
                  placeholder="My Awesome Playlist"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description (optional)</label>
                <textarea
                  placeholder="What's this playlist about?"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl resize-none"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="public" className="w-5 h-5 rounded" />
                <label htmlFor="public" className="text-sm">Make this playlist public</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-4">📋</span>
          <h3 className="text-xl font-bold mb-2">No playlists yet</h3>
          <p className="text-gray-500 mb-4">Create your first playlist to organize your favorites</p>
        </div>
      )}
    </div>
  );
}
