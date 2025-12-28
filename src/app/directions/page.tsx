import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'
import SectionHeader from '@/components/ui/SectionHeader'
import AdBanner from '@/components/ads/AdBanner'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "How to Get Here | King's Family Lakes",
  description: 'Directions to King\'s Family Lakes in Epes, Alabama. Located off I-20 Exit 23, easy access from Birmingham, Tuscaloosa, and Meridian.',
}

const directions = [
  {
    step: 1,
    instruction: 'Take Interstate 20 to Exit 23',
    detail: 'This is the Epes exit',
  },
  {
    step: 2,
    instruction: 'Exit onto Main Street, heading east',
    detail: 'Turn right at the exit ramp',
  },
  {
    step: 3,
    instruction: 'Turn right at the next intersection',
    detail: 'Onto Cedar Hill Drive',
  },
  {
    step: 4,
    instruction: 'Turn right onto Dr. Martin Luther King Jr Highway',
    detail: 'At the next intersection',
  },
  {
    step: 5,
    instruction: 'Continue approximately 1.4 miles',
    detail: 'Stay on MLK Jr Highway',
  },
  {
    step: 6,
    instruction: 'Turn left onto Clark Miller Lane',
    detail: 'Look for the turn',
  },
  {
    step: 7,
    instruction: 'Follow the dirt road to the gate',
    detail: 'Located near a cemetery, past the railroad tracks',
  },
]

const landmarks = [
  {
    name: 'Interstate 20',
    description: 'Major highway connecting Birmingham to Jackson, MS',
    icon: '🛣️',
  },
  {
    name: 'Exit 23 (Epes)',
    description: 'Your exit - look for Epes signs',
    icon: '🚗',
  },
  {
    name: 'Cemetery',
    description: 'Located near our gate entrance',
    icon: '⛪',
  },
  {
    name: 'Railroad Tracks',
    description: 'Cross these just before the gate',
    icon: '🚂',
  },
]

const distances = [
  { from: 'Birmingham, AL', distance: '~90 miles', time: '~1.5 hours' },
  { from: 'Tuscaloosa, AL', distance: '~45 miles', time: '~50 minutes' },
  { from: 'Meridian, MS', distance: '~50 miles', time: '~55 minutes' },
  { from: 'Montgomery, AL', distance: '~130 miles', time: '~2 hours' },
]

export default function DirectionsPage() {
  return (
    <>
      <Hero
        title="How to Get Here"
        subtitle="Located in Epes, Alabama - just off Interstate 20, Exit 23. Easy to find, hard to leave."
        backgroundImage="https://i0.wp.com/kingsfamilylakes.com/wp-content/uploads/2021/10/IMG_4628.jpeg"
        size="small"
      />

      {/* Ad Banner */}
      <AdBanner slot="directions-top" position="top" />

      {/* Quick Info */}
      <section className="py-8 bg-forest-700 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold">I-20, Exit 23</div>
              <div className="text-forest-200">Epes, Alabama</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-forest-500" />
            <div>
              <div className="text-2xl font-bold">+1 (334) 341-3753</div>
              <div className="text-forest-200">Call if you get lost</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-forest-500" />
            <div>
              <div className="text-2xl font-bold">Clark Miller Lane</div>
              <div className="text-forest-200">Look for the gate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Directions */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Step-by-Step Directions"
            subtitle="Follow these directions from Interstate 20"
          />

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-forest-200" />

              {/* Steps */}
              <div className="space-y-6">
                {directions.map((dir) => (
                  <div key={dir.step} className="flex items-start gap-6">
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-forest-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {dir.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-gray-900 text-lg">{dir.instruction}</h3>
                      <p className="text-gray-600">{dir.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="directions-middle" position="middle" />

      {/* Landmarks */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Landmarks to Look For"
            subtitle="Key points to help you navigate"
          />

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {landmarks.map((landmark) => (
              <div key={landmark.name} className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-3xl mb-3">{landmark.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{landmark.name}</h3>
                <p className="text-gray-600 text-sm">{landmark.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distance Table */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Distance from Major Cities"
            subtitle="Plan your travel time"
          />

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-forest-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">From</th>
                    <th className="px-6 py-4 text-center font-semibold">Distance</th>
                    <th className="px-6 py-4 text-center font-semibold">Drive Time</th>
                  </tr>
                </thead>
                <tbody>
                  {distances.map((d, index) => (
                    <tr key={d.from} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{d.from}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{d.distance}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{d.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title="Map"
            subtitle="Our location in Epes, Alabama"
          />

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">📍</div>
                <p className="text-gray-500">Interactive map will display here</p>
                <a
                  href="https://maps.google.com/?q=Epes,Alabama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-forest-700 font-semibold hover:text-forest-800"
                >
                  Open in Google Maps
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lost? */}
      <section className="py-16 bg-earth-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Lost or Need Help?</h2>
          <p className="text-xl text-earth-100 mb-8">
            Give us a call and we&apos;ll help guide you in.
          </p>
          <Link href="tel:+13343413753" className="btn bg-white text-earth-700 hover:bg-gray-100 text-lg">
            Call +1 (334) 341-3753
          </Link>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="directions-bottom" position="bottom" />
    </>
  )
}
