'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';
import { useAppStore } from '@/store/app';

export default function TopBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const { isDrawerOpen, setDrawerOpen, setSearchOpen } = useAppStore();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left: Menu + Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setDrawerOpen(true)}
              className="yt-button"
              aria-label="Menu"
            >
              <Icons.Menu />
            </button>
            
            <Link href="/" className="-ml-2">
              <img 
                src="/logo.png" 
                alt="C&N" 
                className="h-[120px] w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium"
            >
              C&N <Icons.ChevronDown />
            </button>
            
            <AnimatePresence>
              {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[140px]"
                  >
                    <Link
                      href="/comics?type=manga"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowDropdown(false)}
                    >
                      Manga
                    </Link>
                    <Link
                      href="/comics?type=manhwa"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowDropdown(false)}
                    >
                      Manhwa
                    </Link>
                    <Link
                      href="/comics?type=manhua"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowDropdown(false)}
                    >
                      Manhua
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            <Link
              href="/comics"
              className={`yt-button text-sm font-medium hidden sm:block ${
                isActive('/comics') ? 'text-red-500' : ''
              }`}
            >
              Comics
            </Link>
            <Link
              href="/novels"
              className={`yt-button text-sm font-medium hidden sm:block ${
                isActive('/novels') ? 'text-red-500' : ''
              }`}
            >
              Novels
            </Link>
            <Link href="/search" className="yt-button" aria-label="Search">
              <Icons.Search />
            </Link>
            <Link href="/notifications" className="yt-button" aria-label="Notifications">
              <Icons.Bell />
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="yt-button"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-gray-900 z-50 overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center gap-2 h-12 py-2" onClick={() => setDrawerOpen(false)}>
                    <img 
                      src="/logo.png" 
                      alt="C&N" 
                      className="h-full w-auto object-contain"
                    />
                  </Link>
                  <button onClick={() => setDrawerOpen(false)} className="yt-button">
                    <Icons.Close />
                  </button>
                </div>

                <nav className="space-y-1">
                  <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Home /> Home
                  </Link>
                  <Link href="/comics" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Comics
                  </Link>
                  <Link href="/novels" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Novels
                  </Link>
                  <Link href="/following" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Following /> Following
                  </Link>
                  <Link href="/my-list" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.List /> My List
                  </Link>
                </nav>

                <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                <h3 className="px-3 text-sm font-semibold text-gray-500 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2 px-3">
                  {['Action', 'Romance', 'Fantasy', 'Comedy', 'Horror', 'Sci-Fi'].map((genre) => (
                    <Link
                      key={genre}
                      href={`/search?genre=${genre.toLowerCase()}`}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {genre}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                <nav className="space-y-1">
                  <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Profile /> Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Settings /> Settings
                  </Link>
                  <Link href="/creator" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Creator Studio
                  </Link>
                  <Link href="/ranking" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Trophy /> Ranking
                  </Link>
                  <Link href="/trending" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Trending
                  </Link>
                  <Link href="/for-you" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    For You
                  </Link>
                  <Link href="/community" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Community
                  </Link>
                  <Link href="/events" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Events
                  </Link>
                  <Link href="/collections" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Collections
                  </Link>
                </nav>

                <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                <h3 className="px-3 text-sm font-semibold text-gray-500 mb-2">Status</h3>
                <nav className="space-y-1">
                  <Link href="/comics?status=ongoing" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Ongoing
                  </Link>
                  <Link href="/comics?status=completed" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Completed
                  </Link>
                  <Link href="/comics?status=hiatus" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Hiatus
                  </Link>
                  <Link href="/comics?status=dropped" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    Dropped
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-14" />
    </>
  );
}
