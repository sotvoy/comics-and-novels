'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';
import { useAppStore } from '@/store/app';
import { BOTTOM_NAV_ITEMS, CREATOR_ACTIONS } from '@/lib/navigation';

export default function BottomBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAIAssistantOpen } = useAppStore();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowCreateMenu(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setShowCreateMenu(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const handleCreatorAction = (href: string) => {
    setShowCreateMenu(false);
    router.push(href);
  };

  if (isAIAssistantOpen) return null;

  return (
    <>
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-bottom">
        <div className="flex items-center justify-between h-14 px-2">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            const active = isActive(item.href);
            
            if (item.id === 'create') {
              return (
                <button
                  key={item.id}
                  data-testid="btn-plus"
                  onClick={() => setShowCreateMenu(!showCreateMenu)}
                  className="flex flex-col items-center justify-center"
                  aria-label="Create"
                  aria-haspopup="true"
                  aria-expanded={showCreateMenu}
                >
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                    <Icons.Plus className="w-6 h-6 text-white" />
                  </div>
                </button>
              );
            }
            
            return (
              <Link
                key={item.id}
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

      {/* Create Menu Modal - YouTube Style */}
      {showCreateMenu && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center safe-area-bottom"
          onClick={() => setShowCreateMenu(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Create menu"
        >
          <motion.div 
            ref={menuRef}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-full max-w-md bg-white dark:bg-gray-900 rounded-t-3xl p-6"
            onClick={(e) => e.stopPropagation()}
            role="menu"
          >
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6" />
            
            <h3 className="text-xl font-bold mb-6 px-2 dark:text-white">Create</h3>
            
            {/* YouTube-style horizontal layout */}
            <div className="grid grid-cols-3 gap-4" role="menuitem">
              {CREATOR_ACTIONS.map((action) => {
                const iconName = action.icon as keyof typeof Icons;
                const IconComponent = Icons[iconName];
                return (
                  <button
                    key={action.id}
                    onClick={() => {
                      setShowCreateMenu(false);
                      router.push(action.href);
                    }}
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    role="menuitem"
                  >
                    <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500">
                      {IconComponent ? <IconComponent className="w-7 h-7" /> : (
                        <span className="text-3xl">
                          {action.id === 'publish-art' ? '🎨' : action.id === 'write-stories' ? '✍️' : '📰'}
                        </span>
                      )}
                    </div>
                    <span className="font-medium text-sm dark:text-white text-center">{action.label}</span>
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setShowCreateMenu(false)}
              className="w-full mt-6 py-3.5 text-gray-500 font-semibold text-base bg-gray-100 dark:bg-gray-800 rounded-full transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Spacer for fixed bottom nav */}
      <div className="h-14" />
    </>
  );
}
