'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

export default function PublishArtPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllArt, setShowAllArt] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'manga', label: 'Manga' },
    { id: 'manhwa', label: 'Manhwa' },
    { id: 'manhua', label: 'Manhua' },
    { id: 'anime', label: 'Anime' },
    { id: 'fanart', label: 'Fan Art' },
    { id: 'original', label: 'Original' },
  ];

  const reactions = ['🔥', '❤️', '😂', '😢', '😮', '👏'];

  // Mock artist profile data
  const artistData = {
    name: 'ArtisticSoul',
    username: '@artistic_soul',
    avatar: 'https://picsum.photos/seed/artist/200/200',
    banner: 'https://picsum.photos/seed/artistbanner/1200/400',
    bio: 'Digital artist specializing in fantasy and anime-style illustrations. Creating beautiful artwork for comics and novels.',
    followers: 12500,
    following: 340,
    totalArt: 48,
    totalLikes: 89000,
    isVerified: true,
  };

  const demoArt = [
    { id: '1', title: 'Solo Leveling Art', likes: 1250, views: 15000, comments: 45, image: 'https://picsum.photos/seed/art1/400/600', createdAt: '2024-01-15' },
    { id: '2', title: 'Naruto Fan Art', likes: 980, views: 12000, comments: 32, image: 'https://picsum.photos/seed/art2/400/600', createdAt: '2024-01-12' },
    { id: '3', title: 'Original Character', likes: 2100, views: 25000, comments: 78, image: 'https://picsum.photos/seed/art3/400/600', createdAt: '2024-01-10' },
    { id: '4', title: 'Dragon Design', likes: 780, views: 9000, comments: 21, image: 'https://picsum.photos/seed/art4/400/600', createdAt: '2024-01-08' },
    { id: '5', title: 'Fantasy Scene', likes: 1560, views: 18000, comments: 56, image: 'https://picsum.photos/seed/art5/400/600', createdAt: '2024-01-05' },
    { id: '6', title: 'Character Portrait', likes: 890, views: 11000, comments: 28, image: 'https://picsum.photos/seed/art6/400/600', createdAt: '2024-01-03' },
    { id: '7', title: 'Mech Design', likes: 1200, views: 14500, comments: 41, image: 'https://picsum.photos/seed/art7/400/600', createdAt: '2024-01-01' },
    { id: '8', title: 'Landscape Art', likes: 670, views: 8200, comments: 18, image: 'https://picsum.photos/seed/art8/400/600', createdAt: '2023-12-28' },
  ];

  const displayedArt = showAllArt ? demoArt : demoArt.slice(0, 6);
  const formatNumber = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Banner */}
      <div className="relative h-40 md:h-56">
        <Image src={artistData.banner} alt="Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="relative px-4 -mt-16">
        <div className="flex gap-4">
          <div className="relative w-24 aspect-square rounded-full overflow-hidden flex-shrink-0 border-4 border-white dark:border-gray-900 shadow-lg">
            <Image src={artistData.avatar} alt={artistData.name} fill className="object-cover" />
          </div>
          <div className="flex-1 pt-8">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{artistData.name}</h1>
              {artistData.isVerified && <Icons.Verified className="w-5 h-5 text-blue-500" />}
            </div>
            <p className="text-sm text-gray-500">{artistData.username}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{artistData.bio}</p>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-1">
            <Icons.Users className="w-4 h-4" />
            <span className="font-semibold">{formatNumber(artistData.followers)}</span>
            <span className="text-gray-500">Followers</span>
          </div>
          <div className="flex items-center gap-1">
            <Icons.UserPlus className="w-4 h-4" />
            <span className="font-semibold">{formatNumber(artistData.following)}</span>
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

      {/* Art Grid */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Artwork</h3>
          <span className="text-sm text-gray-500">{artistData.totalArt} artworks</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {displayedArt.map((art) => (
            <div key={art.id} className="group">
              <Link href={`/art/${art.id}`}>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                      <span className="flex items-center gap-1 text-sm">
                        <Icons.Heart className="w-4 h-4" /> {formatNumber(art.likes)}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <Icons.Eye className="w-4 h-4" /> {formatNumber(art.views)}
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-sm line-clamp-1">{art.title}</h3>
                <p className="text-xs text-gray-500">{new Date(art.createdAt).toLocaleDateString()}</p>
              </Link>
            </div>
          ))}
        </div>
        {demoArt.length > 6 && (
          <button 
            onClick={() => setShowAllArt(!showAllArt)} 
            className="w-full mt-6 py-3 text-center text-red-500 font-medium"
          >
            {showAllArt ? 'Show Less' : 'Show All Artwork'}
          </button>
        )}
      </div>
    </div>
  );
}
