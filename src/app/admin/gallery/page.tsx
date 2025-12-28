'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

// All site images organized by location
const siteImages = {
  heroes: [
    { id: 'hero-home', label: 'Home Page', location: 'Hero Background', path: '/images/lake-overview.mp4', type: 'video', page: '/' },
    { id: 'hero-lakes', label: 'The Lakes', location: 'Hero Background', path: '/images/IMG_4617.webp', type: 'image', page: '/the-lakes' },
    { id: 'hero-deer', label: 'Deer Hunting', location: 'Hero Background', path: '/images/IMG_2289.webp', type: 'image', page: '/deer-hunting' },
    { id: 'hero-turkey', label: 'Turkey Hunting', location: 'Hero Background', path: '/images/IMG_2294.webp', type: 'image', page: '/turkey-hunting' },
    { id: 'hero-fishing', label: 'Bass Fishing', location: 'Hero Background', path: '/images/IMG_4635.webp', type: 'image', page: '/bass-fishing' },
    { id: 'hero-directions', label: 'Directions', location: 'Hero Background', path: '/images/IMG_4628.webp', type: 'image', page: '/directions' },
    { id: 'hero-contact', label: 'Contact', location: 'Hero Background', path: '/images/IMG_4633.webp', type: 'image', page: '/contact' },
    { id: 'hero-gallery', label: 'Gallery', location: 'Hero Background', path: '/images/IMG_4617.webp', type: 'image', page: '/gallery' },
  ],
  activityCards: [
    { id: 'card-lakes', label: 'The Lakes', location: 'Home Page Activity Card', path: '/images/IMG_4617.webp', page: '/' },
    { id: 'card-deer', label: 'Deer Hunting', location: 'Home Page Activity Card', path: '/images/IMG_2289.webp', page: '/' },
    { id: 'card-turkey', label: 'Turkey Hunting', location: 'Home Page Activity Card', path: '/images/IMG_2294.webp', page: '/' },
    { id: 'card-fishing', label: 'Bass Fishing', location: 'Home Page Activity Card', path: '/images/IMG_4635.webp', page: '/' },
  ],
  lakeImages: [
    { id: 'lake-scott', label: 'Lake Scott', location: 'Lakes Page - Lake Section', path: '/images/IMG_4617.webp', page: '/the-lakes' },
    { id: 'lake-shannon', label: 'Lake Shannon', location: 'Lakes Page - Lake Section', path: '/images/IMG_4628.webp', page: '/the-lakes' },
    { id: 'lake-patrick', label: 'Lake Patrick', location: 'Lakes Page - Lake Section', path: '/images/IMG_4633.webp', page: '/the-lakes' },
  ],
  pageOverviewImages: [
    { id: 'overview-deer', label: 'Deer Hunting', location: 'Deer Hunting Page - Overview Section', path: '/images/IMG_2290.webp', page: '/deer-hunting' },
    { id: 'overview-turkey', label: 'Turkey Hunting', location: 'Turkey Hunting Page - Overview Section', path: '/images/IMG_2294.webp', page: '/turkey-hunting' },
    { id: 'overview-bass', label: 'Bass Fishing', location: 'Bass Fishing Page - Overview Section', path: '/images/IMG_4635.webp', page: '/bass-fishing' },
  ],
  galleries: {
    lakes: [
      { id: 'gal-lakes-1', path: '/images/IMG_4617.webp', label: 'Lake Scott' },
      { id: 'gal-lakes-2', path: '/images/IMG_4621.webp', label: 'Lake view' },
      { id: 'gal-lakes-3', path: '/images/IMG_4622.webp', label: 'Lake scenery' },
      { id: 'gal-lakes-4', path: '/images/IMG_4623.webp', label: 'Lake Shannon' },
      { id: 'gal-lakes-5', path: '/images/IMG_4624.webp', label: 'Scenic view' },
      { id: 'gal-lakes-6', path: '/images/IMG_4626.webp', label: 'Waters' },
      { id: 'gal-lakes-7', path: '/images/IMG_4627.webp', label: 'Dock' },
      { id: 'gal-lakes-8', path: '/images/IMG_4628.webp', label: 'Lake Shannon' },
      { id: 'gal-lakes-9', path: '/images/IMG_4633.webp', label: 'Lake Patrick' },
      { id: 'gal-lakes-10', path: '/images/IMG_4635.webp', label: 'Fishing spot' },
      { id: 'gal-lakes-11', path: '/images/IMG_4637.webp', label: 'Sunset' },
      { id: 'gal-lakes-12', path: '/images/IMG_4638.webp', label: 'Evening' },
    ],
    hunting: [
      { id: 'gal-hunt-1', path: '/images/IMG_2289.webp', label: 'Hunting grounds' },
      { id: 'gal-hunt-2', path: '/images/IMG_2290.webp', label: 'Property' },
      { id: 'gal-hunt-3', path: '/images/IMG_2292.webp', label: 'Hunting area' },
      { id: 'gal-hunt-4', path: '/images/IMG_2294.webp', label: 'Property view' },
      { id: 'gal-hunt-5', path: '/images/IMG_2296.webp', label: 'Grounds' },
      { id: 'gal-hunt-6', path: '/images/IMG_3284.webp', label: 'Scene' },
      { id: 'gal-hunt-7', path: '/images/IMG_3285.webp', label: 'Wildlife' },
      { id: 'gal-hunt-8', path: '/images/IMG_3291.webp', label: 'Property' },
    ],
    property: [
      { id: 'gal-prop-1', path: '/images/1.webp', label: 'Property' },
      { id: 'gal-prop-2', path: '/images/3.webp', label: 'View' },
      { id: 'gal-prop-3', path: '/images/IMG_0001-1.webp', label: 'Grounds' },
      { id: 'gal-prop-4', path: '/images/IMG_0002.webp', label: 'Scenery' },
      { id: 'gal-prop-5', path: '/images/IMG_0003.webp', label: 'View' },
      { id: 'gal-prop-6', path: '/images/IMG_4596.webp', label: 'Overview' },
      { id: 'gal-prop-7', path: '/images/IMG_4597.webp', label: 'Grounds' },
      { id: 'gal-prop-8', path: '/images/IMG_4600.webp', label: 'Property' },
      { id: 'gal-prop-9', path: '/images/IMG_4602.webp', label: 'Scenery' },
      { id: 'gal-prop-10', path: '/images/IMG_4603.webp', label: 'Property' },
      { id: 'gal-prop-11', path: '/images/IMG_4610.webp', label: 'View' },
      { id: 'gal-prop-12', path: '/images/IMG_4611.webp', label: 'Grounds' },
      { id: 'gal-prop-13', path: '/images/photo1.webp', label: 'Photo' },
    ],
    lodging: [
      { id: 'gal-lodge-1', path: '/images/IMG_1285-1.webp', label: 'Interior' },
      { id: 'gal-lodge-2', path: '/images/IMG_1286.webp', label: 'Lodging' },
      { id: 'gal-lodge-3', path: '/images/IMG_1288.webp', label: 'Interior' },
      { id: 'gal-lodge-4', path: '/images/IMG_1289.webp', label: 'Amenities' },
      { id: 'gal-lodge-5', path: '/images/IMG_1302.webp', label: 'Camp house' },
      { id: 'gal-lodge-6', path: '/images/IMG_1306.webp', label: 'Facilities' },
      { id: 'gal-lodge-7', path: '/images/IMG_1310.webp', label: 'Interior' },
    ],
    wildlife: [
      { id: 'gal-wild-1', path: '/images/IMG_6938.webp', label: 'Wildlife' },
      { id: 'gal-wild-2', path: '/images/IMG_6941.webp', label: 'Deer' },
      { id: 'gal-wild-3', path: '/images/UNADJUSTEDNONRAW_thumb_19e3.webp', label: 'Wildlife' },
      { id: 'gal-wild-4', path: '/images/UNADJUSTEDNONRAW_thumb_19e4.webp', label: 'Nature' },
      { id: 'gal-wild-5', path: '/images/UNADJUSTEDNONRAW_thumb_19e7.webp', label: 'Wildlife' },
      { id: 'gal-wild-6', path: '/images/UNADJUSTEDNONRAW_thumb_19e8.webp', label: 'Animals' },
      { id: 'gal-wild-7', path: '/images/UNADJUSTEDNONRAW_thumb_19e9.webp', label: 'Wildlife' },
      { id: 'gal-wild-8', path: '/images/UNADJUSTEDNONRAW_thumb_19ea.webp', label: 'Nature' },
    ],
  },
}

type ImageItem = {
  id: string
  path: string
  label: string
  location?: string
  page?: string
  type?: string
}

function ImageCard({ image, onReplace, size = 'normal' }: { image: ImageItem; onReplace: (id: string, file: File) => void; size?: 'normal' | 'large' }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
      onReplace(image.id, file)
    }
  }

  const isVideo = image.type === 'video'
  const heightClass = size === 'large' ? 'h-48' : 'h-32'

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:border-forest-500 transition-colors">
      <div className={`relative ${heightClass} bg-gray-100`}>
        {isVideo ? (
          <video
            src={previewUrl || image.path}
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={previewUrl || image.path}
            alt={image.label}
            className="w-full h-full object-cover"
          />
        )}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 bg-black/0 hover:bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all group"
        >
          <div className="bg-white rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Replace</span>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={isVideo ? "video/*" : "image/*"}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="p-3">
        <div className="font-medium text-gray-900 text-sm">{image.label}</div>
        {image.location && (
          <div className="text-xs text-gray-500 mt-1">{image.location}</div>
        )}
        {image.page && (
          <a href={image.page} target="_blank" className="text-xs text-forest-600 hover:text-forest-700 mt-1 inline-flex items-center gap-1">
            View page
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

function GallerySection({ title, description, images, onReplace, onAdd }: {
  title: string
  description: string
  images: ImageItem[]
  onReplace: (id: string, file: File) => void
  onAdd: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

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
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{images.length} images</span>
          <button
            onClick={onAdd}
            className="bg-forest-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-forest-700 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add
          </button>
        </div>
      </div>

      <div className="relative">
        {images.length > 4 && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          style={{ scrollbarWidth: 'thin' }}
        >
          {images.map((image) => (
            <div key={image.id} className="flex-shrink-0 w-48">
              <ImageCard image={image} onReplace={onReplace} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GalleryAdminPage() {
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'overview' | 'heroes' | 'galleries'>('overview')
  const supabase = createClient()

  const handleReplace = async (id: string, file: File) => {
    setMessage(`Uploading replacement for ${id}...`)

    // Upload to Supabase storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${id}-${Date.now()}.${fileExt}`

    const { error } = await supabase.storage
      .from('media')
      .upload(fileName, file)

    if (error) {
      setMessage(`Error uploading: ${error.message}`)
    } else {
      setMessage(`Image replaced! Note: To update the site, you'll need to update the image path in the code or replace the file in public/images/`)
    }

    setTimeout(() => setMessage(''), 5000)
  }

  const handleAddToGallery = () => {
    setMessage('To add new images: Upload files to public/images/ folder and update the gallery configuration.')
    setTimeout(() => setMessage(''), 5000)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Image Manager</h1>
          <p className="text-gray-500 mt-1">Manage all images across the website</p>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'overview'
              ? 'border-forest-600 text-forest-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('heroes')}
          className={`px-4 py-3 font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'heroes'
              ? 'border-forest-600 text-forest-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Hero Images
        </button>
        <button
          onClick={() => setActiveTab('galleries')}
          className={`px-4 py-3 font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'galleries'
              ? 'border-forest-600 text-forest-700'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Page Galleries
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-forest-700">{siteImages.heroes.length}</div>
              <div className="text-sm text-gray-500">Hero Images</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-primary-700">{siteImages.activityCards.length}</div>
              <div className="text-sm text-gray-500">Activity Cards</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-earth-700">{siteImages.lakeImages.length}</div>
              <div className="text-sm text-gray-500">Lake Section</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-orange-700">{siteImages.pageOverviewImages.length}</div>
              <div className="text-sm text-gray-500">Page Overviews</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-3xl font-bold text-gray-700">
                {Object.values(siteImages.galleries).flat().length}
              </div>
              <div className="text-sm text-gray-500">Gallery Images</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Guide</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🖼️</div>
                <h3 className="font-medium text-gray-900">Replace an Image</h3>
                <p className="text-sm text-gray-500 mt-1">Hover over any image and click "Replace" to upload a new one</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">➕</div>
                <h3 className="font-medium text-gray-900">Add to Gallery</h3>
                <p className="text-sm text-gray-500 mt-1">Click "Add" on any gallery section to add more images</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">📁</div>
                <h3 className="font-medium text-gray-900">Image Location</h3>
                <p className="text-sm text-gray-500 mt-1">All images are stored in /public/images/ folder</p>
              </div>
            </div>
          </div>

          {/* Activity Cards Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Home Page Activity Cards</h2>
            <p className="text-sm text-gray-500 mb-4">These images appear in the "Our Activities" section on the home page</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {siteImages.activityCards.map((image) => (
                <ImageCard key={image.id} image={image} onReplace={handleReplace} />
              ))}
            </div>
          </div>

          {/* Lake Section Images */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Lakes Page - Lake Sections</h2>
            <p className="text-sm text-gray-500 mb-4">These images appear next to each lake description on the Lakes page</p>
            <div className="grid grid-cols-3 gap-4">
              {siteImages.lakeImages.map((image) => (
                <ImageCard key={image.id} image={image} onReplace={handleReplace} />
              ))}
            </div>
          </div>

          {/* Page Overview Images */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Activity Page Overview Images</h2>
            <p className="text-sm text-gray-500 mb-4">These images appear in the overview section of each activity page (Deer Hunting, Turkey Hunting, Bass Fishing)</p>
            <div className="grid grid-cols-3 gap-4">
              {siteImages.pageOverviewImages.map((image) => (
                <ImageCard key={image.id} image={image} onReplace={handleReplace} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Heroes Tab */}
      {activeTab === 'heroes' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Page Hero Images</h2>
            <p className="text-sm text-gray-500 mb-6">These are the large banner images at the top of each page</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteImages.heroes.map((image) => (
                <ImageCard key={image.id} image={image} onReplace={handleReplace} size="large" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Galleries Tab */}
      {activeTab === 'galleries' && (
        <div className="space-y-6">
          <GallerySection
            title="Lakes Gallery"
            description="Gallery Page - Lakes category & Lakes page gallery section"
            images={siteImages.galleries.lakes}
            onReplace={handleReplace}
            onAdd={handleAddToGallery}
          />

          <GallerySection
            title="Hunting Gallery"
            description="Gallery Page - Hunting category & Deer/Turkey hunting page galleries"
            images={siteImages.galleries.hunting}
            onReplace={handleReplace}
            onAdd={handleAddToGallery}
          />

          <GallerySection
            title="Property Gallery"
            description="Gallery Page - Property category"
            images={siteImages.galleries.property}
            onReplace={handleReplace}
            onAdd={handleAddToGallery}
          />

          <GallerySection
            title="Lodging Gallery"
            description="Gallery Page - Lodging category (Camp houses & interiors)"
            images={siteImages.galleries.lodging}
            onReplace={handleReplace}
            onAdd={handleAddToGallery}
          />

          <GallerySection
            title="Wildlife Gallery"
            description="Gallery Page - Wildlife category"
            images={siteImages.galleries.wildlife}
            onReplace={handleReplace}
            onAdd={handleAddToGallery}
          />
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-bold text-gray-900 mb-2">Need to make changes?</h3>
        <p className="text-sm text-gray-600">
          Images are stored in <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">/public/images/</code> folder.
          To permanently replace an image, upload the new file with the same filename to that folder.
          For adding new images to galleries, add files to the folder and update the gallery configuration in the code.
        </p>
      </div>
    </div>
  )
}
