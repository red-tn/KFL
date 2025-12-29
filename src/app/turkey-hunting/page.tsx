export const revalidate = 0 // Don't cache - always fetch fresh data

import { Metadata } from 'next'
import Image from 'next/image'
import Hero from '@/components/ui/Hero'
import SectionHeader from '@/components/ui/SectionHeader'
import PricingCard from '@/components/ui/PricingCard'
import ScrollableGallery from '@/components/ui/ScrollableGallery'
import AdBanner from '@/components/ads/AdBanner'
import Link from 'next/link'
import { getSiteSettings, getPageContent, getGalleryImages, getOverviewImage } from '@/lib/data'

export const metadata: Metadata = {
  title: "Turkey Hunting | King's Family Lakes",
  description: 'Premium spring turkey hunting in Alabama. $1,000 for 2-day hunt with lodging included. Expert grounds management and strategic blind placement.',
}

const seasons = [
  {
    name: 'Spring Turkey Season',
    dates: 'March 25 - May 8, 2025',
    notes: 'Zone 1 (Sumter County). Decoys allowed April 4 - May 8. Youth hunt March 21-22.',
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
    content: 'One gobbler per day; four gobbler bag limit during combined fall and spring season.',
  },
  {
    title: 'License Required',
    content: 'Valid Alabama hunting license and turkey stamp required for all hunters.',
  },
  {
    title: 'Decoy Restrictions',
    content: 'Decoys prohibited during first 10 days of season. Mechanical decoys are illegal.',
  },
  {
    title: 'No Baiting',
    content: 'Hunting with bait is illegal in Alabama.',
  },
  {
    title: 'Harvest Reporting',
    content: 'Must record harvest immediately and report within 48 hours via Game Check app.',
  },
  {
    title: 'Written Permission',
    content: 'Written permission from landowner required (provided upon booking).',
  },
]

export default async function TurkeyHuntingPage() {
  const [settings, pageContent, dbImages, overviewImg] = await Promise.all([
    getSiteSettings(),
    getPageContent('turkey-hunting'),
    getGalleryImages('turkey-hunting'),
    getOverviewImage('turkey-hunting'),
  ])

  const heroTitle = pageContent?.hero_title || 'Turkey Hunting'
  const heroSubtitle = pageContent?.hero_subtitle || 'A turkey hunting experience that is second to none. Year-round grounds management and strategically positioned blinds for optimal success.'
  const phone = settings?.phone || '+1 (334) 341-3753'
  // Static hero - video URL can be set in page_content.hero_video_url
  const heroVideo = pageContent?.hero_video_url || null
  const heroImage = '/images/IMG_2294.webp'
  const overviewImage = overviewImg || null

  // Use database images only - manage in admin
  const galleryImages = dbImages.map((img) => ({ src: img.image_url, alt: img.title || 'Gallery image', caption: img.title || undefined, rotation: img.rotation || 0 }))

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundVideo={heroVideo || undefined}
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
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-200">
                {overviewImage && (
                  <Image
                    src={overviewImage}
                    alt="Turkey hunting at King's Family Lakes"
                    fill
                    className="object-cover"
                  />
                )}
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
            subtitle="Spring season in Zone 1 (Sumter County)"
          />

          <div className="flex justify-center">
            {seasons.map((season) => (
              <div key={season.name} className="bg-white rounded-xl p-8 shadow-md text-center max-w-md w-full">
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

          <div className="max-w-xl mx-auto">
            <PricingCard
              title="2-Day Turkey Hunt Package"
              price="$1,000"
              period="/person"
              description="Complete turkey hunting experience"
              features={[
                'Two full days of hunting',
                'Lodging included (2 nights)',
                'Access to all hunting areas',
                'Strategic blind placements',
                'Property orientation',
                'No trophy fees',
                'Lake access included',
              ]}
              highlighted
            />
          </div>

          <div className="mt-8 max-w-xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-800 mb-2">Meals Not Included</h3>
            <p className="text-amber-700">
              Bring your own food. Camp houses have full kitchens, and outdoor cookers and grills are furnished for your use.
            </p>
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
              href="https://www.outdooralabama.com/seasons-and-bag-limits/turkey-season"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest-700 font-semibold hover:text-forest-800 inline-flex items-center"
            >
              View Official Alabama Turkey Season Regulations
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
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
      )}

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
