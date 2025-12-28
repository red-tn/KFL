import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch stats
  const { count: activitiesCount } = await supabase
    .from('activities')
    .select('*', { count: 'exact', head: true })

  const { count: galleryCount } = await supabase
    .from('gallery_images')
    .select('*', { count: 'exact', head: true })

  const { count: messagesCount } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false)

  const stats = [
    { name: 'Activities', value: activitiesCount || 0, href: '/admin/activities', icon: '🎯' },
    { name: 'Gallery Images', value: galleryCount || 0, href: '/admin/gallery', icon: '🖼️' },
    { name: 'Unread Messages', value: messagesCount || 0, href: '/admin/messages', icon: '✉️' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">{stat.name}</div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/activities"
            className="p-4 bg-forest-50 rounded-lg text-center hover:bg-forest-100 transition-colors"
          >
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-medium text-forest-800">Manage Activities</div>
          </Link>
          <Link
            href="/admin/gallery"
            className="p-4 bg-primary-50 rounded-lg text-center hover:bg-primary-100 transition-colors"
          >
            <div className="text-2xl mb-2">🖼️</div>
            <div className="text-sm font-medium text-primary-800">Upload Images</div>
          </Link>
          <Link
            href="/admin/settings"
            className="p-4 bg-earth-50 rounded-lg text-center hover:bg-earth-100 transition-colors"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <div className="text-sm font-medium text-earth-800">Site Settings</div>
          </Link>
          <Link
            href="/admin/messages"
            className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors"
          >
            <div className="text-2xl mb-2">✉️</div>
            <div className="text-sm font-medium text-gray-800">View Messages</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
