'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Activity } from '@/lib/types'

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Activity | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    const { data } = await supabase
      .from('activities')
      .select('*')
      .order('display_order')
    if (data) setActivities(data)
    setLoading(false)
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    setMessage('')

    const { error } = await supabase
      .from('activities')
      .update({
        name: editing.name,
        short_description: editing.short_description,
        full_description: editing.full_description,
        daily_rate: editing.daily_rate,
        season_info: editing.season_info,
        is_featured: editing.is_featured,
      })
      .eq('id', editing.id)

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Saved!')
      fetchActivities()
      setEditing(null)
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Activities</h1>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Activities List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rate</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Featured</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{activity.name}</div>
                  <div className="text-sm text-gray-500">{activity.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                    {activity.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {activity.daily_rate ? `$${activity.daily_rate}/day` : 'Free'}
                </td>
                <td className="px-6 py-4">
                  {activity.is_featured ? '✓' : '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setEditing(activity)}
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
              <h2 className="text-xl font-bold">Edit: {editing.name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                <textarea
                  value={editing.short_description || ''}
                  onChange={(e) => setEditing({ ...editing, short_description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                <textarea
                  value={editing.full_description || ''}
                  onChange={(e) => setEditing({ ...editing, full_description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daily Rate ($)</label>
                  <input
                    type="number"
                    value={editing.daily_rate || 0}
                    onChange={(e) => setEditing({ ...editing, daily_rate: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Season Info</label>
                  <input
                    type="text"
                    value={editing.season_info || ''}
                    onChange={(e) => setEditing({ ...editing, season_info: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500"
                    placeholder="e.g., Year-round, Nov-Jan"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editing.is_featured}
                    onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured on homepage</span>
                </label>
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
