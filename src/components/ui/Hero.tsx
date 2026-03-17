import Link from 'next/link'
import Image from 'next/image'
import ParallaxHero from './ParallaxHero'

interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  backgroundVideo?: string
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
  backgroundImage,
  backgroundVideo,
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

  const isSubpage = size !== 'large'

  return (
    <section className={`relative ${heightClass} flex items-end overflow-hidden ${isSubpage ? 'border-b-4 border-clay-500' : ''}`}>
      {/* Background Video or Image with Parallax */}
      {backgroundVideo ? (
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      ) : backgroundImage ? (
        <ParallaxHero>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </ParallaxHero>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-pine-800 via-pine-900 to-pine-950" />
      )}

      {/* Pine-tinted Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2318]/85 via-[#0d2318]/40 to-transparent" />
      )}

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white mt-auto pb-16 md:pb-20 pt-32">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white drop-shadow-lg uppercase tracking-wider">
          {title}
        </h1>
        {subtitle && (
          <>
            <div className="w-[120px] h-px bg-white/30 mx-auto mb-6" />
            <p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto text-white/80 drop-shadow-md">
              {subtitle}
            </p>
          </>
        )}
        {(ctaText || secondaryCtaText) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaText && ctaLink && (
              <Link href={ctaLink} className="btn-secondary text-lg">
                {ctaText}
              </Link>
            )}
            {secondaryCtaText && secondaryCtaLink && (
              <Link href={secondaryCtaLink} className="btn bg-white/20 backdrop-blur text-white border-2 border-white hover:bg-white hover:text-pine-800 text-lg">
                {secondaryCtaText}
              </Link>
            )}
          </div>
        )}
      </div>

    </section>
  )
}
