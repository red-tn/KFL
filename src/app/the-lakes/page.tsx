import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'
import SectionHeader from '@/components/ui/SectionHeader'
import Gallery from '@/components/ui/Gallery'
import AdBanner from '@/components/ads/AdBanner'
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
    description: 'The largest of our three lakes, Lake Scott greets you immediately upon entering the property. With extensive tree cover providing shade and multiple docks positioned just a few hundred yards from the first Camp House, it offers convenient year-round fishing.',
    features: [
      'Largest lake on property',
      'Multiple fishing docks',
      'Close to main Camp House',
      'Large Mouth Bass & Brim',
      'Extensive tree cover',
      'Year-round access',
    ],
  },
  {
    name: 'Lake Shannon',
    size: '~15 acres',
    description: 'Located approximately 1/4 mile from Lake Scott, Lake Shannon is nestled in surrounding hills and dense forest offering quiet and peaceful fishing. The shallower waters create a dense fish population, and this lake is known for producing some of our largest Bass specimens.',
    features: [
      'Trophy bass fishing',
      'Peaceful, secluded setting',
      'Shallower waters',
      'Dense fish population',
      'Docks and boathouse',
      'Near second Camp House',
    ],
  },
  {
    name: 'Lake Patrick',
    size: '~10 acres',
    description: 'Our newest addition, Lake Patrick sits between Scott and Shannon. This recently constructed lake features a growing Large Mouth Bass population and offers excellent fishing opportunities with multiple docks and a dedicated boathouse.',
    features: [
      'Newest lake',
      'Growing bass population',
      'Multiple docks',
      'Dedicated boathouse',
      'Scenic location',
      'Less fishing pressure',
    ],
  },
]

// Fallback images if database is empty
const defaultGalleryImages = [
  { src: '/images/lake-scott-1.jpg', alt: 'Lake Scott at sunrise', caption: 'Lake Scott at sunrise' },
  { src: '/images/lake-scott-2.jpg', alt: 'Fishing dock on Lake Scott', caption: 'Fishing dock on Lake Scott' },
  { src: '/images/lake-shannon-1.jpg', alt: 'Lake Shannon from the hills', caption: 'Lake Shannon from the hills' },
  { src: '/images/lake-shannon-2.jpg', alt: 'Boathouse at Lake Shannon', caption: 'Boathouse at Lake Shannon' },
  { src: '/images/lake-patrick-1.jpg', alt: 'Lake Patrick dock', caption: 'Lake Patrick dock' },
  { src: '/images/bass-catch.jpg', alt: 'Trophy bass catch', caption: 'Trophy bass catch' },
]

export default async function TheLakesPage() {
  const [pageContent, dbImages] = await Promise.all([
    getPageContent('the-lakes'),
    getGalleryImages('lakes'),
  ])

  const heroTitle = pageContent?.hero_title || 'The Lakes'
  const heroSubtitle = pageContent?.hero_subtitle || 'Three pristine private lakes stocked with Large Mouth Bass and Brim. Year-round fishing in the heart of Alabama.'

  // Use database images if available, otherwise fallback
  const galleryImages = dbImages.length > 0
    ? dbImages.map((img) => ({ src: img.image_url, alt: img.title || 'Gallery image', caption: img.title || undefined }))
    : defaultGalleryImages

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        size="medium"
      />

      {/* Ad Banner */}
      <AdBanner slot="lakes-top" position="top" />

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
                {/* Image placeholder */}
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg">
                    <span className="text-white/40 text-3xl font-bold">{lake.name}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="inline-block bg-forest-100 text-forest-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {lake.size}
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

      {/* Ad Banner */}
      <AdBanner slot="lakes-middle" position="middle" />

      {/* Fish Species */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Fish Species"
            subtitle="All three lakes are stocked with healthy populations of game fish."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-5xl mb-4">🐟</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Large Mouth Bass</h3>
              <p className="text-gray-600">
                Trophy-sized bass throughout all three lakes. Lake Shannon is particularly known for producing our largest specimens.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-5xl mb-4">🐠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Brim (Bluegill)</h3>
              <p className="text-gray-600">
                Abundant brim populations make for excellent family fishing and provide great sport for anglers of all ages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Lake Gallery"
            subtitle="Take a visual tour of our beautiful private lakes."
          />
          <Gallery images={galleryImages} columns={3} />
        </div>
      </section>

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

      {/* Ad Banner */}
      <AdBanner slot="lakes-bottom" position="bottom" />
    </>
  )
}
