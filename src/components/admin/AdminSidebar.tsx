'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Pages', href: '/admin/pages', icon: '📄' },
  { name: 'Activities', href: '/admin/activities', icon: '🎯' },
  { name: 'Gallery', href: '/admin/gallery', icon: '🖼️' },
  { name: 'Messages', href: '/admin/messages', icon: '✉️' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
]

export default function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white">
      <div className="p-6">
        <Link href="/admin" className="flex items-center space-x-3">
          <Image
            src="/images/kfl-logo.png"
            alt="KFL"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <div>
            <div className="font-bold">KFL Admin</div>
            <div className="text-xs text-gray-400">Management Panel</div>
          </div>
        </Link>
      </div>

      <nav className="mt-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-6 py-3 text-sm transition-colors ${
              pathname === item.href
                ? 'bg-forest-700 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <div className="text-gray-400">Signed in as</div>
            <div className="text-white truncate max-w-[150px]">{user.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white text-sm"
          >
            Logout
          </button>
        </div>
        <Link
          href="/"
          target="_blank"
          className="mt-4 block text-center text-sm text-gray-400 hover:text-white"
        >
          View Site →
        </Link>
      </div>
    </aside>
  )
}
