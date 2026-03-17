'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
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
          <svg className="w-5 h-5 text-bark-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
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
              className="flex-shrink-0 w-80 cursor-pointer group/item"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover/item:scale-105 transition-transform duration-500"
                  style={image.rotation ? { transform: `rotate(${image.rotation}deg) scale(1.1)` } : undefined}
                />
                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors duration-300" />
              </div>
              {image.caption && (
                <p className="mt-2 text-sm text-bark-500 text-center">{image.caption}</p>
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
          <svg className="w-5 h-5 text-bark-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Lightbox */}
      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            onClick={close}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute top-5 left-5 text-white/50 text-sm z-10">
            {selectedIndex + 1} / {images.length}
          </div>

          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10 p-2"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10 p-2"
            onClick={(e) => { e.stopPropagation(); goNext() }}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="relative max-w-5xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              style={selectedImage.rotation ? { transform: `rotate(${selectedImage.rotation}deg)` } : undefined}
            />
          </div>
          {selectedImage.caption && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-base bg-black/50 px-4 py-2 rounded-lg">
              {selectedImage.caption}
            </p>
          )}
        </div>
      )}
    </>
  )
}
