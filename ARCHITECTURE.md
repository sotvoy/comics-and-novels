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

## Project Structure

```
comics-and-novels/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── comics/             # Comics page
│   ├── novels/            # Novels page
│   ├── search/            # Search page
│   ├── series/[slug]/     # Series detail page
│   ├── read/[slug]/[chapter]/  # Reader page
│   ├── creator/           # Creator studio
│   ├── profile/           # User profiles
│   ├── api/               # API routes (Supabase Edge Functions)
│   └── ...                # Other pages
├── components/            # React components
│   ├── layout/            # TopBar, BottomBar, Drawer
│   ├── ui/                # Reusable UI components
│   ├── reader/            # Comic/Novel reader
│   └── creator/           # Creator tools
├── lib/                   # Utilities & configs
│   ├── supabaseClient.ts  # Supabase client
│   ├── navigation.ts      # Navigation config
│   └── ...
├── database/              # Database schema & seeds
│   ├── schema.sql         # Database schema
│   └── seed.sql           # Demo data
├── supabase/              # Supabase configuration
│   └── seed.ts           # Seed data script
└── public/                # Static assets
```

## Backend - Supabase

### Supabase Provides:
- **PostgreSQL Database** - All data storage
- **Authentication** - Email, Google, GitHub login
- **Row Level Security (RLS)** - Secure data access
- **Real-time Subscriptions** - Live updates
- **Edge Functions** - Serverless API endpoints
- **Storage** - File uploads (via Cloudinary)

### Database Tables:
- `users` - User profiles, levels, achievements
- `series` - Comics & novels
- `chapters` - Chapter content
- `comments` - User comments
- `likes` - Reactions & likes
- `follows` - Follow/Subscribe system
- `bookmarks` - Saved content
- `reading_history` - User reading progress
- `genres` - Content categories
- `tags` - Content tags
- `notifications` - User notifications
- `posts` - Community posts
- `world_chat` - Global chat
- `ratings` - User ratings

## Features

### Core Features
- Comics & Novels reading platform
- Multiple content types: Manga, Manhwa, Manhua
- Genre-based filtering & search
- Reading history & bookmarks
- Follow/Subscription system
- Comments & Reactions
- User ratings

### Creator Tools
- Publish comics and novels
- Chapter management
- Analytics dashboard

### User Features
- User profiles with achievements
- Reading lists & favorites
- Notifications
- Dark/Light theme

## Environment Variables

Required environment variables for production:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://zfsxduowawvnimojbtvk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET=your_preset

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your_domain
SENTRY_DSN=your_sentry_dsn

# Auth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## Deployment

The app deploys automatically to Vercel when pushed to GitHub main branch.

### Build Command
```bash
npm run build
```

### Output Directory
```bash
.next
```

## Database Setup

1. Create a Supabase project
2. Run the SQL schema from `database/schema.sql`
3. Seed demo data from `database/seed.sql`
4. Configure RLS policies

## License

MIT
