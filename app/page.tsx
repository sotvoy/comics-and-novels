'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

// Demo data
const categories = [
  { id: 'all', label: 'All' },
  { id: 'foryou', label: 'For You' },
  { id: 'top', label: 'Top' },
  { id: 'new', label: 'New' },
  { id: 'recent', label: 'Recent' },
  { id: 'popular', label: 'Popular' },
  { id: 'ranking', label: 'Ranking' },
  { id: 'news', label: 'News' },
  { id: 'post', label: 'Post' },
  { id: 'community', label: 'Community' },
];

const demoSeries = [
  {
    id: '1',
    slug: 'solo-leveling',
    title: 'Solo Leveling',
    cover: 'https://picsum.photos/seed/solo/300/450',
    author: 'Chugong',
    chapters: 179,
    likes: 125000,
    comments: 45000,
    type: 'comic' as const,
  },
  {
    id: '2',
    slug: 'omniscient-reader',
    title: 'Omniscient Reader\'s Viewpoint',
    cover: 'https://picsum.photos/seed/omni/300/450',
    author: 'Sing-Shong',
    chapters: 180,
    likes: 98000,
    comments: 32000,
    type: 'comic' as const,
  },
  {
    id: '3',
    slug: 'tower-of-god',
    title: 'Tower of God',
    cover: 'https://picsum.photos/seed/tower/300/450',
    author: 'SIU',
    chapters: 580,
    likes: 156000,
    comments: 67000,
    type: 'comic' as const,
  },
  {
    id: '4',
    slug: 'lunar-star',
    title: 'Lunar Star',
    cover: 'https://picsum.photos/seed/lunar/300/450',
    author: 'Kakao',
    chapters: 120,
    likes: 45000,
    comments: 12000,
    type: 'novel' as const,
  },
  {
    id: '5',
    slug: 'dragon-ascension',
    title: 'Dragon Ascension',
    cover: 'https://picsum.photos/seed/dragon/300/450',
    author: 'Webnovel',
    chapters: 250,
    likes: 78000,
    comments: 21000,
    type: 'novel' as const,
  },
  {
    id: '6',
    slug: 'rebirth-throne',
    title: 'Rebirth of the Divine Throne',
    cover: 'https://picsum.photos/seed/rebirth/300/450',
    author: 'MTT',
    chapters: 200,
    likes: 89000,
    comments: 28000,
    type: 'novel' as const,
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const timeAgo = (date: Date) => {
  const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Category Pills - YouTube Style */}
      <div className="sticky top-14 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-pill whitespace-nowrap ${
                selectedCategory === category.id ? 'active' : ''
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Hero Carousel */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Featured</h2>
          <div className="flex gap-4 overflow-x-auto carousel-container pb-2 hide-scrollbar">
            {demoSeries.slice(0, 3).map((series, index) => (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="carousel-item flex-shrink-0 w-72"
              >
                <Link href={`/series/${series.slug}`}>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs rounded">
                        {series.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-1">{series.title}</h3>
                  <p className="text-xs text-gray-500">{series.author}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* New Chapters from Followed */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">New Chapters</h2>
            <Link href="/following" className="text-sm text-red-500 font-medium">
              See all
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto carousel-container pb-2 hide-scrollbar">
            {demoSeries.slice(0, 4).map((series, index) => (
              <motion.div
                key={`new-${series.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="carousel-item flex-shrink-0 w-40"
              >
                <Link href={`/series/${series.slug}`}>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-xs line-clamp-2">{series.title}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recently Added</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full">
                Recent
              </button>
              <button className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full">
                Completed
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto carousel-container pb-2 hide-scrollbar">
            {demoSeries.map((series, index) => (
              <motion.div
                key={`recent-${series.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="carousel-item flex-shrink-0 w-36"
              >
                <Link href={`/series/${series.slug}`}>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 series-card">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-xs line-clamp-2">{series.title}</h3>
                  <p className="text-xs text-gray-500">{series.chapters} ch</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Popular Now</h2>
            <Link href="/search?sort=popular" className="text-sm text-red-500 font-medium">
              More
            </Link>
          </div>
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 xs:gap-2 sm:gap-4">
            {demoSeries.slice(0, 6).map((series, index) => (
              <motion.div
                key={`popular-${series.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/series/${series.slug}`} className="flex gap-2 sm:gap-3">
                  <div className="relative w-16 xs:w-16 sm:w-20 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <h3 className="font-medium text-xs sm:text-sm line-clamp-2">{series.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{series.author}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-0.5">
                        <Icons.Heart className="w-3 h-3" /> {formatNumber(series.likes)}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Icons.Comment className="w-3 h-3" /> {formatNumber(series.comments)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Latest Updates */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Latest Updates</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                Hot
              </button>
              <button className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full">
                New
              </button>
            </div>
          </div>
          <div className="space-y-3 xs:space-y-2 sm:space-y-4">
            {demoSeries.map((series, index) => (
              <motion.div
                key={`latest-${series.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/series/${series.slug}`} className="flex gap-2 sm:gap-3">
                  <div className="relative w-20 xs:w-20 sm:w-24 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-0.5 xs:py-1">
                    <h3 className="font-semibold text-sm line-clamp-1">{series.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{series.author}</p>
                    <p className="text-xs text-gray-400 mt-1">Chapter {series.chapters - 5}</p>
                    <div className="flex items-center gap-2 xs:gap-3 mt-1 xs:mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-0.5">
                        <Icons.Heart className="w-3 h-3" /> {formatNumber(series.likes)}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Icons.Comment className="w-3 h-3" /> {formatNumber(series.comments)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start pt-1">
                    <span className="text-xs text-gray-400">{timeAgo(new Date())}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
