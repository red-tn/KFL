'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageSkeletonProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  style?: React.CSSProperties
}

export default function ImageSkeleton({
  src,
  alt,
  fill = true,
  className = 'object-cover',
  sizes,
  priority,
  style,
}: ImageSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes={sizes}
        priority={priority}
        style={style}
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}
