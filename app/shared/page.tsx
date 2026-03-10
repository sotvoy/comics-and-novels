'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const SHARED_CONTENT = [
  {
    id: 1,
    user: { name: 'MangaKing', avatar: 'https://i.pravatar.cc/150?u=mk', followers: 45000 },
    series: { title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/400/600', chapter: 179 },
    caption: 'This panel gave me chills! 🧊',
    likes: 1234,
    comments: 89,
    time: '2 hours ago',
    liked: false
  },
  {
    id: 2,
    user: { name: 'WebtoonQueen', avatar: 'https://i.pravatar.cc/150?u=wq', followers: 32000 },
    series: { title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/400/600', chapter: 621 },
    caption: 'Who else thinks this arc is the best? 🙋‍♂️',
    likes: 856,
    comments: 156,
    time: '5 hours ago',
    liked: true
  },
  {
    id: 3,
    user: { name: 'ManhwaFan', avatar: 'https://i.pravatar.cc/150?u=mf', followers: 18000 },
    series: { title: 'Omniscient Reader', cover: 'https://picsum.photos/seed/omni/400/600', chapter: 98 },
    caption: 'The illustrations are getting better every chapter! 🎨',
    likes: 2341,
    comments: 203,
    time: '8 hours ago',
    liked: false
  },
  {
    id: 4,
    user: { name: 'ComicAddict', avatar: 'https://i.pravatar.cc/150?u=ca', followers: 67000 },
    series: { title: 'Lookism', cover: 'https://picsum.photos/seed/look/400/600', chapter: 412 },
    caption: 'This reveal changed everything! 😱',
    likes: 3456,
    comments: 412,
    time: '12 hours ago',
    liked: false
  },
];

export default function SharedContentPage() {
  const [posts, setPosts] = useState(SHARED_CONTENT);
  const [sortBy, setSortBy] = useState('recent');

  const toggleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 p-4">
          <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold dark:text-white">Shared Content</h1>
        </div>
      </div>

      {/* Sort */}
      <div className="px-4 py-3 flex gap-2 border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={() => setSortBy('recent')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            sortBy === 'recent' ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          Recent
        </button>
        <button
          onClick={() => setSortBy('popular')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            sortBy === 'popular' ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          Popular
        </button>
      </div>

      {/* Posts */}
      <div className="p-4 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* User Info */}
            <div className="flex items-center gap-3 p-4">
              <Image
                src={post.user.avatar}
                alt={post.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <Link href={`/profile/${post.user.name}`} className="font-semibold dark:text-white hover:underline">
                  {post.user.name}
                </Link>
                <p className="text-xs text-gray-500">{post.user.followers.toLocaleString()} followers</p>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Icons.MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Series Panel */}
            <Link href={`/read/${post.series.title.toLowerCase().replace(/ /g, '-')}/${post.series.chapter}`}>
              <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                <Image
                  src={post.series.cover}
                  alt={post.series.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-semibold">{post.series.title}</p>
                  <p className="text-white/70 text-sm">Chapter {post.series.chapter}</p>
                </div>
              </div>
            </Link>

            {/* Actions */}
            <div className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1 ${post.liked ? 'text-red-500' : 'text-gray-500'}`}
                >
                  <Icons.Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.likes.toLocaleString()}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500">
                  <Icons.MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>

              {/* Caption */}
              <p className="dark:text-white">
                <Link href={`/profile/${post.user.name}`} className="font-semibold mr-2 hover:underline">
                  {post.user.name}
                </Link>
                {post.caption}
              </p>
              <p className="text-xs text-gray-500 mt-2">{post.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
