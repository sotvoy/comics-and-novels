'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';
import { BOTTOM_NAV_ITEMS, CREATOR_ACTIONS } from '@/lib/navigation';

export default function BottomBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            const active = isActive(item.href);
            
            if (item.id === 'create') {
              return (
                <button
                  key={item.id}
                  data-testid="btn-plus"
                  onClick={() => setShowCreateMenu(!showCreateMenu)}
                  className="flex flex-col items-center justify-center -mt-2"
                  aria-label="Create"
                  aria-haspopup="true"
                  aria-expanded={showCreateMenu}
                >
                  <div className="w-12 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                    <Icons.Plus />
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

      {/* Create Menu Modal */}
      {showCreateMenu && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end safe-area-bottom"
          onClick={() => setShowCreateMenu(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Create menu"
        >
          <motion.div 
            ref={menuRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full bg-white dark:bg-gray-900 rounded-t-3xl p-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="menu"
          >
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4 px-2 dark:text-white">Create</h3>
            <div className="space-y-2" role="menuitem">
              {CREATOR_ACTIONS.map((action, index) => (
                <Link
                  key={action.id}
                  href={action.href}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-transform"
                  onClick={() => setShowCreateMenu(false)}
                  role="menuitem"
                  data-testid={`creator-action-${action.id}`}
                >
                  <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-red-500 text-xl">
                    {index === 0 ? '📖' : index === 1 ? '✍️' : '📝'}
                  </div>
                  <div>
                    <p className="font-bold text-lg dark:text-white">{action.label}</p>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button
              onClick={() => setShowCreateMenu(false)}
              className="w-full mt-4 py-4 text-gray-500 font-semibold text-lg active:bg-gray-100 dark:active:bg-gray-800 rounded-2xl transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Spacer for fixed bottom nav */}
      <div className="h-16" />
    </>
  );
}
