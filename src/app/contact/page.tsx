import { Metadata } from 'next'
import Hero from '@/components/ui/Hero'
import ContactForm from '@/components/forms/ContactForm'
import AdBanner from '@/components/ads/AdBanner'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Contact Us | King's Family Lakes",
  description: 'Contact King\'s Family Lakes for booking inquiries, questions, or to plan your hunting and fishing trip. Call +1 (334) 341-3753 or email papakingj@gmail.com.',
}

const contactInfo = [
  {
    type: 'Phone',
    value: '+1 (334) 341-3753',
    href: 'tel:+13343413753',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    description: 'Call us anytime',
  },
  {
    type: 'Email',
    value: 'papakingj@gmail.com',
    href: 'mailto:papakingj@gmail.com',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    description: 'We respond within 24 hours',
  },
  {
    type: 'Location',
    value: 'Epes, Alabama',
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
    href: 'https://facebook.com/kingsfamilylakes',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
    description: 'Follow us on Facebook',
  },
]

const faqs = [
  {
    question: 'What is the cost for hunting?',
    answer: '$300 per person per day for both deer and turkey hunting. No trophy fees.',
  },
  {
    question: 'Is lodging available?',
    answer: 'Yes! We have two camp houses available for $100 per night with full amenities.',
  },
  {
    question: 'Do I need a hunting license?',
    answer: 'Yes, a valid Alabama hunting permit is required. We can help guide you through the process.',
  },
  {
    question: 'Is fishing included?',
    answer: 'Yes, lake access and fishing is included free with all hunting packages and lodging stays.',
  },
  {
    question: 'How do I book?',
    answer: 'Call us at +1 (334) 341-3753 or fill out the contact form on this page. We\'ll get back to you within 24 hours.',
  },
]

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="Ready to book your adventure? Have questions? We're here to help."
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
                  href="tel:+13343413753"
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
            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">📍</div>
                <p className="text-gray-600 mb-2">Epes, Alabama - I-20, Exit 23</p>
                <Link href="/directions" className="text-forest-700 font-semibold hover:text-forest-800">
                  Get Directions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slot="contact-bottom" position="bottom" />
    </>
  )
}
