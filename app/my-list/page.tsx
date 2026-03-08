'use client';

import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const bookmarkedSeries = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', lastRead: 'Chapter 45' },
  { id: '2', slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', lastRead: 'Chapter 120' },
];

export default function MyListPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <h1 className="text-xl font-bold mb-6">My List</h1>
      <div className="grid grid-cols-2 gap-4">
        {bookmarkedSeries.map((series) => (
          <Link key={series.id} href={`/read/${series.slug}/1`} className="block">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
              <Image src={series.cover} alt={series.title} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2">
                <p className="text-white text-xs">{series.lastRead}</p>
              </div>
            </div>
            <h3 className="font-medium text-sm">{series.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
