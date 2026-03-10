'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const CHANNEL_DATA = {
  name: 'Manga Reader',
  handle: '@mangareader',
  avatar: 'https://i.pravatar.cc/150?u=mangareader',
  banner: 'https://picsum.photos/seed/banner/1200/400',
  subscribers: '12.5K',
  totalViews: '1.2M',
  joinedDate: 'January 2024',
  location: 'United States',
  description: '📚 Webtoon enthusiast | 🔥 Following 200+ series | 💬 Love discussing plot theories and character development. Join me on this amazing reading journey!',
  links: [
    { label: '📺 YouTube', url: '#' },
    { label: '🐦 Twitter', url: '#' },
    { label: '📷 Instagram', url: '#' },
  ],
  isVerified: true,
  isFollowing: false,
};

// Comics/Series content instead of videos
const SERIES = [
  { id: 1, title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo1/300/450', chapters: 179, views: '45K', uploaded: '2 days ago' },
  { id: 2, title: 'Tower of God', cover: 'https://picsum.photos/seed/tower1/300/450', chapters: 120, views: '120K', uploaded: '1 week ago' },
  { id: 3, title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/orv1/300/450', chapters: 180, views: '89K', uploaded: '2 weeks ago' },
  { id: 4, title: 'Lookism', cover: 'https://picsum.photos/seed/look1/300/450', chapters: 450, views: '67K', uploaded: '3 weeks ago' },
  { id: 5, title: 'The God of High School', cover: 'https://picsum.photos/seed/tgof1/300/450', chapters: 560, views: '156K', uploaded: '1 month ago' },
  { id: 6, title: 'Noblesse', cover: 'https://picsum.photos/seed/nob1/300/450', chapters: 700, views: '234K', uploaded: '1 month ago' },
];

// Shorts - quick reads
const SHORTS = [
  { id: 1, title: 'Solo Leveling secret revealed! 😱', cover: 'https://picsum.photos/seed/ss1/300/450', views: '1.2M', uploaded: '1 day ago' },
  { id: 2, title: 'This plot twist though 🔥', cover: 'https://picsum.photos/seed/ss2/300/450', views: '890K', uploaded: '3 days ago' },
  { id: 3, title: 'Best fight scenes ranked', cover: 'https://picsum.photos/seed/ss3/300/450', views: '567K', uploaded: '1 week ago' },
  { id: 4, title: 'Wait for it... 🤯', cover: 'https://picsum.photos/seed/ss4/300/450', views: '1.5M', uploaded: '1 week ago' },
];

// Playlists - Reading collections
const PLAYLISTS = [
  { id: 1, title: 'Solo Leveling All Chapters', thumbnail: 'https://picsum.photos/seed/p1/300/450', itemCount: 179 },
  { id: 2, title: 'Tower of God Reviews', thumbnail: 'https://picsum.photos/seed/p2/300/450', itemCount: 45 },
  { id: 3, title: 'Manhwa Recommendations', thumbnail: 'https://picsum.photos/seed/p3/300/450', itemCount: 25 },
];

// Community Posts
const COMMUNITY_POSTS = [
  { id: 1, content: 'Just finished reading Solo Leveling! What an incredible journey. The artwork is absolutely stunning 🔥', likes: 1234, comments: 89, time: '2 hours ago' },
  { id: 2, content: 'Who else is excited for the new season of Tower of God? The animation looks amazing!', likes: 856, comments: 156, time: '1 day ago' },
  { id: 3, content: 'My top 5 manhwa recommendations for action fans: 1. Solo Leveling 2. Tower of God 3. Omniscient Reader 4. Lookism 5. The God of High School', likes: 2341, comments: 203, time: '3 days ago' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [isFollowing, setIsFollowing] = useState(CHANNEL_DATA.isFollowing);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Banner */}
      <div className="relative w-full h-40 md:h-60 overflow-hidden">
        <Image
          src={CHANNEL_DATA.banner}
          alt="Channel Banner"
          fill
          className="object-cover"
        />
      </div>

      {/* Channel Info */}
      <div className="px-4 md:px-8 -mt-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          {/* Avatar */}
          <div className="relative">
            <Image
              src={CHANNEL_DATA.avatar}
              alt={CHANNEL_DATA.name}
              width={100}
              height={100}
              className="rounded-full border-4 border-white dark:border-gray-900"
            />
          </div>

          {/* Name & Stats */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold dark:text-white">{CHANNEL_DATA.name}</h1>
              {CHANNEL_DATA.isVerified && (
                <span className="text-lg">✓</span>
              )}
            </div>
            <p className="text-gray-500 text-sm">{CHANNEL_DATA.handle}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-gray-500">
              <span>{CHANNEL_DATA.subscribers} subscribers</span>
              <span>•</span>
              <span>{CHANNEL_DATA.totalViews} views</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                isFollowing 
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300' 
                  : 'bg-red-500 text-white'
              }`}
            >
              {isFollowing ? (
                <>
                  ✓ Subscribed
                </>
              ) : (
                'Subscribe'
              )}
            </button>
            <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              🔔
            </button>
          </div>
        </div>

        {/* Tabs - YouTube Style */}
        <div className="mt-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {[
              { id: 'home', label: 'Home', icon: '🏠' },
              { id: 'shorts', label: 'Shorts', icon: '⚡' },
              { id: 'playlists', label: 'Playlists', icon: '📋' },
              { id: 'community', label: 'Community', icon: '💬' },
              { id: 'channels', label: 'Channels', icon: '📺' },
              { id: 'about', label: 'About', icon: 'ℹ️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm transition-colors flex items-center gap-2 border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-red-500 text-red-500' 
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-4">
        {/* Home Tab - Series Grid */}
        {activeTab === 'home' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {SERIES.map((series) => (
              <Link key={series.id} href={`/series/${series.title.toLowerCase().replace(/ /g, '-')}`} className="group">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2">
                  <Image
                    src={series.cover}
                    alt={series.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
                    Ch. {series.chapters}
                  </div>
                </div>
                <h3 className="font-semibold dark:text-white line-clamp-1 group-hover:text-red-500 transition-colors">
                  {series.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <span>{series.views} views</span>
                  <span>•</span>
                  <span>{series.uploaded}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Shorts Tab - Quick Reads */}
        {activeTab === 'shorts' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SHORTS.map((short) => (
              <Link key={short.id} href={`/series/shorts-${short.id}`} className="group">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2">
                  <Image
                    src={short.cover}
                    alt={short.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
                    ⚡ {short.views}
                  </div>
                </div>
                <h3 className="font-semibold dark:text-white line-clamp-2 text-sm">
                  {short.title}
                </h3>
                <p className="text-xs text-gray-500">{short.uploaded}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Playlists Tab - Reading Collections */}
        {activeTab === 'playlists' && (
          <div className="space-y-4">
            {PLAYLISTS.map((playlist) => (
              <Link key={playlist.id} href={`/playlist/${playlist.id}`} className="flex gap-4 group">
                <div className="relative w-48 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <span className="text-2xl">📚</span>
                      <span className="text-sm">{playlist.itemCount} items</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold dark:text-white group-hover:text-red-500 transition-colors">
                    {playlist.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {playlist.itemCount} series
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-4">
            {COMMUNITY_POSTS.map((post) => (
              <div key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={CHANNEL_DATA.avatar}
                    alt={CHANNEL_DATA.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold dark:text-white text-sm">{CHANNEL_DATA.name}</p>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>
                <p className="dark:text-white mb-3">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-red-500">
                    👍 {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-red-500">
                    💬 {post.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-red-500">
                    📤 Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Channels Tab */}
        {activeTab === 'channels' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4">📊</div>
            <p className="text-gray-500">No featured channels</p>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-semibold dark:text-white mb-2">Details</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p><span className="font-medium dark:text-white">{CHANNEL_DATA.subscribers}</span> subscribers</p>
                <p><span className="font-medium dark:text-white">{CHANNEL_DATA.totalViews}</span> total views</p>
                <p>Joined {CHANNEL_DATA.joinedDate}</p>
                <p>{CHANNEL_DATA.location}</p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="font-semibold dark:text-white mb-2">Description</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {showDescription ? CHANNEL_DATA.description : CHANNEL_DATA.description.slice(0, 100) + '...'}
              </p>
              <button 
                onClick={() => setShowDescription(!showDescription)}
                className="text-sm text-red-500 font-medium mt-1"
              >
                {showDescription ? 'Show less' : 'Show more'}
              </button>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold dark:text-white mb-2">Links</h3>
              <div className="flex flex-wrap gap-2">
                {CHANNEL_DATA.links.map((link, i) => (
                  <a key={i} href={link.url} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

