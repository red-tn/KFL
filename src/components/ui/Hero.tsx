import Link from 'next/link'
import Image from 'next/image'

interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  overlay?: boolean
  size?: 'small' | 'medium' | 'large'
}

export default function Hero({
  title,
  subtitle,
  backgroundImage = '/images/hero-default.jpg',
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  overlay = true,
  size = 'large',
}: HeroProps) {
  const heightClass = {
    small: 'min-h-[300px] md:min-h-[400px]',
    medium: 'min-h-[400px] md:min-h-[500px]',
    large: 'min-h-[500px] md:min-h-[600px] lg:min-h-[700px]',
  }[size]

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full bg-forest-900">
          {/* Placeholder gradient when no image */}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-800 via-forest-900 to-gray-900" />
        </div>
      </div>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-gray-100 text-shadow">
            {subtitle}
          </p>
        )}
        {(ctaText || secondaryCtaText) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaText && ctaLink && (
              <Link href={ctaLink} className="btn-primary text-lg">
                {ctaText}
              </Link>
            )}
            {secondaryCtaText && secondaryCtaLink && (
              <Link href={secondaryCtaLink} className="btn bg-white/20 backdrop-blur text-white border-2 border-white hover:bg-white hover:text-forest-800 text-lg">
                {secondaryCtaText}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
