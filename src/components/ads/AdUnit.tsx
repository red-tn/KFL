'use client'

import { useEffect, useRef } from 'react'

interface AdUnitProps {
  slot?: string
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
  const adRef = useRef<HTMLModElement>(null)
  const isLoaded = useRef(false)

  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  useEffect(() => {
    if (isLoaded.current || !adsenseId) return

    try {
      if (typeof window !== 'undefined' && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        isLoaded.current = true
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [adsenseId])

  if (!adsenseId) {
    return null
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client={adsenseId}
      {...(slot ? { 'data-ad-slot': slot } : {})}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  )
}
