'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';
import SearchAutocomplete from '@/components/ui/SearchAutocomplete';

const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Mystery', 'Psychological', 'Supernatural', 'Thriller', 'Historical', 'Mecha', 'Music', 'School', 'Superhero', 'Webtoon'];

const popularGenres = [
  { id: 'action', name: 'Action', count: 1250 },
  { id: 'romance', name: 'Romance', count: 980 },
  { id: 'fantasy', name: 'Fantasy', count: 870 },
  { id: 'comedy', name: 'Comedy', count: 750 },
  { id: 'horror', name: 'Horror', count: 420 },
  { id: 'sci-fi', name: 'Sci-Fi', count: 380 },
];

const demoSeries = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', chapters: 179, likes: 125000, comments: 45000, type: 'comic' },
  { id: '2', slug: 'omniscient-reader', title: 'Omniscient Reader\'s Viewpoint', cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', chapters: 180, likes: 98000, comments: 32000, type: 'comic' },
  { id: '3', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', chapters: 580, likes: 156000, comments: 67000, type: 'comic' },
  { id: '4', slug: 'lunar-star', title: 'Lunar Star', cover: 'https://picsum.photos/seed/lunar/300/450', author: 'Kakao', chapters: 120, likes: 45000, comments: 12000, type: 'novel' },
  { id: '5', slug: 'dragon-ascension', title: 'Dragon Ascension', cover: 'https://picsum.photos/seed/dragon/300/450', author: 'Webnovel', chapters: 250, likes: 78000, comments: 21000, type: 'novel' },
  { id: '6', slug: 'rebirth-throne', title: 'Rebirth of the Divine Throne', cover: 'https://picsum.photos/seed/rebirth/300/450', author: 'MTT', chapters: 200, likes: 89000, comments: 28000, type: 'novel' },
];

const formatNumber = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [contentType, setContentType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
  };

  const filteredSeries = demoSeries.filter(s => {
    if (contentType !== 'all' && s.type !== contentType) return false;
    if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Search Input */}
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 p-4 pt-3 border-b border-gray-200 dark:border-gray-800">
        <SearchAutocomplete
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search comics and novels..."
          onSearch={(query) => console.log('Searching for:', query)}
        />

        {/* Quick Filters */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex-shrink-0 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs flex items-center gap-1"
          >
            <Icons.Settings className="w-3 h-3" /> Filters
          </button>
          {['all', 'comic', 'novel'].map((type) => (
            <button key={type} onClick={() => setContentType(type)} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium capitalize ${contentType === type ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {type === 'all' ? 'All' : type + 's'}
            </button>
          ))}
          {['popular', 'new', 'rating'].map((sort) => (
            <button key={sort} onClick={() => setSortBy(sort)} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium capitalize ${sortBy === sort ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {sort}
            </button>
          ))}
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold mb-3">Popular Genres</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {popularGenres.map((genre) => (
                <button key={genre.id} onClick={() => toggleGenre(genre.name)} className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors ${selectedGenres.includes(genre.name) ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                  <span>{genre.icon}</span> {genre.name}
                </button>
              ))}
            </div>
            <h3 className="text-sm font-semibold mb-3">All Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button key={genre} onClick={() => toggleGenre(genre)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedGenres.includes(genre) ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="p-4">
        {selectedGenres.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedGenres.map(genre => (
              <span key={genre} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full flex items-center gap-1">
                {genre}
                <button onClick={() => toggleGenre(genre)} className="ml-1"><Icons.Close /></button>
              </span>
            ))}
            <button onClick={() => setSelectedGenres([])} className="px-3 py-1 text-xs text-gray-500">Clear all</button>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-4">{filteredSeries.length} results</p>

        <div className="grid grid-cols-2 gap-4">
          {filteredSeries.map((series) => (
            <Link key={series.id} href={`/series/${series.slug}`}>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 series-card">
                <Image src={series.cover} alt={series.title} fill className="object-cover" />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-0.5 text-xs rounded ${series.type === 'comic' ? 'bg-red-500' : 'bg-blue-500'} text-white`}>
                    {series.type.toUpperCase()}
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-sm line-clamp-2">{series.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{series.author}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Icons.Heart className="w-3 h-3" /> {formatNumber(series.likes)}</span>
                <span className="flex items-center gap-1"><Icons.Comment className="w-3 h-3" /> {formatNumber(series.comments)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
