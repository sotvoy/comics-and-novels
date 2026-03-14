'use client';
import Link from 'next/link';
import Icons from '@/components/ui/Icons';

const genreData = { id: 'action', title: 'Action', description: 'High-energy stories with intense battles and physical challenges' };

const demoSeries = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', chapters: 179, likes: 125000 },
  { id: '2', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', chapters: 580, likes: 156000 },
  { id: '3', slug: 'noblesse', title: 'Noblesse', cover: 'https://picsum.photos/seed/noblesse/300/450', chapters: 546, likes: 89000 },
  { id: '4', slug: 'god-of-high-school', title: 'God of High School', cover: 'https://picsum.photos/seed/gos/300/450', chapters: 569, likes: 67000 },
];

export default function GenrePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">{genreData.title}</h1>
        </div>
        <p className="text-gray-500 mb-6">{genreData.description}</p>
        <div className="grid grid-cols-2 gap-4">
          {demoSeries.map(series => (
            <Link key={series.id} href={`/series/${series.slug}`}>
              <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <div className="aspect-[3/4] relative">
                  <img src={series.cover} alt={series.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm truncate">{series.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{series.chapters} chapters</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
