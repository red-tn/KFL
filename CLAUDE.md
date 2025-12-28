# King's Family Lakes - Project Documentation

## Project Overview

A modern website for King's Family Lakes, a hunting and fishing destination in Epes, Alabama.

**Repository:** https://github.com/red-tn/KFL
**Live Site:** https://kfl.vercel.app (pending)
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
| `/` | Home page with hero, activities, features, pricing preview |
| `/the-lakes` | Lake Scott, Shannon, Patrick details |
| `/deer-hunting` | Deer hunting info, pricing ($300/day), regulations |
| `/turkey-hunting` | Turkey hunting, fall/spring seasons |
| `/bass-fishing` | Fishing info, tips, lake details |
| `/directions` | How to get here (I-20 Exit 23) |
| `/contact` | Contact form, FAQ, contact info |
| `/admin` | Payload CMS admin dashboard |

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
| Deer Hunting | $300/person/day |
| Turkey Hunting | $300/person/day |
| Lodging | $100/night |
| Trophy Fees | $0 (none) |
| Fishing | Free with stay |

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

---

## Known Issues / TODO

- [ ] Vercel deployment pending
- [ ] Need to create Supabase storage bucket `media`
- [ ] First admin user needs to be created at `/admin`
- [ ] Images currently show placeholders (need real photos)
- [ ] Contact form email sending not implemented (just logs)
- [ ] Google Maps embed placeholder on directions page

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
│   │   ├── bass-fishing/
│   │   ├── contact/
│   │   ├── deer-hunting/
│   │   ├── directions/
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
