# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added (Security Infrastructure v1)
- **Cloudinary Signed Uploads**
  - Created `/api/upload/signature` endpoint for server-side signature generation
  - Added client-side upload signing capability for creator uploads

- **Stripe Payment Integration**
  - Created `/api/stripe/checkout` endpoint for tips and subscriptions
  - Created `/api/stripe/webhook` endpoint for payment events
  - Added Stripe wrapper utility with optional package handling

- **Security Features**
  - Added rate limiter utility (`lib/rate-limit.ts`)
  - Added reCAPTCHA verification utility (`lib/recaptcha.ts`)
  - Added CSP and security headers in `next.config.js`:
    - Content-Security-Policy
    - X-Content-Type-Options
    - X-Frame-Options
    - X-XSS-Protection
    - Referrer-Policy
    - Permissions-Policy

- **Testing**
  - Added auth smoke tests (`tests/auth.spec.ts`)
  - Added API smoke tests (`tests/api.spec.ts`)

### Changed
- Updated `.env.example` with complete list of environment variables
- Fixed lint error in trending page (unescaped apostrophe)

### Known Issues
- Rate limiter is in-memory (use Redis for production)
- Stripe endpoints gracefully handle missing Stripe package
- reCAPTCHA verification fails open when not configured

## [1.0.0] - 2024-03-09

### Added
- **Authentication System**
  - Created AuthContext with Supabase integration for email/password, Google, and GitHub login
  - Built LoginForm component with email/password and OAuth options
  - Built RegisterForm component with validation
  - Created auth callback page for OAuth redirects
  - Added protected routes middleware for creator studio, settings, profile pages
  - Updated TopBar to show Sign In button or user avatar based on auth state
  - Updated Profile page with real user data from Supabase

- **Database & Security**
  - Added Row Level Security (RLS) policies to database schema
  - Created seed script with demo data (users, series, chapters, comments, likes, follows, notifications)

- **Testing Infrastructure**
  - Added Playwright for E2E testing
  - Created smoke tests for all main pages
  - Added test scripts to package.json

### Changed
- Updated .env.example with all required environment variables
- Added test command configuration to package.json

### Security
- Added middleware.ts for protected routes
- Implemented RLS policies for all tables (users, series, chapters, comments, likes, follows, notifications)

### How to Test
1. Visit /login to see login form
2. Visit /register to create new account
3. After login, user avatar appears in TopBar
4. Click avatar to go to /profile
5. Protected routes (/creator, /settings, /my-list) redirect to /login if not authenticated

### Next Steps (Priority Order)
1. Implement password reset flow
2. Add email verification
3. Create Creator Studio pages (create series, upload chapters)
4. Implement Cloudinary signed uploads for images
5. Add Stripe payment integration for tipping
6. Implement full-text search with Algolia or similar
7. Add real-time notifications
8. Implement PWA features

### Preview
- Local: http://localhost:3000
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register
