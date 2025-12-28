import Link from 'next/link'

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description?: string
  features: string[]
  ctaText?: string
  ctaLink?: string
  highlighted?: boolean
}

export default function PricingCard({
  title,
  price,
  period = '/day',
  description,
  features,
  ctaText = 'Book Now',
  ctaLink = '/contact',
  highlighted = false,
}: PricingCardProps) {
  return (
    <div className={`rounded-2xl p-8 ${highlighted ? 'bg-forest-700 text-white ring-4 ring-forest-500' : 'bg-white shadow-lg border border-gray-100'}`}>
      <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      {description && (
        <p className={`mb-4 ${highlighted ? 'text-forest-100' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
      <div className="mb-6">
        <span className={`text-4xl font-bold ${highlighted ? 'text-white' : 'text-forest-700'}`}>
          {price}
        </span>
        <span className={`text-lg ${highlighted ? 'text-forest-200' : 'text-gray-500'}`}>
          {period}
        </span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${highlighted ? 'text-forest-300' : 'text-forest-600'}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className={highlighted ? 'text-forest-50' : 'text-gray-700'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaLink}
        className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all ${
          highlighted
            ? 'bg-white text-forest-700 hover:bg-forest-50'
            : 'bg-forest-700 text-white hover:bg-forest-800'
        }`}
      >
        {ctaText}
      </Link>
    </div>
  )
}
