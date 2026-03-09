-- C&N Database Schema for Supabase
-- Comics & Novels Publishing & Reading Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'creator', 'admin')),
  level INTEGER DEFAULT 1,
  exp INTEGER DEFAULT 0,
  avatar_frame TEXT,
  color TEXT,
  is_creator BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Badges
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Series table (Comics & Novels)
CREATE TABLE series (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  cover TEXT NOT NULL,
  banner TEXT,
  author TEXT NOT NULL,
  artist TEXT,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('comic', 'novel')),
  status TEXT DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed', 'hiatus', 'dropped', 'adopted')),
  content_type TEXT CHECK (content_type IN ('manga', 'manhwa', 'manhua')),
  is_nsfw BOOLEAN DEFAULT false,
  age_rating INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  follows INTEGER DEFAULT 0,
  rating_sum INTEGER DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  total_chapters INTEGER DEFAULT 0,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Series Genres (many-to-many)
CREATE TABLE series_genres (
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  genre_id UUID REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (series_id, genre_id)
);

-- Series Tags
CREATE TABLE series_tags (
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  PRIMARY KEY (series_id, tag)
);

-- Series Keywords
CREATE TABLE series_keywords (
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  keyword TEXT NOT NULL,
  PRIMARY KEY (series_id, keyword)
);

-- Chapters
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title TEXT,
  content TEXT,
  pages TEXT[],
  is_paid BOOLEAN DEFAULT false,
  price INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  is_draft BOOLEAN DEFAULT false,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(series_id, chapter_number)
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  reactions JSONB DEFAULT '{}',
  is_edited BOOLEAN DEFAULT false,
  is_hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Likes
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('like', 'dislike', 'heart', 'laugh', 'angry', 'sad', 'wow')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, series_id, chapter_id, comment_id)
);

-- Follows/Subscriptions
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, series_id)
);

-- Bookmarks
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reading History
CREATE TABLE reading_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Genres
CREATE TABLE genres (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags (global)
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('like', 'comment', 'follow', 'chapter', 'system', 'achievement', 'reply')),
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reported_type TEXT NOT NULL CHECK (reported_type IN ('series', 'chapter', 'comment', 'user')),
  reported_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creator Applications
CREATE TABLE creator_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  portfolio TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts (Community)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  images TEXT[],
  type TEXT DEFAULT 'post' CHECK (type IN ('post', 'news', 'event', 'discussion')),
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post Comments
CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES post_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- World Chat Messages
CREATE TABLE world_chat (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  is_super_chat BOOLEAN DEFAULT false,
  super_chat_amount INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Series Ratings
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  series_id UUID REFERENCES series(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, series_id)
);

-- Indexes for performance
CREATE INDEX idx_series_type ON series(type);
CREATE INDEX idx_series_status ON series(status);
CREATE INDEX idx_series_created ON series(created_at DESC);
CREATE INDEX idx_chapters_series ON chapters(series_id, chapter_number DESC);
CREATE INDEX idx_comments_series ON comments(series_id);
CREATE INDEX idx_comments_chapter ON comments(chapter_id);
CREATE INDEX idx_likes_user ON likes(user_id);
CREATE INDEX idx_follows_user ON follows(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_reading_history_user ON reading_history(user_id, updated_at DESC);

-- Row Level Security Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE series ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE world_chat ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public series are viewable by everyone" ON series FOR SELECT USING (true);
CREATE POLICY "Public chapters are viewable by everyone" ON chapters FOR SELECT USING (true);
CREATE POLICY "Public comments are viewable by everyone" ON comments FOR SELECT USING (is_hidden = false);
CREATE POLICY "Public posts are viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "World chat is viewable by everyone" ON world_chat FOR SELECT USING (true);
CREATE POLICY "Ratings are viewable by everyone" ON ratings FOR SELECT USING (true);
CREATE POLICY "Genres are viewable by everyone" ON genres FOR SELECT USING (true);
CREATE POLICY "Tags are viewable by everyone" ON tags FOR SELECT USING (true);

-- Insert default genres
INSERT INTO genres (name, slug, color) VALUES
  ('Action', 'action', '#ef4444'),
  ('Adventure', 'adventure', '#f97316'),
  ('Comedy', 'comedy', '#eab308'),
  ('Drama', 'drama', '#84cc16'),
  ('Fantasy', 'fantasy', '#22c55e'),
  ('Horror', 'horror', '#14b8a6'),
  ('Romance', 'romance', '#06b6d4'),
  ('Sci-Fi', 'sci-fi', '#3b82f6'),
  ('Slice of Life', 'slice-of-life', '#8b5cf6'),
  ('Sports', 'sports', '#ec4899'),
  ('Mystery', 'mystery', '#6366f1'),
  ('Psychological', 'psychological', '#a855f7'),
  ('Supernatural', 'supernatural', '#d946ef'),
  ('Thriller', 'thriller', '#f43f5e'),
  ('Historical', 'historical', '#78716c'),
  ('Mecha', 'mecha', '#71717a'),
  ('Music', 'music', '#f59e0b'),
  ('School', 'school', '#10b981'),
  ('Superhero', 'superhero', '#0ea5e9'),
  ('Webtoon', 'webtoon', '#f472b6');

-- Insert admin user
INSERT INTO users (id, username, email, role, level) 
VALUES ('00000000-0000-0000-0000-000000000001', 'admin', 'admin@cn.com', 'admin', 100);
