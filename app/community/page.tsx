'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const posts = [
  { id: 1, type: 'discussion', title: 'Who is the strongest character in Solo Leveling?', author: 'ShadowHunter', avatar: 'https://picsum.photos/seed/u1/100/100', likes: 234, comments: 89, time: '2h ago', tags: ['Solo Leveling', 'Discussion'] },
  { id: 2, type: 'news', title: 'Tower of God Season 3 Announced!', author: 'AnimeNews', avatar: 'https://picsum.photos/seed/u2/100/100', likes: 567, comments: 123, time: '5h ago', tags: ['Tower of God', 'News'] },
  { id: 3, type: 'fanart', title: 'My fanart of Jinwoo', author: 'ArtistPro', avatar: 'https://picsum.photos/seed/u3/100/100', likes: 890, comments: 45, time: '8h ago', image: 'https://picsum.photos/seed/fanart/600/400', tags: ['Fanart'] },
  { id: 4, type: 'question', title: 'What should I read next?', author: 'NewReader', avatar: 'https://picsum.photos/seed/u4/100/100', likes: 45, comments: 67, time: '1d ago', tags: ['Recommendation'] },
  { id: 5, type: 'discussion', title: 'Best manhwa like Solo Leveling?', author: 'ManhwaFan', avatar: 'https://picsum.photos/seed/u5/100/100', likes: 312, comments: 156, time: '2d ago', tags: ['Recommendation', 'Discussion'] },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 p-4 overflow-x-auto hide-scrollbar">
          {['all', 'discussion', 'fanart', 'news', 'question'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {posts
          .filter(p => activeTab === 'all' || p.type === activeTab)
          .map((post) => (
          <div key={post.id} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src={post.avatar} alt={post.author} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{post.author}</p>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                <Icons.More className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <Link href={`/community/${post.id}`}>
              <h3 className="font-semibold mb-2">{post.title}</h3>
              {post.image && (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button className="flex items-center gap-1 text-sm text-gray-500">
                <Icons.Heart className="w-5 h-5" /> {post.likes}
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-500">
                <Icons.Comment className="w-5 h-5" /> {post.comments}
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-500">
                <Icons.Share className="w-5 h-5" /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
