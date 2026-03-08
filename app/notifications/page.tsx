'use client';

import Link from 'next/link';
import Icons from '@/components/ui/Icons';

const notifications = [
  { id: 1, type: 'chapter', title: 'New Chapter Released', desc: 'Solo Leveling Chapter 180 is now available', time: '5 min ago', read: false },
  { id: 2, type: 'like', title: 'Someone liked your series', desc: 'Your series received 100 new likes', time: '1 hour ago', read: false },
  { id: 3, type: 'comment', title: 'New comment on your post', desc: 'User123 commented: "Great chapter!"', time: '2 hours ago', read: true },
  { id: 4, type: 'follow', title: 'New follower', desc: 'User456 started following you', time: '3 hours ago', read: true },
  { id: 5, type: 'system', title: 'Welcome to C&N!', desc: 'Start exploring comics and novels', time: '1 day ago', read: true },
  { id: 6, type: 'chapter', title: 'Chapter Update', desc: 'Tower of God Chapter 581 is out', time: '1 day ago', read: true },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'chapter': return '📖';
    case 'like': return '❤️';
    case 'comment': return '💬';
    case 'follow': return '👤';
    case 'system': return '🔔';
    default: return '📢';
  }
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">{unreadCount} new</span>
          )}
        </div>
      </div>

      <div className="p-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${!notif.read ? 'bg-red-50 dark:bg-red-900/10' : ''}`}
          >
            <div className="text-2xl">{getIcon(notif.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className={`font-semibold text-sm ${!notif.read ? 'text-red-600 dark:text-red-400' : ''}`}>{notif.title}</h3>
                <span className="text-xs text-gray-400 flex-shrink-0">{notif.time}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{notif.desc}</p>
            </div>
            {!notif.read && <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
