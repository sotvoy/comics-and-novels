'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Icons from '@/components/ui/Icons';

const demoPages = Array.from({ length: 15 }, (_, i) => `https://picsum.photos/seed/page${i + 1}/800/1200`);

export default function ReadPage() {
  const params = useParams();
  const { slug, chapter } = params;

  return (
    <div className="min-h-screen bg-black">
      {/* Reader Controls */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent py-2 px-4">
        <div className="flex items-center justify-between">
          <Link href={`/series/${slug}`} className="text-white flex items-center gap-2">
            <Icons.Back /> <span className="text-sm">Back</span>
          </Link>
          <span className="text-white text-sm">Chapter {chapter}</span>
          <div className="flex gap-2">
            <button className="text-white"><Icons.Settings /></button>
            <button className="text-white"><Icons.More /></button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="reading-content">
        {demoPages.map((page, index) => (
          <Image key={index} src={page} alt={`Page ${index + 1}`} width={800} height={1200} className="w-full h-auto" />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-gradient-to-t from-black/80 to-transparent py-4 px-4">
        <div className="flex items-center justify-between">
          <Link href={`/read/${slug}/${Number(chapter) - 1}`} className="text-white px-4 py-2 bg-white/20 rounded-lg">Prev</Link>
          <Link href={`/series/${slug}`} className="text-white"><Icons.List /></Link>
          <Link href={`/read/${slug}/${Number(chapter) + 1}`} className="text-white px-4 py-2 bg-white/20 rounded-lg">Next</Link>
        </div>
      </div>

      {/* Like Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 z-50">
        <div className="flex items-center justify-center gap-6">
          <button className="flex items-center gap-2 text-white"><Icons.Heart /> Like</button>
          <button className="flex items-center gap-2 text-white"><Icons.Comment /> Comment</button>
          <button className="flex items-center gap-2 text-white"><Icons.Bookmark /> Save</button>
          <button className="flex items-center gap-2 text-white"><Icons.Share /> Share</button>
        </div>
      </div>
    </div>
  );
}
