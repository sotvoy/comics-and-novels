'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface BookmarkButtonProps {
  seriesId: string;
  initialBookmarked?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function BookmarkButton({ 
  seriesId, 
  initialBookmarked = false, 
  size = 'md' 
}: BookmarkButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      // Optimistic update
      setIsBookmarked(!isBookmarked);

      // Call bookmark API (stub)
      const response = await fetch('/api/users/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seriesId, action: isBookmarked ? 'remove' : 'add' })
      });

      if (!response.ok) {
        // Revert on error
        setIsBookmarked(isBookmarked);
      }
    } catch (error) {
      // Revert on error
      setIsBookmarked(isBookmarked);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  return (
    <button
      onClick={handleBookmark}
      disabled={loading}
      className={`
        p-2 rounded-full transition-all duration-200
        ${isBookmarked 
          ? 'bg-red-100 dark:bg-red-900/30 text-red-500' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      title={isBookmarked ? 'Remove from library' : 'Add to library'}
    >
      <svg 
        className={sizeClasses[size]} 
        fill={isBookmarked ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
    </button>
  );
}
