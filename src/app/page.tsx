import Hero from '@/components/ui/Hero'
import SectionHeader from '@/components/ui/SectionHeader'
import ActivityCard from '@/components/ui/ActivityCard'
import AdBanner from '@/components/ads/AdBanner'
import Link from 'next/link'
import { getSiteSettings, getFeaturedActivities, getPageContent, getActivityCardImages, getHeroMedia } from '@/lib/data'

const features = [
  {
    icon: '🏠',
    title: 'Comfortable Lodging',
    description: 'Two fully-equipped camp houses with modern amenities for a comfortable stay.',
  },
  {
    icon: '🎣',
    title: 'Three Private Lakes',
    description: 'Lake Scott (35 acres), Lake Shannon, and Lake Patrick - all stocked with bass.',
  },
  {
    icon: '🦌',
    title: 'Prime Hunting Land',
    description: 'Hundreds of acres of maintained pastures and forest with strategic blind placements.',
  },
  {
    icon: '📍',
    title: 'Easy Access',
    description: 'Located just off I-20 Exit 23 in Epes, Alabama. Easy to find, hard to leave.',
  },
]

// Fallback activities if database is empty
const defaultActivities = [
  {
    title: 'The Lakes',
    description: 'Three pristine private lakes - Lake Scott, Lake Shannon, and Lake Patrick - offering year-round fishing for Large Mouth Bass and Brim.',
    href: '/the-lakes',
    image: '/images/IMG_4617.webp',
  },
  {
    title: 'Deer Hunting',
    description: 'World-class White Tail Deer hunting with well-maintained blinds, manicured pastures, and experienced guides.',
    href: '/deer-hunting',
    price: '$300/day',
    badge: 'Popular',
    image: '/images/IMG_2289.webp',
  },
  {
    title: 'Turkey Hunting',
    description: 'Premium turkey hunting with fall and spring seasons. Strategically positioned blinds overlooking prime hunting grounds.',
    href: '/turkey-hunting',
    price: '$300/day',
    image: '/images/IMG_2294.webp',
  },
  {
    title: 'Bass Fishing',
    description: 'Cast your line in our private lakes stocked with trophy-sized Large Mouth Bass. Multiple docks and boat access available.',
    href: '/bass-fishing',
    price: '$200/day',
    image: '/images/IMG_4635.webp',
  },
]

export default async function Home() {
  const [settings, featuredActivities, pageContent, cardImages, heroMedia] = await Promise.all([
    getSiteSettings(),
    getFeaturedActivities(),
    getPageContent('home'),
    getActivityCardImages(),
    getHeroMedia('home'),
  ])

  // Default images for activities (fallback if not in database)
  const defaultCardImages: Record<string, string> = {
    'the-lakes': '/images/IMG_4617.webp',
    'deer-hunting': '/images/IMG_2289.webp',
    'turkey-hunting': '/images/IMG_2294.webp',
    'bass-fishing': '/images/IMG_4635.webp',
  }

  // Merge database images with defaults
  const activityImages = { ...defaultCardImages, ...cardImages }

  const activities = featuredActivities.length > 0
    ? featuredActivities.map((a) => ({
        title: a.name,
        description: a.short_description || '',
        href: `/${a.slug}`,
        price: a.daily_rate ? `$${a.daily_rate}/day` : undefined,
        badge: a.type.includes('hunting') ? 'Popular' : undefined,
        image: activityImages[a.slug] || '/images/IMG_4617.webp',
      }))
    : defaultActivities

  const heroTitle = pageContent?.hero_title || settings?.site_name || "King's Family Lakes"
  const heroSubtitle = pageContent?.hero_subtitle || "Experience world-class hunting and fishing in the heart of Alabama. Three private lakes, premium hunting grounds, and unforgettable outdoor adventures await."
  const phone = settings?.phone || '+1 (334) 341-3753'
  const huntingRate = settings?.hunting_daily_rate || 300
  const lodgingRate = settings?.lodging_nightly_rate || 100
  // Home hero - use video from database if set, otherwise fallback
  const heroVideo = heroMedia.video || '/images/lake-overview.mp4'
  const heroImage = heroMedia.images[0]?.image_url || '/images/IMG_4617.webp'

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundVideo={heroVideo}
        backgroundImage={heroImage}
        ctaText="Book Your Adventure"
        ctaLink="/contact"
        secondaryCtaText="Explore Activities"
        secondaryCtaLink="#activities"
        size="large"
      />

      {/* Ad Banner - After Hero */}
      <AdBanner slot="hero-bottom" position="top" />

      {/* Activities Section */}
      <section id="activities" className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Our Activities"
            subtitle="From trophy bass fishing to world-class deer hunting, we offer unforgettable outdoor experiences for sportsmen of all skill levels."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <ActivityCard key={activity.title} {...activity} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Why Choose King's Family Lakes"
            subtitle="We've been welcoming hunters and anglers for generations. Here's what makes us special."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner - Middle */}
      <AdBanner slot="content-middle" position="middle" />

      {/* CTA Section */}
      <section className="py-20 bg-forest-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-forest-100 mb-8 max-w-2xl mx-auto">
            Book your hunting or fishing trip today. Contact us to check availability and plan your perfect outdoor getaway.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-forest-800 hover:bg-gray-100 text-lg">
              Contact Us
            </Link>
            <Link href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="btn border-2 border-white text-white hover:bg-white hover:text-forest-800 text-lg">
              Call {phone}
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Simple, Transparent Pricing"
            subtitle="Full day rates only - no half day options. No hidden fees, no trophy charges."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-500 mb-2">Hunting</h3>
              <div className="text-4xl font-bold text-forest-700 mb-2">${huntingRate}</div>
              <p className="text-gray-600">per person / full day</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-500 mb-2">Fishing</h3>
              <div className="text-4xl font-bold text-forest-700 mb-2">${settings?.fishing_daily_rate || 200}</div>
              <p className="text-gray-600">per person / full day</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-500 mb-2">Lodging</h3>
              <div className="text-4xl font-bold text-forest-700 mb-2">${lodgingRate}</div>
              <p className="text-gray-600">per person / night</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-500 mb-2">Trophy Fees</h3>
              <div className="text-4xl font-bold text-forest-700 mb-2">$0</div>
              <p className="text-gray-600">no hidden charges</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/deer-hunting" className="text-forest-700 font-semibold hover:text-forest-800">
              View all pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Banner - Pre-footer */}
      <AdBanner slot="pre-footer" position="bottom" />
    </>
  )
}
