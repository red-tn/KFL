-- King's Family Lakes Database Schema
-- Run this in your Supabase SQL Editor

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT DEFAULT 'King''s Family Lakes',
  tagline TEXT DEFAULT 'Premier Hunting & Fishing in Alabama',
  phone TEXT DEFAULT '+1 (334) 341-3753',
  email TEXT DEFAULT 'papakingj@gmail.com',
  address_city TEXT DEFAULT 'Epes',
  address_state TEXT DEFAULT 'Alabama',
  address_directions TEXT DEFAULT 'I-20, Exit 23',
  facebook_url TEXT DEFAULT 'https://facebook.com/kingsfamilylakes',
  hunting_daily_rate INTEGER DEFAULT 300,
  fishing_daily_rate INTEGER DEFAULT 200,
  lodging_nightly_rate INTEGER DEFAULT 100,
  adsense_client_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (id) VALUES (gen_random_uuid()) ON CONFLICT DO NOTHING;

-- Activities Table (Lakes, Hunting, Fishing)
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('lake', 'deer-hunting', 'turkey-hunting', 'bass-fishing')),
  short_description TEXT,
  full_description TEXT,
  hero_image_url TEXT,
  daily_rate INTEGER,
  lodging_rate INTEGER,
  season_info TEXT,
  features JSONB DEFAULT '[]',
  regulations JSONB DEFAULT '[]',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default activities
INSERT INTO activities (name, slug, type, short_description, daily_rate, is_featured, display_order) VALUES
('Lake Scott', 'lake-scott', 'lake', 'The largest of our three lakes at approximately 35 acres, featuring extensive tree cover and multiple docks.', 0, true, 1),
('Lake Shannon', 'lake-shannon', 'lake', 'Known for producing our largest bass specimens. Nestled in surrounding hills with peaceful fishing.', 0, true, 2),
('Lake Patrick', 'lake-patrick', 'lake', 'Our newest lake with a growing bass population and less fishing pressure.', 0, true, 3),
('Deer Hunting', 'deer-hunting', 'deer-hunting', 'World-class White Tail Deer hunting with well-maintained blinds and manicured pastures.', 300, true, 4),
('Turkey Hunting', 'turkey-hunting', 'turkey-hunting', 'Premium turkey hunting with fall and spring seasons. Strategic blind placements.', 300, true, 5),
('Bass Fishing', 'bass-fishing', 'bass-fishing', 'Trophy bass fishing on three private lakes. Large Mouth Bass and Brim year-round.', 0, true, 6)
ON CONFLICT (slug) DO NOTHING;

-- Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  image_url TEXT NOT NULL,
  category TEXT CHECK (category IN (
    'lakes', 'deer-hunting', 'turkey-hunting', 'fishing', 'property', 'lodging', 'wildlife',
    'main-gallery',
    'hero-home', 'hero-lakes', 'hero-deer', 'hero-turkey', 'hero-fishing', 'hero-gallery', 'hero-directions', 'hero-contact',
    'overview-deer', 'overview-turkey', 'overview-fishing',
    'card-lakes', 'card-deer', 'card-turkey', 'card-fishing'
  )),
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  rotation INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Content Table (for hero sections, etc.)
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT UNIQUE NOT NULL,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_image_url TEXT,
  hero_video_url TEXT,
  content JSONB DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default page content
INSERT INTO page_content (page_slug, hero_title, hero_subtitle, hero_video_url) VALUES
('home', 'King''s Family Lakes', 'Experience world-class hunting and fishing in the heart of Alabama.', '/images/lake-overview.mp4'),
('the-lakes', 'The Lakes', 'Three pristine private lakes stocked with Large Mouth Bass and Brim.', '/images/lake-overview.mp4'),
('deer-hunting', 'Deer Hunting', 'A world-class White Tail Deer hunting experience.', NULL),
('turkey-hunting', 'Turkey Hunting', 'A turkey hunting experience that is second to none.', NULL),
('bass-fishing', 'Bass Fishing', 'Trophy bass fishing on three private lakes.', NULL),
('directions', 'How to Get Here', 'Located in Epes, Alabama - just off Interstate 20, Exit 23.', NULL),
('contact', 'Contact Us', 'Ready to book your adventure? We''re here to help.', NULL)
ON CONFLICT (page_slug) DO NOTHING;

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interest TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON activities FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON page_content FOR SELECT USING (true);

-- Policies for authenticated users (admin)
CREATE POLICY "Allow authenticated insert" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON site_settings FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON activities FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON activities FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON activities FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON gallery_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON gallery_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON gallery_images FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON page_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON page_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON page_content FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON contact_submissions FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON contact_submissions FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON page_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
