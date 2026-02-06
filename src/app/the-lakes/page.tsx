export const revalidate = 0 // Don't cache - always fetch fresh data

import { Metadata } from 'next'
import Image from 'next/image'
import Hero from '@/components/ui/Hero'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollableGallery from '@/components/ui/ScrollableGallery'
import Link from 'next/link'
import { getPageContent, getGalleryImages } from '@/lib/data'

export const metadata: Metadata = {
  title: "The Lakes | King's Family Lakes",
  description: 'Explore our three private lakes - Lake Scott, Lake Shannon, and Lake Patrick. Year-round fishing for Large Mouth Bass and Brim in pristine Alabama waters.',
}

const lakes = [
  {
    name: 'Lake Scott',
    size: '~35 acres',
    species: 'Florida Strain Bass',
    description: 'The largest of our three lakes, Lake Scott greets you immediately upon entering the property. Stocked with Florida strain bass, this lake has produced bass in the 10-14 lb range. Multiple docks positioned just a few hundred yards from the first Camp House offer convenient year-round fishing.',
    image: '/images/IMG_4617.webp',
    features: [
      'Largest lake on property',
      'Florida strain bass (10-14 lbs)',
      'Multiple fishing docks',
      'Close to main Camp House',
      'Extensive tree cover',
      'Brim & Bluegill',
    ],
  },
  {
    name: 'Lake Shannon',
    size: '~15 acres',
    species: 'F1 Hybrid Bass (Florida x Northern)',
    description: 'Home to our trophy F1 hybrid bass - a cross between Florida and Northern strains. Lake Shannon has produced bass up to 15 lbs, with consistent catches in the 10-14 lb range. The shallower waters concentrate fish, making this our premier trophy fishing destination.',
    image: '/images/IMG_4633.webp',
    features: [
      'Trophy bass up to 15 lbs',
      'F1 hybrid bass',
      'Peaceful, secluded setting',
      'Dense fish population',
      'Docks and boathouse',
      'Near second Camp House',
    ],
  },
  {
    name: 'Lake Patrick',
    size: '~10 acres',
    species: 'Northern Strain Bass',
    description: 'Our newest addition, Lake Patrick is stocked exclusively with Northern strain bass. These aggressive fighters offer excellent sport fishing with less pressure than the other lakes. Multiple docks and a dedicated boathouse provide easy access.',
    image: '/images/IMG_4597.webp',
    features: [
      'Northern strain bass',
      'Less fishing pressure',
      'Aggressive fighters',
      'Multiple docks',
      'Dedicated boathouse',
      'Growing population',
    ],
  },
]

export default async function TheLakesPage() {
  const [pageContent, dbImages] = await Promise.all([
    getPageContent('the-lakes'),
    getGalleryImages('lakes'),
  ])

  const heroTitle = pageContent?.hero_title || 'The Lakes'
  const heroSubtitle = pageContent?.hero_subtitle || 'Three pristine private lakes stocked with Large Mouth Bass and Brim. Year-round fishing in the heart of Alabama.'
  // Static hero - video URL can be set in page_content.hero_video_url
  const heroVideo = pageContent?.hero_video_url || null
  const heroImage = '/images/IMG_4628.webp'

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

      {/* Lakes Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Our Three Lakes"
            subtitle="Each lake offers a unique fishing experience, from the expansive waters of Lake Scott to the trophy bass haven of Lake Shannon."
          />

          <div className="space-y-16">
            {lakes.map((lake, index) => (
              <div
                key={lake.name}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Lake Image */}
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={lake.image}
                      alt={lake.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex gap-2 mb-4">
                    <span className="inline-block bg-forest-100 text-forest-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {lake.size}
                    </span>
                    <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {lake.species}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{lake.name}</h3>
                  <p className="text-gray-600 mb-6">{lake.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {lake.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-forest-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fish Species */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Bass Strains & Species"
            subtitle="Each lake features different bass genetics for varied fishing experiences."
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">F1 Hybrid Bass</h3>
              <p className="text-sm text-primary-700 font-medium mb-2">Lake Shannon</p>
              <p className="text-gray-600 text-sm">
                Cross between Florida and Northern strains. Best of both worlds - fast growth and aggressive fighting. Trophy catches up to 15 lbs.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl mb-3">🐟</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Florida Strain</h3>
              <p className="text-sm text-primary-700 font-medium mb-2">Lake Scott</p>
              <p className="text-gray-600 text-sm">
                Known for growing to trophy sizes. Lake Scott has produced bass in the 10-14 lb range with excellent structure for big bass.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Northern Strain</h3>
              <p className="text-sm text-primary-700 font-medium mb-2">Lake Patrick</p>
              <p className="text-gray-600 text-sm">
                Aggressive fighters known for their tenacity. Less fishing pressure means more active, eager-to-bite bass.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md max-w-2xl mx-auto text-center">
            <div className="text-4xl mb-3">🐠</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Brim & Bluegill</h3>
            <p className="text-gray-600 text-sm">
              Abundant populations in all three lakes. Great for family fishing and anglers of all skill levels.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionHeader
              title="Lake Gallery"
              subtitle="Take a visual tour of our beautiful private lakes."
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
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Cast Your Line?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Fishing is included with all hunting packages and lodging stays.
          </p>
          <Link href="/contact" className="btn bg-white text-primary-700 hover:bg-gray-100">
            Book Your Stay
          </Link>
        </div>
      </section>

    </>
  )
}
