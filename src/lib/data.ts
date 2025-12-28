import { createClient } from '@/lib/supabase/server'
import type { SiteSettings, Activity, PageContent, GalleryImage } from '@/lib/types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('site_settings').select('*').single()
    if (error) {
      console.error('Error fetching site settings:', error)
      return null
    }
    return data
  } catch (e) {
    console.error('Failed to get site settings:', e)
    return null
  }
}

export async function getActivities(): Promise<Activity[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('display_order')
    if (error) {
      console.error('Error fetching activities:', error)
      return []
    }
    return data || []
  } catch (e) {
    console.error('Failed to get activities:', e)
    return []
  }
}

export async function getFeaturedActivities(): Promise<Activity[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('is_featured', true)
      .order('display_order')
    if (error) {
      console.error('Error fetching featured activities:', error)
      return []
    }
    return data || []
  } catch (e) {
    console.error('Failed to get featured activities:', e)
    return []
  }
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) {
      console.error('Error fetching activity:', error)
      return null
    }
    return data
  } catch (e) {
    console.error('Failed to get activity:', e)
    return null
  }
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_slug', slug)
      .single()
    if (error) {
      console.error('Error fetching page content:', error)
      return null
    }
    return data
  } catch (e) {
    console.error('Failed to get page content:', e)
    return null
  }
}

export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query
    if (error) {
      console.error('Error fetching gallery images:', error)
      return []
    }
    return data || []
  } catch (e) {
    console.error('Failed to get gallery images:', e)
    return []
  }
}
