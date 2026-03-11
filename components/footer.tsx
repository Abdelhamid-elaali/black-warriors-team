'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';
import ar from '@/dictionaries/ar.json';

const dictionaries = { en, fr, ar } as const;
type Locale = keyof typeof dictionaries;

export function Footer() {
  const params = useParams();
  const currentLang = (params?.lang as Locale) || 'en';
  const t = dictionaries[currentLang]?.footer || dictionaries.en.footer;
  const nav = dictionaries[currentLang]?.nav || dictionaries.en.nav;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = mounted ? new Date().getFullYear() : 2025;

  const sections = [
    {
      title: t.about,
      links: [
        { label: nav.squad, href: `/${currentLang}/squad` },
        { label: nav.history, href: `/${currentLang}/history` },
        { label: nav.media, href: `/${currentLang}/media` },
      ],
    },
    {
      title: t.community,
      links: [
        { label: nav.news, href: `/${currentLang}/news` },
        { label: nav.squad, href: `/${currentLang}/squad` },
        { label: nav.recruitment, href: `/${currentLang}/recruitment` },
      ],
    },
    {
      title: t.connect,
      links: [
        { label: 'Discord', href: 'https://discord.gg/wJs82Mh3G3' },
        { label: t.contact, href: `/${currentLang}/recruitment` },
        { label: t.sponsorships, href: '#LBOSS-GROUP' },
      ],
    },
  ];

  const socialLinks = [
    { icon: MessageCircle, href: 'https://chat.whatsapp.com/GbJJ7rG3uGWCDifgNWyPm2', label: 'WhatsApp' },
    { icon: Facebook, href: 'https://www.facebook.com/', label: 'Facebook' },
    { icon: Instagram, href: 'https://ig.me/j/AbYKdGnbOA-s7r2_/', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
    { icon: Youtube, href: 'https://www.youtube.com/@BLACKWARROIRS', label: 'YouTube' },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="BLACK WARRIORS" className="h-10 w-10 rounded-full" />
            </div>
            <p className="text-sm text-muted-foreground">
              {t.tagline}
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
            © {currentYear} BLACK WARRIORS. {t.rights}
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
