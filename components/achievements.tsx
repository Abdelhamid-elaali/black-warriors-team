'use client';

import { Trophy, Medal, Target } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  highlight: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Free Fire Asia Championship 2025',
    description: '1st Place - Regional Finals',
    date: 'January 2025',
    icon: <Trophy className="w-8 h-8" />,
    highlight: true,
  },
  {
    id: '2',
    title: 'Spring Invitational Tournament',
    description: '2nd Place - International League',
    date: 'March 2025',
    icon: <Medal className="w-8 h-8" />,
    highlight: false,
  },
  {
    id: '3',
    title: 'Competitive Kill Count Record',
    description: '1,247 eliminations in season',
    date: 'Ongoing',
    icon: <Target className="w-8 h-8" />,
    highlight: false,
  },
];

export function Achievements() {
  return (
    <section className="py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Recent <span className="text-accent">Achievements</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Our journey of excellence and competitive success in 2025.
        </p>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement) => (
            <div
              key={achievement.id}
              className={`group p-6 rounded-xl transition-smooth cursor-pointer ${
                achievement.highlight
                  ? 'glass border border-accent/30 glow-gold'
                  : 'glass border border-border hover:border-accent/30'
              }`}
            >
              {/* Icon */}
              <div className={`mb-4 inline-block p-3 rounded-lg ${
                achievement.highlight
                  ? 'bg-accent/20 text-accent'
                  : 'bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent'
              } transition-colors`}>
                {achievement.icon}
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
