'use client';

import { Trophy, Medal, Target } from 'lucide-react';
import { useParams } from 'next/navigation';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';
import ar from '@/dictionaries/ar.json';

const dictionaries = { en, fr, ar } as const;
type Locale = keyof typeof dictionaries;

const ICONS = [
  <Trophy className="w-8 h-8" key="trophy" />,
  <Medal className="w-8 h-8" key="medal" />,
  <Target className="w-8 h-8" key="target" />,
];

export function Achievements() {
  const params = useParams();
  const currentLang = (params?.lang as Locale) || 'en';
  const t = dictionaries[currentLang]?.achievements || dictionaries.en.achievements;

  return (
    <section className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="text-accent">{t.title}</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          {t.description}
        </p>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.items.map((achievement, index) => (
            <div
              key={index}
              className={`group p-6 rounded-xl transition-smooth cursor-pointer ${
                index === 0
                  ? 'glass border border-accent/30 glow-gold'
                  : 'glass border border-border hover:border-accent/30'
              }`}
            >
              {/* Icon */}
              <div className={`mb-4 inline-block p-3 rounded-lg ${
                index === 0
                  ? 'bg-accent/20 text-accent'
                  : 'bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent'
              } transition-colors`}>
                {ICONS[index]}
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground text-sm">{achievement.description}</p>
              </div>

              {/* Date */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {achievement.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
