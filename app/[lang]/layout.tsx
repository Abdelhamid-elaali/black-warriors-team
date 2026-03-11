import type { Metadata, Viewport } from 'next'
import { Nova_Square } from 'next/font/google'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/ThemeProvider'

import '../globals.css'

const novaSquare = Nova_Square({ subsets: ['latin'], weight: '400', variable: '--font-nova-square' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://blackwarriors.vercel.app'),
  title: {
    default: 'BLACK WARRIORS | Professional Esports Organization',
    template: '%s | BLACK WARRIORS',
  },
  description: "MENA's premier Free Fire esports organization. Meet our squad of elite players competing at the highest levels of competitive gaming.",
  generator: 'Next.js',
  applicationName: 'Black Warriors Esports',
  referrer: 'origin-when-cross-origin',
  keywords: ['esports', 'free fire', 'gaming', 'competitive', 'black warriors', 'mena esports', 'tournament'],
  authors: [{ name: 'Black Warriors Team' }],
  creator: 'Black Warriors',
  publisher: 'Black Warriors',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'BLACK WARRIORS - Elite Esports Organization',
    description: "Join the ranks of MENA's most dominant Free Fire team.",
    url: '/',
    siteName: 'Black Warriors Esports',
    images: [
      {
        url: '/og-image.jpg', // A fallback image we can rely on
        width: 1200,
        height: 630,
        alt: 'Black Warriors Esports Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLACK WARRIORS - Elite Esports Organization',
    description: "Join the ranks of MENA's most dominant Free Fire team.",
    images: ['/og-image.jpg'],
    creator: '@BlackWarriors',
  },
  verification: {
    google: '02q_etg2ynFMxqr60M2bJ1EBvuAhP57Jqu5tSye6GA4',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'fr': '/fr',
      'ar': '/ar',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0a',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      {/* Prevent FOUC: apply saved theme before React hydrates */}
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var t=localStorage.getItem('bw-theme');document.documentElement.classList.add(t==='light'?'light':'dark');})()`
        }} />
      </head>
      <body className={`${novaSquare.variable} font-nova antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SportsOrganization',
              name: 'Black Warriors',
              alternateName: 'Black Warriors Esports',
              url: 'https://blackwarriors.vercel.app',
              logo: 'https://blackwarriors.vercel.app/logo.png',
              sameAs: [
                'https://www.facebook.com/',
                'https://ig.me/j/AbYKdGnbOA-s7r2_/',
                'https://twitter.com/',
                'https://www.youtube.com/@BLACKWARROIRS'
              ]
            })
          }}
        />
        <ThemeProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
