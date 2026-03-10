'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

export default function WriteStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllStories, setShowAllStories] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'romance', label: 'Romance' },
    { id: 'action', label: 'Action' },
    { id: 'horror', label: 'Horror' },
    { id: 'scifi', label: 'Sci-Fi' },
    { id: 'comedy', label: 'Comedy' },
  ];

  const reactions = ['🔥', '❤️', '😂', '😢', '😮', '👏'];

  // Mock author profile data
  const authorData = {
    name: 'StoryMaster',
    username: '@storymaster',
    avatar: 'https://picsum.photos/seed/author/200/200',
    banner: 'https://picsum.photos/seed/authorbanner/1200/400',
    bio: 'Professional writer specializing in fantasy and action novels. Creating epic stories that transport readers to new worlds.',
    followers: 25600,
    following: 180,
    totalStories: 8,
    totalReads: 1250000,
    isVerified: true,
  };

  const demoStories = [
    { id: '1', title: 'The Last Emperor', chapters: 45, likes: 12500, views: 150000, status: 'ongoing', rating: 4.8, genres: ['Fantasy', 'Action'], image: 'https://picsum.photos/seed/story1/400/600', updatedAt: '2024-01-15' },
    { id: '2', title: 'Love in the Dark', chapters: 32, likes: 9800, views: 120000, status: 'ongoing', rating: 4.5, genres: ['Romance', 'Drama'], image: 'https://picsum.photos/seed/story2/400/600', updatedAt: '2024-01-12' },
    { id: '3', title: 'Shadow Warriors', chapters: 78, likes: 15600, views: 200000, status: 'completed', rating: 4.9, genres: ['Action', 'Adventure'], image: 'https://picsum.photos/seed/story3/400/600', updatedAt: '2024-01-10' },
    { id: '4', title: 'The Midnight House', chapters: 24, likes: 7800, views: 95000, status: 'ongoing', rating: 4.3, genres: ['Horror', 'Mystery'], image: 'https://picsum.photos/seed/story4/400/600', updatedAt: '2024-01-08' },
    { id: '5', title: 'Starship Atlantis', chapters: 56, likes: 11200, views: 140000, status: 'ongoing', rating: 4.6, genres: ['Sci-Fi', 'Adventure'], image: 'https://picsum.photos/seed/story5/400/600', updatedAt: '2024-01-05' },
    { id: '6', title: 'Office Chaos', chapters: 18, likes: 5600, views: 75000, status: 'completed', rating: 4.2, genres: ['Comedy', 'Slice of Life'], image: 'https://picsum.photos/seed/story6/400/600', updatedAt: '2024-01-03' },
    { id: '7', title: 'Dragon Quest', chapters: 62, likes: 18900, views: 280000, status: 'ongoing', rating: 4.7, genres: ['Fantasy', 'Action'], image: 'https://picsum.photos/seed/story7/400/600', updatedAt: '2024-01-01' },
    { id: '8', title: 'Royal Secrets', chapters: 89, likes: 22100, views: 350000, status: 'ongoing', rating: 4.8, genres: ['Romance', 'Drama'], image: 'https://picsum.photos/seed/story8/400/600', updatedAt: '2023-12-28' },
  ];

  const displayedStories = showAllStories ? demoStories : demoStories.slice(0, 6);
  const formatNumber = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Banner */}
      <div className="relative h-40 md:h-56">
        <Image src={authorData.banner} alt="Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="relative px-4 -mt-16">
        <div className="flex gap-4">
          <div className="relative w-24 aspect-square rounded-full overflow-hidden flex-shrink-0 border-4 border-white dark:border-gray-900 shadow-lg">
            <Image src={authorData.avatar} alt={authorData.name} fill className="object-cover" />
          </div>
          <div className="flex-1 pt-8">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{authorData.name}</h1>
              {authorData.isVerified && <Icons.Verified className="w-5 h-5 text-blue-500" />}
            </div>
            <p className="text-sm text-gray-500">{authorData.username}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{authorData.bio}</p>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-1">
            <Icons.Users className="w-4 h-4" />
            <span className="font-semibold">{formatNumber(authorData.followers)}</span>
            <span className="text-gray-500">Followers</span>
          </div>
          <div className="flex items-center gap-1">
            <Icons.UserPlus className="w-4 h-4" />
            <span className="font-semibold">{formatNumber(authorData.following)}</span>
            <span className="text-gray-500">Following</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => setIsFollowing(!isFollowing)} 
            className={`flex-1 py-2.5 rounded-lg font-medium ${isFollowing ? 'bg-gray-200 dark:bg-gray-700' : 'bg-red-500 text-white'}`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button className="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800">
            <Icons.MessageCircle className="w-5 h-5" />
          </button>
          <button className="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800">
            <Icons.Share />
          </button>
        </div>

        {/* Reactions */}
        <div className="mt-4 flex items-center gap-2">
          <button 
            onClick={() => setSelectedReaction(selectedReaction ? null : '🔥')} 
            className={`flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm ${selectedReaction ? 'ring-2 ring-red-500' : ''}`}
          >
            <span>{selectedReaction || '👍'}</span>
            <span className="text-gray-500">React</span>
          </button>
          {selectedReaction && (
            <div className="flex gap-1 animate-in fade-in slide-in-from-top-2">
              {reactions.map((reaction) => (
                <button 
                  key={reaction} 
                  onClick={() => setSelectedReaction(reaction)} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedReaction === reaction ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                >
                  {reaction}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mt-6">
          <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories List */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Stories</h3>
          <span className="text-sm text-gray-500">{authorData.totalStories} stories</span>
        </div>
        <div className="space-y-4">
          {displayedStories.map((story) => (
            <Link key={story.id} href={`/series/${story.id}`} className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="relative w-20 aspect-[2/3] rounded-lg overflow-hidden flex-shrink-0">
                <Image src={story.image} alt={story.title} fill className="object-cover" />
                {story.status === 'completed' && (
                  <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-green-500 text-white text-[10px] rounded">END</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold line-clamp-1">{story.title}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {story.genres.map((genre) => (
                    <span key={genre} className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-xs rounded">{genre}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">{story.chapters} chapters</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Icons.Heart className="w-3 h-3" /> {formatNumber(story.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icons.Eye className="w-3 h-3" /> {formatNumber(story.views)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icons.Star className="w-3 h-3 text-yellow-500" /> {story.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {demoStories.length > 6 && (
          <button 
            onClick={() => setShowAllStories(!showAllStories)} 
            className="w-full mt-6 py-3 text-center text-red-500 font-medium"
          >
            {showAllStories ? 'Show Less' : 'Show All Stories'}
          </button>
        )}
      </div>
    </div>
  );
}
