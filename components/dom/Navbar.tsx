'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  activeHref?: string;
}

export default function Navbar({ activeHref }: NavbarProps) {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(() => {});
  }, []);

  const siteName = settings?.siteName || 'Studio Design';
  const siteTagline = settings?.siteTagline || 'Design';
  const hasSpace = siteName.includes(' ');
  const namePart1 = hasSpace ? siteName.split(' ')[0] : siteName;
  const namePart2 = hasSpace ? siteName.split(' ').slice(1).join(' ') : siteTagline;

  const navLinks = [
    { href: '/projects', label: 'Works' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Inquire' },
  ];

  return (
    <header className="flex justify-between items-start mb-32 animate-reveal">
      <Link href="/" className="group">
        <h1 className="font-display text-2xl font-light tracking-[0.15em] uppercase leading-tight">
          {namePart1}
          <span className="block text-xs font-body font-light tracking-[0.3em] opacity-50 mt-1">
            {namePart2}
          </span>
        </h1>
      </Link>
      <nav className="flex items-center gap-8">
        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[11px] font-light tracking-[0.2em] uppercase transition-opacity ${
              activeHref === item.href
                ? 'opacity-100 text-[var(--color-accent)]'
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
