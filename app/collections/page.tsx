'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const collections = [
  { id: 1, name: 'Action Favorites', count: 15, cover: 'https://picsum.photos/seed/col1/300/450', series: ['solo-leveling', 'tower-of-god', 'god-of-high-school'] },
  { id: 2, name: 'Must Read 2024', count: 20, cover: 'https://picsum.photos/seed/col2/300/450', series: ['omniscient-reader', 'lookism', 'sweet-home'] },
  { id: 3, name: 'Completed Series', count: 8, cover: 'https://picsum.photos/seed/col3/300/450', series: ['noblesse', 'perfect-world'] },
  { id: 4, name: 'Reading List', count: 12, cover: 'https://picsum.photos/seed/col4/300/450', series: ['solo-leveling', 'lunar-star'] },
];

export default function CollectionsPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">My Collections</h1>
          <button 
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium"
          >
            <Icons.Plus /> New
          </button>
        </div>

        {/* Featured Collection */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Featured</h2>
          <div className="relative rounded-2xl overflow-hidden h-48">
            <Image src="https://picsum.photos/seed/featured/800/400" alt="Featured" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs rounded mb-2">FEATURED</span>
              <h3 className="text-white font-bold text-xl">Staff Picks</h3>
              <p className="text-white/60 text-sm">Curated by our team</p>
            </div>
          </div>
        </section>

        {/* My Collections */}
        <section>
          <h2 className="text-lg font-semibold mb-3">My Collections</h2>
          <div className="grid grid-cols-2 gap-4">
            {collections.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.id}`} className="block">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2 group">
                  <Image src={collection.cover} alt={collection.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-0.5 bg-white/90 text-black text-xs rounded font-medium">{collection.count} series</span>
                  </div>
                </div>
                <h3 className="font-medium text-sm">{collection.name}</h3>
              </Link>
            ))}
            {/* Create New */}
            <button onClick={() => setShowCreate(true)} className="flex flex-col items-center justify-center aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-red-500 transition-colors">
              <Icons.Plus className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-500 mt-2">Create New</span>
            </button>
          </div>
        </section>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Create Collection</h2>
            <input type="text" placeholder="Collection name" className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4" />
            <div className="flex gap-2">
              <button onClick={() => setShowCreate(false)} className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium">Cancel</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
