'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Icons from '@/components/ui/Icons';

const newsData: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Tower of God Season 3 Announced',
    content: 'We are excited to announce that Tower of God Season 3 is officially coming! The popular manhwa by SIU will continue the epic story of Bam and his companions as they climb the tower. Stay tuned for more updates on the release date.',
    author: 'Admin',
    date: '2 hours ago',
    image: 'https://picsum.photos/seed/newsdetail1/1200/600',
    likes: 1234,
    comments: 89,
    tags: ['Tower of God', 'Announcement', 'Anime'],
  },
  '2': {
    id: '2',
    title: 'New Series: The Reincarnated Assassin',
    content: 'A brand new action series is coming! Follow the story of an assassin who gets reincarnated into a fantasy world with a powerful system. Chapter 1 drops next week!',
    author: 'Editor',
    date: '5 hours ago',
    image: 'https://picsum.photos/seed/newsdetail2/1200/600',
    likes: 567,
    comments: 45,
    tags: ['New Series', 'Action', 'Reincarnation'],
  },
};

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const news = newsData[id] || newsData['1'];
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  
  const reactions = ['🔥', '❤️', '😂', '😢', '😮', '👏'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 p-4">
          <Link href="/news" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">News</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Cover Image */}
        {news.image && (
          <div className="relative h-64 -mx-4 mb-4">
            <Image src={news.image} alt={news.title} fill className="object-cover" />
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">{news.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span>{news.author}</span>
          <span>{news.date}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {news.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">{tag}</span>
          ))}
        </div>

        {/* Content */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{news.content}</p>

        {/* Reactions */}
        <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <button 
            onClick={() => setShowReactions(!showReactions)} 
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
          >
            <span>{selectedReaction || '👍'}</span>
            <span className="text-gray-500">React</span>
          </button>
          <span className="text-sm text-gray-500">{news.likes} likes</span>
        </div>
        {showReactions && (
          <div className="flex gap-2 mt-2">
            {reactions.map((reaction) => (
              <button 
                key={reaction} 
                onClick={() => { setSelectedReaction(reaction); setShowReactions(false); }} 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedReaction === reaction ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              >
                {reaction}
              </button>
            ))}
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Comments ({news.comments})</h3>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-bold">Y</div>
            <input 
              type="text" 
              placeholder="Write a comment..." 
              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
