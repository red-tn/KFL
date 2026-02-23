'use client'

import { useState, useEffect } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  interest: string
  message: string
}

function generateChallenge() {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  return { question: `What is ${a} + ${b}?`, answer: String(a + b) }
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [challenge, setChallenge] = useState({ question: '', answer: '' })
  const [challengeInput, setChallengeInput] = useState('')
  const [challengeError, setChallengeError] = useState(false)

  useEffect(() => {
    setChallenge(generateChallenge())
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setChallengeError(false)

    if (challengeInput.trim() !== challenge.answer) {
      setChallengeError(true)
      setChallenge(generateChallenge())
      setChallengeInput('')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', interest: '', message: '' })
        setChallengeInput('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-forest-50 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-forest-800 mb-2">Message Sent!</h3>
        <p className="text-forest-700 mb-4">
          Thank you for contacting us. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-forest-700 font-semibold hover:text-forest-800"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-colors"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-colors"
          placeholder="your@email.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-colors"
          placeholder="(555) 555-5555"
        />
      </div>

      {/* Interest */}
      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
          I&apos;m interested in...
        </label>
        <select
          id="interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-colors"
        >
          <option value="">Select an option</option>
          <option value="deer-hunting">Deer Hunting</option>
          <option value="turkey-hunting">Turkey Hunting</option>
          <option value="fishing">Bass Fishing</option>
          <option value="lodging">Lodging Only</option>
          <option value="combination">Hunting + Fishing Combo</option>
          <option value="other">Other / General Inquiry</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-colors resize-none"
          placeholder="Tell us about your trip plans, questions, or preferred dates..."
        />
      </div>

      {/* Human Verification */}
      <div>
        <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 mb-2">
          Verify you&apos;re human: {challenge.question}
        </label>
        <input
          type="text"
          id="challenge"
          required
          value={challengeInput}
          onChange={(e) => { setChallengeInput(e.target.value); setChallengeError(false); }}
          className={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-forest-500 focus:border-forest-500 ${
            challengeError ? 'border-red-400 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Your answer"
          inputMode="numeric"
        />
        {challengeError && (
          <p className="text-red-600 text-sm mt-1">Incorrect answer. Please try again.</p>
        )}
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div className="bg-red-50 text-red-700 rounded-lg p-4">
          Something went wrong. Please try again or call us directly at +1 (334) 341-3753.
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        We typically respond within 24 hours. For faster service, call us directly.
      </p>
    </form>
  )
}
