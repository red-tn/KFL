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

    // Debug logging
    if (category) {
      console.log(`getGalleryImages(${category}):`, data?.length || 0, 'images')
    }

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

// Get a single image by category (for hero/overview images)
export async function getSingleImage(category: string): Promise<GalleryImage | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('category', category)
      .order('display_order', { ascending: true })
      .limit(1)
      .single()

    if (error) {
      // Not an error if no image found
      return null
    }
    return data
  } catch (e) {
    return null
  }
}

// Get hero image for a page (returns first/primary image)
export async function getHeroImage(page: string): Promise<string | null> {
  const categoryMap: Record<string, string> = {
    'home': 'hero-home',
    'the-lakes': 'hero-lakes',
    'deer-hunting': 'hero-deer',
    'turkey-hunting': 'hero-turkey',
    'bass-fishing': 'hero-fishing',
    'gallery': 'hero-gallery',
    'directions': 'hero-directions',
    'contact': 'hero-contact',
  }

  const category = categoryMap[page]
  if (!category) return null

  const image = await getSingleImage(category)
  return image?.image_url || null
}

// Get all hero images for a page (for slideshows or alternates)
export async function getHeroImages(page: string): Promise<GalleryImage[]> {
  const categoryMap: Record<string, string> = {
    'home': 'hero-home',
    'the-lakes': 'hero-lakes',
    'deer-hunting': 'hero-deer',
    'turkey-hunting': 'hero-turkey',
    'bass-fishing': 'hero-fishing',
    'gallery': 'hero-gallery',
    'directions': 'hero-directions',
    'contact': 'hero-contact',
  }

  const category = categoryMap[page]
  if (!category) return []

  return await getGalleryImages(category)
}

// Get hero media (video URL from page_content, images from gallery)
export async function getHeroMedia(page: string): Promise<{ video: string | null; images: GalleryImage[] }> {
  const [pageContent, images] = await Promise.all([
    getPageContent(page),
    getHeroImages(page),
  ])

  return {
    video: pageContent?.hero_video_url || null,
    images,
  }
}

// Get overview/page image
export async function getOverviewImage(page: string): Promise<string | null> {
  const categoryMap: Record<string, string> = {
    'deer-hunting': 'overview-deer',
    'turkey-hunting': 'overview-turkey',
    'bass-fishing': 'overview-fishing',
  }

  const category = categoryMap[page]
  if (!category) return null

  const image = await getSingleImage(category)
  return image?.image_url || null
}

// Get activity card images for home page - each card has its own category
export async function getActivityCardImages(): Promise<Record<string, string>> {
  const [lakesImg, deerImg, turkeyImg, fishingImg] = await Promise.all([
    getSingleImage('card-lakes'),
    getSingleImage('card-deer'),
    getSingleImage('card-turkey'),
    getSingleImage('card-fishing'),
  ])

  const result: Record<string, string> = {}
  if (lakesImg) result['the-lakes'] = lakesImg.image_url
  if (deerImg) result['deer-hunting'] = deerImg.image_url
  if (turkeyImg) result['turkey-hunting'] = turkeyImg.image_url
  if (fishingImg) result['bass-fishing'] = fishingImg.image_url

  return result
}
