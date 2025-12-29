export interface SiteSettings {
  id: string
  site_name: string
  tagline: string
  phone: string
  email: string
  address_city: string
  address_state: string
  address_directions: string
  facebook_url: string
  hunting_daily_rate: number
  lodging_nightly_rate: number
  adsense_client_id: string | null
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  name: string
  slug: string
  type: 'lake' | 'deer-hunting' | 'turkey-hunting' | 'bass-fishing'
  short_description: string | null
  full_description: string | null
  hero_image_url: string | null
  daily_rate: number | null
  lodging_rate: number | null
  season_info: string | null
  features: string[]
  regulations: { title: string; description: string }[]
  is_featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export type GalleryCategory =
  | 'lakes'
  | 'deer-hunting'
  | 'turkey-hunting'
  | 'fishing'
  | 'property'
  | 'lodging'
  | 'wildlife'
  | 'main-gallery'
  | 'hero-home'
  | 'hero-lakes'
  | 'hero-deer'
  | 'hero-turkey'
  | 'hero-fishing'
  | 'hero-gallery'
  | 'hero-directions'
  | 'hero-contact'
  | 'overview-deer'
  | 'overview-turkey'
  | 'overview-fishing'
  | 'card-lakes'
  | 'card-deer'
  | 'card-turkey'
  | 'card-fishing'

export interface GalleryImage {
  id: string
  title: string | null
  image_url: string
  category: GalleryCategory | null
  caption: string | null
  display_order: number
  is_featured: boolean
  rotation: number
  created_at: string
}

export interface PageContent {
  id: string
  page_slug: string
  hero_title: string | null
  hero_subtitle: string | null
  hero_image_url: string | null
  content: Record<string, unknown>
  seo_title: string | null
  seo_description: string | null
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  interest: string | null
  message: string
  is_read: boolean
  created_at: string
}
