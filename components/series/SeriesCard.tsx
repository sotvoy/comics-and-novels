'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface SeriesCardProps {
  series: {
    id: string;
    slug: string;
    title: string;
    cover_url?: string;
    cover?: string;
    author?: { username?: string };
    author_name?: string;
    chapters?: { count?: number }[];
    chapters_count?: number;
    likes?: number;
    views?: number;
    type?: 'comic' | 'novel';
    status?: string;
  };
  variant?: 'default' | 'compact' | 'horizontal';
}

export default function SeriesCard({ series, variant = 'default' }: SeriesCardProps) {
  const cover = series.cover_url || series.cover || 'https://picsum.photos/seed/default/300/450';
  const author = series.author?.username || series.author_name || 'Unknown';
  const chapterCount = series.chapters?.[0]?.count || series.chapters_count || 0;
  const likeCount = series.likes || 0;
  const viewCount = series.views || 0;

  if (variant === 'horizontal') {
    return (
      <Link href={`/series/${series.slug}`}>
        <motion.div 
          className="flex gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
            <img src={cover} alt={series.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate dark:text-white">{series.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{author}</p>
            <p className="text-xs text-gray-400 mt-1">{chapterCount} chapters</p>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/series/${series.slug}`} className="block">
        <motion.div 
          className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
          whileTap={{ scale: 0.97 }}
        >
          <div className="aspect-[3/4] bg-gray-200 relative">
            <img src={cover} alt={series.title} className="w-full h-full object-cover" />
            {series.type && (
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                {series.type === 'comic' ? 'Comic' : 'Novel'}
              </span>
            )}
          </div>
          <div className="p-2">
            <h3 className="font-medium text-sm truncate dark:text-white">{series.title}</h3>
            <p className="text-xs text-gray-500 truncate mt-0.5">{author}</p>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/series/${series.slug}`} className="block">
      <motion.div 
        className="series-card"
        whileTap={{ scale: 0.97 }}
      >
        <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
          <img 
            src={cover} 
            alt={series.title} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {series.status && (
            <span className={`absolute top-2 left-2 status-badge ${
              series.status === 'ongoing' ? 'status-ongoing' :
              series.status === 'completed' ? 'status-completed' :
              series.status === 'hiatus' ? 'status-hiatus' :
              series.status === 'dropped' ? 'status-dropped' : 'status-adopted'
            }`}>
              {series.status}
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <p className="text-white text-xs font-medium truncate">{author}</p>
          </div>
        </div>
        <div className="p-2">
          <h3 className="font-semibold text-sm line-clamp-2 dark:text-white">{series.title}</h3>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Icons.BookOpen className="w-3 h-3" />
              {chapterCount}
            </span>
            <span className="flex items-center gap-1">
              <Icons.Heart className="w-3 h-3" />
              {(likeCount / 1000).toFixed(1)}k
            </span>
            <span className="flex items-center gap-1">
              <Icons.Eye className="w-3 h-3" />
              {(viewCount / 1000).toFixed(1)}k
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
