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
      <div className="relative h-56 bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-700 to-forest-900 flex items-center justify-center">
          <span className="text-white/30 text-6xl font-bold">KFL</span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-all duration-300" />
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4 bg-earth-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="card-content">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-forest-700 transition-colors">
            {title}
          </h3>
          {price && (
            <span className="text-forest-700 font-semibold text-sm bg-forest-50 px-2 py-1 rounded">
              {price}
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <span className="inline-flex items-center text-forest-700 font-semibold group-hover:text-forest-800">
          Learn More
          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
