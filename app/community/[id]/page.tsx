'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Icons from '@/components/ui/Icons';

const postsData: Record<string, any> = {
  '1': {
    id: '1',
    type: 'discussion',
    title: 'Who is the strongest character in Solo Leveling?',
    content: 'In your opinion, who is the strongest character in Solo Leveling? I think Sung Jinwoo is definitely up there, but what about the other Monarchs? Let\'s discuss!',
    author: 'ShadowHunter',
    avatar: 'https://picsum.photos/seed/u1/200/200',
    likes: 234,
    comments: 89,
    time: '2 hours ago',
    tags: ['Solo Leveling', 'Discussion'],
    replies: [
      { id: 1, author: 'ManhwaFan', avatar: 'https://picsum.photos/seed/u5/100/100', content: 'I think the Shadow Monarch is definitely the strongest!', time: '1h ago', likes: 45 },
      { id: 2, author: 'ReaderPro', avatar: 'https://picsum.photos/seed/u6/100/100', content: 'Sung Jinwoo with his unlimited shadows is insane!', time: '30m ago', likes: 23 },
    ],
  },
  '2': {
    id: '2',
    type: 'news',
    title: 'Tower of God Season 3 Announced!',
    content: 'Great news everyone! Tower of God Season 3 has been officially announced. The manhwa by SIU will continue with the epic story that fans have been waiting for.',
    author: 'AnimeNews',
    avatar: 'https://picsum.photos/seed/u2/200/200',
    likes: 567,
    comments: 123,
    time: '5 hours ago',
    tags: ['Tower of God', 'News'],
    image: 'https://picsum.photos/seed/fanart2/800/400',
    replies: [
      { id: 1, author: 'TOGFan', avatar: 'https://picsum.photos/seed/u7/100/100', content: 'Finally! Been waiting for this!', time: '4h ago', likes: 89 },
    ],
  },
};

export default function CommunityDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const post = postsData[id] || postsData['1'];
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  
  const reactions = ['🔥', '❤️', '😂', '😢', '😮', '👏'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 p-4">
          <Link href="/community" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Post</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Author */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image src={post.avatar} alt={post.author} fill className="object-cover" />
          </div>
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-sm text-gray-500">{post.time}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold mb-4">{post.title}</h1>

        {/* Content */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{post.content}</p>

        {/* Image */}
        {post.image && (
          <div className="relative h-64 rounded-xl overflow-hidden mb-4">
            <Image src={post.image} alt="Post image" fill className="object-cover" />
          </div>
        )}

        {/* Reactions */}
        <div className="flex items-center gap-4 border-t border-b border-gray-200 dark:border-gray-700 py-3 mb-4">
          <button 
            onClick={() => setShowReactions(!showReactions)} 
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
          >
            <span>{selectedReaction || '👍'}</span>
            <span className="text-gray-500">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 text-sm">
            <Icons.Comment className="w-4 h-4" />
            {post.comments}
          </button>
          <button className="flex items-center gap-2 text-gray-500 text-sm ml-auto">
            <Icons.Share />
          </button>
        </div>
        {showReactions && (
          <div className="flex gap-2 mb-4">
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
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Comments ({post.comments})</h3>
          
          {/* Comment Input */}
          <div className="flex gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">Y</div>
            <div className="flex-1 flex gap-2">
              <input 
                type="text" 
                placeholder="Write a comment..." 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm"
              />
              <button className="p-2 bg-red-500 text-white rounded-full">
                <Icons.Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-4">
            {post.replies?.map((reply: any) => (
              <div key={reply.id} className="flex gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={reply.avatar} alt={reply.author} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                    <p className="font-medium text-sm">{reply.author}</p>
                    <p className="text-sm">{reply.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>{reply.time}</span>
                    <button className="flex items-center gap-1">
                      <Icons.Heart className="w-3 h-3" /> {reply.likes}
                    </button>
                    <button>Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
