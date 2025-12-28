'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/ui/Hero'
import AdBanner from '@/components/ads/AdBanner'

// All gallery images organized by category
const galleryImages = {
  lakes: [
    { src: '/images/IMG_4617.webp', alt: 'Lake Scott', caption: 'Lake Scott - Our largest lake at 35 acres' },
    { src: '/images/IMG_4621.webp', alt: 'Lake view', caption: 'Peaceful lake waters' },
    { src: '/images/IMG_4622.webp', alt: 'Lake scenery', caption: 'Beautiful lake scenery' },
    { src: '/images/IMG_4623.webp', alt: 'Lake Shannon', caption: 'Lake Shannon' },
    { src: '/images/IMG_4624.webp', alt: 'Lake view', caption: 'Scenic lake view' },
    { src: '/images/IMG_4626.webp', alt: 'Lake waters', caption: 'Crystal clear waters' },
    { src: '/images/IMG_4627.webp', alt: 'Lake dock', caption: 'Fishing dock' },
    { src: '/images/IMG_4628.webp', alt: 'Lake Shannon', caption: 'Lake Shannon from the hills' },
    { src: '/images/IMG_4633.webp', alt: 'Lake Patrick', caption: 'Lake Patrick' },
    { src: '/images/IMG_4635.webp', alt: 'Fishing spot', caption: 'Prime fishing spot' },
    { src: '/images/IMG_4637.webp', alt: 'Lake sunset', caption: 'Sunset on the lake' },
    { src: '/images/IMG_4638.webp', alt: 'Lake evening', caption: 'Evening on the water' },
  ],
  hunting: [
    { src: '/images/IMG_2289.webp', alt: 'Hunting grounds', caption: 'Hunting grounds' },
    { src: '/images/IMG_2290.webp', alt: 'Property view', caption: 'Property view' },
    { src: '/images/IMG_2292.webp', alt: 'Hunting area', caption: 'Prime hunting area' },
    { src: '/images/IMG_2294.webp', alt: 'Hunting property', caption: 'Hunting property' },
    { src: '/images/IMG_2296.webp', alt: 'Grounds', caption: 'Beautiful grounds' },
    { src: '/images/IMG_3284.webp', alt: 'Hunting scene', caption: 'Hunting scene' },
    { src: '/images/IMG_3285.webp', alt: 'Wildlife', caption: 'Wildlife on property' },
    { src: '/images/IMG_3291.webp', alt: 'Property', caption: 'Property view' },
  ],
  property: [
    { src: '/images/1.webp', alt: 'Property', caption: 'Kings Family Lakes property' },
    { src: '/images/3.webp', alt: 'Property view', caption: 'Property view' },
    { src: '/images/IMG_0001-1.webp', alt: 'Grounds', caption: 'Beautiful grounds' },
    { src: '/images/IMG_0002.webp', alt: 'Property', caption: 'Property scenery' },
    { src: '/images/IMG_0003.webp', alt: 'View', caption: 'Scenic view' },
    { src: '/images/IMG_4596.webp', alt: 'Property', caption: 'Property overview' },
    { src: '/images/IMG_4597.webp', alt: 'Grounds', caption: 'Manicured grounds' },
    { src: '/images/IMG_4600.webp', alt: 'Property', caption: 'Property view' },
    { src: '/images/IMG_4602.webp', alt: 'Scenery', caption: 'Beautiful scenery' },
    { src: '/images/IMG_4603.webp', alt: 'Property', caption: 'Property' },
    { src: '/images/IMG_4610.webp', alt: 'View', caption: 'Scenic view' },
    { src: '/images/IMG_4611.webp', alt: 'Property', caption: 'Property grounds' },
    { src: '/images/photo1.webp', alt: 'Photo', caption: 'Kings Family Lakes' },
  ],
  lodging: [
    { src: '/images/IMG_1285-1.webp', alt: 'Camp house', caption: 'Camp house interior' },
    { src: '/images/IMG_1286.webp', alt: 'Lodging', caption: 'Comfortable lodging' },
    { src: '/images/IMG_1288.webp', alt: 'Interior', caption: 'Interior view' },
    { src: '/images/IMG_1289.webp', alt: 'Amenities', caption: 'Modern amenities' },
    { src: '/images/IMG_1302.webp', alt: 'Camp house', caption: 'Camp house' },
    { src: '/images/IMG_1306.webp', alt: 'Lodging', caption: 'Lodging facilities' },
    { src: '/images/IMG_1310.webp', alt: 'Interior', caption: 'Comfortable interior' },
  ],
  wildlife: [
    { src: '/images/IMG_6938.webp', alt: 'Wildlife', caption: 'Wildlife on property' },
    { src: '/images/IMG_6941.webp', alt: 'Deer', caption: 'White tail deer' },
    { src: '/images/UNADJUSTEDNONRAW_thumb_19e3.webp', alt: 'Wildlife', caption: 'Local wildlife' },
    { src: '/images/UNADJUSTEDNONRAW_thumb_19e4.webp', alt: 'Nature', caption: 'Nature at its finest' },
    { src: '/images/UNADJUSTEDNONRAW_thumb_19e7.webp', alt: 'Wildlife', caption: 'Wildlife scene' },
    { src: '/images/UNADJUSTEDNONRAW_thumb_19e8.webp', alt: 'Animals', caption: 'Animals on property' },
    { src: '/images/UNADJUSTEDNONRAW_thumb_19e9.webp', alt: 'Wildlife', caption: 'Wildlife' },
    { src: '/images/UNADJUSTEDNONRAW_thumb_19ea.webp', alt: 'Nature', caption: 'Natural beauty' },
  ],
}

const categories = [
  { id: 'all', name: 'All Photos' },
  { id: 'lakes', name: 'The Lakes' },
  { id: 'hunting', name: 'Hunting' },
  { id: 'property', name: 'Property' },
  { id: 'lodging', name: 'Lodging' },
  { id: 'wildlife', name: 'Wildlife' },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; caption: string } | null>(null)

  // Get images based on selected category
  const getImages = () => {
    if (selectedCategory === 'all') {
      return Object.values(galleryImages).flat()
    }
    return galleryImages[selectedCategory as keyof typeof galleryImages] || []
  }

  const images = getImages()

  return (
    <>
      <Hero
        title="Photo Gallery"
        subtitle="Explore the beauty of King's Family Lakes through our collection of photos featuring our lakes, hunting grounds, wildlife, and accommodations."
        backgroundImage="/images/IMG_4617.webp"
        size="small"
      />

      <AdBanner slot="gallery-top" position="top" />

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-forest-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{image.caption}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-8 text-gray-500">
            Showing {images.length} photos
          </div>
        </div>
      </section>

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
              <p className="text-sm text-gray-600 mt-1">Fall & spring seasons</p>
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = images.findIndex(img => img.src === selectedImage.src)
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
              setSelectedImage(images[prevIndex])
            }}
          >
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = images.findIndex(img => img.src === selectedImage.src)
              const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
              setSelectedImage(images[nextIndex])
            }}
          >
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-[90vw] max-w-5xl aspect-[4/3]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            {selectedImage.caption && (
              <p className="text-white text-center mt-4 text-lg">{selectedImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
