'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

const demoSeries = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', chapters: 179, likes: 125000, comments: 45000, status: 'ongoing' },
  { id: '2', slug: 'omniscient-reader', title: 'Omniscient Reader\'s Viewpoint', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', chapters: 180, likes: 98000, comments: 32000, status: 'ongoing' },
  { id: '3', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', chapters: 580, likes: 156000, comments: 67000, status: 'ongoing' },
  { id: '4', slug: 'noblesse', title: 'Noblesse', cover: 'https://picsum.photos/seed/noblesse/300/450', author: 'Son JaeHo', chapters: 545, likes: 89000, comments: 28000, status: 'completed' },
  { id: '5', slug: 'god-of-high-school', title: 'The God of High School', cover: 'https://picsum.photos/seed/godhs/300/450', author: 'Yongje Park', chapters: 569, likes: 78000, comments: 21000, status: 'completed' },
  { id: '6', slug: 'sweet-home', title: 'Sweet Home', cover: 'https://picsum.photos/seed/sweet/300/450', author: 'Kim Carnby', chapters: 200, likes: 67000, comments: 18000, status: 'completed' },
];

const formatNumber = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

export default function ComicsPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <section className="mb-8">
        <div className="flex gap-4 overflow-x-auto carousel-container pb-2 hide-scrollbar">
          {demoSeries.slice(0, 3).map((series, index) => (
            <motion.div key={series.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }} className="carousel-item flex-shrink-0 w-full md:w-96">
              <Link href={`/series/${series.slug}`}>
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image src={series.cover} alt={series.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs rounded mb-2">COMIC</span>
                    <h3 className="font-bold text-lg text-white">{series.title}</h3>
                    <p className="text-sm text-gray-300">{series.author} • {series.chapters} chapters</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex gap-3 mb-4 overflow-x-auto hide-scrollbar">
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
