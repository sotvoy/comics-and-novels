import { create } from 'zustand';

interface AppState {
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  contentType: 'comic' | 'novel' | 'all';
  setContentType: (type: 'comic' | 'novel' | 'all') => void;
  isReadingMode: boolean;
  setReadingMode: (mode: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDrawerOpen: false,
  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
  isSearchOpen: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  contentType: 'all',
  setContentType: (type) => set({ contentType: type }),
  isReadingMode: false,
  setReadingMode: (mode) => set({ isReadingMode: mode }),
}));
