import config from '@payload-config'
import { getPayload } from 'payload'

// Get a Payload instance for server-side data fetching
export const getPayloadClient = async () => {
  return await getPayload({ config })
}

// Fetch site settings
export async function getSiteSettings() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })
  return settings
}

// Fetch a page by slug
export async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 1,
  })
  return result.docs[0] || null
}

// Fetch activities by type
export async function getActivitiesByType(type: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'activities',
    where: {
      type: {
        equals: type,
      },
    },
    sort: 'order',
  })
  return result.docs
}

// Fetch featured activities
export async function getFeaturedActivities() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'activities',
    where: {
      featured: {
        equals: true,
      },
    },
    sort: 'order',
  })
  return result.docs
}

// Fetch gallery by category
export async function getGalleryByCategory(category: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'gallery',
    where: {
      category: {
        equals: category,
      },
    },
  })
  return result.docs
}

// Fetch galleries for a specific page
export async function getGalleriesForPage(pageSlug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'gallery',
    where: {
      showOnPage: {
        contains: pageSlug,
      },
    },
  })
  return result.docs
}

// Fetch all media by category
export async function getMediaByCategory(category: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'media',
    where: {
      category: {
        equals: category,
      },
    },
    limit: 100,
  })
  return result.docs
}
