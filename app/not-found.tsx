'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import HeroBackground from '@/components/HeroBackground';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';
import ar from '@/dictionaries/ar.json';
import { Nova_Square } from 'next/font/google';
import './globals.css';

const novaSquare = Nova_Square({ subsets: ['latin'], weight: '400', variable: '--font-nova-square' });

const dictionaries = { en, fr, ar } as const;
type Locale = keyof typeof dictionaries;

export default function NotFound() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState<Locale>('en');

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/');
      if (segments.length > 1 && (['en', 'fr', 'ar'].includes(segments[1]))) {
        setCurrentLang(segments[1] as Locale);
      }
    }
    setMounted(true);
  }, [pathname]);

  // Use 'en' as the default stable state for SSR to prevent Hydration Mismatch
  const renderLang = mounted ? currentLang : 'en';
  const t = dictionaries[renderLang]?.notFound || dictionaries.en.notFound;

  return (
    <html lang={renderLang} dir={renderLang === 'ar' ? 'rtl' : 'ltr'} className="dark" suppressHydrationWarning>
      <body className={`${novaSquare.variable} font-nova antialiased flex flex-col min-h-screen bg-background text-foreground`} suppressHydrationWarning>
        <HeroBackground>
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            {/* Animated 404 block */}
            <div className="relative mb-8">
              <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-accent to-accent/20 select-none animate-pulse">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-accent/10 blur-xl select-none">
                  404
                </h1>
              </div>
            </div>

            {/* Messaging */}
            <div className="max-w-xl mx-auto space-y-6">
              <div className="flex items-center justify-center gap-3 text-accent mb-2">
                <AlertTriangle className="text-accent" size={32} />
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest">
                  {t.title}
                </h2>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t.description}
              </p>

              {/* Action Button */}
              <div className="pt-8">
                <Link
                  href={`/${currentLang}`}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                  <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  {t.button}
                </Link>
              </div>
            </div>

            {/* Tactical HUD accents (additional) */}
            <div className="absolute bottom-10 left-10 hidden xl:block opacity-30 text-left">
              <div className="text-[10px] font-mono text-accent space-y-1">
                <p>&gt; STATUS: ERROR_NOT_FOUND</p>
                <p>&gt; LOCALIZATION: {currentLang.toUpperCase()}</p>
                <p>&gt; COORDINATES: UNKNOWN</p>
              </div>
            </div>
          </div>
        </HeroBackground>
      </body>
    </html>
  );
}
