'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const notificationsData = {
  unread: [
    { id: 1, type: 'chapter', title: 'New Chapter Released', series: 'Solo Leveling', chapter: 181, time: '2 hours ago', read: false },
    { id: 2, type: 'follow', title: 'New Follower', user: 'AnimeFan123', avatar: 'https://picsum.photos/seed/u1/100/100', time: '5 hours ago', read: false },
    { id: 3, type: 'like', title: 'Your series got 1K likes', series: 'Tower of God', time: '1 day ago', read: false },
    { id: 4, type: 'comment', title: 'New comment on your post', user: 'MangaLover', preview: 'Great chapter!', time: '1 day ago', read: false },
  ],
  read: [
    { id: 5, type: 'system', title: 'Welcome to C&N!', message: 'Start your reading journey today', time: '2 days ago', read: true },
    { id: 6, type: 'chapter', title: 'New Chapter Released', series: 'Omniscient Reader', chapter: 98, time: '3 days ago', read: true },
    { id: 7, type: 'achievement', title: 'Achievement Unlocked!', badge: '📚', name: 'Bookworm', time: '1 week ago', read: true },
    { id: 8, type: 'system', title: 'Daily Rewards Available', message: 'Claim your 50 coins now!', time: '1 week ago', read: true },
  ],
};

const getIcon = (type: string) => {
  switch (type) {
    case 'chapter': return <Icons.BookOpen className="w-5 h-5" />;
    case 'follow': return <Icons.UserPlus className="w-5 h-5" />;
    case 'like': return <Icons.Heart className="w-5 h-5" />;
    case 'comment': return <Icons.Comment className="w-5 h-5" />;
    case 'achievement': return <Icons.Trophy className="w-5 h-5" />;
    default: return <Icons.Bell className="w-5 h-5" />;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case 'chapter': return 'bg-blue-500';
    case 'follow': return 'bg-green-500';
    case 'like': return 'bg-red-500';
    case 'comment': return 'bg-yellow-500';
    case 'achievement': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [hasUnread, setHasUnread] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Notifications</h1>
          {hasUnread && (
            <button onClick={() => setHasUnread(false)} className="text-sm text-red-500">
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 p-4 overflow-x-auto hide-scrollbar border-b border-gray-200 dark:border-gray-800">
        {['all', 'chapter', 'follow', 'like', 'comment'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === tab
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="p-2">
        {/* Unread Section */}
        {notificationsData.unread.length > 0 && (
          <div className="mb-4">
            <h2 className="px-2 text-sm font-semibold text-gray-500 mb-2">New</h2>
            {notificationsData.unread.map((notif) => (
              <Link
                key={notif.id}
                href={notif.type === 'chapter' ? `/series/${notif.series?.toLowerCase().replace(' ')}` : '/profile'}
                className={`flex items-start gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full ${getColor(notif.type)} flex items-center justify-center text-white flex-shrink-0`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notif.title}</p>
                  {notif.series && (
                    <p className="text-xs text-gray-500">{notif.series} - Chapter {notif.chapter}</p>
                  )}
                  {notif.user && (
                    <p className="text-xs text-gray-500">@{notif.user}</p>
                  )}
                  {notif.message && (
                    <p className="text-xs text-gray-500">{notif.message}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
                {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
              </Link>
            ))}
          </div>
        )}

        {/* Read Section */}
        {notificationsData.read.length > 0 && (
          <div>
            <h2 className="px-2 text-sm font-semibold text-gray-500 mb-2">Earlier</h2>
            {notificationsData.read.map((notif) => (
              <Link
                key={notif.id}
                href={notif.type === 'chapter' ? `/series/${notif.series?.toLowerCase().replace(' ')}` : '/profile'}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className={`w-10 h-10 rounded-full ${getColor(notif.type)} flex items-center justify-center text-white flex-shrink-0 opacity-60`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notif.title}</p>
                  {notif.series && (
                    <p className="text-xs text-gray-500">{notif.series} - Chapter {notif.chapter}</p>
                  )}
                  {notif.user && (
                    <p className="text-xs text-gray-500">@{notif.user}</p>
                  )}
                  {notif.message && (
                    <p className="text-xs text-gray-500">{notif.message}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
