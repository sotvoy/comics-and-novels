'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_ITEMS } from '@/lib/navigation';

interface Category {
  id: string;
  label: string;
  href: string;
}

interface CategoryPillsProps {
  categories?: Category[];
  scrollable?: boolean;
}

export default function CategoryPills({ categories, scrollable = true }: CategoryPillsProps) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const displayCategories = categories || NAVIGATION_ITEMS.map(item => ({
    id: item.id,
    label: item.label,
    href: item.href
  }));

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0]);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide
        setIsHidden(true);
      } else {
        // Scrolling up - show
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftFade(scrollLeft > 0);
      setShowRightFade(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div 
      className={`sticky top-14 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-transform duration-300 ease-in-out ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ 
        position: 'sticky',
        top: '56px',
        zIndex: 30
      }}
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
          {displayCategories.map((cat) => (
            <Link key={cat.id} href={cat.href}>
              <span
                className={`category-pill whitespace-nowrap flex-shrink-0 ${
                  isActive(cat.href) ? 'active' : ''
                }`}
              >
                {cat.label}
              </span>
            </Link>
          ))}
        </div>

        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        )}
      </div>
    </div>
  );
}
