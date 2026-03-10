'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Icons from '@/components/ui/Icons';

const novelsData: Record<string, any> = {
  'omniscient-reader': {
    id: '1',
    title: 'Omniscient Reader\'s Viewpoint',
    slug: 'omniscient-reader',
    cover: 'https://picsum.photos/seed/novel1/600/900',
    banner: 'https://picsum.photos/seed/novelbanner/1200/400',
    author: 'Sing-Shong',
    status: 'ongoing',
    genres: ['Action', 'Fantasy', 'Adventure'],
    tags: ['Reincarnation', 'System', 'Cultivation'],
    likes: 98000,
    comments: 32000,
    rating: 4.9,
    synopsis: 'Only the Reader who had completed all 5.000 years of the novel through and through would know that the moment the 3rd arc started, the lead protagonist would kill the king and destroy the world.',
    chapters: Array.from({ length: 15 }, (_, i) => ({ number: i + 1, title: `Chapter ${i + 1}`, publishedAt: new Date(Date.now() - i * 86400000).toISOString() })),
  },
};

const formatNumber = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

export default function NovelsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const novel = novelsData[slug] || novelsData['omniscient-reader'];
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const displayedChapters = showAllChapters ? novel.chapters : novel.chapters.slice(0, 10);

  const reactions = ['🔥', '❤️', '😂', '😢', '😮', '👏'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Banner */}
      <div className="relative h-48 md:h-64">
        <Image src={novel.banner} alt={novel.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative px-4 -mt-24">
        <div className="flex gap-4">
          <div className="relative w-28 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0 shadow-lg border-2 border-white dark:border-gray-900">
            <Image src={novel.cover} alt={novel.title} fill className="object-cover" />
          </div>
          <div className="flex-1 pt-14">
            <h1 className="text-xl font-bold mb-1">{novel.title}</h1>
            <p className="text-sm text-gray-500 mb-2">{novel.author}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded uppercase">Novel</span>
              <span className={`px-2 py-0.5 text-xs rounded ${novel.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'} text-white`}>{novel.status}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Icons.Heart className="w-4 h-4" /> {formatNumber(novel.likes)}</span>
              <span className="flex items-center gap-1"><Icons.Comment className="w-4 h-4" /> {formatNumber(novel.comments)}</span>
              <span className="flex items-center gap-1"><Icons.Star className="w-4 h-4" /> {novel.rating}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Link href={`/read/${novel.slug}/1`} className="flex-1 bg-red-500 text-white text-center py-3 rounded-lg font-medium">Read Now</Link>
          <button onClick={() => setIsFollowing(!isFollowing)} className={`px-4 py-3 rounded-lg font-medium ${isFollowing ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'}`}>{isFollowing ? 'Following' : 'Follow'}</button>
          <button className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800"><Icons.Bookmark /></button>
          <button className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800"><Icons.Share /></button>
        </div>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm font-medium">Rate:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className="text-xl">⭐</button>
            ))}
          </div>
          <span className="text-sm text-gray-500">({novel.rating})</span>
        </div>

        {/* Reactions */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setShowReactions(!showReactions)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
              <span>{selectedReaction || '👍'}</span>
              <span className="text-gray-500">React</span>
            </button>
            <span className="text-xs text-gray-500">Tap to react</span>
          </div>
          {showReactions && (
            <div className="flex gap-2 mt-2 animate-in fade-in slide-in-from-top-2">
              {reactions.map((reaction) => (
                <button key={reaction} onClick={() => { setSelectedReaction(reaction); setShowReactions(false); }} className={`w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedReaction === reaction ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                  {reaction}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Genres */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {novel.genres.map((genre: string) => (<Link key={genre} href={`/search?genre=${genre.toLowerCase()}`} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs hover:bg-red-100 dark:hover:bg-red-900">{genre}</Link>))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {novel.tags.map((tag: string) => (<Link key={tag} href={`/search?tag=${tag.toLowerCase()}`} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">#{tag}</Link>))}
          </div>
        </div>

        {/* Author Link */}
        <div className="mt-4 text-sm">
          <span className="text-gray-500">Author:</span>
          <Link href={`/author/${novel.author.toLowerCase().replace(' ', '')}`} className="ml-1 text-red-500 hover:underline"> {novel.author}</Link>
        </div>

        {/* Synopsis */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Synopsis</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{novel.synopsis}</p>
        </div>

        {/* Chapters */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Chapters</h3>
            <span className="text-sm text-gray-500">{novel.chapters.length} chapters</span>
          </div>
          <div className="space-y-2">
            {displayedChapters.map((chapter: any) => (
              <Link key={chapter.number} href={`/read/${novel.slug}/${chapter.number}`} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                <div><p className="font-medium text-sm">Chapter {chapter.number}</p><p className="text-xs text-gray-500">{new Date(chapter.publishedAt).toLocaleDateString()}</p></div>
                <Icons.ArrowRight />
              </Link>
            ))}
          </div>
          {novel.chapters.length > 10 && (<button onClick={() => setShowAllChapters(!showAllChapters)} className="w-full mt-4 py-3 text-center text-red-500 font-medium">{showAllChapters ? 'Show Less' : 'Show All Chapters'}</button>)}
        </div>
      </div>
    </div>
  );
}
