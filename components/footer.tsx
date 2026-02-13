'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = mounted ? new Date().getFullYear() : 2025;

  const sections = [
    {
      title: 'About',
      links: [
        { label: 'Squad', href: '/squad' },
        { label: 'History', href: '/history' },
        { label: 'Media', href: '/media' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'News', href: '/news' },
        { label: 'Squad', href: '/squad' },
        { label: 'Recruitment', href: '/recruitment' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Discord', href: '#' },
        { label: 'Contact', href: '/recruitment' },
        { label: 'Sponsorships', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="BLACK WARRIORS" className="h-14 w-14 rounded-full" />
            </div>
            <p className="text-sm text-muted-foreground">
              Asia's premier Free Fire esports organization. Established to dominate.
            </p>
          </div>

          {/* Link Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-4 text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-smooth hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} BLACK WARRIORS. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="p-2 rounded-lg bg-muted text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground"
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
