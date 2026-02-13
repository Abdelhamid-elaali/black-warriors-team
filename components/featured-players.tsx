'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  role: string;
  nickname: string;
  image: string;
}

const FEATURED_PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Arjun Singh',
    role: 'AWM Specialist',
    nickname: 'LBOSS',
    image: '/Admin.png',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Assault Leader',
    nickname: 'TITAN',
    image: '/fitgirl.png',
  },
  {
    id: '3',
    name: 'Rohan Verma',
    role: 'Support Specialist',
    nickname: 'Chinwi',
    image: '/Blue White Modern Neurologist Instagram Post.png',
  },
  {
    id: '4',
    name: 'Vikram Patel',
    role: 'In-Game Leader (IGL)',
    nickname: 'ARYANA',
    image: '/Comptable.png',
  },
];

export function FeaturedPlayers() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet <span className="text-accent">Our Squad</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Five exceptional players united by one mission: dominance in competitive Free Fire.
            </p>
          </div>
          <Link
            href="/squad"
            className="hidden md:flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-smooth"
          >
            View Full Squad <ArrowRight size={20} />
          </Link>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PLAYERS.map((player) => (
            <Link
              key={player.id}
              href={`/players/${player.id}`}
              className="group relative overflow-hidden rounded-lg transition-smooth"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-card">
                {/* Player Image */}
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Player Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">
                    {player.role}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{player.nickname}</h3>
                  <p className="text-sm text-gray-300">{player.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex md:hidden justify-center mt-12">
          <Link
            href="/squad"
            className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-full transition-smooth hover:bg-accent/10 flex items-center gap-2"
          >
            View Full Squad <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
