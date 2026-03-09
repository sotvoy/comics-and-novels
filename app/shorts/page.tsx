'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

const demoSeries = [
  {
    id: '1',
    slug: 'solo-leveling',
    title: 'Solo Leveling',
    cover: 'https://picsum.photos/seed/solo/300/450',
    author: 'Chugong',
    chapters: 179,
    likes: 125000,
    type: 'comic',
  },
  {
    id: '2',
    slug: 'omniscient-reader',
    title: 'Omniscient Reader\'s Viewpoint',
    cover: 'https://picsum.photos/seed/omni/300/450',
    author: 'Sing-Shong',
    chapters: 180,
    likes: 98000,
    type: 'comic',
  },
  {
    id: '3',
    slug: 'tower-of-god',
    title: 'Tower of God',
    cover: 'https://picsum.photos/seed/tower/300/450',
    author: 'SIU',
    chapters: 580,
    likes: 156000,
    type: 'comic',
  },
  {
    id: '4',
    slug: 'lunar-star',
    title: 'Lunar Star',
    cover: 'https://picsum.photos/seed/lunar/300/450',
    author: 'Kakao',
    chapters: 120,
    likes: 45000,
    type: 'novel',
  },
  {
    id: '5',
    slug: 'dragon-ascension',
    title: 'Dragon Ascension',
    cover: 'https://picsum.photos/seed/dragon/300/450',
    author: 'Webnovel',
    chapters: 250,
    likes: 78000,
    type: 'novel',
  },
  {
    id: '6',
    slug: 'rebirth-throne',
    title: 'Rebirth of the Divine Throne',
    cover: 'https://picsum.photos/seed/rebirth/300/450',
    author: 'MTT',
    chapters: 200,
    likes: 89000,
    type: 'novel',
  },
];

export default function ShortsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'action', label: 'Action' },
    { id: 'comedy', label: 'Comedy' },
    { id: 'romance', label: 'Romance' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'horror', label: 'Horror' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Shorts</h1>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter === filter.id
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Shorts Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {demoSeries.map((series, index) => (
            <motion.div
              key={series.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/series/${series.slug}`}>
                <div className="relative aspect-[9/16] rounded-lg overflow-hidden mb-2">
                  <Image
                    src={series.cover}
                    alt={series.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 rounded text-white text-xs">
                    {series.type}
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{series.title}</h3>
                <p className="text-xs text-gray-500">{series.author}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
