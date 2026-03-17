'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedPriceProps {
  value: number
  prefix?: string
  className?: string
}

export default function AnimatedPrice({ value, prefix = '$', className = '' }: AnimatedPriceProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1200
          const steps = 40
          const increment = value / steps
          const stepTime = duration / steps
          let current = 0
          let step = 0

          const timer = setInterval(() => {
            step++
            // Ease-out curve
            const progress = step / steps
            const eased = 1 - Math.pow(1 - progress, 3)
            current = Math.round(eased * value)
            setDisplay(current)

            if (step >= steps) {
              setDisplay(value)
              clearInterval(timer)
            }
          }, stepTime)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString()}
    </span>
  )
}
