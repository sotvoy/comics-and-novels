'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface ReadingProgressProps {
  totalChapters: number;
  currentChapter: number;
  seriesSlug: string;
  onChapterSelect?: (chapter: number) => void;
}

export default function ReadingProgress({
  totalChapters,
  currentChapter,
  seriesSlug,
  onChapterSelect
}: ReadingProgressProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localCurrentChapter, setLocalCurrentChapter] = useState(currentChapter);
  const [storedProgress, setStoredProgress] = useState<Record<string, number>>({});

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('reading-progress');
    if (saved) {
      setStoredProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const progress = { ...storedProgress, [seriesSlug]: localCurrentChapter };
    setStoredProgress(progress);
    localStorage.setItem('reading-progress', JSON.stringify(progress));
  }, [localCurrentChapter, seriesSlug]);

  const progressPercent = totalChapters > 0 ? (localCurrentChapter / totalChapters) * 100 : 0;
  const remainingChapters = totalChapters - localCurrentChapter;

  const handleChapterClick = (chapter: number) => {
    setLocalCurrentChapter(chapter);
    onChapterSelect?.(chapter);
  };

  const markAsRead = () => {
    if (localCurrentChapter < totalChapters) {
      setLocalCurrentChapter(prev => Math.min(prev + 1, totalChapters));
    }
  };

  const markAllRead = () => {
    setLocalCurrentChapter(totalChapters);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Your Reading Progress</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-red-500 font-medium flex items-center gap-1"
        >
          {isExpanded ? 'Hide' : 'View'}
          <Icons.ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
        />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 dark:text-gray-400">
            <span className="font-bold text-red-500">{localCurrentChapter}</span>
            <span className="text-gray-500">/{totalChapters}</span>
          </span>
          <span className="text-gray-500">
            {progressPercent.toFixed(0)}% complete
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {remainingChapters > 0 ? `${remainingChapters} chapters left` : 'Completed!'}
        </span>
      </div>

      {/* Expanded Controls */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Chapter Slider */}
          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-2 block">Jump to Chapter</label>
            <input
              type="range"
              min={1}
              max={totalChapters}
              value={localCurrentChapter}
              onChange={(e) => handleChapterClick(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Ch. 1</span>
              <span>Ch. {totalChapters}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={markAsRead}
              disabled={localCurrentChapter >= totalChapters}
              className="flex-1 py-2 px-3 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Icons.ArrowRight className="w-4 h-4" />
              Mark Chapter Read
            </button>
            <button
              onClick={markAllRead}
              className="py-2 px-3 bg-gray-200 dark:bg-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Mark All Read
            </button>
          </div>

          {/* Chapter Quick Jump */}
          <div className="mt-4">
            <label className="text-xs text-gray-500 mb-2 block">Or enter chapter number</label>
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                max={totalChapters}
                placeholder="1"
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const value = parseInt((e.target as HTMLInputElement).value);
                    if (value >= 1 && value <= totalChapters) {
                      handleChapterClick(value);
                    }
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                  const value = parseInt(input.value);
                  if (value >= 1 && value <= totalChapters) {
                    handleChapterClick(value);
                  }
                }}
                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
