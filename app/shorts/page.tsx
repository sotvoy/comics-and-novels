'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

// Comic/Novel Shorts - Image & Text based (no videos)
const demoShorts = [
  {
    id: '1',
    slug: 'solo-leveling',
    title: 'Solo Leveling',
    cover: 'https://picsum.photos/seed/solo1/400/600',
    author: 'Chugong',
    chapters: 179,
    likes: 125000,
    type: 'comic',
    genre: 'Action',
    excerpt: 'In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation, a notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival...',
  },
  {
    id: '2',
    slug: 'omniscient-reader',
    title: 'Omniscient Reader',
    cover: 'https://picsum.photos/seed/omni1/400/600',
    author: 'Sing-Shong',
    chapters: 180,
    likes: 98000,
    type: 'comic',
    genre: 'Fantasy',
    excerpt: 'Only the Reader knows how the world of "Three Ways to Survive a Ruined World" will end. But will the protagonist, Dokja, actually believe in this prediction? And more importantly, can he change the fate of his favorite character?',
  },
  {
    id: '3',
    slug: 'tower-of-god',
    title: 'Tower of God',
    cover: 'https://picsum.photos/seed/tower1/400/600',
    author: 'SIU',
    chapters: 580,
    likes: 156000,
    type: 'comic',
    genre: 'Adventure',
    excerpt: 'Forty boy is sent into a mysterious tower that has appeared one day in the middle of the desert. Inside this tower he meets other regulars, people like him who have been chosen to climb the tower. The tower is full of challenges and tests...',
  },
  {
    id: '4',
    slug: 'lunar-star',
    title: 'Lunar Star',
    cover: 'https://picsum.photos/seed/lunar1/400/600',
    author: 'Kakao',
    chapters: 120,
    likes: 45000,
    type: 'novel',
    genre: 'Romance',
    excerpt: 'When the moon goddess falls in love with a mortal, their forbidden romance threatens the balance between the celestial and mortal realms. Can their love survive the trials that await?',
  },
  {
    id: '5',
    slug: 'dragon-ascension',
    title: 'Dragon Ascension',
    cover: 'https://picsum.photos/seed/dragon1/400/600',
    author: 'Webnovel',
    chapters: 250,
    likes: 78000,
    type: 'novel',
    genre: 'Fantasy',
    excerpt: 'Born as the weakest dragon in a thousand years, young Drakon must find a way to reclaim his lost power. With ancient enemies closing in and a mysterious prophecy at stake, the journey to become the ultimate dragon begins!',
  },
  {
    id: '6',
    slug: 'rebirth-throne',
    title: 'Rebirth of the Divine Throne',
    cover: 'https://picsum.photos/seed/rebirth1/400/600',
    author: 'MTT',
    chapters: 200,
    likes: 89000,
    type: 'novel',
    genre: 'Action',
    excerpt: 'After being betrayed and murdered by his own disciples, the Divine Emperor is reborn! This time, he will forge a different path - one that leads to the throne of immortality itself!',
  },
];

export default function ShortsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: '🌟 All' },
    { id: 'action', label: '⚔️ Action' },
    { id: 'comedy', label: '😂 Comedy' },
    { id: 'romance', label: '💕 Romance' },
    { id: 'fantasy', label: '🧙 Fantasy' },
    { id: 'horror', label: '👻 Horror' },
    { id: 'scifi', label: '🚀 Sci-Fi' },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-sm p-4">
        <h1 className="text-2xl font-bold mb-4">📱 Shorts</h1>
        
        {/* Filters - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter === filter.id
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Shorts Feed - Vertical Image Cards */}
      <div className="p-4 space-y-6">
        {demoShorts.map((short, index) => (
          <motion.div
            key={short.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 rounded-2xl overflow-hidden"
          >
            {/* Cover Image */}
            <Link href={`/series/${short.slug}`}>
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={short.cover}
                  alt={short.title}
                  fill
                  className="object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                {/* Type Badge */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="px-3 py-1 bg-black/70 backdrop-blur rounded-full text-xs font-bold">
                    {short.type === 'comic' ? '🎨 Comic' : '📝 Novel'}
                  </span>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-xl font-bold mb-1">{short.title}</h2>
                  <p className="text-sm text-gray-300">by {short.author}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-red-500/80 rounded-full">
                      {short.genre}
                    </span>
                    <span className="text-xs text-gray-400">📖 {short.chapters} chapters</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Actions */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-gray-400 hover:text-red-500">
                  <Icons.Heart className="w-6 h-6" />
                  <span className="text-sm">{formatNumber(short.likes)}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500">
                  <Icons.Comment className="w-6 h-6" />
                  <span className="text-sm">Comments</span>
                </button>
                <button className="flex items-center gap-1 text-gray-400 hover:text-green-500">
                  <Icons.Bookmark className="w-6 h-6" />
                  <span className="text-sm">Save</span>
                </button>
              </div>
              <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                <Icons.Share className="w-6 h-6" />
                <span className="text-sm">Share</span>
              </button>
            </div>

            {/* Excerpt */}
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-400 line-clamp-3">{short.excerpt}</p>
              <Link 
                href={`/series/${short.slug}`}
                className="inline-block mt-3 text-red-500 font-medium text-sm"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
