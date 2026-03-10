'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';
import { useAppStore } from '@/store/app';
import { useAuth } from '@/context/AuthContext';

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme: toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const { isDrawerOpen, setDrawerOpen, setSearchOpen } = useAppStore();
  const { user: authUser, loading } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between h-14 px-2 md:px-4">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDrawerOpen(true)}
              className="yt-button"
              aria-label="Menu"
            >
              <Icons.Menu className="w-5 h-5" />
            </button>
            
            <Link href="/" className="-ml-1 text-xl font-bold text-red-500">
              C&N
            </Link>
          </div>

          {/* Center: Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium"
            >
              <span className="hidden sm:inline">C&N</span>
              <Icons.ChevronDown className="w-4 h-4" />
            </button>
            
            <AnimatePresence>
              {showDropdown && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[160px] z-50"
                  >
                    <Link
                      href="/manga"
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="mr-2">📚</span> Manga
                    </Link>
                    <Link
                      href="/manhwa"
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="mr-2">🇰🇷</span> Manhwa
                    </Link>
                    <Link
                      href="/manhua"
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="mr-2">🇨🇳</span> Manhua
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                    <Link
                      href="/comics"
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowDropdown(false)}
                    >
                      All Comics
                    </Link>
                  </motion.div>
                </>
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
            {authUser ? (
              <Link href="/profile" className="yt-button" aria-label="Profile">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
                  {(authUser.user_metadata?.username || authUser.email?.[0] || 'U').toUpperCase()}
                </div>
              </Link>
            ) : (
              <Link href="/login" className="yt-button text-sm font-medium text-red-500">
                Sign In
              </Link>
            )}
            <button
              onClick={toggleTheme}
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
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white dark:bg-gray-900 z-50 overflow-y-auto overscroll-y-none"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-red-500" onClick={() => setDrawerOpen(false)}>
                    C&N
                  </span>
                  <button onClick={() => setDrawerOpen(false)} className="yt-button">
                    <Icons.Close />
                  </button>
                </div>

                <nav className="space-y-1">
                  <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Home /> Home
                  </Link>
                  <Link href="/organizations" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    👥 Organizations
                  </Link>
                  <Link href="/audiobooks" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    🎧 Audiobooks
                  </Link>
                </nav>

                <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                <h3 className="px-3 text-sm font-semibold text-gray-500 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2 px-3">
                  {['Action', 'Romance', 'Fantasy', 'Comedy', 'Horror', 'Sci-Fi', 'Adventure', 'Drama', 'Mystery', 'Sports', 'Slice of Life', 'Supernatural', 'Psychological', 'Thriller', 'Historical', 'Mecha'].map((genre) => (
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

                <h3 className="px-3 text-sm font-semibold text-gray-500 mb-2">Status</h3>
                <div className="flex flex-wrap gap-2 px-3">
                  <Link href="/search?status=ongoing" className="px-3 py-1 text-sm rounded-full bg-green-500 text-white" onClick={() => setDrawerOpen(false)}>Ongoing</Link>
                  <Link href="/search?status=completed" className="px-3 py-1 text-sm rounded-full bg-gray-500 text-white" onClick={() => setDrawerOpen(false)}>Completed</Link>
                  <Link href="/search?status=hiatus" className="px-3 py-1 text-sm rounded-full bg-yellow-500 text-white" onClick={() => setDrawerOpen(false)}>Hiatus</Link>
                  <Link href="/search?status=dropped" className="px-3 py-1 text-sm rounded-full bg-red-500 text-white" onClick={() => setDrawerOpen(false)}>Dropped</Link>
                  <Link href="/search?status=adopted" className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white" onClick={() => setDrawerOpen(false)}>Adopted</Link>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

                <nav className="space-y-1">
                  <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Settings /> Settings
                  </Link>
                  <Link href="/creator" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Video /> Creator Studio
                  </Link>
                  <Link href="/ranking" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Trophy /> Ranking
                  </Link>
                  <Link href="/trending" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Trending /> Trending
                  </Link>
                  <Link href="/community" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Users /> Community
                  </Link>
                  <Link href="/events" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Calendar /> Events
                  </Link>
                  <Link href="/collections" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setDrawerOpen(false)}>
                    <Icons.Collections /> Collections
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
