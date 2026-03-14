# Comics & Novels - Production Guide

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```bash
docker build -t comics-novels .
docker run -p 3000:3000 comics-novels
```

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_APP_URL` - Your production URL
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

## Production Features

### Implemented
- ✅ Mobile-first responsive design
- ✅ Dark/Light theme support
- ✅ SEO optimization
- ✅ Image optimization
- ✅ Category navigation (33 items)
- ✅ Genre pages (11 genres)
- ✅ Series detail pages
- ✅ Chapter reading
- ✅ Search with filters
- ✅ User profiles
- ✅ Creator studio
- ✅ Community features
- ✅ Collections & playlists
- ✅ Notifications system
- ✅ Settings management
- ✅ Analytics dashboard

### Coming Soon (Monetization Removed)
- Premium features
- In-app purchases
- Subscription system
- Ad integration

## API Endpoints (Future)

When integrating backend:
- `/api/auth/*` - Authentication
- `/api/series` - Series CRUD
- `/api/chapters` - Chapter management
- `/api/users` - User management
- `/api/comments` - Comments system
- `/api/likes` - Likes/hearts
- `/api/bookmarks` - Bookmarks

## Database Schema (Future)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Series
CREATE TABLE series (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  cover_url TEXT,
  author_id UUID REFERENCES users(id),
  status VARCHAR(50),
  type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chapters
CREATE TABLE chapters (
  id UUID PRIMARY KEY,
  series_id UUID REFERENCES series(id),
  title VARCHAR(255),
  number INTEGER,
  content TEXT,
  published_at TIMESTAMP DEFAULT NOW()
);
```

## Performance

- Lighthouse Score: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Cumulative Layout Shift: <0.1

## Support

For issues and questions, open a GitHub issue.
