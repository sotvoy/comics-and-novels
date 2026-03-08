'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Icons from '@/components/ui/Icons';

const seriesData: Record<string, any> = {
  'solo-leveling': {
    id: '1',
    title: 'Solo Leveling',
    slug: 'solo-leveling',
    cover: 'https://picsum.photos/seed/solo/600/900',
    banner: 'https://picsum.photos/seed/solobanner/1200/400',
    author: 'Chugong',
    artist: 'Dubu (Redice Studio)',
    description: 'In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation, a notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival.',
    type: 'comic',
    status: 'ongoing',
    genres: ['Action', 'Adventure', 'Fantasy'],
    tags: ['Strong Protagonist', 'Level Up', 'Monsters', 'Dungeons'],
    likes: 125000,
    comments: 45000,
    rating: 4.8,
    chapters: Array.from({ length: 20 }, (_, i) => ({ number: i + 1, title: `Chapter ${i + 1}`, publishedAt: new Date(Date.now() - i * 86400000).toISOString() })),
  },
};

const formatNumber = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

export default function SeriesPage() {
  const params = useParams();
  const slug = params.slug as string;
  const series = seriesData[slug] || seriesData['solo-leveling'];
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const displayedChapters = showAllChapters ? series.chapters : series.chapters.slice(0, 10);

  const reactions = ['🔥', '❤️', '😂', '😢', '😮', '👏'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="relative h-48 md:h-64">
        <Image src={series.banner} alt={series.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>
      <div className="relative px-4 -mt-24">
        <div className="flex gap-4">
          <div className="relative w-28 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
            <Image src={series.cover} alt={series.title} fill className="object-cover" />
          </div>
          <div className="flex-1 pt-12">
            <h1 className="text-xl font-bold mb-1">{series.title}</h1>
            <p className="text-sm text-gray-500 mb-2">{series.author}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded">{series.type.toUpperCase()}</span>
              <span className={`px-2 py-0.5 text-xs rounded ${series.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'} text-white`}>{series.status}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Icons.Heart className="w-4 h-4" /> {formatNumber(series.likes)}</span>
              <span className="flex items-center gap-1"><Icons.Comment className="w-4 h-4" /> {formatNumber(series.comments)}</span>
              <span className="flex items-center gap-1"><Icons.Star className="w-4 h-4" /> {series.rating}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Link href={`/read/${series.slug}/1`} className="flex-1 bg-red-500 text-white text-center py-3 rounded-lg font-medium">Read Now</Link>
          <button onClick={() => setIsFollowing(!isFollowing)} className={`px-4 py-3 rounded-lg font-medium ${isFollowing ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'}`}>{isFollowing ? 'Following' : 'Follow'}</button>
          <button className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800"><Icons.Bookmark /></button>
          <button className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800"><Icons.Share /></button>
          <button className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-red-500"><Icons.Flag /></button>
        </div>
        
        {/* Rating */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm font-medium">Rate:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className="text-xl">⭐</button>
            ))}
          </div>
          <span className="text-sm text-gray-500">({series.rating})</span>
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
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {series.genres.map((genre: string) => (<Link key={genre} href={`/search?genre=${genre.toLowerCase()}`} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">{genre}</Link>))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Description</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{series.description}</p>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Chapters</h3>
            <span className="text-sm text-gray-500">{series.chapters.length} chapters</span>
          </div>
          <div className="space-y-2">
            {displayedChapters.map((chapter: any) => (
              <Link key={chapter.number} href={`/read/${series.slug}/${chapter.number}`} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                <div><p className="font-medium text-sm">Chapter {chapter.number}</p><p className="text-xs text-gray-500">{new Date(chapter.publishedAt).toLocaleDateString()}</p></div>
                <Icons.ArrowRight />
              </Link>
            ))}
          </div>
          {series.chapters.length > 10 && (<button onClick={() => setShowAllChapters(!showAllChapters)} className="w-full mt-4 py-3 text-center text-red-500 font-medium">{showAllChapters ? 'Show Less' : 'Show All Chapters'}</button>)}
        </div>
        <div className="mt-8 pb-8">
          <h3 className="text-lg font-semibold mb-4">Comments ({formatNumber(series.comments)})</h3>
          
          {/* Comment Input */}
          <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
            <input type="text" placeholder="Add a comment..." className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm" />
          </div>
          
          {/* Threaded Comments */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  U{i}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">User{i}</span>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>
                  <p className="text-sm mt-1">This is an amazing series! I love the art style and story development. 🔥</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <button className="flex items-center gap-1 hover:text-red-500"><Icons.Heart className="w-3 h-3" /> 123</button>
                    <button className="hover:text-red-500">Reply</button>
                  </div>
                  
                  {/* Replies */}
                  <div className="mt-3 ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-3">
                    {[1, 2].map((j) => (
                      <div key={j} className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-[10px]">R{j}</div>
                        <div className="flex-1">
                          <span className="font-medium text-xs">Reply{j}</span>
                          <p className="text-xs mt-0.5">Totally agree! The character development is on point.</p>
                          <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500">
                            <button className="flex items-center gap-1"><Icons.Heart className="w-2 h-2" /> 45</button>
                            <button>Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="text-xs text-gray-500 hover:text-red-500">View more replies</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">You Might Also Like</h2>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {[
              { slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU' },
              { slug: 'omniscient-reader', title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong' },
              { slug: 'noblesse', title: 'Noblesse', cover: 'https://picsum.photos/seed/noblesse/300/450', author: 'Son JaeHo' },
              { slug: 'god-of-high-school', title: 'The God of High School', cover: 'https://picsum.photos/seed/godhs/300/450', author: 'Yongje Park' },
            ].map((rec) => (
              <Link key={rec.slug} href={`/series/${rec.slug}`} className="flex-shrink-0 w-28">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                  <Image src={rec.cover} alt={rec.title} fill className="object-cover" />
                </div>
                <p className="text-xs font-medium line-clamp-1">{rec.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{rec.author}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
