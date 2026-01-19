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
  title: "Deer Hunting | King's Family Lakes",
  description: 'World-class White Tail Deer hunting in Alabama. $400/day with lodging included. Well-maintained blinds and manicured pastures.',
}

const features = [
  {
    title: 'Well-Maintained Blinds',
    description: 'Strategically positioned hunting blinds with shelter from the elements, overlooking manicured pastures.',
  },
  {
    title: 'No Trophy Fees',
    description: 'Simple, transparent pricing. Pay for your hunt, not for what you harvest.',
  },
  {
    title: 'Comfortable Lodging',
    description: 'Two camp houses available with modern amenities for a comfortable stay.',
  },
  {
    title: 'Year-Round Management',
    description: 'Property maintained year-round to support healthy deer populations.',
  },
]

const regulations = [
  {
    title: 'License Required',
    content: 'Valid Alabama hunting permit required for all hunters.',
  },
  {
    title: 'Season Limits',
    content: 'One antlered buck per day, three-buck combined season limit. One buck must have at least 4 antler points 1" or longer on one antler.',
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
    content: 'Deer harvest records must be in possession while hunting.',
  },
]

export default async function DeerHuntingPage() {
  const [settings, pageContent, dbImages, overviewImg] = await Promise.all([
    getSiteSettings(),
    getPageContent('deer-hunting'),
    getGalleryImages('deer-hunting'),
    getOverviewImage('deer-hunting'),
  ])

  const heroTitle = pageContent?.hero_title || 'Deer Hunting'
  const heroSubtitle = pageContent?.hero_subtitle || 'A world-class White Tail Deer hunting experience with well-maintained property, strategic blinds, and comfortable accommodations.'
  const phone = settings?.phone || '+1 (334) 341-3753'
  // Static hero - video URL can be set in page_content.hero_video_url
  const heroVideo = pageContent?.hero_video_url || null
  const heroImage = '/images/IMG_2289.webp'
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

      {/* Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                World-Class Hunting Awaits
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                King&apos;s Family Lakes offers a premier White Tail Deer hunting experience in the heart of Alabama. Our property features well-maintained hunting blinds strategically positioned overlooking manicured pastures, providing optimal hunting conditions throughout the season.
              </p>
              <p className="text-gray-600 mb-8">
                With adequate cover and carefully managed food plots, our property supports a healthy deer population. Whether you&apos;re a seasoned hunter or experiencing your first Alabama hunt, our grounds offer an unforgettable experience.
              </p>
              <Link href="/contact" className="btn-primary">
                Book Your Hunt
              </Link>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-200">
              {overviewImage && (
                <Image
                  src={overviewImage}
                  alt="Deer hunting at King's Family Lakes"
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Pricing"
            subtitle="Simple, transparent pricing with no hidden fees or trophy charges."
          />

          <div className="max-w-xl mx-auto">
            <PricingCard
              title="Full Day Deer Hunt"
              price="$400"
              period="/person/day"
              description="Complete deer hunting experience"
              features={[
                'Full day hunting (no half days)',
                'Lodging included',
                'Access to all hunting blinds',
                'Property guide orientation',
                'Game processing area access',
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

      
      <AdBanner slot="deer-middle" position="middle" />

      {/* Features */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="What We Offer"
            subtitle="Everything you need for a successful and comfortable hunting experience."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-earth-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-earth-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section className="section-padding bg-forest-50">
        <div className="container-custom">
          <SectionHeader
            title="Alabama Deer Hunting Regulations"
            subtitle="Important rules and requirements for hunting in Alabama."
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
      {galleryImages.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionHeader
              title="Gallery"
              subtitle="See our hunting grounds and past successful hunts."
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
      <section className="py-16 bg-earth-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Hunt?</h2>
          <p className="text-xl text-earth-100 mb-8">
            Contact us to check availability and reserve your dates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-earth-700 hover:bg-gray-100">
              Contact Us
            </Link>
            <Link href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="btn border-2 border-white text-white hover:bg-white hover:text-earth-700">
              Call {phone}
            </Link>
          </div>
        </div>
      </section>

      
      <AdBanner slot="deer-bottom" position="bottom" />
    </>
  )
}
