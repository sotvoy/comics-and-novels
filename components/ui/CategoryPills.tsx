'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  label: string;
  href: string;
}

const defaultCategories: Category[] = [
  { id: 'all', label: 'All', href: '/' },
  { id: 'foryou', label: 'For You', href: '/for-you' },
  { id: 'top', label: 'Top', href: '/ranking?sort=top' },
  { id: 'new', label: 'New', href: '/novels?sort=new' },
  { id: 'recent', label: 'Recent', href: '/comics?sort=recent' },
  { id: 'popular', label: 'Popular', href: '/trending' },
  { id: 'ranking', label: 'Ranking', href: '/ranking' },
  { id: 'news', label: 'News', href: '/events' },
  { id: 'post', label: 'Post', href: '/community' },
  { id: 'community', label: 'Community', href: '/community' },
  { id: 'shorts', label: 'Shorts', href: '/shorts' },
  { id: 'trending', label: 'Trending', href: '/trending' },
];

interface CategoryPillsProps {
  categories?: Category[];
  scrollable?: boolean;
}

export default function CategoryPills({ categories = defaultCategories, scrollable = true }: CategoryPillsProps) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0]);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftFade(scrollLeft > 0);
        setShowRightFade(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <motion.div 
      className={`sticky top-14 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-transform duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
    >
      <div className="relative">
        {showLeftFade && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        )}
        
        <div 
          ref={scrollRef}
          className={`flex overflow-x-auto px-2 py-2 gap-2 hide-scrollbar ${
            scrollable ? 'scroll-smooth' : ''
          }`}
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          onScroll={checkScroll}
        >
          {categories.map((cat) => (
            <Link key={cat.id} href={cat.href}>
              <motion.span
                className={`category-pill whitespace-nowrap flex-shrink-0 ${
                  isActive(cat.href) ? 'active' : ''
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.span>
            </Link>
          ))}
        </div>
        
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        )}
      </div>
    </motion.div>
  );
}

function checkScroll() {
  // Placeholder - actual implementation in component
}
