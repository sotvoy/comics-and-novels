'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

export default function WriteStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [totalStories, setTotalStories] = useState<number>(8);
  const [totalReads, setTotalReads] = useState<number>(125000);
  const [totalFollowers, setTotalFollowers] = useState<number>(5600);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'romance', label: 'Romance' },
    { id: 'action', label: 'Action' },
    { id: 'horror', label: 'Horror' },
    { id: 'scifi', label: 'Sci-Fi' },
    { id: 'comedy', label: 'Comedy' },
  ];

  const demoStories = [
    { id: '1', title: 'The Last Emperor', author: 'StoryMaster', chapters: 45, likes: 12500, reads: 150000, status: 'ongoing', image: 'https://picsum.photos/seed/story1/400/600' },
    { id: '2', title: 'Love in the Dark', author: 'RomanceQueen', chapters: 32, likes: 9800, reads: 120000, status: 'ongoing', image: 'https://picsum.photos/seed/story2/400/600' },
    { id: '3', title: 'Shadow Warriors', author: 'ActionKing', chapters: 78, likes: 15600, reads: 200000, status: 'completed', image: 'https://picsum.photos/seed/story3/400/600' },
    { id: '4', title: 'The Midnight House', author: 'HorrorWriter', chapters: 24, likes: 7800, reads: 95000, status: 'ongoing', image: 'https://picsum.photos/seed/story4/400/600' },
    { id: '5', title: 'Starship Atlantis', author: 'SciFiAuthor', chapters: 56, likes: 11200, reads: 140000, status: 'ongoing', image: 'https://picsum.photos/seed/story5/400/600' },
    { id: '6', title: 'Office Chaos', author: 'ComedyWriter', chapters: 18, likes: 5600, reads: 75000, status: 'completed', image: 'https://picsum.photos/seed/story6/400/600' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Write Stories</h1>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium">
            + New Story
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="text-2xl font-bold">{totalStories}</p>
            <p className="text-sm text-gray-500">Stories</p>
          </div>
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="text-2xl font-bold">{(totalReads / 1000).toFixed(1)}K</p>
            <p className="text-sm text-gray-500">Total Reads</p>
          </div>
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="text-2xl font-bold">{(totalFollowers / 1000).toFixed(1)}K</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stories List */}
      <div className="p-4 space-y-4">
        {demoStories.map((story) => (
          <Link key={story.id} href={`/series/${story.id}`} className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="relative w-20 aspect-[2/3] rounded-lg overflow-hidden flex-shrink-0">
              <Image src={story.image} alt={story.title} fill className="object-cover" />
              {story.status === 'completed' && (
                <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-green-500 text-white text-[10px] rounded">END</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold line-clamp-1">{story.title}</h3>
              <p className="text-sm text-gray-500">by {story.author}</p>
              <p className="text-xs text-gray-400 mt-1">{story.chapters} chapters</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Icons.Heart className="w-3 h-3" /> {(story.likes / 1000).toFixed(1)}K
                </span>
                <span className="flex items-center gap-1">
                  <Icons.Eye className="w-3 h-3" /> {(story.reads / 1000).toFixed(1)}K
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
