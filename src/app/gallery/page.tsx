export const revalidate = 0 // Don't cache - always fetch fresh data

import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'
import AdBanner from '@/components/ads/AdBanner'
import Link from 'next/link'
import { getHeroMedia, getPageContent, getGalleryImages } from '@/lib/data'
import GalleryGrid from './GalleryGrid'

export const metadata: Metadata = {
  title: "Photo Gallery | King's Family Lakes",
  description: "Explore the beauty of King's Family Lakes through our collection of photos featuring our lakes, hunting grounds, wildlife, and accommodations.",
}

export default async function GalleryPage() {
  const [heroMedia, pageContent, galleryImages] = await Promise.all([
    getHeroMedia('gallery'),
    getPageContent('gallery'),
    getGalleryImages('main-gallery'),
  ])

  const heroTitle = pageContent?.hero_title || 'Photo Gallery'
  const heroSubtitle = pageContent?.hero_subtitle || "Explore the beauty of King's Family Lakes through our collection of photos."
  const heroVideo = heroMedia.video || null
  const heroImage = heroMedia.images[0]?.image_url || null

  // Transform gallery images for the grid component
  const images = galleryImages.map((img) => ({
    src: img.image_url,
    alt: img.title || 'Gallery image',
    caption: img.title || '',
  }))

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundVideo={heroVideo || undefined}
        backgroundImage={heroImage || undefined}
        size="small"
      />

      <AdBanner slot="gallery-top" position="top" />

      <GalleryGrid images={images} />

      <AdBanner slot="gallery-middle" position="middle" />

      {/* Activity Links */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Explore Our Activities
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/the-lakes" className="group text-center p-6 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">
              <div className="text-4xl mb-3">🎣</div>
              <h3 className="font-bold text-gray-900 group-hover:text-primary-700">The Lakes</h3>
              <p className="text-sm text-gray-600 mt-1">Three private lakes</p>
            </Link>
            <Link href="/deer-hunting" className="group text-center p-6 bg-forest-50 rounded-xl hover:bg-forest-100 transition-colors">
              <div className="text-4xl mb-3">🦌</div>
              <h3 className="font-bold text-gray-900 group-hover:text-forest-700">Deer Hunting</h3>
              <p className="text-sm text-gray-600 mt-1">World-class hunting</p>
            </Link>
            <Link href="/turkey-hunting" className="group text-center p-6 bg-earth-50 rounded-xl hover:bg-earth-100 transition-colors">
              <div className="text-4xl mb-3">🦃</div>
              <h3 className="font-bold text-gray-900 group-hover:text-earth-700">Turkey Hunting</h3>
              <p className="text-sm text-gray-600 mt-1">Spring season</p>
            </Link>
            <Link href="/bass-fishing" className="group text-center p-6 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <div className="text-4xl mb-3">🐟</div>
              <h3 className="font-bold text-gray-900">Bass Fishing</h3>
              <p className="text-sm text-gray-600 mt-1">Trophy bass fishing</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience It Yourself?</h2>
          <p className="text-xl text-forest-100 mb-8">
            Book your hunting or fishing adventure today.
          </p>
          <Link href="/contact" className="btn bg-white text-forest-700 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </section>

      <AdBanner slot="gallery-bottom" position="bottom" />
    </>
  )
}
