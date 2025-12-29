export const revalidate = 0 // Don't cache - always fetch fresh data

import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'
import ContactForm from '@/components/forms/ContactForm'
import AdBanner from '@/components/ads/AdBanner'
import Link from 'next/link'
import { getSiteSettings, getPageContent, getHeroMedia } from '@/lib/data'

export const metadata: Metadata = {
  title: "Contact Us | King's Family Lakes",
  description: 'Contact King\'s Family Lakes for booking inquiries, questions, or to plan your hunting and fishing trip. Call +1 (334) 341-3753 or email papakingj@gmail.com.',
}

const faqs = [
  {
    question: 'What is the cost for deer hunting?',
    answer: '$400 per person per day with lodging included. No trophy fees.',
  },
  {
    question: 'What is the cost for turkey hunting?',
    answer: '$1,000 per person for a 2-day hunt with lodging included. Spring season only (March 25 - May 8).',
  },
  {
    question: 'What is the cost for fishing?',
    answer: '$200 per person per day. Lodging available at $100/night. Access to all three private lakes.',
  },
  {
    question: 'Are meals included?',
    answer: 'No, bring your own food. Camp houses have full kitchens, and outdoor cookers & grills are furnished.',
  },
  {
    question: 'Do I need a hunting license?',
    answer: 'Yes, a valid Alabama hunting license is required. We can help guide you through the process.',
  },
  {
    question: 'How do I book?',
    answer: 'Call us at +1 (334) 341-3753 or fill out the contact form on this page. We\'ll get back to you within 24 hours.',
  },
]

export default async function ContactPage() {
  const [settings, pageContent, heroMedia] = await Promise.all([
    getSiteSettings(),
    getPageContent('contact'),
    getHeroMedia('contact'),
  ])

  const heroTitle = pageContent?.hero_title || 'Contact Us'
  const heroSubtitle = pageContent?.hero_subtitle || "Ready to book your adventure? Have questions? We're here to help."
  const heroVideo = heroMedia.video || null
  const heroImage = heroMedia.images[0]?.image_url || null
  const phone = settings?.phone || '+1 (334) 341-3753'
  const email = settings?.email || 'papakingj@gmail.com'
  const city = settings?.address_city || 'Epes'
  const state = settings?.address_state || 'Alabama'
  const facebookUrl = settings?.facebook_url || 'https://facebook.com/kingsfamilylakes'

  const contactInfo = [
    {
      type: 'Phone',
      value: phone,
      href: `tel:${phone.replace(/[^\d+]/g, '')}`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      description: 'Call us anytime',
    },
    {
      type: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      description: 'We respond within 24 hours',
    },
    {
      type: 'Location',
      value: `${city}, ${state}`,
      href: '/directions',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      description: 'I-20, Exit 23',
    },
    {
      type: 'Facebook',
      value: 'kingsfamilylakes',
      href: facebookUrl,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Follow us on Facebook',
    },
  ]

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundVideo={heroVideo || undefined}
        backgroundImage={heroImage || undefined}
        size="small"
      />

      {/* Ad Banner */}
      <AdBanner slot="contact-top" position="top" />

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.type}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-forest-50 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center text-forest-700 group-hover:bg-forest-700 group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{info.type}</div>
                      <div className="font-semibold text-gray-900 group-hover:text-forest-700">
                        {info.value}
                      </div>
                      <div className="text-sm text-gray-500">{info.description}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Booking CTA */}
              <div className="mt-8 p-6 bg-forest-700 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-2">Ready to Book?</h3>
                <p className="text-forest-100 mb-4">
                  The fastest way to book is to give us a call. We can check availability and answer any questions.
                </p>
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-2 bg-white text-forest-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="contact-middle" position="middle" />

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Find Us</h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53789.12345678901!2d-88.12345678901234!3d32.69876543210987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8889a5f8e3f4c5d7%3A0x1234567890abcdef!2sEpes%2C%20AL%2035460!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="King's Family Lakes Location"
              />
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-600 mb-2">{city}, {state} - I-20, Exit 23</p>
              <Link href="/directions" className="text-forest-700 font-semibold hover:text-forest-800">
                Get Detailed Directions →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="contact-bottom" position="bottom" />
    </>
  )
}
