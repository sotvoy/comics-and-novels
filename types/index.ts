export interface Series {
  id: string;
  slug: string;
  title: string;
  cover: string;
  banner?: string;
  author: string;
  artist?: string;
  description: string;
  type: 'comic' | 'novel';
  status: 'ongoing' | 'completed' | 'hiatus' | 'dropped' | 'adopted';
  genres: string[];
  tags: string[];
  keywords: string[];
  chapters: Chapter[];
  likes: number;
  comments: number;
  rating: number;
  views: number;
  follows: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  seriesId: string;
  number: number;
  title: string;
  content: string;
  pages?: string[];
  likes: number;
  comments: number;
  views: number;
  publishedAt: string;
  isPaid: boolean;
  price?: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'creator' | 'admin';
  level: number;
  exp: number;
  achievements: Achievement[];
  badges: Badge[];
  avatarFrame?: string;
  color?: string;
  followers: number;
  following: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  contentId: string;
  contentType: 'series' | 'chapter';
  userId: string;
  user: User;
  parentId?: string;
  replies?: Comment[];
  content: string;
  likes: number;
  dislikes: number;
  reactions: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'reader' | 'creator' | 'special';
  requirement: number;
  progress: number;
  unlockedAt?: string;
  reward?: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'chapter' | 'system';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}
