interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-bark-800 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-bark-500 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 flex items-center gap-1 ${centered ? 'justify-center' : ''}`}>
        <div className="w-12 h-0.5 bg-clay-400" />
        <div className="w-12 h-0.5 bg-clay-400" />
      </div>
    </div>
  )
}
