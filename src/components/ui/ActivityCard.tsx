import Link from 'next/link'
import Image from 'next/image'

interface ActivityCardProps {
  title: string
  description: string
  image?: string
  href: string
  price?: string
  badge?: string
}

export default function ActivityCard({
  title,
  description,
  image,
  href,
  price,
  badge,
}: ActivityCardProps) {
  return (
    <Link href={href} className="group card block">
      {/* Image */}
      <div className="relative h-56 bg-bark-200 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-pine-700 to-pine-900 flex items-center justify-center">
            <span className="text-white/30 text-6xl font-bold">KFL</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-pine-900/0 group-hover:bg-pine-900/20 transition-all duration-300" />
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4 bg-clay-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="card-content">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-bark-800 group-hover:text-pine-700 transition-colors">
            {title}
          </h3>
          {price && (
            <span className="text-pine-700 font-semibold text-sm bg-pine-50 px-2 py-1 rounded">
              {price}
            </span>
          )}
        </div>
        <p className="text-bark-500 mb-4">
          {description}
        </p>
        <span className="inline-flex items-center text-pine-700 font-semibold group-hover:text-pine-800">
          Learn More
          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
