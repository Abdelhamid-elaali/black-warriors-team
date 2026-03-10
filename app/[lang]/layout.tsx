import type { Metadata, Viewport } from 'next'
import { Nova_Square } from 'next/font/google'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/ThemeProvider'

import '../globals.css'

const novaSquare = Nova_Square({ subsets: ['latin'], weight: '400', variable: '--font-nova-square' })

export const metadata: Metadata = {
  title: 'BLACK WARRIORS - Free Fire Esports Team',
  description: 'MENA\'s premier Free Fire esports organization. Meet our squad of elite players competing at the highest levels of competitive gaming.',
  generator: 'BW',
  keywords: 'esports, free fire, gaming, competitive, warriors',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
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
