'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const demoSeries = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', chapters: 179, likes: 125000, comments: 45000, status: 'ongoing' },
  { id: '2', slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', chapters: 180, likes: 98000, comments: 32000, status: 'ongoing' },
  { id: '3', slug: 'martial-peak', title: 'Martial Peak', cover: 'https://picsum.photos/seed/martial/300/450', author: 'Kuang Shang', chapters: 2500, likes: 45000, comments: 12000, status: 'ongoing' },
  { id: '4', slug: 'lord-of-mysteries', title: 'Lord of the Mysteries', cover: 'https://picsum.photos/seed/lotm/300/450', author: 'Cuttlefish', chapters: 620, likes: 78000, comments: 23000, status: 'ongoing' },
  { id: '5', slug: 'dragon-ascension', title: 'Dragon Ascension', cover: 'https://picsum.photos/seed/dragon/300/450', author: 'Webnovel', chapters: 350, likes: 52000, comments: 11000, status: 'completed' },
  { id: '6', slug: 'reincarnated-slayer', title: 'The Reincarnated Slayer', cover: 'https://picsum.photos/seed/rs/300/450', author: 'Unknown', chapters: 180, likes: 38000, comments: 8000, status: 'ongoing' },
];

const genres = ['All', 'Action', 'Fantasy', 'Romance', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Martial Arts'];

export default function ManhuaPage() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-6 pt-20">
        <h1 className="text-2xl font-bold">Manhua</h1>
        <p className="text-white/80 text-sm mt-1">Chinese Comics</p>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium ${
                selectedGenre === genre
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {['popular', 'new', 'updated'].map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                sortBy === sort
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Series Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {demoSeries.map((series) => (
          <Link key={series.id} href={`/series/${series.slug}`} className="block">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2">
              <Image src={series.cover} alt={series.title} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-0.5 text-xs rounded ${
                  series.status === 'ongoing' ? 'bg-green-500' : 'bg-gray-500'
                } text-white`}>
                  {series.status}
                </span>
              </div>
            </div>
            <h3 className="font-medium text-sm line-clamp-1">{series.title}</h3>
            <p className="text-xs text-gray-500">{series.author}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <span>{series.chapters} ch</span>
              <span className="flex items-center gap-0.5">
                <Icons.Heart className="w-3 h-3" /> {(series.likes / 1000).toFixed(0)}K
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
