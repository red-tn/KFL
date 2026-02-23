# King's Family Lakes - Project Documentation

## Project Overview

A modern website for King's Family Lakes, a hunting and fishing destination in Epes, Alabama.

**Repository:** https://github.com/red-tn/KFL
**Live Site:** https://kingsfamilylakes.com
**Admin Panel:** `/admin`

---

## Tech Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 15.x |
| UI | React | 19.x |
| Styling | Tailwind CSS | 3.4.x |
| CMS | Payload CMS | 3.x |
| Database | PostgreSQL | Supabase |
| Storage | Supabase Storage | - |
| Hosting | Vercel | - |
| Ads | Google AdSense | - |

---

## Supabase Configuration

| Setting | Value |
|---------|-------|
| Project ID | `ldqwjomywgphklhamvba` |
| Region | (check dashboard) |
| Storage Bucket | `media` (must be public) |

**Connection String Format:**
```
postgresql://postgres.ldqwjomywgphklhamvba:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## Environment Variables

Required for deployment:

```env
DATABASE_URL=postgresql://postgres.ldqwjomywgphklhamvba:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://ldqwjomywgphklhamvba.supabase.co
SUPABASE_SERVICE_KEY=[service-role-key]
PAYLOAD_SECRET=[32+ char secret]
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-8003141165916453
NEXT_PUBLIC_SITE_URL=https://kingsfamilylakes.com
```

---

## Site Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, activities, lodging showcase, features, pricing preview |
| `/the-lakes` | Lake Scott, Shannon, Patrick details |
| `/deer-hunting` | Deer hunting info, pricing ($400/day), regulations |
| `/turkey-hunting` | Turkey hunting, spring season ($1,000/2 days) |
| `/bass-fishing` | Fishing info, tips, lake details ($200/day) |
| `/lodging` | Two camp houses — rooms, amenities, gallery |
| `/directions` | How to get here (I-20 Exit 23) |
| `/contact` | Contact form (with human verification), FAQ, contact info |
| `/gallery` | Full photo gallery |
| `/admin` | Admin dashboard (gallery, pages, activities, settings, messages) |
| `/admin/login` | Admin login with forgot password flow |
| `/admin/reset-password` | Set new password after reset email |
| `/auth/callback` | Supabase auth callback (password reset, email confirm) |
| `/api/admin/migrate` | One-time DB migration (adds lodging categories to constraint) |

---

## CMS Collections

| Collection | Purpose |
|------------|---------|
| `users` | Admin user accounts |
| `media` | Image uploads with categories |
| `pages` | Page content, SEO, hero images |
| `activities` | Hunting/fishing activities, pricing, seasons |
| `gallery` | Photo galleries by category |

### Global Settings
- Site name, tagline
- Contact info (phone, email, address)
- Social media links
- Pricing (hunting $300/day, lodging $100/night)
- Ad slot IDs
- SEO defaults

---

## Contact Information

| Type | Value |
|------|-------|
| Phone | +1 (334) 341-3753 |
| Email | papakingj@gmail.com |
| Location | Epes, Alabama (I-20, Exit 23) |
| Facebook | facebook.com/kingsfamilylakes |

---

## Pricing

| Service | Price |
|---------|-------|
| Deer Hunting | $400/person/day (lodging included) |
| Turkey Hunting | $1,000/person/2 days (lodging included) |
| Bass Fishing | $200/person/day |
| Lodging | $100/night (standalone) |
| Trophy Fees | $0 (none) |

---

## Changelog

### 2024-12-28 - Initial Build

**Commit:** `ad36d7a` - Initial commit
- Created Next.js 14 project structure
- Built all 7 pages with content from original site
- Implemented Tailwind CSS styling with custom colors (forest, earth)
- Set up Payload CMS with PostgreSQL/Supabase
- Created 5 CMS collections + global settings
- Added Google AdSense integration with strategic placements
- Built responsive header/footer with mobile menu
- Created contact form with API route
- Added reusable UI components (Hero, Gallery, PricingCard, etc.)

**Commit:** `b12ba5b` - Fix dependency versions
- Updated Next.js 14 → 15 (required by Payload CMS 3.x)
- Updated React 18 → 19
- Changed next.config.js → next.config.mjs (ESM)
- Fixed Vercel build error: `ERESOLVE unable to resolve dependency tree`

### 2026-02-23 - Lodging Page, Auth, Contact Verification

**Commit:** `4708bd0` - Add lodging page with camp house details and home page showcase
- Created `/lodging` page with Camp House 1 (Lake Scott, sleeps 8) and Camp House 2 (Lake Shannon, 4 sleep rooms, fireplace)
- Sections: hero, two camp house details, amenities grid, pricing, scrollable gallery, CTA
- Added lodging showcase section to home page (2x2 image grid + bullet points)
- Added "Lodging" nav link to header and footer
- Converted 5 JPEG images to WebP (camp house exteriors, bedrooms, fireplace)
- Added lodging gallery categories to types, data, and admin gallery

**Commit:** `9a1f44c` - Add 18 new lodging photos to gallery defaults
- Converted 18 camp house photos (exteriors, porches, bedrooms, kitchen, grill, trophy wall, lake views)
- Added to lodging gallery and main gallery defaults in admin

**Commit:** `f11ff57` - Add password reset flow and DB migration endpoint
- `/auth/callback` route handles Supabase password reset token exchange
- `/admin/reset-password` page for setting new password
- "Forgot password?" toggle on admin login page
- `/api/admin/migrate` endpoint updates DB check constraint to allow lodging categories
- Updated middleware to allow auth callback and reset-password routes

**Commit:** `cbb8529` - Add human verification to contact form
- Math challenge (e.g. "What is 4 + 7?") required before form submits
- Regenerates on wrong answer, no third-party dependencies

---

## Known Issues / TODO

- [ ] Run `/api/admin/migrate` once on live site to update DB constraint for lodging categories
- [ ] Create admin user in Supabase Auth dashboard
- [ ] Set Supabase Auth redirect URL to `https://kingsfamilylakes.com/auth/callback`
- [ ] Contact form email sending uses Resend API (RESEND_API_KEY configured)
- [ ] Google Maps embed uses placeholder coordinates on directions page

---

## File Structure

```
F:/KFL/
├── src/
│   ├── app/
│   │   ├── (payload)/          # CMS admin routes
│   │   │   ├── admin/          # Admin panel pages
│   │   │   └── api/            # Payload API routes
│   │   ├── api/contact/        # Contact form API
│   │   ├── api/admin/migrate/  # DB migration endpoint
│   │   ├── auth/callback/      # Supabase auth callback
│   │   ├── bass-fishing/
│   │   ├── contact/
│   │   ├── deer-hunting/
│   │   ├── directions/
│   │   ├── lodging/            # Camp houses page
│   │   ├── the-lakes/
│   │   ├── turkey-hunting/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx            # Home page
│   ├── collections/            # Payload CMS collections
│   │   ├── Activities.ts
│   │   ├── Gallery.ts
│   │   ├── Media.ts
│   │   ├── Pages.ts
│   │   └── Users.ts
│   ├── components/
│   │   ├── ads/                # AdSense components
│   │   ├── forms/              # Contact form
│   │   ├── layout/             # Header, Footer
│   │   └── ui/                 # Reusable UI components
│   ├── globals/
│   │   └── SiteSettings.ts     # Global CMS settings
│   ├── lib/
│   │   └── payload.ts          # Payload client utilities
│   └── payload.config.ts       # Payload CMS configuration
├── .env                        # Local environment (not committed)
├── .env.example                # Environment template
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Useful Commands

```bash
# Development
npm run dev                 # Start dev server (localhost:3000)

# Production
npm run build              # Build for production
npm run start              # Start production server

# Payload CMS
npm run payload            # Run Payload CLI
npm run generate:types     # Generate TypeScript types from CMS
```

---

## Original Site Reference

Source: https://kingsfamilylakes.com/

**Pages scraped:**
- Home
- The Lakes (Lake Scott ~35ac, Lake Shannon, Lake Patrick)
- Deer Hunting ($300/day, Alabama regulations)
- Turkey Hunting (Fall: Nov 23-30, Spring: Mar 15-Apr 30)
- Bass Fishing (Large Mouth Bass, Brim)
- How to Get Here (I-20 Exit 23, directions)
- Contact (form, phone, email)
