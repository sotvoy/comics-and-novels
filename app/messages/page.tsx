'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const conversations = [
  {
    id: 1,
    user: { name: 'MangaFan99', avatar: 'https://picsum.photos/seed/u1/100/100' },
    lastMessage: 'Did you see the new chapter?',
    time: '2 min ago',
    unread: 3,
    online: true,
  },
  {
    id: 2,
    user: { name: 'AnimeLover', avatar: 'https://picsum.photos/seed/u2/100/100' },
    lastMessage: 'Thanks for the recommendation!',
    time: '1 hour ago',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    user: { name: 'ComicReader', avatar: 'https://picsum.photos/seed/u3/100/100' },
    lastMessage: 'Lets read together later',
    time: '3 hours ago',
    unread: 1,
    online: true,
  },
  {
    id: 4,
    user: { name: 'NovelWriter', avatar: 'https://picsum.photos/seed/u4/100/100' },
    lastMessage: 'Check out my new series',
    time: '1 day ago',
    unread: 0,
    online: false,
  },
  {
    id: 5,
    user: { name: 'WebtoonFan', avatar: 'https://picsum.photos/seed/u5/100/100' },
    lastMessage: 'This is amazing!',
    time: '2 days ago',
    unread: 0,
    online: false,
  },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(c => 
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/profile" className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Messages</h1>
        </div>

        {/* Search */}
        <div className="mt-3 relative">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {filteredConversations.map((conversation) => (
          <Link 
            key={conversation.id} 
            href={`/messages/${conversation.id}`}
            className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {/* Avatar */}
            <div className="relative">
              <Image 
                src={conversation.user.avatar} 
                alt={conversation.user.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              {conversation.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{conversation.user.name}</span>
                <span className="text-xs text-gray-500">{conversation.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                {conversation.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredConversations.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Icons.MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500">No messages found</p>
        </div>
      )}
    </div>
  );
}
