'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
  caption: string
  rotation?: number
}

interface GalleryGridProps {
  images: GalleryImage[]
}

// Assign varying aspect ratios for masonry effect
function getAspectClass(index: number): string {
  const patterns = [
    'aspect-square',
    'aspect-[4/5]',
    'aspect-square',
    'aspect-[5/4]',
    'aspect-[4/5]',
    'aspect-square',
    'aspect-[5/4]',
    'aspect-square',
  ]
  return patterns[index % patterns.length]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null

  const goNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0)
  }, [selectedIndex, images.length])

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1)
  }, [selectedIndex, images.length])

  const close = useCallback(() => setSelectedIndex(null), [])

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [selectedIndex, goNext, goPrev, close])

  if (images.length === 0) {
    return (
      <section className="section-padding bg-texture-light">
        <div className="container-custom text-center">
          <p className="text-gray-500">No images in gallery yet. Add images in the admin panel.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Masonry Gallery Grid */}
      <section className="section-padding bg-texture-light">
        <div className="container-custom">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                onClick={() => setSelectedIndex(index)}
                className="group relative w-full rounded-lg overflow-hidden bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-forest-500 break-inside-avoid block"
              >
                <div className={getAspectClass(index) + ' relative'}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    style={image.rotation ? { transform: `rotate(${image.rotation}deg) scale(1.1)` } : undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium drop-shadow-md">{image.caption}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-10 text-sm text-gray-400 tracking-wide uppercase">
            {images.length} photos
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            onClick={close}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-5 text-white/50 text-sm font-medium z-10">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
          >
            <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Next */}
          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10 p-2"
            onClick={(e) => { e.stopPropagation(); goNext() }}
          >
            <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-[90vw] max-w-5xl aspect-[4/3]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="90vw"
                style={selectedImage.rotation ? { transform: `rotate(${selectedImage.rotation}deg)` } : undefined}
              />
            </div>
            {selectedImage.caption && (
              <p className="text-white/80 text-center mt-4 text-base">{selectedImage.caption}</p>
            )}
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs hidden md:block">
            Use arrow keys to navigate &middot; Esc to close
          </div>
        </div>
      )}
    </>
  )
}
