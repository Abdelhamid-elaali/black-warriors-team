'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 gradient-overlay z-0" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="mb-8 inline-block">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Welcome to</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6">
          BLACK <span className="text-accent">WARRIORS</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-4 max-w-2xl mx-auto">
          Dominating Free Fire with precision, strategy, and unmatched teamwork. Join the revolution.
        </p>

        <p className="text-base text-muted-foreground mb-12 max-w-xl mx-auto">
          Established as one of Asia's premier esports organizations, we represent excellence in competitive gaming.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/squad"
            className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-full transition-smooth hover:shadow-lg hover:glow-gold transform hover:scale-105"
          >
            View Squad
          </Link>
          <Link
            href="/recruitment"
            className="px-8 py-4 border-2 border-accent text-accent font-bold rounded-full transition-smooth hover:bg-accent/10 flex items-center gap-2"
          >
            Join Our Team <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
