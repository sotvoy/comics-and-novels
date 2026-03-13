# C&N - Comics & Novels Platform Architecture

## Technology Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | Next.js 14 (React) + TypeScript + Tailwind CSS |
| **Hosting** | Vercel |
| **Backend** | Next.js API Routes (Serverless) |
| **Database** | Supabase PostgreSQL |
| **Authentication** | Supabase Auth |
| **Storage** | Cloudinary (Images & Media) |
| **Analytics** | Plausible |
| **Error Tracking** | Sentry |

## Project Structure

```
comics-and-novels/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── comics/            # Comics page
│   ├── novels/            # Novels page
│   ├── search/            # Search page
│   ├── series/[slug]/     # Series detail page
│   ├── read/[slug]/[chapter]/  # Reader page
│   ├── creator/           # Creator studio
│   ├── profile/           # User profiles
│   ├── api/               # API routes
│   └── ...                # Other pages
├── components/            # React components
│   ├── layout/           # TopBar, BottomBar, Drawer
│   ├── ui/               # Reusable UI components
│   ├── reader/           # Comic/Novel reader
│   └── creator/          # Creator tools
├── lib/                  # Utilities & configs
│   ├── supabaseClient.ts # Supabase client
│   ├── navigation.ts     # Navigation config
│   └── ...
├── database/             # Database schema & seeds
│   ├── schema.sql        # Database schema
│   └── seed.sql          # Demo data
└── public/               # Static assets
```

## Features

### Core Features
- Comics & Novels reading platform
- Multiple content types: Manga, Manhwa, Manhua
- Genre-based filtering & search
- Reading history & bookmarks
- Follow/Subscription system
- Comments & Reactions

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
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
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

## Database Schema

The database includes tables for:
- Users (profiles, levels, achievements)
- Series (comics & novels)
- Chapters
- Comments & Reactions
- Follows & Bookmarks
- Reading History
- Genres & Tags
- Notifications
- Posts (Community)

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

## License

MIT
