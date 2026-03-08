'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

const demoSeries = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', chapters: 179, likes: 125000, comments: 45000, status: 'ongoing', updatedAt: '2h ago' },
  { id: '2', slug: 'omniscient-reader', title: 'Omniscient Reader\'s Viewpoint', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', chapters: 180, likes: 98000, comments: 32000, status: 'ongoing', updatedAt: '3h ago' },
  { id: '3', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', chapters: 580, likes: 156000, comments: 67000, status: 'ongoing', updatedAt: '5h ago' },
  { id: '4', slug: 'noblesse', title: 'Noblesse', cover: 'https://picsum.photos/seed/noblesse/300/450', author: 'Son JaeHo', chapters: 545, likes: 89000, comments: 28000, status: 'completed', updatedAt: '1d ago' },
  { id: '5', slug: 'god-of-high-school', title: 'The God of High School', cover: 'https://picsum.photos/seed/godhs/300/450', author: 'Yongje Park', chapters: 569, likes: 78000, comments: 21000, status: 'completed', updatedAt: '2d ago' },
  { id: '6', slug: 'sweet-home', title: 'Sweet Home', cover: 'https://picsum.photos/seed/sweet/300/450', author: 'Kim Carnby', chapters: 200, likes: 67000, comments: 18000, status: 'completed', updatedAt: '3d ago' },
  { id: '7', slug: 'lookism', title: 'Lookism', cover: 'https://picsum.photos/seed/lookism/300/450', author: 'Park Hye-jin', chapters: 450, likes: 55000, comments: 15000, status: 'ongoing', updatedAt: '4h ago' },
  { id: '8', slug: 'unordinary', title: 'UnOrdinary', cover: 'https://picsum.photos/seed/unord/300/450', author: 'Uru-Chan', chapters: 280, likes: 48000, comments: 12000, status: 'ongoing', updatedAt: '6h ago' },
  { id: '9', slug: 'the-begin-after-end', title: 'The Beginning After The End', cover: 'https://picsum.photos/seed/tbate/300/450', author: 'TurtleMe', chapters: 160, likes: 42000, comments: 9800, status: 'ongoing', updatedAt: '1d ago' },
  { id: '10', slug: 'solo-leveling-2', title: 'Solo Leveling: The Gate', cover: 'https://picsum.photos/seed/solo2/300/450', author: 'Chugong', chapters: 50, likes: 35000, comments: 7800, status: 'ongoing', updatedAt: '12h ago' },
];

const formatNumber = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

export default function ComicsPage() {
  const [filter, setFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Top 10 Auto Carousel - Asura Scans Style */}
      <section className="mb-6">
        <div className="relative">
          {/* 16:9 Carousel */}
          <div className="flex gap-3 overflow-x-auto carousel-container pb-2 hide-scrollbar px-4">
            {demoSeries.slice(0, 10).map((series, index) => (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="carousel-item flex-shrink-0 w-[85%] sm:w-[70%] md:w-[55%] lg:w-[40%]"
              >
                <Link href={`/series/${series.slug}`}>
                  {/* 16:9 Cover */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                    <Image src={series.cover} alt={series.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Rank Badge */}
                    <div className="absolute top-2 left-2 w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">#{index + 1}</span>
                    </div>
                    {/* Status */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 text-xs rounded ${series.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
                        {series.status}
                      </span>
                    </div>
                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="font-bold text-white text-sm line-clamp-1">{series.title}</h3>
                    </div>
                  </div>
                  {/* Info Below - Comick.io Style */}
                  <div className="px-1">
                    <p className="text-xs font-medium text-gray-900 dark:text-white line-clamp-1">{series.author}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                      <span>{series.chapters} ch</span>
                      <span className="flex items-center gap-0.5">
                        <Icons.Heart className="w-2.5 h-2.5" /> {formatNumber(series.likes)}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Icons.Comment className="w-2.5 h-2.5" /> {formatNumber(series.comments)}
                      </span>
                      <span>{series.updatedAt}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events / News / Lucky Create */}
      <section className="mb-6 px-4">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar">
          {['Events', 'News', 'Lucky Create'].map((item) => (
            <button key={item} className="flex-shrink-0 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">{item}</button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">New Chapters</h2>
          <Link href="/following" className="text-sm text-red-500">More</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto carousel-container pb-2 hide-scrollbar">
          {demoSeries.slice(0, 5).map((series) => (
            <Link key={series.id} href={`/series/${series.slug}`} className="carousel-item flex-shrink-0 w-32">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                <Image src={series.cover} alt={series.title} fill className="object-cover" />
              </div>
              <p className="text-xs font-medium line-clamp-2">{series.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Reading History</h2>
          <Link href="/my-list" className="text-sm text-red-500">More</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto carousel-container pb-2 hide-scrollbar">
          {demoSeries.slice(0, 4).map((series) => (
            <Link key={series.id} href={`/read/${series.slug}/1`} className="carousel-item flex-shrink-0 w-32">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                <Image src={series.cover} alt={series.title} fill className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500" style={{ width: '60%' }} />
              </div>
              <p className="text-xs font-medium line-clamp-2">{series.title}</p>
              <p className="text-xs text-gray-500">Ch. {series.chapters - 5}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {['all', 'ongoing', 'completed', 'hiatus', 'dropped'].map((status) => (
            <button key={status} onClick={() => setFilter(status)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium capitalize ${filter === status ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {status}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {demoSeries.map((series, index) => (
            <motion.div key={series.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Link href={`/series/${series.slug}`}>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 series-card">
                  <Image src={series.cover} alt={series.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 text-xs rounded ${series.status === 'ongoing' ? 'bg-green-500' : series.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}>
                      {series.status}
                    </span>
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-2">{series.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{series.author}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Icons.Heart className="w-3 h-3" /> {formatNumber(series.likes)}</span>
                  <span className="flex items-center gap-1"><Icons.Comment className="w-3 h-3" /> {formatNumber(series.comments)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
