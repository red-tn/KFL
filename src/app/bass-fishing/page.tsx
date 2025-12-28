import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'
import SectionHeader from '@/components/ui/SectionHeader'
import Gallery from '@/components/ui/Gallery'
import AdBanner from '@/components/ads/AdBanner'
import Link from 'next/link'
import { getSiteSettings, getPageContent, getGalleryImages } from '@/lib/data'

export const metadata: Metadata = {
  title: "Bass Fishing | King's Family Lakes",
  description: 'Trophy bass fishing on three private lakes in Alabama. Large Mouth Bass and Brim year-round. Free with hunting packages and lodging stays.',
}

const fishingSpots = [
  {
    lake: 'Lake Scott',
    size: '~35 acres',
    description: 'The largest lake offers expansive waters with bass dispersed throughout. Multiple docks provide easy access, and the extensive tree cover creates excellent structure for bass.',
    best_for: 'Exploring different spots, dock fishing',
  },
  {
    lake: 'Lake Shannon',
    size: '~15 acres',
    description: 'Known for producing our largest bass specimens. The shallower waters concentrate fish, making this the go-to spot for trophy hunters.',
    best_for: 'Trophy bass, consistent action',
  },
  {
    lake: 'Lake Patrick',
    size: '~10 acres',
    description: 'Our newest lake with a growing bass population. Less fishing pressure means aggressive fish eager to bite.',
    best_for: 'Less pressure, growing population',
  },
]

const tips = [
  {
    title: 'Best Times',
    description: 'Early morning and late evening provide the best bite. Bass are most active during low-light conditions.',
    icon: '🌅',
  },
  {
    title: 'Tackle Suggestions',
    description: 'Soft plastics, spinner baits, and topwater lures all work well. Bring a variety for different conditions.',
    icon: '🎣',
  },
  {
    title: 'Structure Fishing',
    description: 'Target docks, fallen trees, and weed lines. Our lakes have plenty of structure where bass like to hide.',
    icon: '🌳',
  },
  {
    title: 'Boat Access',
    description: 'Each lake has docks and boats available. Ask about boat use when you book your stay.',
    icon: '🚤',
  },
]

// Fallback images if database is empty
const defaultGalleryImages = [
  { src: 'https://i0.wp.com/kingsfamilylakes.com/wp-content/uploads/2021/10/IMG_4635.jpeg', alt: 'Bass fishing', caption: 'Bass fishing on the lake' },
  { src: 'https://i0.wp.com/kingsfamilylakes.com/wp-content/uploads/2021/10/IMG_4617.jpeg', alt: 'Lake Scott', caption: 'Lake Scott' },
  { src: 'https://i0.wp.com/kingsfamilylakes.com/wp-content/uploads/2021/10/IMG_4628.jpeg', alt: 'Lake Shannon', caption: 'Lake Shannon' },
  { src: 'https://i0.wp.com/kingsfamilylakes.com/wp-content/uploads/2014/05/IMG_2289.jpg', alt: 'Lake view', caption: 'Peaceful lake view' },
  { src: 'https://i0.wp.com/kingsfamilylakes.com/wp-content/uploads/2014/05/IMG_2294.jpg', alt: 'Fishing spot', caption: 'Prime fishing spot' },
  { src: 'https://i0.wp.com/kingsfamilylakes.com/wp-content/uploads/2021/10/IMG_4633.jpeg', alt: 'Lake Patrick', caption: 'Lake Patrick' },
]

export default async function BassFishingPage() {
  const [settings, pageContent, dbImages] = await Promise.all([
    getSiteSettings(),
    getPageContent('bass-fishing'),
    getGalleryImages('fishing'),
  ])

  const heroTitle = pageContent?.hero_title || 'Bass Fishing'
  const heroSubtitle = pageContent?.hero_subtitle || 'Three private lakes stocked with trophy Large Mouth Bass and Brim. Year-round fishing included with your stay.'
  const huntingRate = settings?.hunting_daily_rate || 300
  const lodgingRate = settings?.lodging_nightly_rate || 100

  // Use database images if available, otherwise fallback
  const galleryImages = dbImages.length > 0
    ? dbImages.map((img) => ({ src: img.image_url, alt: img.title || 'Gallery image', caption: img.title || undefined }))
    : defaultGalleryImages

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage="https://i0.wp.com/kingsfamilylakes.com/wp-content/uploads/2021/10/IMG_4635.jpeg"
        size="medium"
      />

      {/* Ad Banner */}
      <AdBanner slot="fishing-top" position="top" />

      {/* Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Private Lake Fishing
            </h2>
            <p className="text-lg text-gray-600">
              Whether you&apos;re here for hunting or just want a peaceful fishing getaway, our three private lakes offer excellent bass fishing year-round. With no public access, you&apos;ll enjoy uncrowded waters and healthy fish populations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg">
              <span className="text-white/40 text-3xl font-bold">Bass Fishing</span>
            </div>
            <div className="space-y-4">
              <div className="bg-forest-50 rounded-lg p-6">
                <h3 className="font-bold text-forest-800 mb-2">Large Mouth Bass</h3>
                <p className="text-gray-600">Trophy-sized bass in all three lakes. Lake Shannon is particularly known for producing our biggest fish.</p>
              </div>
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="font-bold text-primary-800 mb-2">Brim (Bluegill)</h3>
                <p className="text-gray-600">Abundant brim populations perfect for family fishing. Great for beginners and kids.</p>
              </div>
              <div className="bg-earth-50 rounded-lg p-6">
                <h3 className="font-bold text-earth-800 mb-2">Free with Stay</h3>
                <p className="text-gray-600">Fishing access is included with all hunting packages and lodging reservations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fishing Spots */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Where to Fish"
            subtitle="Each lake offers a unique fishing experience."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {fishingSpots.map((spot) => (
              <div key={spot.lake} className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-sm text-forest-600 font-semibold mb-2">{spot.size}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{spot.lake}</h3>
                <p className="text-gray-600 mb-4">{spot.description}</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-sm text-gray-500">Best for: </span>
                  <span className="text-sm font-medium text-gray-700">{spot.best_for}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="fishing-middle" position="middle" />

      {/* Tips */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Fishing Tips"
            subtitle="Make the most of your time on the water."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="text-center">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-12 bg-forest-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Fishing Included Free</h2>
          <p className="text-forest-100 max-w-2xl mx-auto">
            Lake access and fishing is included with all hunting packages (${huntingRate}/day) and lodging stays (${lodgingRate}/night). No additional fishing fees - just bring your gear and enjoy.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Gallery"
            subtitle="See what's biting at King's Family Lakes."
          />
          <Gallery images={galleryImages} columns={3} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Cast Your Line?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Book your stay and enjoy unlimited fishing on three private lakes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-primary-700 hover:bg-gray-100">
              Book Your Stay
            </Link>
            <Link href="/the-lakes" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700">
              Learn About The Lakes
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="fishing-bottom" position="bottom" />
    </>
  )
}
