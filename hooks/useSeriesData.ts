'use client';

import { useState, useEffect, useCallback } from 'react';

// Types
export interface Series {
  id: string;
  slug: string;
  title: string;
  cover: string;
  banner?: string;
  author: string;
  artist?: string;
  description?: string;
  type: 'comic' | 'novel';
  status: 'ongoing' | 'completed' | 'hiatus' | 'dropped';
  genres?: string[];
  tags?: string[];
  likes: number;
  comments: number;
  rating?: number;
  chapters: Chapter[];
}

export interface Chapter {
  id?: string;
  number: number;
  title: string;
  publishedAt: string;
  pages?: string[];
}

export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  cover: string;
  author: string;
  type: 'comic' | 'novel';
}

// Demo data
const demoSeriesData: Record<string, Series> = {
  'solo-leveling': {
    id: '1',
    title: 'Solo Leveling',
    slug: 'solo-leveling',
    cover: 'https://picsum.photos/seed/solo/300/450',
    banner: 'https://picsum.photos/seed/solobanner/1200/400',
    author: 'Chugong',
    artist: 'Dubu (Redice Studio)',
    description: 'In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation, a notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival.',
    type: 'comic',
    status: 'ongoing',
    genres: ['Action', 'Adventure', 'Fantasy'],
    tags: ['Strong Protagonist', 'Level Up', 'Monsters', 'Dungeons'],
    likes: 125000,
    comments: 45000,
    rating: 4.8,
    chapters: Array.from({ length: 20 }, (_, i) => ({ number: i + 1, title: `Chapter ${i + 1}`, publishedAt: new Date(Date.now() - i * 86400000).toISOString() })),
  },
  'omniscient-reader': {
    id: '2',
    title: "Omniscient Reader's Viewpoint",
    slug: 'omniscient-reader',
    cover: 'https://picsum.photos/seed/omni/300/450',
    author: 'Sing-Shong',
    type: 'comic',
    status: 'completed',
    genres: ['Action', 'Fantasy'],
    likes: 98000,
    comments: 32000,
    chapters: Array.from({ length: 15 }, (_, i) => ({ number: i + 1, title: `Chapter ${i + 1}`, publishedAt: new Date(Date.now() - i * 86400000).toISOString() })),
  },
  'tower-of-god': {
    id: '3',
    title: 'Tower of God',
    slug: 'tower-of-god',
    cover: 'https://picsum.photos/seed/tower/300/450',
    author: 'SIU',
    type: 'comic',
    status: 'ongoing',
    genres: ['Action', 'Fantasy', 'Adventure'],
    likes: 156000,
    comments: 67000,
    chapters: Array.from({ length: 25 }, (_, i) => ({ number: i + 1, title: `Chapter ${i + 1}`, publishedAt: new Date(Date.now() - i * 86400000).toISOString() })),
  },
};

const demoSearchResults: SearchResult[] = [
  { id: '1', slug: 'solo-leveling', title: 'Solo Leveling', cover: 'https://picsum.photos/seed/solo/300/450', author: 'Chugong', type: 'comic' },
  { id: '2', slug: 'omniscient-reader', title: "Omniscient Reader's Viewpoint", cover: 'https://picsum.photos/seed/omni/300/450', author: 'Sing-Shong', type: 'comic' },
  { id: '3', slug: 'tower-of-god', title: 'Tower of God', cover: 'https://picsum.photos/seed/tower/300/450', author: 'SIU', type: 'comic' },
  { id: '4', slug: 'lunar-star', title: 'Lunar Star', cover: 'https://picsum.photos/seed/lunar/300/450', author: 'Kakao', type: 'novel' },
  { id: '5', slug: 'dragon-ascension', title: 'Dragon Ascension', cover: 'https://picsum.photos/seed/dragon/300/450', author: 'Webnovel', type: 'novel' },
  { id: '6', slug: 'rebirth-throne', title: 'Rebirth of the Divine Throne', cover: 'https://picsum.photos/seed/rebirth/300/450', author: 'MTT', type: 'novel' },
  { id: '7', slug: 'noblesse', title: 'Noblesse', cover: 'https://picsum.photos/seed/noblesse/300/450', author: 'Son JaeHo', type: 'comic' },
];

// Configuration - set to false to use real API
const USE_DEMO_DATA = true;
const API_BASE = '/api';

// Hook for fetching series by slug
export function useSeries(slug: string) {
  const [data, setData] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchSeries() {
      try {
        setLoading(true);
        
        if (USE_DEMO_DATA) {
          // Use demo data
          await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
          const series = demoSeriesData[slug] || demoSeriesData['solo-leveling'];
          setData(series);
        } else {
          // Use real API
          const res = await fetch(`${API_BASE}/series/${slug}`);
          const json = await res.json();
          if (json.error) throw new Error(json.error);
          setData(json);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSeries();
  }, [slug]);

  return { data, loading, error };
}

// Hook for searching series
export function useSeriesSearch(query: string, filters: Record<string, string> = {}) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async () => {
    if (!query.trim() && Object.keys(filters).length === 0) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      
      if (USE_DEMO_DATA) {
        // Use demo data with filtering
        await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
        let filtered = demoSearchResults.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.author.toLowerCase().includes(query.toLowerCase())
        );
        
        // Apply type filter
        if (filters.type && filters.type !== 'all') {
          filtered = filtered.filter(item => item.type === filters.type);
        }
        
        // Apply genre filter
        if (filters.genre) {
          // Demo data doesn't have genre, so we'll skip this for demo
        }
        
        setResults(filtered);
      } else {
        // Use real API
        const params = new URLSearchParams({ q: query, ...filters }).toString();
        const res = await fetch(`${API_BASE}/search?${params}`);
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setResults(json.data || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [query, filters]);

  useEffect(() => {
    const timeout = setTimeout(search, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return { results, loading, error, refetch: search };
}

// Hook for getting popular/trending series
export function useTrendingSeries(limit: number = 10) {
  const [data, setData] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrending() {
      try {
        setLoading(true);
        
        if (USE_DEMO_DATA) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setData(demoSearchResults.slice(0, limit));
        } else {
          const res = await fetch(`${API_BASE}/series?sort=popular&limit=${limit}`);
          const json = await res.json();
          if (json.error) throw new Error(json.error);
          setData(json.data || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, [limit]);

  return { data, loading, error };
}

// Hook for getting new releases
export function useNewReleases(limit: number = 10) {
  const [data, setData] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNew() {
      try {
        setLoading(true);
        
        if (USE_DEMO_DATA) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setData(demoSearchResults.slice(0, limit));
        } else {
          const res = await fetch(`${API_BASE}/series?sort=new&limit=${limit}`);
          const json = await res.json();
          if (json.error) throw new Error(json.error);
          setData(json.data || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNew();
  }, [limit]);

  return { data, loading, error };
}

// Hook for chapter reading
export function useChapter(slug: string, chapterNumber: number) {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || !chapterNumber) return;

    async function fetchChapter() {
      try {
        setLoading(true);
        
        if (USE_DEMO_DATA) {
          await new Promise(resolve => setTimeout(resolve, 300));
          // Generate demo pages
          setPages(Array.from({ length: 15 }, (_, i) => 
            `https://picsum.photos/seed/${slug}-ch${chapterNumber}-page${i + 1}/800/1200`
          ));
        } else {
          const res = await fetch(`${API_BASE}/chapters/${slug}/${chapterNumber}`);
          const json = await res.json();
          if (json.error) throw new Error(json.error);
          setPages(json.pages || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchChapter();
  }, [slug, chapterNumber]);

  return { pages, loading, error };
}

// Utility function to format numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
