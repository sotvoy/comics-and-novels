/**
 * Canonical Navigation Configuration
 * 
 * This file serves as the single source of truth for navigation items
 * across the application (category pills, bottom nav, drawer, topbar).
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  priority?: number;
  type: 'navigation' | 'creator' | 'social';
}

export interface CreatorAction {
  id: string;
  label: string;
  href: string;
  icon: string;
  description?: string;
}

// Primary navigation items for category pills
export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'all', label: 'All', href: '/', priority: 1, type: 'navigation' },
  { id: 'foryou', label: 'For You', href: '/for-you', priority: 2, type: 'navigation' },
  { id: 'new', label: 'New', href: '/new', priority: 3, type: 'navigation' },
  { id: 'recent', label: 'Recent', href: '/recent', priority: 4, type: 'navigation' },
  { id: 'popular', label: 'Popular', href: '/popular', priority: 5, type: 'navigation' },
  { id: 'trending', label: 'Trending', href: '/trending', priority: 6, type: 'navigation' },
  { id: 'shorts', label: 'Shorts', href: '/shorts', priority: 7, type: 'navigation' },
  { id: 'topranking', label: 'Top Ranking', href: '/ranking', priority: 8, type: 'navigation' },
  { id: 'events', label: 'Events', href: '/events', priority: 9, type: 'navigation' },
  { id: 'news', label: 'News', href: '/news', priority: 10, type: 'navigation' },
  { id: 'community', label: 'Community', href: '/community', priority: 11, type: 'navigation' },
  { id: 'manga', label: 'Manga', href: '/manga', priority: 12, type: 'navigation' },
  { id: 'manhwa', label: 'Manhwa', href: '/manhwa', priority: 13, type: 'navigation' },
  { id: 'manhua', label: 'Manhua', href: '/manhua', priority: 14, type: 'navigation' },
  { id: 'novels', label: 'Novels', href: '/novels', priority: 15, type: 'navigation' },
  { id: 'audiobooks', label: 'Audiobooks', href: '/audiobooks', priority: 16, type: 'navigation' },
  { id: 'search', label: 'Search', href: '/search', priority: 17, type: 'navigation' },
  { id: 'discover', label: 'Discover', href: '/discover', priority: 18, type: 'navigation' },
  { id: 'leaderboard', label: 'Leaderboard', href: '/leaderboard', priority: 19, type: 'navigation' },
  { id: 'achievements', label: 'Achievements', href: '/achievements', priority: 20, type: 'navigation' },
  { id: 'chat', label: 'Chat', href: '/chat', priority: 21, type: 'navigation' },
  { id: 'messages', label: 'Messages', href: '/messages', priority: 22, type: 'navigation' },
];

// Bottom navigation items
export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', icon: 'Home', type: 'navigation' },
  { id: 'my-list', label: 'My List', href: '/my-list', icon: 'List', type: 'navigation' },
  { id: 'create', label: 'Create', href: '#create', icon: 'Plus', type: 'creator' },
  { id: 'following', label: 'Following', href: '/following', icon: 'Following', type: 'social' },
  { id: 'profile', label: 'Profile', href: '/profile', icon: 'Profile', type: 'social' },
];

// Creator actions for the plus menu
export const CREATOR_ACTIONS: CreatorAction[] = [
  { 
    id: 'publish-art', 
    label: 'Publish Art', 
    href: '/publish-art', 
    icon: 'Image',
    description: 'Upload and publish comics/artwork'
  },
  { 
    id: 'write-stories', 
    label: 'Write Stories', 
    href: '/write-stories', 
    icon: 'PenTool',
    description: 'Write and publish novels/stories'
  },
  { 
    id: 'create-post', 
    label: 'Create Post', 
    href: '/upload/post', 
    icon: 'Newspaper',
    description: 'Share news, events, or community posts'
  },
];

// Genre tags for drawer
export const GENRE_TAGS = [
  'Action', 'Romance', 'Fantasy', 'Comedy', 'Horror', 'Sci-Fi', 
  'Adventure', 'Drama', 'Mystery', 'Sports', 'Slice of Life', 
  'Supernatural', 'Psychological', 'Thriller', 'Historical', 'Mecha'
];

// Status filters
export const STATUS_FILTERS = [
  { id: 'ongoing', label: 'Ongoing', color: 'green' },
  { id: 'completed', label: 'Completed', color: 'gray' },
  { id: 'hiatus', label: 'Hiatus', color: 'yellow' },
  { id: 'dropped', label: 'Dropped', color: 'red' },
  { id: 'adopted', label: 'Adopted', color: 'blue' },
];

// All Content Types for dropdown
export const CONTENT_TYPES = [
  { id: 'manga', label: 'Manga', href: '/manga', icon: '📚' },
  { id: 'manhwa', label: 'Manhwa', href: '/manhwa', icon: '🇰🇷' },
  { id: 'manhua', label: 'Manhua', href: '/manhua', icon: '🇨🇳' },
  { id: 'comics', label: 'All Comics', href: '/comics', icon: '📖' },
];

// Aliases for backward compatibility
export const NAV_ALIASES: Record<string, string> = {
  'recent': 'new',
  'post': 'community',
};

export default NAVIGATION_ITEMS;
