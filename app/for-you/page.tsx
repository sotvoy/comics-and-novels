'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const forYouData = {
  continueReading: [
    { slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', chapter: 45, progress: 65 },
    { slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', chapter: 120, progress: 30 },
    { slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', chapter: 89, progress: 80 },
  ],
  recommended: [
    { slug: 'lookism', title: 'Lookism', cover: 'https://picsum.photos/seed/lookism/300/450', author: 'Park Hye-jin', likes: 125000, match: 98 },
    { slug: 'sweet-home', title: 'Sweet Home', cover: 'https://picsum.photos/seed/sweet/300/450', author: 'Kim Carnby', likes: 98000, match: 95 },
    { slug: 'god-of-high-school', title: 'The God of High School', cover: 'https://picsum.photos/seed/godhs/300/450', author: 'Yongje Park', likes: 87000, match: 92 },
    { slug: 'unordinary', title: 'UnOrdinary', cover: 'https://picsum.photos/seed/unord/300/450', author: 'Uru-Chan', likes: 76000, match: 89 },
  ],
  becauseYouLiked: [
    { slug: 'the-begin-after-end', title: 'The Beginning After The End', cover: 'https://picsum.photos/seed/tbate/300/450', author: 'TurtleMe', likes: 65000 },
    { slug: 'murder-king', title: 'Murder King', cover: 'https://picsum.photos/seed/mk/300/450', author: 'Unknown', likes: 42000 },
    { slug: 'reincarnated-slayer', title: 'The Reincarnated Slayer', cover: 'https://picsum.photos/seed/rs/300/450', author: 'Unknown', likes: 38000 },
  ],
  newThisWeek: [
    { slug: 'new-series-1', title: 'The New Hero', cover: 'https://picsum.photos/seed/nh1/300/450', author: 'New Author', chapters: 5 },
    { slug: 'new-series-2', title: 'Return of the Demon', cover: 'https://picsum.photos/seed/rd/300/450', author: 'Popular Writer', chapters: 8 },
    { slug: 'new-series-3', title: 'Solo Tournament', cover: 'https://picsum.photos/seed/st/300/450', author: 'Rising Star', chapters: 3 },
  ],
};

export default function ForYouPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">For You</h1>
          <button onClick={handleRefresh} className={`p-2 rounded-full ${refreshing ? 'animate-spin' : ''}`}>
            <Icons.Refresh className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Continue Reading */}
        {forYouData.continueReading.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Continue Reading</h2>
              <Link href="/my-list" className="text-sm text-red-500">See all</Link>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar">
              {forYouData.continueReading.map((item) => (
                <Link key={item.slug} href={`/read/${item.slug}/${item.chapter}`} className="flex-shrink-0 w-40">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2">
                    <Image src={item.cover} alt={item.title} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                      <div className="h-full bg-red-500" style={{ width: `${item.progress}%` }} />
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                      Ch. {item.chapter}
                    </div>
                  </div>
                  <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.progress}% complete</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recommended For You */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recommended For You</h2>
            <span className="text-xs text-gray-500">Based on your reading</span>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {forYouData.recommended.map((item) => (
              <Link key={item.slug} href={`/series/${item.slug}`} className="flex-shrink-0 w-36">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2">
                  <Image src={item.cover} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded font-bold">
                    {item.match}% Match
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.author}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Because You Liked */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Because You Liked Solo Leveling</h2>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {forYouData.becauseYouLiked.map((item) => (
              <Link key={item.slug} href={`/series/${item.slug}`} className="flex-shrink-0 w-32">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2">
                  <Image src={item.cover} alt={item.title} fill className="object-cover" />
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.author}</p>
                <p className="text-xs text-red-500">{(item.likes / 1000).toFixed(0)}K likes</p>
              </Link>
            ))}
          </div>
        </section>

        {/* New This Week */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">New This Week</h2>
            <button className="text-sm text-red-500">View all</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {forYouData.newThisWeek.map((item) => (
              <Link key={item.slug} href={`/series/${item.slug}`} className="block">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2">
                  <Image src={item.cover} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                    NEW
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.author} • {item.chapters} ch</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Reads */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Quick Reads</h2>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {['5 min', '10 min', '15 min', '30 min', '1 hour'].map((time) => (
              <button key={time} className="flex-shrink-0 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                {time}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
