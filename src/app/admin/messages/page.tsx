'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ContactSubmission } from '@/lib/types'

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactSubmission | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setMessages(data)
    setLoading(false)
  }

  const markAsRead = async (id: string) => {
    await supabase.from('contact_submissions').update({ is_read: true }).eq('id', id)
    fetchMessages()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await supabase.from('contact_submissions').delete().eq('id', id)
    setSelected(null)
    fetchMessages()
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelected(msg)
                  if (!msg.is_read) markAsRead(msg.id)
                }}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  selected?.id === msg.id ? 'bg-forest-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!msg.is_read && (
                        <span className="w-2 h-2 bg-forest-600 rounded-full flex-shrink-0" />
                      )}
                      <span className={`font-medium truncate ${msg.is_read ? 'text-gray-600' : 'text-gray-900'}`}>
                        {msg.name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 truncate">{msg.email}</div>
                    <div className="text-sm text-gray-400 truncate mt-1">{msg.message.slice(0, 50)}...</div>
                  </div>
                  <div className="text-xs text-gray-400 ml-2">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </div>
                </div>
              </button>
            ))}
            {messages.length === 0 && (
              <div className="p-8 text-center text-gray-500">No messages yet</div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          {selected ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
                  <div className="text-gray-500">{selected.email}</div>
                  {selected.phone && <div className="text-gray-500">{selected.phone}</div>}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">
                    {new Date(selected.created_at).toLocaleString()}
                  </div>
                  {selected.interest && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-forest-100 text-forest-700 rounded">
                      {selected.interest}
                    </span>
                  )}
                </div>
              </div>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="mt-8 flex gap-4">
                <a
                  href={`mailto:${selected.email}`}
                  className="bg-forest-700 text-white px-6 py-2 rounded-lg hover:bg-forest-800"
                >
                  Reply via Email
                </a>
                {selected.phone && (
                  <a
                    href={`tel:${selected.phone}`}
                    className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Call
                  </a>
                )}
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="text-red-600 hover:text-red-700 ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
