'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { PageContent } from '@/lib/types'

export default function PagesPage() {
  const [pages, setPages] = useState<PageContent[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<PageContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    const { data } = await supabase.from('page_content').select('*').order('page_slug')
    if (data) setPages(data)
    setLoading(false)
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    setMessage('')

    const { error } = await supabase
      .from('page_content')
      .update({
        hero_title: editing.hero_title,
        hero_subtitle: editing.hero_subtitle,
        hero_video_url: editing.hero_video_url,
        seo_title: editing.seo_title,
        seo_description: editing.seo_description,
      })
      .eq('id', editing.id)

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Saved!')
      fetchPages()
      setEditing(null)
    }
    setSaving(false)
  }

  const pageNames: Record<string, string> = {
    home: 'Home',
    'the-lakes': 'The Lakes',
    'deer-hunting': 'Deer Hunting',
    'turkey-hunting': 'Turkey Hunting',
    'bass-fishing': 'Bass Fishing',
    directions: 'Directions',
    contact: 'Contact',
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Pages</h1>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Page</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Hero Title</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map((page) => (
              <tr key={page.id}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{pageNames[page.page_slug] || page.page_slug}</div>
                  <div className="text-sm text-gray-500">/{page.page_slug === 'home' ? '' : page.page_slug}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {page.hero_title || '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setEditing(page)}
                    className="text-forest-700 hover:text-forest-800 font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Edit: {pageNames[editing.page_slug] || editing.page_slug}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                <input
                  type="text"
                  value={editing.hero_title || ''}
                  onChange={(e) => setEditing({ ...editing, hero_title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                <textarea
                  value={editing.hero_subtitle || ''}
                  onChange={(e) => setEditing({ ...editing, hero_subtitle: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Video URL</label>
                <input
                  type="text"
                  value={editing.hero_video_url || ''}
                  onChange={(e) => setEditing({ ...editing, hero_video_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500"
                  placeholder="/images/lake-overview.mp4 or leave empty for image only"
                />
                <p className="text-xs text-gray-500 mt-1">Video file path (e.g., /images/lake-overview.mp4). Leave empty to use hero images from Image Manager.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                <input
                  type="text"
                  value={editing.seo_title || ''}
                  onChange={(e) => setEditing({ ...editing, seo_title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500"
                  placeholder="Page title for search engines"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                <textarea
                  value={editing.seo_description || ''}
                  onChange={(e) => setEditing({ ...editing, seo_description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500"
                  placeholder="Description for search engines"
                />
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-4">
              <button
                onClick={() => setEditing(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-forest-700 text-white rounded-lg hover:bg-forest-800 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
