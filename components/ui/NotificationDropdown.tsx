'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface Notification {
  id: string;
  type: 'chapter' | 'comment' | 'follow' | 'like' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
  avatar?: string;
}

interface NotificationDropdownProps {
  userId?: string;
}

// Demo notifications
const demoNotifications: Notification[] = [
  {
    id: '1',
    type: 'chapter',
    title: 'New Chapter',
    message: 'Solo Leveling Chapter 180 is now available',
    time: '5 minutes ago',
    read: false,
    link: '/read/solo-leveling/180',
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Reply',
    message: 'JohnDoe replied to your comment on Tower of God',
    time: '1 hour ago',
    read: false,
    link: '/series/tower-of-god',
  },
  {
    id: '3',
    type: 'follow',
    title: 'New Follower',
    message: 'MangaFan123 started following you',
    time: '3 hours ago',
    read: true,
    link: '/profile/mangafan123',
  },
  {
    id: '4',
    type: 'like',
    title: 'New Like',
    message: 'Your comment received 50 likes',
    time: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'System Update',
    message: 'Welcome to C&N! Check out the new features',
    time: '2 days ago',
    read: true,
  },
];

export default function NotificationDropdown({ userId }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load notifications (simulated)
  useEffect(() => {
    if (isOpen && userId) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [isOpen, userId]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'chapter':
        return <Icons.BookOpen className="w-4 h-4 text-blue-500" />;
      case 'comment':
        return <Icons.Comment className="w-4 h-4 text-green-500" />;
      case 'follow':
        return <Icons.Users className="w-4 h-4 text-purple-500" />;
      case 'like':
        return <Icons.Heart className="w-4 h-4 text-red-500" />;
      case 'system':
        return <Icons.Settings className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Icons.Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-red-500 font-medium hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 flex items-center justify-center">
                  <div className="animate-spin w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Icons.Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      !notification.read ? 'bg-red-50/50 dark:bg-red-900/10' : ''
                    }`}
                  >
                    <Link
                      href={notification.link || '#'}
                      onClick={() => markAsRead(notification.id)}
                      className="flex gap-3"
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                        {notification.avatar ? (
                          <img
                            src={notification.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          getNotificationIcon(notification.type)
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm truncate">{notification.title}</p>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-0.5">
                          {notification.message}
                        </p>
                      </div>

                      {/* Unread indicator */}
                      {!notification.read && (
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-2 ml-13">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-gray-500 hover:text-red-500"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-gray-500 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <Link
                href="/notifications"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm text-red-500 font-medium hover:underline"
              >
                View all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
