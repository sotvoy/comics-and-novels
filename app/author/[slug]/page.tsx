'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Icons from '@/components/ui/Icons';
import TipButton from '@/components/payments/TipButton';

const authorData: Record<string, any> = {
  'chugong': {
    name: 'Chugong',
    avatar: 'https://picsum.photos/seed/chugong/200/200',
    bio: 'Best-selling author of Solo Leveling and The Beginning After The End.',
    followers: 250000,
    following: 120,
    works: 3,
    isVerified: true,
    level: 45,
    series: [
      { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', type: 'comic', chapters: 179 },
      { id: '2', slug: 'the-beginning-after-the-end', title: 'The Beginning After The End', cover: 'https://picsum.photos/seed/tbate/300/450', type: 'novel', chapters: 150 },
    ],
  },
};

export default function AuthorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const author = authorData[slug] || authorData['chugong'];
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header Banner */}
      <div className="relative h-32 bg-gradient-to-r from-red-500 to-pink-500">
        <div className="absolute top-20 left-4">
          <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden">
            <Image src={author.avatar} alt={author.name} fill className="object-cover" />
          </div>
        </div>
      </div>
      
      <div className="px-4 pt-16">
        {/* Author Info */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{author.name}</h1>
              {author.isVerified && <span className="text-blue-500">✓</span>}
            </div>
            <p className="text-sm text-gray-500 mt-1">Level {author.level} Creator</p>
          </div>
          <div className="flex gap-2">
            <TipButton creatorId={slug} creatorName={author.name} size="md" />
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-2 rounded-full font-medium ${isFollowing ? 'bg-gray-200 dark:bg-gray-700' : 'bg-red-500 text-white'}`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm mt-4 text-gray-600 dark:text-gray-400">{author.bio}</p>

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-sm">
          <div className="text-center">
            <p className="font-bold">{(author.followers / 1000).toFixed(0)}K</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{author.following}</p>
            <p className="text-gray-500">Following</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{author.works}</p>
            <p className="text-gray-500">Works</p>
          </div>
        </div>

        {/* Works */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Works</h2>
          <div className="space-y-3">
            {author.series.map((work: any) => (
              <Link key={work.id} href={`/series/${work.slug}`} className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="relative w-16 aspect-[3/4] rounded overflow-hidden flex-shrink-0">
                  <Image src={work.cover} alt={work.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{work.title}</h3>
                  <p className="text-sm text-gray-500">{work.type} • {work.chapters} chapters</p>
                </div>
                <Icons.ArrowRight className="text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
