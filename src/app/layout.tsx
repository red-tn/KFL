import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AdSenseScript from '@/components/ads/AdSenseScript'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: "King's Family Lakes | Hunting & Fishing in Alabama",
  description: 'Experience world-class deer hunting, turkey hunting, and bass fishing at King\'s Family Lakes in Alabama. Three private lakes, comfortable lodging, and unforgettable outdoor adventures.',
  keywords: 'Alabama hunting, deer hunting Alabama, turkey hunting, bass fishing, private hunting land, fishing lodge Alabama',
  openGraph: {
    title: "King's Family Lakes",
    description: 'Premier hunting and fishing destination in Alabama',
    url: 'https://kingsfamilylakes.com',
    siteName: "King's Family Lakes",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <AdSenseScript />
      </body>
    </html>
  )
}
