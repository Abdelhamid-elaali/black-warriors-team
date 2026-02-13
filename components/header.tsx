'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Squad', href: '/squad' },
    { label: 'News', href: '/news' },
    { label: 'History', href: '/history' },
    { label: 'Media', href: '/media' },
    { label: 'Recruitment', href: '/recruitment' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center transition-all duration-300 hover:scale-110 hover:rotate-3">
          <img src="/logo.png" alt="BLACK WARRIORS" className="h-10 w-10 rounded-full" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium transition-all duration-300 hover:text-accent hover:scale-105 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="/recruitment"
            className="px-6 py-2 bg-accent text-accent-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:glow-gold hover:scale-105 hover:shadow-accent/25"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 transition-all duration-300 hover:bg-accent/10 rounded-lg"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border">
          <ul className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 rounded transition-all duration-300 hover:bg-accent/10 hover:text-accent hover:translate-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-border">
              <Link
                href="/recruitment"
                className="block px-4 py-2 bg-accent text-accent-foreground font-semibold rounded transition-all duration-300 text-center hover:scale-105 hover:shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Join Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
