'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/ThemeProvider';

import en from '@/dictionaries/en.json';
import fr from '@/dictionaries/fr.json';
import ar from '@/dictionaries/ar.json';

const dictionaries = { en, fr, ar } as const;
type Locale = keyof typeof dictionaries;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const { theme, toggleTheme } = useTheme();

  const currentLang = (params?.lang as Locale) || 'en';
  const dict = dictionaries[currentLang]?.nav || dictionaries.en.nav;

  const switchLanguage = (newLang: string) => {
    if (!pathname) return;
    const pathParts = pathname.split('/');
    if (pathParts.length > 1 && Object.keys(dictionaries).includes(pathParts[1])) {
      pathParts[1] = newLang;
      router.push(pathParts.join('/'));
    } else {
      router.push(`/${newLang}${pathname}`);
    }
  };

  const navItems = [
    { label: dict.home, href: `/${currentLang}` },
    { label: dict.squad, href: `/${currentLang}/squad` },
    { label: dict.news, href: `/${currentLang}/news` },
    { label: dict.history, href: `/${currentLang}/history` },
    { label: dict.media, href: `/${currentLang}/media` },
    { label: dict.recruitment, href: `/${currentLang}/recruitment` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border backdrop-blur-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center transition-all duration-300 hover:scale-110 hover:rotate-3">
            <img src="/logo.png" alt="BLACK WARRIORS" className="h-10 w-10 rounded-full" />
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex items-center p-1.5 rounded-full bg-secondary/30 border border-border backdrop-blur-md shadow-sm">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 inline-block ${
                      isActive
                        ? 'bg-accent/20 text-accent shadow-inner'
                        : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl bg-secondary/30 border border-border hover:bg-accent/10 transition-all text-muted-foreground hover:text-accent shadow-sm"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center min-w-[60px] gap-1 p-2 px-3 rounded-xl bg-secondary/30 border border-border hover:bg-white/10 transition-all text-muted-foreground hover:text-foreground text-sm font-medium shadow-sm uppercase">
                {currentLang} <ChevronDown size={14} className="opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border backdrop-blur-md">
              <DropdownMenuItem onClick={() => switchLanguage('en')} className="cursor-pointer">English (EN)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLanguage('fr')} className="cursor-pointer">Français (FR)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLanguage('ar')} className="cursor-pointer rtl:text-right">العربية (AR)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 transition-all duration-300 hover:bg-accent/10 rounded-lg text-muted-foreground hover:text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <ul className="flex flex-col gap-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-accent/20 text-accent'
                        : 'hover:bg-accent/10 hover:text-accent hover:translate-x-2'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            <div className="flex items-center gap-3 px-4 py-3 mt-2 border-t border-border">
              {/* Mobile theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex-1 flex justify-center p-2.5 rounded-xl bg-secondary/50 border border-border hover:bg-accent/10 hover:text-accent transition-all text-muted-foreground"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="flex-1 flex gap-2 justify-center">
                <button onClick={() => switchLanguage('en')} className={`p-2 rounded-xl border text-sm font-medium transition-all ${currentLang === 'en' ? 'bg-accent/20 border-accent/50 text-accent' : 'bg-secondary/50 border-border text-muted-foreground'}`}>EN</button>
                <button onClick={() => switchLanguage('fr')} className={`p-2 rounded-xl border text-sm font-medium transition-all ${currentLang === 'fr' ? 'bg-accent/20 border-accent/50 text-accent' : 'bg-secondary/50 border-border text-muted-foreground'}`}>FR</button>
                <button onClick={() => switchLanguage('ar')} className={`p-2 rounded-xl border text-sm font-medium transition-all ${currentLang === 'ar' ? 'bg-accent/20 border-accent/50 text-accent' : 'bg-secondary/50 border-border text-muted-foreground'}`}>AR</button>
              </div>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}
