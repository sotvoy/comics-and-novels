# C&N - Comics & Novels Platform Architecture

## Technology Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | Next.js 14 (React) + TypeScript + Tailwind CSS |
| **Hosting** | Vercel |
| **Backend** | Supabase (PostgreSQL + Edge Functions) |
| **Database** | Supabase PostgreSQL |
| **Authentication** | Supabase Auth |
| **Storage** | Cloudinary |
| **Analytics** | Plausible |
| **Error Tracking** | Sentry |

## CORE APP SHELL (Load on Every Page)

| Component | Description |
|-----------|-------------|
| **AppShell** | Main shell wrapping all pages |
| **TopBar** | Navigation header with menu, search, notifications |
| **BottomBar** | Mobile bottom navigation |
| **DrawerMenu** | Side drawer with navigation |
| **FloatingChatWindow** | Draggable global chat |
| **NotificationCenter** | Notification dropdown |
| **ThemeManager** | Light/Dark mode provider |
| **ModalSystem** | Global modal manager |
| **LoadingSystem** | Page transition loading overlay |
| **PWAController** | Service worker registration |
| **OfflineCacheController** | Offline detection & caching |

## Project Structure

```
comics-and-novels/
├── app/                    # Next.js App Router pages (55+ pages)
├── components/            # React components (39+ components)
│   ├── layout/           # TopBar, BottomBar, Drawer
│   ├── ui/               # Reusable UI components
│   ├── reader/           # Comic/Novel reader
│   ├── creator/          # Creator tools
│   ├── features/         # FloatingChat, AIAssistant, WorldChat
│   ├── providers/        # Theme, Query, Supabase providers
│   ├── pwa/              # PWA & Offline controllers
│   ├── analytics/        # Plausible analytics
│   ├── auth/             # Login, Register forms
│   ├── social/           # Follow, Bookmark buttons
│   ├── comments/         # Comments section
│   └── moderation/       # Report, Moderation
├── lib/                   # Utilities & configs
├── database/              # Database schema & seeds
└── public/               # Static assets
```

## Components List (39+)

### Layout Components
- TopBar - Navigation header
- BottomBar - Mobile bottom nav

### Core Shell Components
- AppShell - Main shell wrapper
- LoadingOverlay - Global loading
- ModalManager - Global modal system
- FloatingChatWindow - World chat
- OfflineCacheController - Offline support
- ServiceWorkerRegistration - PWA

### UI Components
- CategoryPills - Genre navigation
- Icons - SVG icon library
- NotificationDropdown - Notifications
- SearchAutocomplete - Search input
- UIComponents - Reusable UI elements
- AnimatedButtons - Button animations

### Feature Components
- AIAssistant - AI chat assistant
- WorldChat - Global chat
- AudioPlayer - Audio playback
- ClientLayout - Client-side layout

### Creator Components
- SeriesManagement
- NovelEditor
- UploadProgress
- ContentScheduling
- CreatorAnalytics
- CommentModeration
- ImageReorder
- CreateSeriesForm
- UploadChapterForm

### Series Components
- SeriesCard
- ReadingProgress

### Auth Components
- LoginForm
- RegisterForm

### Social Components
- BookmarkButton
- FollowButton

### Comments Components
- CommentsSection

### Moderation Components
- ReportButton

### Providers
- QueryProvider
- SupabaseProvider
- ThemeProvider

### Analytics
- PlausibleAnalytics

## Database Tables

- users, series, chapters, comments, likes
- follows, bookmarks, reading_history
- genres, tags, notifications, posts
- world_chat, ratings

## Deployment

Automatic deployment to Vercel on GitHub push.

## License

MIT
