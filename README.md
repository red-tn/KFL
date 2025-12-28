# King's Family Lakes Website

A modern Next.js website for King's Family Lakes - a premier hunting and fishing destination in Alabama.

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Payload CMS 3.0
- **Database**: PostgreSQL (Supabase)
- **Image Storage**: Supabase Storage
- **Hosting**: Vercel

## Getting Started

### Prerequisites

1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **Supabase Account** - [Sign up free](https://supabase.com/)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com/)
2. Go to **Project Settings** > **Database** and copy the connection string
3. Go to **Project Settings** > **API** and copy:
   - Project URL
   - Service Role Key (secret)
4. Create a storage bucket:
   - Go to **Storage** > **Create bucket**
   - Name: `media`
   - Make it **public**

### Step 3: Configure Environment

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your values:
```env
# Supabase Database (from Step 2)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Supabase Storage (from Step 2)
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# Payload CMS (generate a random 32+ character string)
PAYLOAD_SECRET=your-secret-key-min-32-characters-long

# Google AdSense (your publisher ID)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://kingsfamilylakes.com
```

### Step 4: Run Development Server

```bash
npm run dev
```

- **Site**: http://localhost:3000
- **Admin**: http://localhost:3000/admin

### Step 5: Create Admin User

1. Go to http://localhost:3000/admin
2. Create your first admin account
3. Start adding content!

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Add environment variables (same as `.env`)
4. Deploy!

### Step 3: Configure Domain

1. In Vercel, go to **Settings** > **Domains**
2. Add `kingsfamilylakes.com`
3. Update DNS records at your registrar

## Admin Dashboard

Access the admin panel at `/admin` to:

- **Pages**: Edit page content, SEO, and hero images
- **Activities**: Manage hunting/fishing activities, pricing, and seasons
- **Gallery**: Upload and organize photo galleries
- **Media**: Manage all uploaded images
- **Site Settings**: Update contact info, social links, pricing, and ad settings

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── (payload)/         # CMS admin routes
│   ├── (site)/            # Public pages
│   └── api/               # API routes
├── collections/           # Payload CMS collections
├── components/            # React components
│   ├── ads/              # Google AdSense
│   ├── forms/            # Contact form
│   ├── layout/           # Header, Footer
│   └── ui/               # Reusable UI components
├── globals/              # Payload global configs
└── lib/                  # Utility functions
```

## Features

- **Responsive Design**: Mobile-first, works on all devices
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Google AdSense**: Strategic ad placements
- **Contact Form**: With email notifications
- **Image Optimization**: Automatic resizing and compression
- **Content Management**: Easy-to-use admin panel

## Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:
- `forest` - Primary green tones
- `earth` - Brown/tan accents
- `primary` - Blue tones

### Fonts

The site uses:
- **Open Sans** - Body text
- **Georgia** - Headings

## Support

For questions about the website, contact the developer or raise an issue on GitHub.
