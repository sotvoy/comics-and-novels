'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';
import CategoryPills from '@/components/ui/CategoryPills';

// Demo data
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
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Category Pills with Navigation */}
      <CategoryPills />

      <div className="p-4">
        {/* Hero Carousel - Auto Play with Cut Corners */}
        <section className="mb-6 -mx-4">
          <div className="flex overflow-x-auto snap-x snap-mandatory carousel-container hide-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
            {demoSeries.slice(0, 5).map((series, index) => (
              <div key={series.id} className="flex-shrink-0 w-full snap-center" style={{ scrollSnapAlign: 'start' }}>
                <div className="cursor-default">
                  <div className="relative aspect-[3/2] w-full overflow-hidden" style={{ 
                    borderRadius: '20px',
                    clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)'
                  }}>
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* Cut Corner Effect */}
                    <div className="absolute bottom-0 right-0 w-16 h-16" style={{
                      background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.3) 50%)'
                    }} />
                    
                    {/* Content on Cover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs rounded mb-2">
                        {series.type.toUpperCase()}
                      </span>
                      <h3 className="font-bold text-white text-xl md:text-2xl line-clamp-1">{series.title}</h3>
                      <p className="text-white/80 text-sm mt-1">{series.author}</p>
                      {/* Info Bar */}
                      <div className="flex items-center gap-4 mt-3 text-white/70 text-xs">
                        <span>{series.chapters} ch</span>
                        <span className="flex items-center gap-1">
                          <Icons.Heart className="w-3 h-3" /> {(series.likes / 1000).toFixed(1)}K
                        </span>
                        <span className="flex items-center gap-1">
                          <Icons.Comment className="w-3 h-3" /> {(series.comments / 1000).toFixed(1)}K
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Dots Indicator - Active indicator */}
          <div className="flex justify-center gap-2 mt-3">
            {demoSeries.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-8 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-red-500 w-8' : 'bg-gray-300 dark:bg-gray-700'}`}
              />
            ))}
          </div>
        </section>

        {/* Genre Chips - Quick Filter */}
        <section className="mb-4 px-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {[
              { id: 'all', label: 'All', href: '/search' },
              { id: 'action', label: 'Action', href: '/search?genre=action' },
              { id: 'fantasy', label: 'Fantasy', href: '/search?genre=fantasy' },
              { id: 'romance', label: 'Romance', href: '/search?genre=romance' },
              { id: 'adventure', label: 'Adventure', href: '/search?genre=adventure' },
              { id: 'comedy', label: 'Comedy', href: '/search?genre=comedy' },
              { id: 'drama', label: 'Drama', href: '/search?genre=drama' },
              { id: 'horror', label: 'Horror', href: '/search?genre=horror' },
              { id: 'scifi', label: 'Sci-Fi', href: '/search?genre=sci-fi' },
              { id: 'mystery', label: 'Mystery', href: '/search?genre=mystery' },
              { id: 'sports', label: 'Sports', href: '/search?genre=sports' },
              { id: 'sliceoflife', label: 'Slice of Life', href: '/search?genre=slice-of-life' },
            ].map((genre) => (
              <Link key={genre.id} href={genre.href}>
                <span className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white transition-colors whitespace-nowrap">
                  {genre.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* New Chapters from Followed - Comick.io Style */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3 px-4">
            <h2 className="text-lg font-semibold">New Chapters</h2>
            <Link href="/following" className="text-sm text-red-500 font-medium">
              See all
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto carousel-container pb-2 hide-scrollbar px-4">
            {demoSeries.slice(0, 4).map((series, index) => (
              <motion.div
                key={`new-${series.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="carousel-item flex-shrink-0 w-32"
              >
                <div className="cursor-default">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500" />
                  </div>
                  <h3 className="font-medium text-xs line-clamp-1">{series.title}</h3>
                  <div className="flex items-center gap-1 mt-1 text-[9px] text-gray-500">
                    <span className="flex items-center gap-0.5">
                      <Icons.Heart className="w-2 h-2" /> {(series.likes / 1000).toFixed(1)}K
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Icons.Comment className="w-2 h-2" /> {(series.comments / 1000).toFixed(1)}K
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular This Week */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3 px-4">
            <h2 className="text-lg font-semibold">Popular This Week</h2>
            <Link href="/ranking" className="text-sm text-red-500 font-medium">
              See all
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto carousel-container pb-2 hide-scrollbar px-4">
            {demoSeries.slice(2, 6).map((series, index) => (
              <motion.div
                key={`popular-${series.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="carousel-item flex-shrink-0 w-32"
              >
                <div className="cursor-default">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-1 left-1 w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-xs line-clamp-1">{series.title}</h3>
                  <div className="flex items-center gap-1 mt-1 text-[9px] text-gray-500">
                    <span>{series.chapters} ch</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Icons.Heart className="w-2 h-2" /> {(series.likes / 1000).toFixed(1)}K
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recently Added - Comick.io Style */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3 px-4">
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
          <div className="flex gap-3 overflow-x-auto carousel-container pb-2 hide-scrollbar px-4">
            {demoSeries.slice(0, 6).map((series, index) => (
              <motion.div
                key={`recent-${series.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="carousel-item flex-shrink-0 w-32"
              >
                <div className="cursor-default">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 series-card">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-xs line-clamp-1">{series.title}</h3>
                  <p className="text-[10px] text-gray-500">{series.author}</p>
                  <div className="flex items-center gap-1 mt-1 text-[9px] text-gray-500">
                    <span>{series.chapters} ch</span>
                    <span className="flex items-center gap-0.5">
                      <Icons.Heart className="w-2 h-2" /> {(series.likes / 1000).toFixed(1)}K
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular - Grid Style */}
        <section className="mb-6 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Popular Now</h2>
            <Link href="/search?sort=popular" className="text-sm text-red-500 font-medium">
              More
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {demoSeries.slice(0, 6).map((series, index) => (
              <motion.div
                key={`popular-${series.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="cursor-default">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 series-card">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-xs line-clamp-1">{series.title}</h3>
                  <p className="text-[10px] text-gray-500">{series.author}</p>
                  <div className="flex items-center gap-1 mt-1 text-[9px] text-gray-500">
                    <span>{series.chapters} ch</span>
                    <span className="flex items-center gap-0.5">
                      <Icons.Heart className="w-2 h-2" /> {(series.likes / 1000).toFixed(1)}K
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Latest Updates */}
        <section className="px-4 pb-4">
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
          <div className="space-y-3">
            {demoSeries.slice(0, 6).map((series, index) => (
              <motion.div
                key={`latest-${series.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex gap-3 cursor-default">
                  <div className="relative w-20 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={series.cover}
                      alt={series.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
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
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
