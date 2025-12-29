'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
  rotation?: number
}

interface ScrollableGalleryProps {
  images: GalleryImage[]
  title?: string
}

export default function ScrollableGallery({ images, title }: ScrollableGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (images.length === 0) return null

  return (
    <>
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1/2"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 cursor-pointer group/item"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                  style={image.rotation ? { transform: `rotate(${image.rotation}deg)` } : undefined}
                />
                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors duration-300" />
              </div>
              {image.caption && (
                <p className="mt-2 text-sm text-gray-600 text-center">{image.caption}</p>
              )}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-x-1/2"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              style={selectedImage.rotation ? { transform: `rotate(${selectedImage.rotation}deg)` } : undefined}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {selectedImage.caption && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg bg-black/50 px-4 py-2 rounded-lg">
              {selectedImage.caption}
            </p>
          )}
        </div>
      )}
    </>
  )
}
