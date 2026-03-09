'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

export default function PublishArtPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadedArt, setUploadedArt] = useState<number>(12);
  const [totalViews, setTotalViews] = useState<number>(45000);
  const [totalLikes, setTotalLikes] = useState<number>(3200);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'manga', label: 'Manga' },
    { id: 'manhwa', label: 'Manhwa' },
    { id: 'manhua', label: 'Manhua' },
    { id: 'anime', label: 'Anime' },
    { id: 'fanart', label: 'Fan Art' },
    { id: 'original', label: 'Original' },
  ];

  const demoArt = [
    { id: '1', title: 'Solo Leveling Art', author: 'Artist123', likes: 1250, views: 15000, image: 'https://picsum.photos/seed/art1/400/600' },
    { id: '2', title: 'Naruto Fan Art', author: 'AnimeFan', likes: 980, views: 12000, image: 'https://picsum.photos/seed/art2/400/600' },
    { id: '3', title: 'Original Character', author: 'CreatorPro', likes: 2100, views: 25000, image: 'https://picsum.photos/seed/art3/400/600' },
    { id: '4', title: 'Dragon Design', author: 'MythicalArt', likes: 780, views: 9000, image: 'https://picsum.photos/seed/art4/400/600' },
    { id: '5', title: 'Fantasy Scene', author: 'DreamWorks', likes: 1560, views: 18000, image: 'https://picsum.photos/seed/art5/400/600' },
    { id: '6', title: 'Character Portrait', author: 'Portraits', likes: 890, views: 11000, image: 'https://picsum.photos/seed/art6/400/600' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Publish Art</h1>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium">
            + Upload Art
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="text-2xl font-bold">{uploadedArt}</p>
            <p className="text-sm text-gray-500">Artworks</p>
          </div>
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="text-2xl font-bold">{(totalViews / 1000).toFixed(1)}K</p>
            <p className="text-sm text-gray-500">Views</p>
          </div>
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <p className="text-2xl font-bold">{(totalLikes / 1000).toFixed(1)}K</p>
            <p className="text-sm text-gray-500">Likes</p>
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

      {/* Art Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {demoArt.map((art) => (
            <div key={art.id} className="group">
              <Link href={`/art/${art.id}`}>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                      <span className="flex items-center gap-1 text-sm">
                        <Icons.Heart className="w-4 h-4" /> {art.likes}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <Icons.Eye className="w-4 h-4" /> {(art.views / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{art.title}</h3>
                <p className="text-xs text-gray-500">by {art.author}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
