export const revalidate = 0 // Don't cache - always fetch fresh data

import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'
import Link from 'next/link'
import { getPageContent, getGalleryImages } from '@/lib/data'
import GalleryGrid from './GalleryGrid'

export const metadata: Metadata = {
  title: "Photo Gallery | King's Family Lakes",
  description: "Explore the beauty of King's Family Lakes through our collection of photos featuring our lakes, hunting grounds, wildlife, and accommodations.",
}

export default async function GalleryPage() {
  const [pageContent, galleryImages] = await Promise.all([
    getPageContent('gallery'),
    getGalleryImages('main-gallery'),
  ])

  const heroTitle = pageContent?.hero_title || 'Photo Gallery'
  const heroSubtitle = pageContent?.hero_subtitle || "Explore the beauty of King's Family Lakes through our collection of photos."
  // Static hero - video URL can be set in page_content.hero_video_url
  const heroVideo = pageContent?.hero_video_url || null
  const heroImage = '/images/IMG_4633.webp'

  // Transform gallery images for the grid component
  const images = galleryImages.map((img) => ({
    src: img.image_url,
    alt: img.title || 'Gallery image',
    caption: img.title || '',
    rotation: img.rotation || 0,
  }))

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundVideo={heroVideo || undefined}
        backgroundImage={heroImage}
        size="small"
      />

      <GalleryGrid images={images} />

      {/* Activity Links */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-center text-bark-800 mb-8">
            Explore Our Activities
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/the-lakes" className="group text-center p-6 bg-pine-50 rounded-lg hover:bg-pine-100 transition-colors">
              <div className="text-4xl mb-3">🎣</div>
              <h3 className="font-bold text-bark-800 group-hover:text-pine-700">The Lakes</h3>
              <p className="text-sm text-bark-500 mt-1">Three private lakes</p>
            </Link>
            <Link href="/deer-hunting" className="group text-center p-6 bg-pine-50 rounded-lg hover:bg-pine-100 transition-colors">
              <div className="text-4xl mb-3">🦌</div>
              <h3 className="font-bold text-bark-800 group-hover:text-pine-700">Deer Hunting</h3>
              <p className="text-sm text-bark-500 mt-1">World-class hunting</p>
            </Link>
            <Link href="/turkey-hunting" className="group text-center p-6 bg-clay-50 rounded-lg hover:bg-clay-100 transition-colors">
              <div className="text-4xl mb-3">🦃</div>
              <h3 className="font-bold text-bark-800 group-hover:text-clay-700">Turkey Hunting</h3>
              <p className="text-sm text-bark-500 mt-1">Spring season</p>
            </Link>
            <Link href="/bass-fishing" className="group text-center p-6 bg-bark-100 rounded-lg hover:bg-bark-200 transition-colors">
              <div className="text-4xl mb-3">🐟</div>
              <h3 className="font-bold text-bark-800">Bass Fishing</h3>
              <p className="text-sm text-bark-500 mt-1">Trophy bass fishing</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-pine-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Experience It Yourself?</h2>
          <p className="text-xl text-pine-100 mb-8">
            Book your hunting or fishing adventure today.
          </p>
          <Link href="/contact" className="btn bg-white text-pine-700 hover:bg-bark-100">
            Contact Us
          </Link>
        </div>
      </section>

    </>
  )
}
