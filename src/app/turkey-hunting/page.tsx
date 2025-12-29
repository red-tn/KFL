import { Metadata } from 'next'
import Image from 'next/image'
import Hero from '@/components/ui/Hero'
import SectionHeader from '@/components/ui/SectionHeader'
import PricingCard from '@/components/ui/PricingCard'
import ScrollableGallery from '@/components/ui/ScrollableGallery'
import AdBanner from '@/components/ads/AdBanner'
import Link from 'next/link'
import { getSiteSettings, getPageContent, getGalleryImages, getHeroImage, getOverviewImage } from '@/lib/data'

export const metadata: Metadata = {
  title: "Turkey Hunting | King's Family Lakes",
  description: 'Premium spring turkey hunting in Alabama. $300/day full day hunts with lodging available. Expert grounds management and strategic blind placement.',
}

const seasons = [
  {
    name: 'Spring Season',
    dates: 'March 15 - April 30',
    notes: 'Decoys permitted during spring season. Full day hunts only.',
    icon: '🌸',
  },
]

const regulations = [
  {
    title: 'Gobblers Only',
    content: 'Only male turkeys (gobblers) may be harvested.',
  },
  {
    title: 'Daily & Season Limits',
    content: 'One gobbler per day, five combined gobblers per season maximum.',
  },
  {
    title: 'License Required',
    content: 'Valid Alabama hunting permit required for all hunters.',
  },
  {
    title: 'No Baiting',
    content: 'Hunting with bait is illegal in Alabama.',
  },
  {
    title: 'Written Permission',
    content: 'Written permission from landowner required (provided upon booking).',
  },
  {
    title: 'Harvest Records',
    content: 'Harvest records must be in possession while hunting.',
  },
]

// Fallback images if database is empty
const defaultGalleryImages = [
  { src: '/images/IMG_2294.webp', alt: 'Turkey hunting grounds', caption: 'Turkey Hunting Grounds' },
  { src: '/images/IMG_2289.webp', alt: 'Hunting property', caption: 'Hunting Property' },
  { src: '/images/IMG_2290.webp', alt: 'Property view', caption: 'Property View' },
  { src: '/images/IMG_2292.webp', alt: 'Grounds', caption: 'Hunting Grounds' },
  { src: '/images/IMG_2296.webp', alt: 'Pasture', caption: 'Manicured Pasture' },
  { src: '/images/IMG_4617.webp', alt: 'Lake view', caption: 'Lake View' },
  { src: '/images/IMG_4628.webp', alt: 'Property', caption: 'Property' },
  { src: '/images/IMG_4633.webp', alt: 'Scenic area', caption: 'Scenic Area' },
  { src: '/images/IMG_3291.webp', alt: 'Hunting area', caption: 'Hunting Area' },
]

export default async function TurkeyHuntingPage() {
  const [settings, pageContent, dbImages, heroImg, overviewImg] = await Promise.all([
    getSiteSettings(),
    getPageContent('turkey-hunting'),
    getGalleryImages('turkey-hunting'),
    getHeroImage('turkey-hunting'),
    getOverviewImage('turkey-hunting'),
  ])

  const heroTitle = pageContent?.hero_title || 'Turkey Hunting'
  const heroSubtitle = pageContent?.hero_subtitle || 'A turkey hunting experience that is second to none. Year-round grounds management and strategically positioned blinds for optimal success.'
  const huntingRate = settings?.hunting_daily_rate || 300
  const lodgingRate = settings?.lodging_nightly_rate || 100
  const phone = settings?.phone || '+1 (334) 341-3753'
  const heroImage = heroImg || '/images/IMG_2294.webp'
  const overviewImage = overviewImg || '/images/IMG_2294.webp'

  // Use database images if available, otherwise fallback
  const galleryImages = dbImages.length > 0
    ? dbImages.map((img) => ({ src: img.image_url, alt: img.title || 'Gallery image', caption: img.title || undefined }))
    : defaultGalleryImages

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroImage}
        size="medium"
      />

      {/* Ad Banner */}
      <AdBanner slot="turkey-top" position="top" />

      {/* Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={overviewImage}
                  alt="Turkey hunting at King's Family Lakes"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Premier Turkey Hunting
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                King&apos;s Family Lakes provides a turkey hunting experience that is second to none. Our property is maintained year-round with a focus on cover and feed, creating ideal habitat for wild turkeys.
              </p>
              <p className="text-gray-600 mb-8">
                With strategically positioned hunting blinds overlooking manicured pastures, you&apos;ll have excellent opportunities during both our fall and spring seasons. Our grounds management ensures healthy turkey populations and memorable hunts.
              </p>
              <Link href="/contact" className="btn-primary">
                Book Your Hunt
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seasons */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Hunting Seasons"
            subtitle="Two distinct seasons offer different hunting experiences."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {seasons.map((season) => (
              <div key={season.name} className="bg-white rounded-xl p-8 shadow-md text-center">
                <div className="text-5xl mb-4">{season.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{season.name}</h3>
                <p className="text-lg text-forest-700 font-semibold mb-4">{season.dates}</p>
                <p className="text-gray-600 text-sm bg-gray-50 rounded-lg p-3">
                  {season.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="turkey-middle" position="middle" />

      {/* Pricing */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Pricing"
            subtitle="Simple pricing with no hidden fees."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <PricingCard
              title="Full Day Hunt"
              price={`$${huntingRate}`}
              period="/person/day"
              description="Full day turkey hunting - no half day options"
              features={[
                'Access to all hunting areas',
                'Strategic blind placements',
                'Property orientation',
                'No trophy fees',
                'Spring season only',
              ]}
              highlighted
            />
            <PricingCard
              title="Lodging"
              price={`$${lodgingRate}`}
              period="/person/night"
              description="Stay at our camp houses"
              features={[
                'Two camp houses available',
                'Full kitchen facilities',
                'Climate control',
                'Lake access included',
                'Peaceful setting',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section className="section-padding bg-forest-50">
        <div className="container-custom">
          <SectionHeader
            title="Alabama Turkey Hunting Regulations"
            subtitle="Important rules and requirements."
          />

          <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-3xl mx-auto">
            {regulations.map((reg, index) => (
              <div
                key={reg.title}
                className={`p-6 ${index !== regulations.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <h3 className="font-bold text-gray-900 mb-2">{reg.title}</h3>
                <p className="text-gray-600">{reg.content}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="http://www.outdooralabama.com/resident-hunting-license-information-and-application-packets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest-700 font-semibold hover:text-forest-800 inline-flex items-center"
            >
              View Full Alabama Hunting Regulations
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Gallery"
            subtitle="See our hunting grounds and past hunts."
          />
          <ScrollableGallery images={galleryImages} />
          <div className="text-center mt-8">
            <Link href="/gallery" className="inline-flex items-center text-forest-700 font-semibold hover:text-forest-800">
              View Full Photo Gallery
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Turkey Hunt?</h2>
          <p className="text-xl text-forest-100 mb-8">
            Contact us to reserve your dates for spring season.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-forest-700 hover:bg-gray-100">
              Contact Us
            </Link>
            <Link href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="btn border-2 border-white text-white hover:bg-white hover:text-forest-700">
              Call {phone}
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="turkey-bottom" position="bottom" />
    </>
  )
}
