'use client'

import { useEffect, useRef, useState } from 'react'

export default function ParallaxHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        if (rect.bottom > 0) {
          setOffset(window.scrollY * 0.3)
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${offset}px) scale(1.1)` }}
      >
        {children}
      </div>
    </div>
  )
}
