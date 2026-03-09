'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icons from '@/components/ui/Icons';

const audiobooks = [
  { id: '1', title: 'The Beginning After The End', author: 'Turtle Feet', cover: 'https://picsum.photos/seed/audio1/300/300', chapters: 150, duration: '45h 30m', narrator: 'Pro Voice Actors' },
  { id: '2', title: 'Solo Leveling', author: 'Chugong', cover: 'https://picsum.photos/seed/audio2/300/300', chapters: 180, duration: '52h 15m', narrator: 'Pro Voice Actors' },
  { id: '3', title: 'Omniscient Reader', author: 'Sing-Shong', cover: 'https://picsum.photos/seed/audio3/300/300', chapters: 200, duration: '58h 45m', narrator: 'Pro Voice Actors' },
  { id: '4', title: 'Tower of God', author: 'SIU', cover: 'https://picsum.photos/seed/audio4/300/300', chapters: 580, duration: '120h 30m', narrator: 'Pro Voice Actors' },
  { id: '5', title: 'Lookism', author: 'Park Tae-Jun', cover: 'https://picsum.photos/seed/audio5/300/300', chapters: 450, duration: '95h 20m', narrator: 'Pro Voice Actors' },
  { id: '6', title: 'True Beauty', author: 'Yaongyi', cover: 'https://picsum.photos/seed/audio6/300/300', chapters: 120, duration: '35h 45m', narrator: 'Pro Voice Actors' },
];

const categories = ['All', 'Action', 'Romance', 'Fantasy', 'Sci-Fi', 'Drama', 'Comedy', 'Thriller'];

export default function AudiobooksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <h1 className="text-2xl font-bold">Audiobooks</h1>
        <p className="text-purple-200 text-sm">Listen to your favorite stories</p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 p-4 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden h-48"
        >
          <img src="https://picsum.photos/seed/featured-audio/800/400" alt="Featured" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">Featured</span>
            <h2 className="text-white font-bold text-xl mt-1">Premium Audio Collections</h2>
            <p className="text-gray-300 text-sm">Listen anytime, anywhere</p>
          </div>
        </motion.div>
      </div>

      {/* List */}
      <div className="px-4">
        <h2 className="text-lg font-bold mb-3">Popular Audiobooks</h2>
        <div className="grid grid-cols-2 gap-4">
          {audiobooks.map((book, i) => (
            <Link href={`/audiobooks/${book.id}`} key={book.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative">
                  <img src={book.cover} alt={book.title} className="w-full h-40 object-cover" />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    🎧 {book.duration}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm line-clamp-1">{book.title}</h3>
                  <p className="text-gray-500 text-xs">{book.author}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span>📖 {book.chapters} ch</span>
                    <span>🎤 {book.narrator.split(' ')[0]}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
