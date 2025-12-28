'use client'

import { useEffect, useRef } from 'react'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdUnit({
  slot,
  format = 'auto',
  responsive = true,
  className = ''
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const isLoaded = useRef(false)

  useEffect(() => {
    if (isLoaded.current) return

    try {
      if (typeof window !== 'undefined' && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        isLoaded.current = true
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  if (!adsenseId) {
    // Placeholder for development
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm ${className}`} style={{ minHeight: '90px' }}>
        Ad Space
      </div>
    )
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
