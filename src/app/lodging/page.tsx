export const revalidate = 0 // Don't cache - always fetch fresh data

import { Metadata } from 'next'
import Image from 'next/image'
import Hero from '@/components/ui/Hero'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollableGallery from '@/components/ui/ScrollableGallery'
import Link from 'next/link'
import { getSiteSettings, getPageContent, getGalleryImages, getOverviewImage } from '@/lib/data'

export const metadata: Metadata = {
  title: "Lodging | King's Family Lakes",
  description: 'Two fully-equipped camp houses right on the water. Comfortable beds, full kitchens, and lakeside views at King\'s Family Lakes in Epes, Alabama.',
}

const amenities = [
  {
    title: 'Full Kitchens',
    description: 'Complete kitchen with cookware, utensils, and outdoor grills. Bring your own food and cook like home.',
  },
  {
    title: 'Comfortable Beds',
    description: 'Clean, comfortable bedding in every room. From twin beds to king-sized comfort.',
  },
  {
    title: 'Lakeside Location',
    description: 'Both camp houses sit right on the water with easy access to fishing and beautiful views.',
  },
  {
    title: 'Firewood Provided',
    description: 'Enjoy evenings by the fireplace or outdoor fire pit. Firewood is furnished for your stay.',
  },
]

export default async function LodgingPage() {
  const [settings, pageContent, dbImages, overviewImg] = await Promise.all([
    getSiteSettings(),
    getPageContent('lodging'),
    getGalleryImages('lodging'),
    getOverviewImage('lodging'),
  ])

  const heroTitle = pageContent?.hero_title || 'Lodging'
  const heroSubtitle = pageContent?.hero_subtitle || 'Two fully-equipped camp houses right on the water with comfortable beds, full kitchens, and everything you need for a great stay.'
  const phone = settings?.phone || '+1 (334) 341-3753'
  const heroVideo = pageContent?.hero_video_url || null
  const heroImage = '/images/IMG_4602.webp'
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

      {/* Camp House 1 - Lake Scott */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-200">
              <Image
                src="/images/IMG_4601.webp"
                alt="Camp House 1 on Lake Scott"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Camp House 1
              </h2>
              <p className="text-lg text-forest-700 font-medium mb-6">On Lake Scott</p>
              <p className="text-lg text-gray-600 mb-6">
                Our main camp house sits on the banks of Lake Scott and comfortably sleeps 8 guests. With 3 bedrooms and 2 full bathrooms, there&apos;s plenty of room for your group.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-forest-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-forest-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Master Bedroom</p>
                    <p className="text-gray-600">Full private bath attached</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-forest-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-forest-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Front Room</p>
                    <p className="text-gray-600">2 twin beds</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-forest-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-forest-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Third Bedroom</p>
                    <p className="text-gray-600">2 queen beds</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-forest-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-forest-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Full Kitchen & Supplies</p>
                    <p className="text-gray-600">Cookware, utensils, outdoor cookers and grills</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center bg-forest-50 text-forest-800 rounded-lg px-4 py-2 font-medium">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                Sleeps 8 &middot; 2 Full Bathrooms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Camp House 2 - Lake Shannon */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Camp House 2
              </h2>
              <p className="text-lg text-forest-700 font-medium mb-6">On Lake Shannon</p>
              <p className="text-lg text-gray-600 mb-6">
                Our second camp house sits on Lake Shannon and features 4 sleeping areas including a spacious loft. The large living area with fireplace is perfect for gathering after a day in the field.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-earth-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-earth-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Twin Room</p>
                    <p className="text-gray-600">Comfortable twin beds</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-earth-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-earth-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">2 King Rooms</p>
                    <p className="text-gray-600">King beds with shared bath between</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-earth-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-earth-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Loft</p>
                    <p className="text-gray-600">Queen bed with full private bath</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-earth-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-earth-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Spacious Living Area</p>
                    <p className="text-gray-600">Fireplace, full kitchen, firewood furnished</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center bg-earth-50 text-earth-800 rounded-lg px-4 py-2 font-medium">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
                4 Sleep Rooms &middot; Fireplace &middot; Full Kitchen
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-200 order-1 lg:order-2">
              <Image
                src="/images/IMG_4644.webp"
                alt="Camp House 2 living area with fireplace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Amenities"
            subtitle="Everything you need for a comfortable stay in the Alabama outdoors."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {amenities.map((amenity) => (
              <div key={amenity.title} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-forest-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{amenity.title}</h3>
                  <p className="text-gray-600">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-800 mb-2">Meals Not Included</h3>
            <p className="text-amber-700">
              Bring your own food. Camp houses have full kitchens, and outdoor cookers and grills are furnished for your use.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">$100 / Night</h2>
            <p className="text-lg text-gray-600 mb-6">
              Lodging is included with all hunting packages. For fishing-only trips or standalone stays, camp houses are available at $100 per night.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/deer-hunting" className="text-forest-700 font-semibold hover:text-forest-800 inline-flex items-center">
                View Hunting Packages
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/bass-fishing" className="text-forest-700 font-semibold hover:text-forest-800 inline-flex items-center">
                View Fishing Packages
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionHeader
              title="Gallery"
              subtitle="Take a look inside our camp houses and see what awaits you."
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
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Stay?</h2>
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

    </>
  )
}
