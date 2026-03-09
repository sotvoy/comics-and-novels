'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface FollowButtonProps {
  userId: string;
  initialFollowing?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function FollowButton({ 
  userId, 
  initialFollowing = false, 
  size = 'md' 
}: FollowButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      // Optimistic update
      setIsFollowing(!isFollowing);

      // Call follow API (stub)
      const response = await fetch('/api/users/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: isFollowing ? 'unfollow' : 'follow' })
      });

      if (!response.ok) {
        // Revert on error
        setIsFollowing(isFollowing);
      }
    } catch (error) {
      // Revert on error
      setIsFollowing(isFollowing);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`
        rounded-full font-medium transition-all duration-200
        ${isFollowing 
          ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500' 
          : 'bg-red-500 text-white hover:bg-red-600'
        }
        ${sizeClasses[size]}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {isFollowing ? 'Unfollowing...' : 'Following...'}
        </span>
      ) : isFollowing ? (
        'Following'
      ) : (
        'Follow'
      )}
    </button>
  );
}
