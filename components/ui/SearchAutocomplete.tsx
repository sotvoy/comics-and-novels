'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  cover: string;
  author: string;
  type: 'comic' | 'novel';
}

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

// Demo data for autocomplete suggestions
const demoSuggestions: SearchResult[] = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', type: 'comic' },
  { id: '2', slug: 'omniscient-reader', title: "Omniscient Reader's Viewpoint", cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', type: 'comic' },
  { id: '3', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', type: 'comic' },
  { id: '4', slug: 'lunar-star', title: 'Lunar Star', cover: 'https://picsum.photos/seed/lunar/300/450', author: 'Kakao', type: 'novel' },
  { id: '5', slug: 'dragon-ascension', title: 'Dragon Ascension', cover: 'https://picsum.photos/seed/dragon/300/450', author: 'Webnovel', type: 'novel' },
  { id: '6', slug: 'rebirth-throne', title: 'Rebirth of the Divine Throne', cover: 'https://picsum.photos/seed/rebirth/300/450', author: 'MTT', type: 'novel' },
  { id: '7', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower2/300/450', author: 'SIU', type: 'comic' },
  { id: '8', slug: 'noblesse', title: 'Noblesse', cover: 'https://picsum.photos/seed/noblesse/300/450', author: 'Son JaeHo', type: 'comic' },
];

// Popular search queries
const popularSearches = ['Solo Leveling', 'Tower of God', 'Omniscient Reader', 'The Beginning After The End', 'Lore Olympus', 'True Beauty'];

export default function SearchAutocomplete({ 
  value, 
  onChange, 
  placeholder = 'Search comics and novels...',
  onSearch
}: SearchAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
      // Filter demo suggestions based on query
      const filtered = demoSuggestions.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.author.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, suggestions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        // Navigate to selected result
        window.location.href = `/series/${suggestions[highlightedIndex].slug}`;
      } else {
        // Perform search
        onSearch?.(value);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (slug: string) => {
    setIsOpen(false);
    onChange('');
    window.location.href = `/series/${slug}`;
  };

  const handlePopularSearch = (query: string) => {
    onChange(query);
    onSearch?.(query);
    setIsOpen(true);
  };

  const showDropdown = isOpen && (value.trim() !== '' || suggestions.length > 0);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icons.Search className="w-5 h-5" />
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full px-12 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        {value && (
          <button 
            onClick={() => {
              onChange('');
              setSuggestions([]);
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Icons.Close className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-4 flex items-center justify-center">
                <div className="animate-spin w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full" />
              </div>
            ) : value.trim() && suggestions.length > 0 ? (
              <>
                {/* Search Results */}
                <div className="p-2">
                  <h4 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Results</h4>
                  {suggestions.map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/series/${item.slug}`}
                      onClick={() => handleSuggestionClick(item.slug)}
                      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        highlightedIndex === index ? 'bg-gray-100 dark:bg-gray-700' : ''
                      }`}
                    >
                      <div className="relative w-10 h-14 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.cover} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm truncate">{item.title}</h5>
                        <p className="text-xs text-gray-500">{item.author}</p>
                      </div>
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        item.type === 'comic' ? 'bg-red-500' : 'bg-blue-500'
                      } text-white`}>
                        {item.type}
                      </span>
                    </Link>
                  ))}
                </div>
                
                {/* Search Button */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                  <button
                    onClick={() => {
                      onSearch?.(value);
                      setIsOpen(false);
                    }}
                    className="w-full py-2 text-sm text-red-500 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Icons.Search className="w-4 h-4" />
                    Search for "{value}"
                  </button>
                </div>
              </>
            ) : (
              /* Popular Searches */
              <div className="p-2">
                <h4 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Popular Searches</h4>
                {popularSearches.map((query) => (
                  <button
                    key={query}
                    onClick={() => handlePopularSearch(query)}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <Icons.Trending className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{query}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
