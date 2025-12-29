import { Metadata } from 'next'
import Image from 'next/image'
import Hero from '@/components/ui/Hero'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollableGallery from '@/components/ui/ScrollableGallery'
import AdBanner from '@/components/ads/AdBanner'
import Link from 'next/link'
import { getSiteSettings, getPageContent, getGalleryImages, getHeroImage, getOverviewImage } from '@/lib/data'

export const metadata: Metadata = {
  title: "Bass Fishing | King's Family Lakes",
  description: 'Trophy bass fishing on three private lakes in Alabama. Large Mouth Bass and Brim year-round. Free with hunting packages and lodging stays.',
}

const fishingSpots = [
  {
    lake: 'Lake Scott',
    size: '~35 acres',
    species: 'Florida Strain Bass',
    description: 'The largest lake features predominantly Florida strain bass. Multiple docks provide easy access, and the extensive tree cover creates excellent structure. Has produced bass in the 10-14 lb range.',
    best_for: 'Florida strain, dock fishing',
  },
  {
    lake: 'Lake Shannon',
    size: '~15 acres',
    species: 'F1 Hybrid Bass (Florida x Northern)',
    description: 'Home to our trophy F1 hybrid bass - a cross between Florida and Northern strains. Known for producing our largest specimens including a 15 lb bass. The shallower waters concentrate fish for consistent action.',
    best_for: 'Trophy bass up to 15 lbs, F1 hybrids',
  },
  {
    lake: 'Lake Patrick',
    size: '~10 acres',
    species: 'Northern Strain Bass',
    description: 'Stocked exclusively with Northern strain bass. Less fishing pressure means aggressive fish eager to bite. Great for anglers who enjoy the fight of Northern bass.',
    best_for: 'Northern bass, less pressure',
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
  { src: '/images/IMG_4635.webp', alt: 'Bass fishing', caption: 'Bass Fishing' },
  { src: '/images/IMG_4617.webp', alt: 'Lake Scott', caption: 'Lake Scott' },
  { src: '/images/IMG_4628.webp', alt: 'Lake Shannon', caption: 'Lake Shannon' },
  { src: '/images/IMG_4633.webp', alt: 'Lake Patrick', caption: 'Lake Patrick' },
  { src: '/images/IMG_4621.webp', alt: 'Lake view', caption: 'Lake View' },
  { src: '/images/IMG_4622.webp', alt: 'Fishing dock', caption: 'Fishing Dock' },
  { src: '/images/IMG_4623.webp', alt: 'Lake waters', caption: 'Lake Waters' },
  { src: '/images/IMG_4624.webp', alt: 'Scenic lake', caption: 'Scenic Lake' },
  { src: '/images/IMG_4626.webp', alt: 'Peaceful waters', caption: 'Peaceful Waters' },
  { src: '/images/IMG_4627.webp', alt: 'Fishing spot', caption: 'Prime Fishing Spot' },
]

export default async function BassFishingPage() {
  const [settings, pageContent, dbImages, heroImg, overviewImg] = await Promise.all([
    getSiteSettings(),
    getPageContent('bass-fishing'),
    getGalleryImages('fishing'),
    getHeroImage('bass-fishing'),
    getOverviewImage('bass-fishing'),
  ])

  const heroTitle = pageContent?.hero_title || 'Bass Fishing'
  const heroSubtitle = pageContent?.hero_subtitle || 'Three private lakes stocked with trophy Large Mouth Bass and Brim. Florida, Northern, and F1 hybrid strains available.'
  const fishingRate = settings?.fishing_daily_rate || 200
  const lodgingRate = settings?.lodging_nightly_rate || 100
  const heroImage = heroImg || '/images/IMG_4635.webp'
  const overviewImage = overviewImg || '/images/IMG_4635.webp'

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
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src={overviewImage}
                alt="Bass fishing at King's Family Lakes"
                fill
                className="object-cover"
              />
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
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-forest-600 font-semibold">{spot.size}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{spot.lake}</h3>
                <div className="text-sm text-primary-700 font-medium mb-3">{spot.species}</div>
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

      {/* Pricing */}
      <section className="py-12 bg-forest-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Fishing Rates</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold">${fishingRate}</div>
              <div className="text-forest-200">per person / full day</div>
              <div className="text-sm text-forest-300 mt-2">No half day options</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold">${lodgingRate}</div>
              <div className="text-forest-200">per person / night</div>
              <div className="text-sm text-forest-300 mt-2">Camp house lodging</div>
            </div>
          </div>
          <p className="text-forest-100 max-w-2xl mx-auto">
            Access to all three private lakes. Trophy bass from 10-15 lbs. Bring your gear and experience some of Alabama&apos;s best bass fishing.
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
