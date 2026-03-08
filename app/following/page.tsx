'use client';

import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const followedSeries = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', newChapters: 3 },
  { id: '2', slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', newChapters: 1 },
  { id: '3', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', newChapters: 2 },
];

export default function FollowingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <h1 className="text-xl font-bold mb-6">Following</h1>
      <div className="space-y-4">
        {followedSeries.map((series) => (
          <Link key={series.id} href={`/series/${series.slug}`} className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="relative w-16 aspect-[3/4] rounded overflow-hidden">
              <Image src={series.cover} alt={series.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{series.title}</h3>
              <p className="text-sm text-gray-500">{series.author}</p>
              {series.newChapters > 0 && <span className="inline-block mt-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded">{series.newChapters} new</span>}
            </div>
            <Icons.ArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
}
