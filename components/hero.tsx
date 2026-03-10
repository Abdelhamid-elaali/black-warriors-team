'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';
import ar from '@/dictionaries/ar.json';
import HeroBackground from './HeroBackground';

const dictionaries = { en, fr, ar } as const;
type Locale = keyof typeof dictionaries;

export function Hero() {
  const params = useParams();
  const currentLang = (params?.lang as Locale) || 'en';
  const dict = dictionaries[currentLang]?.home || dictionaries.en.home;

  return (
    <HeroBackground>
      <div className="w-full pt-20 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 inline-block">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              {dict.welcome}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6">
            BLACK <span className="text-accent">WARRIORS</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-4 max-w-2xl mx-auto">
            {dict.description}
          </p>

          <p className="text-base text-muted-foreground mb-12 max-w-xl mx-auto">
            {dict.established}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${currentLang}/squad`}
              className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-full transition-smooth hover:shadow-lg hover:glow-gold transform hover:scale-105"
            >
              {dict.viewSquad}
            </Link>
            <Link
              href={`/${currentLang}/recruitment`}
              className="px-8 py-4 border-2 border-accent text-accent font-bold rounded-full transition-smooth hover:bg-accent/10 flex items-center gap-2"
            >
              {dict.joinTeam} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </HeroBackground>
  );
}
