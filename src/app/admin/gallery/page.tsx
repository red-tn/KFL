'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { GalleryImage } from '@/lib/types'

type CategoryKey =
  | 'lakes' | 'deer-hunting' | 'turkey-hunting' | 'fishing'
  | 'main-gallery' | 'activity-cards'
  | 'hero-home' | 'hero-lakes' | 'hero-deer' | 'hero-turkey' | 'hero-fishing' | 'hero-gallery' | 'hero-directions' | 'hero-contact'
  | 'overview-deer' | 'overview-turkey' | 'overview-fishing'

// Gallery section types
type SectionType = 'hero' | 'overview' | 'gallery' | 'cards'

// Page gallery configurations
const PAGE_GALLERIES: {
  id: CategoryKey
  label: string
  description: string
  page: string
  type: SectionType
  singleImage?: boolean
}[] = [
  // Hero Images - one per page
  { id: 'hero-home', label: 'Home Hero', description: 'Hero background for Home page', page: '/', type: 'hero', singleImage: true },
  { id: 'hero-lakes', label: 'Lakes Hero', description: 'Hero background for The Lakes page', page: '/the-lakes', type: 'hero', singleImage: true },
  { id: 'hero-deer', label: 'Deer Hunting Hero', description: 'Hero background for Deer Hunting page', page: '/deer-hunting', type: 'hero', singleImage: true },
  { id: 'hero-turkey', label: 'Turkey Hunting Hero', description: 'Hero background for Turkey Hunting page', page: '/turkey-hunting', type: 'hero', singleImage: true },
  { id: 'hero-fishing', label: 'Bass Fishing Hero', description: 'Hero background for Bass Fishing page', page: '/bass-fishing', type: 'hero', singleImage: true },
  { id: 'hero-gallery', label: 'Gallery Hero', description: 'Hero background for Gallery page', page: '/gallery', type: 'hero', singleImage: true },
  { id: 'hero-directions', label: 'Directions Hero', description: 'Hero background for Directions page', page: '/directions', type: 'hero', singleImage: true },
  { id: 'hero-contact', label: 'Contact Hero', description: 'Hero background for Contact page', page: '/contact', type: 'hero', singleImage: true },

  // Page Overview Images - main content image on each activity page
  { id: 'overview-deer', label: 'Deer Page Image', description: 'Main content image on Deer Hunting page', page: '/deer-hunting', type: 'overview', singleImage: true },
  { id: 'overview-turkey', label: 'Turkey Page Image', description: 'Main content image on Turkey Hunting page', page: '/turkey-hunting', type: 'overview', singleImage: true },
  { id: 'overview-fishing', label: 'Fishing Page Image', description: 'Main content image on Bass Fishing page', page: '/bass-fishing', type: 'overview', singleImage: true },

  // Activity Cards on Home page
  { id: 'activity-cards', label: 'Activity Cards', description: 'Home page "Our Activities" section (4 cards)', page: '/', type: 'cards' },

  // Page Galleries
  { id: 'lakes', label: 'Lakes Gallery', description: 'Gallery section on The Lakes page', page: '/the-lakes', type: 'gallery' },
  { id: 'deer-hunting', label: 'Deer Gallery', description: 'Gallery section on Deer Hunting page', page: '/deer-hunting', type: 'gallery' },
  { id: 'turkey-hunting', label: 'Turkey Gallery', description: 'Gallery section on Turkey Hunting page', page: '/turkey-hunting', type: 'gallery' },
  { id: 'fishing', label: 'Fishing Gallery', description: 'Gallery section on Bass Fishing page', page: '/bass-fishing', type: 'gallery' },
  { id: 'main-gallery', label: 'Main Gallery', description: 'The main /gallery page', page: '/gallery', type: 'gallery' },
]

// Default images for seeding
const DEFAULT_IMAGES: Record<CategoryKey, { url: string; title: string }[]> = {
  // Hero Images
  'hero-home': [{ url: '/images/IMG_4617.webp', title: 'Home Hero' }],
  'hero-lakes': [{ url: '/images/IMG_4628.webp', title: 'Lakes Hero' }],
  'hero-deer': [{ url: '/images/IMG_2289.webp', title: 'Deer Hunting Hero' }],
  'hero-turkey': [{ url: '/images/IMG_2294.webp', title: 'Turkey Hunting Hero' }],
  'hero-fishing': [{ url: '/images/IMG_4635.webp', title: 'Bass Fishing Hero' }],
  'hero-gallery': [{ url: '/images/IMG_4633.webp', title: 'Gallery Hero' }],
  'hero-directions': [{ url: '/images/1.webp', title: 'Directions Hero' }],
  'hero-contact': [{ url: '/images/IMG_4596.webp', title: 'Contact Hero' }],

  // Page Overview Images
  'overview-deer': [{ url: '/images/IMG_2290.webp', title: 'Deer Hunting Overview' }],
  'overview-turkey': [{ url: '/images/IMG_2292.webp', title: 'Turkey Hunting Overview' }],
  'overview-fishing': [{ url: '/images/IMG_4621.webp', title: 'Bass Fishing Overview' }],

  // Activity Cards
  'activity-cards': [
    { url: '/images/IMG_4617.webp', title: 'The Lakes' },
    { url: '/images/IMG_2289.webp', title: 'Deer Hunting' },
    { url: '/images/IMG_2294.webp', title: 'Turkey Hunting' },
    { url: '/images/IMG_4635.webp', title: 'Bass Fishing' },
  ],

  // Page Galleries
  'lakes': [
    { url: '/images/IMG_4617.webp', title: 'Lake Scott' },
    { url: '/images/IMG_4628.webp', title: 'Lake Shannon' },
    { url: '/images/IMG_4633.webp', title: 'Lake Patrick' },
    { url: '/images/IMG_4635.webp', title: 'Fishing Dock' },
    { url: '/images/IMG_4621.webp', title: 'Lake View' },
    { url: '/images/IMG_4622.webp', title: 'Peaceful Waters' },
    { url: '/images/IMG_4623.webp', title: 'Lake Waters' },
    { url: '/images/IMG_4624.webp', title: 'Scenic Lake' },
    { url: '/images/IMG_4626.webp', title: 'Tranquil Waters' },
    { url: '/images/IMG_4637.webp', title: 'Lake Shore' },
  ],
  'deer-hunting': [
    { url: '/images/IMG_2289.webp', title: 'Hunting Grounds' },
    { url: '/images/IMG_2290.webp', title: 'Property View' },
    { url: '/images/IMG_2292.webp', title: 'Hunting Area' },
    { url: '/images/IMG_2294.webp', title: 'Hunting Blind' },
    { url: '/images/IMG_2296.webp', title: 'Manicured Pasture' },
    { url: '/images/IMG_3284.webp', title: 'Hunting Grounds' },
    { url: '/images/IMG_3285.webp', title: 'Property' },
  ],
  'turkey-hunting': [
    { url: '/images/IMG_2294.webp', title: 'Turkey Hunting Grounds' },
    { url: '/images/IMG_2289.webp', title: 'Hunting Property' },
    { url: '/images/IMG_2290.webp', title: 'Property View' },
    { url: '/images/IMG_2292.webp', title: 'Hunting Grounds' },
    { url: '/images/IMG_2296.webp', title: 'Manicured Pasture' },
    { url: '/images/IMG_3291.webp', title: 'Hunting Area' },
  ],
  'fishing': [
    { url: '/images/IMG_4635.webp', title: 'Bass Fishing' },
    { url: '/images/IMG_4617.webp', title: 'Lake Scott' },
    { url: '/images/IMG_4628.webp', title: 'Lake Shannon' },
    { url: '/images/IMG_4633.webp', title: 'Lake Patrick' },
    { url: '/images/IMG_4621.webp', title: 'Lake View' },
    { url: '/images/IMG_4622.webp', title: 'Fishing Dock' },
    { url: '/images/IMG_4623.webp', title: 'Lake Waters' },
    { url: '/images/IMG_4624.webp', title: 'Scenic Lake' },
    { url: '/images/IMG_4626.webp', title: 'Peaceful Waters' },
    { url: '/images/IMG_4627.webp', title: 'Prime Fishing Spot' },
  ],
  'main-gallery': [
    { url: '/images/IMG_4617.webp', title: 'Lake Scott' },
    { url: '/images/IMG_4628.webp', title: 'Lake Shannon' },
    { url: '/images/IMG_4633.webp', title: 'Lake Patrick' },
    { url: '/images/IMG_4635.webp', title: 'Fishing Dock' },
    { url: '/images/IMG_2289.webp', title: 'Hunting Grounds' },
    { url: '/images/IMG_2290.webp', title: 'Property' },
    { url: '/images/IMG_2294.webp', title: 'Turkey Hunting' },
    { url: '/images/1.webp', title: 'Property' },
    { url: '/images/3.webp', title: 'View' },
    { url: '/images/IMG_0001-1.webp', title: 'Grounds' },
    { url: '/images/IMG_4596.webp', title: 'Overview' },
    { url: '/images/IMG_4597.webp', title: 'Grounds' },
    { url: '/images/IMG_1285-1.webp', title: 'Interior' },
    { url: '/images/IMG_1286.webp', title: 'Lodging' },
    { url: '/images/IMG_1288.webp', title: 'Camp House' },
    { url: '/images/IMG_1302.webp', title: 'Camp House' },
    { url: '/images/IMG_6938.webp', title: 'Wildlife' },
    { url: '/images/IMG_6941.webp', title: 'Deer' },
  ],
}

function ImageCard({
  image,
  onDelete,
  onUpdate,
  onRotate,
  isDragging,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  image: GalleryImage
  onDelete: (id: string) => void
  onUpdate: (id: string, data: Partial<GalleryImage>) => void
  onRotate: (id: string, direction: 'left' | 'right') => void
  isDragging: boolean
  onDragStart: () => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(image.title || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    onUpdate(image.id, { title })
    setIsEditing(false)
  }

  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    onUpdate(image.id, { image_url: previewUrl })

    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', image.category || 'lakes')

    try {
      const response = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data.url) {
        onUpdate(image.id, { image_url: data.url })
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const rotation = image.rotation || 0

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`bg-white rounded-lg shadow-sm border-2 overflow-hidden transition-all ${
        isDragging ? 'border-forest-500 opacity-50' : 'border-gray-200 hover:border-forest-400'
      }`}
    >
      <div className="relative h-40 bg-gray-100 group overflow-hidden">
        <img
          src={image.image_url}
          alt={image.title || 'Gallery image'}
          className="w-full h-full object-cover transition-transform"
          style={{ transform: `rotate(${rotation}deg)` }}
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
          {/* Rotate Left */}
          <button
            onClick={() => onRotate(image.id, 'left')}
            className="bg-white rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            title="Rotate left"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </button>
          {/* Rotate Right */}
          <button
            onClick={() => onRotate(image.id, 'right')}
            className="bg-white rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            title="Rotate right"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
            </svg>
          </button>
          {/* Replace */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            title="Replace image"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
          {/* Delete */}
          <button
            onClick={() => onDelete(image.id)}
            className="bg-red-500 rounded-lg p-2 text-white hover:bg-red-600"
            title="Delete image"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>

        <div className="absolute top-2 left-2 bg-white/80 rounded px-1 py-0.5 text-xs text-gray-500 cursor-move">
          #{image.display_order}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleReplace}
          className="hidden"
        />
      </div>

      <div className="p-3">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border rounded"
              placeholder="Image title"
            />
            <button
              onClick={handleSave}
              className="px-2 py-1 bg-forest-600 text-white text-sm rounded hover:bg-forest-700"
            >
              Save
            </button>
          </div>
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-gray-900 cursor-pointer hover:text-forest-700"
          >
            {image.title || 'Untitled'}
            <span className="text-gray-400 text-xs ml-1">(click to edit)</span>
          </div>
        )}
      </div>
    </div>
  )
}

function GallerySection({
  category,
  label,
  description,
  page,
  images,
  onAdd,
  onDelete,
  onUpdate,
  onRotate,
  onReorder,
  onSeedDefaults,
  isSeeding,
  singleImage = false,
}: {
  category: CategoryKey
  label: string
  description: string
  page: string
  images: GalleryImage[]
  onAdd: (category: CategoryKey) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, data: Partial<GalleryImage>) => void
  onRotate: (id: string, direction: 'left' | 'right') => void
  onReorder: (images: GalleryImage[]) => void
  onSeedDefaults: (category: CategoryKey) => void
  isSeeding: boolean
  singleImage?: boolean
}) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return

    const newImages = [...images]
    const [draggedImage] = newImages.splice(draggedIndex, 1)
    newImages.splice(targetIndex, 0, draggedImage)

    const reorderedImages = newImages.map((img, idx) => ({
      ...img,
      display_order: idx + 1,
    }))

    onReorder(reorderedImages)
    setDraggedIndex(null)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div
        className="flex justify-between items-center p-4 bg-gray-50 border-b cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <button className="text-gray-500">
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{label}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <span className="text-sm text-gray-400">{images.length} images</span>
          <a
            href={page}
            target="_blank"
            className="text-sm text-forest-600 hover:text-forest-700 flex items-center gap-1"
          >
            View page
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          {images.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">No image set</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => onAdd(category)}
                  className="bg-forest-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  {singleImage ? 'Set Image' : 'Add Image'}
                </button>
                <button
                  onClick={() => onSeedDefaults(category)}
                  disabled={isSeeding}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSeeding ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Load Default
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : singleImage ? (
            /* Single image mode - show larger preview */
            <div className="max-w-md">
              <ImageCard
                image={images[0]}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onRotate={onRotate}
                isDragging={false}
                onDragStart={() => {}}
                onDragOver={() => {}}
                onDrop={() => {}}
              />
            </div>
          ) : (
            <div className="relative">
              {images.length > 4 && (
                <>
                  <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}

              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2 px-4 -mx-4"
                style={{ scrollbarWidth: 'thin' }}
              >
                {images.map((image, index) => (
                  <div key={image.id} className="flex-shrink-0 w-56">
                    <ImageCard
                      image={image}
                      onDelete={onDelete}
                      onUpdate={onUpdate}
                      onRotate={onRotate}
                      isDragging={draggedIndex === index}
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                    />
                  </div>
                ))}

                <div className="flex-shrink-0 w-56">
                  <button
                    onClick={() => onAdd(category)}
                    className="w-full h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg hover:border-forest-500 hover:bg-forest-50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-forest-600"
                  >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="text-sm font-medium">Add Image</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all')
  const [activeType, setActiveType] = useState<SectionType | 'all'>('all')
  const [seedingCategory, setSeedingCategory] = useState<CategoryKey | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadCategory, setUploadCategory] = useState<CategoryKey>('lakes')
  const supabase = createClient()

  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/gallery')
      const data = await response.json()
      if (data.images) {
        setImages(data.images)
      }
    } catch (error) {
      console.error('Failed to fetch images:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  // Group images by category
  const imagesByCategory = images.reduce((acc, img) => {
    const cat = (img.category || 'lakes') as CategoryKey
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(img)
    return acc
  }, {} as Record<string, GalleryImage[]>)

  // Sort each category by display_order
  Object.keys(imagesByCategory).forEach(cat => {
    imagesByCategory[cat].sort((a, b) => a.display_order - b.display_order)
  })

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 4000)
  }

  const handleAdd = (category: CategoryKey) => {
    setUploadCategory(category)
    fileInputRef.current?.click()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const totalFiles = files.length
    showMessage(`Uploading ${totalFiles} image${totalFiles > 1 ? 's' : ''}...`)

    let successCount = 0
    let errorCount = 0

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', uploadCategory)
      formData.append('title', file.name.split('.')[0])

      try {
        const response = await fetch('/api/admin/gallery/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()

        if (data.error) {
          console.error('Upload error:', data.error)
          errorCount++
        } else if (data.image) {
          setImages(prev => [...prev, data.image])
          successCount++
        }
      } catch (error) {
        console.error('Failed to upload:', error)
        errorCount++
      }
    }

    if (errorCount > 0) {
      showMessage(`Uploaded ${successCount}/${totalFiles}. ${errorCount} failed.`, 'error')
    } else {
      showMessage(`${successCount} image${successCount > 1 ? 's' : ''} added!`)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return

    try {
      const response = await fetch(`/api/admin/gallery?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()

      if (data.error) {
        showMessage(`Error: ${data.error}`, 'error')
      } else {
        setImages(prev => prev.filter(img => img.id !== id))
        showMessage('Image deleted!')
      }
    } catch (error) {
      showMessage('Failed to delete image', 'error')
    }
  }

  const handleUpdate = async (id: string, updateData: Partial<GalleryImage>) => {
    setImages(prev => prev.map(img =>
      img.id === id ? { ...img, ...updateData } : img
    ))

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updateData }),
      })
      const data = await response.json()

      if (data.error) {
        showMessage(`Error: ${data.error}`, 'error')
        fetchImages()
      }
    } catch (error) {
      showMessage('Failed to update', 'error')
      fetchImages()
    }
  }

  const handleReorder = async (reorderedImages: GalleryImage[]) => {
    setImages(prev => {
      const otherImages = prev.filter(img => !reorderedImages.find(r => r.id === img.id))
      return [...otherImages, ...reorderedImages]
    })

    try {
      const response = await fetch('/api/admin/gallery/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: reorderedImages.map(img => ({
            id: img.id,
            display_order: img.display_order,
          })),
        }),
      })
      const data = await response.json()

      if (data.error) {
        showMessage(`Error: ${data.error}`, 'error')
        fetchImages()
      }
    } catch (error) {
      showMessage('Failed to reorder', 'error')
      fetchImages()
    }
  }

  const handleRotate = async (id: string, direction: 'left' | 'right') => {
    const image = images.find(img => img.id === id)
    if (!image) return

    const currentRotation = image.rotation || 0
    const newRotation = direction === 'right'
      ? (currentRotation + 90) % 360
      : (currentRotation - 90 + 360) % 360

    // Optimistic update
    setImages(prev => prev.map(img =>
      img.id === id ? { ...img, rotation: newRotation } : img
    ))

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, rotation: newRotation }),
      })
      const data = await response.json()

      if (data.error) {
        showMessage(`Error: ${data.error}`, 'error')
        fetchImages()
      }
    } catch (error) {
      showMessage('Failed to rotate', 'error')
      fetchImages()
    }
  }

  const handleSeedDefaults = async (category: CategoryKey) => {
    const defaults = DEFAULT_IMAGES[category]
    if (!defaults) return

    setSeedingCategory(category)
    showMessage(`Loading ${defaults.length} images...`)

    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < defaults.length; i++) {
      const img = defaults[i]
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .insert({
            title: img.title,
            image_url: img.url,
            category: category,
            display_order: i + 1,
            is_featured: false,
            rotation: 0,
          })
          .select()
          .single()

        if (error) {
          console.error('Insert error:', error)
          errorCount++
        } else if (data) {
          setImages(prev => [...prev, data as GalleryImage])
          successCount++
        }
      } catch (e) {
        console.error('Error adding image:', e)
        errorCount++
      }
    }

    setSeedingCategory(null)

    if (errorCount > 0) {
      showMessage(`Added ${successCount} images, ${errorCount} failed. Run the SQL command to update your database constraint.`, 'error')
    } else {
      showMessage(`Added ${successCount} images!`)
    }

    fetchImages()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forest-600"></div>
      </div>
    )
  }

  // Filter galleries by type first, then by specific category if selected
  const galleriesByType = activeType === 'all'
    ? PAGE_GALLERIES
    : PAGE_GALLERIES.filter(g => g.type === activeType)

  const galleriestoShow = activeCategory === 'all'
    ? galleriesByType
    : galleriesByType.filter(g => g.id === activeCategory)

  const sectionTypes: { type: SectionType | 'all'; label: string; icon: string }[] = [
    { type: 'all', label: 'All', icon: '📋' },
    { type: 'hero', label: 'Hero Images', icon: '🖼️' },
    { type: 'overview', label: 'Page Images', icon: '📄' },
    { type: 'cards', label: 'Activity Cards', icon: '🃏' },
    { type: 'gallery', label: 'Galleries', icon: '🖼️' },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Image Manager</h1>
          <p className="text-gray-500 mt-1">Manage all site images - hero backgrounds, page images, activity cards, and galleries</p>
        </div>
        <div className="text-sm text-gray-500">
          Total: {images.length} images
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${messageType === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Section Type Tabs */}
      <div className="flex gap-1 mb-4 bg-white p-2 rounded-xl shadow-sm">
        {sectionTypes.map(st => (
          <button
            key={st.type}
            onClick={() => { setActiveType(st.type); setActiveCategory('all'); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeType === st.type
                ? 'bg-forest-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{st.icon}</span>
            {st.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeType === st.type ? 'bg-forest-700' : 'bg-gray-200'
            }`}>
              {st.type === 'all'
                ? PAGE_GALLERIES.length
                : PAGE_GALLERIES.filter(g => g.type === st.type).length}
            </span>
          </button>
        ))}
      </div>

      {/* Category Filter - only show if viewing galleries type */}
      {(activeType === 'gallery' || activeType === 'all') && galleriesByType.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-4 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-earth-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {galleriesByType.map(gallery => (
            <button
              key={gallery.id}
              onClick={() => setActiveCategory(gallery.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeCategory === gallery.id
                  ? 'bg-earth-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {gallery.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeCategory === gallery.id ? 'bg-earth-700' : 'bg-gray-200'
              }`}>
                {imagesByCategory[gallery.id]?.length || 0}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Gallery Sections */}
      <div className="space-y-6">
        {galleriestoShow.map(gallery => (
          <GallerySection
            key={gallery.id}
            category={gallery.id}
            label={gallery.label}
            description={gallery.description}
            page={gallery.page}
            images={imagesByCategory[gallery.id] || []}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onRotate={handleRotate}
            onReorder={handleReorder}
            onSeedDefaults={handleSeedDefaults}
            isSeeding={seedingCategory === gallery.id}
            singleImage={gallery.singleImage}
          />
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-bold text-gray-900 mb-2">How to use</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li><strong>Add:</strong> Click the + button to upload images (select multiple at once)</li>
          <li><strong>Replace:</strong> Hover over an image and click the edit icon</li>
          <li><strong>Rotate:</strong> Hover and use rotate left/right buttons</li>
          <li><strong>Delete:</strong> Hover and click the red delete button</li>
          <li><strong>Reorder:</strong> Drag and drop images</li>
          <li><strong>Edit title:</strong> Click on the title to edit</li>
          <li><strong>Load defaults:</strong> Click "Load Default" to populate empty sections</li>
        </ul>
      </div>
    </div>
  )
}
