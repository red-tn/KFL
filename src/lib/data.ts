import { createClient } from '@/lib/supabase/server'
import type { SiteSettings, Activity, PageContent, GalleryImage } from '@/lib/types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('site_settings').select('*').single()
  return data
}

export async function getActivities(): Promise<Activity[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('activities')
    .select('*')
    .order('display_order')
  return data || []
}

export async function getFeaturedActivities(): Promise<Activity[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('activities')
    .select('*')
    .eq('is_featured', true)
    .order('display_order')
  return data || []
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('activities')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('page_content')
    .select('*')
    .eq('page_slug', slug)
    .single()
  return data
}

export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  const supabase = await createClient()
  let query = supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data } = await query
  return data || []
}
