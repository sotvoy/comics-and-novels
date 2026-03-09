'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Icons from '@/components/ui/Icons';

export default function BottomBar() {
  const pathname = usePathname();
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navItems = [
    { href: '/', icon: Icons.Home, label: 'Home' },
    { href: '/my-list', icon: Icons.List, label: 'My List' },
    { href: '#create', icon: Icons.Plus, label: 'Create', isCreate: true },
    { href: '/following', icon: Icons.Following, label: 'Following' },
    { href: '/profile', icon: Icons.Profile, label: 'Profile' },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = !item.isCreate && isActive(item.href);
            
            if (item.isCreate) {
              return (
                <button
                  key={item.label}
                  onClick={() => setShowCreateMenu(!showCreateMenu)}
                  className="flex flex-col items-center justify-center -mt-2"
                >
                  <div className="w-12 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Icon />
                  </div>
                </button>
              );
            }
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`bottom-nav-item ${active ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <Icon />
                <span className="text-[10px] mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Create Menu Modal */}
      {showCreateMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowCreateMenu(false)}>
          <div className="w-full bg-white dark:bg-gray-900 rounded-t-2xl p-4 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-4 px-2">Create</h3>
            <div className="space-y-2">
              <Link
                href="/creator/comic"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowCreateMenu(false)}
              >
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center text-red-500">
                  Comics
                </div>
                <div>
                  <p className="font-medium">Publish Art</p>
                  <p className="text-sm text-gray-500">Upload a comic series</p>
                </div>
              </Link>
              <Link
                href="/creator/novel"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowCreateMenu(false)}
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-500">
                  Novels
                </div>
                <div>
                  <p className="font-medium">Write Story</p>
                  <p className="text-sm text-gray-500">Write a novel series</p>
                </div>
              </Link>
              <Link
                href="/creator/post"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowCreateMenu(false)}
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-500">
                  Posts
                </div>
                <div>
                  <p className="font-medium">Create Post</p>
                  <p className="text-sm text-gray-500">Share with community</p>
                </div>
              </Link>
            </div>
            <button
              onClick={() => setShowCreateMenu(false)}
              className="w-full mt-4 py-3 text-gray-500 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Spacer for fixed bottom nav */}
      <div className="h-16" />
    </>
  );
}
