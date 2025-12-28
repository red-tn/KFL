'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { GalleryImage } from '@/lib/types'

const categories = [
  { value: 'lakes', label: 'Lakes' },
  { value: 'deer-hunting', label: 'Deer Hunting' },
  { value: 'turkey-hunting', label: 'Turkey Hunting' },
  { value: 'fishing', label: 'Fishing' },
  { value: 'property', label: 'Property' },
  { value: 'lodging', label: 'Lodging' },
]

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [newImage, setNewImage] = useState({ title: '', category: 'lakes', image_url: '' })
  const supabase = createClient()

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setImages(data)
    setLoading(false)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage('')

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { error: uploadError, data } = await supabase.storage
      .from('media')
      .upload(fileName, file)

    if (uploadError) {
      setMessage('Upload error: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName)
    setNewImage({ ...newImage, image_url: publicUrl })
    setUploading(false)
  }

  const handleAddImage = async () => {
    if (!newImage.image_url) {
      setMessage('Please upload an image first')
      return
    }

    const { error } = await supabase.from('gallery_images').insert({
      title: newImage.title,
      category: newImage.category,
      image_url: newImage.image_url,
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Image added!')
      setNewImage({ title: '', category: 'lakes', image_url: '' })
      fetchImages()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return

    const { error } = await supabase.from('gallery_images').delete().eq('id', id)

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      fetchImages()
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Gallery</h1>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.includes('Error') || message.includes('error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Add New Image */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="w-full text-sm"
            />
            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newImage.title}
              onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Image title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={newImage.category}
              onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddImage}
              disabled={!newImage.image_url}
              className="w-full bg-forest-700 text-white px-4 py-2 rounded-lg hover:bg-forest-800 disabled:opacity-50"
            >
              Add Image
            </button>
          </div>
        </div>
        {newImage.image_url && (
          <div className="mt-4">
            <img src={newImage.image_url} alt="Preview" className="h-32 rounded-lg object-cover" />
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-sm overflow-hidden group relative">
            <img
              src={image.image_url}
              alt={image.title || 'Gallery image'}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <div className="text-sm font-medium text-gray-900 truncate">{image.title || 'Untitled'}</div>
              <div className="text-xs text-gray-500">{image.category}</div>
            </div>
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No images yet. Upload your first image above.
        </div>
      )}
    </div>
  )
}
