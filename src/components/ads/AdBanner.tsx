import AdUnit from './AdUnit'

interface AdBannerProps {
  slot: string
  position?: 'top' | 'middle' | 'bottom'
}

export default function AdBanner({ slot, position = 'middle' }: AdBannerProps) {
  const paddingClass = {
    top: 'pt-4 pb-8',
    middle: 'py-8',
    bottom: 'pt-8 pb-4',
  }[position]

  return (
    <div className={`container-custom ${paddingClass}`}>
      <div className="max-w-4xl mx-auto">
        <AdUnit
          slot={slot}
          format="horizontal"
          className="min-h-[90px]"
        />
      </div>
    </div>
  )
}
