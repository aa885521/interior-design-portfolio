'use client';

import { useEffect, useState } from 'react';
import Scene from '@/components/canvas/Scene';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/settings', { cache: 'no-store' }).then(res => res.json()),
      fetch('/api/projects', { cache: 'no-store' }).then(res => res.json())
    ]).then(([settings, projects]) => {
      setData({ settings, projects });
    });
  }, []);

  if (!data) return <div className="min-h-screen bg-[#080808]" />;

  const { settings, projects } = data;

  return (
    <main className="relative min-h-screen w-full select-none">

        {/* Background gradient layer */}
        <div className="fixed inset-0 z-[-1] bg-[#080808]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,110,0.06)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,169,110,0.04)_0%,transparent_50%)]" />
        </div>

        {/* 3D WebGL Canvas Layer */}
        <Scene projects={projects} />

        {/* DOM UI Overlay — mix-blend-difference to sit over the 3D canvas */}
        <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between"
          style={{ padding: 'clamp(24px, 4vw, 48px)' }}>

          {/* Header / Navbar */}
          <header className="flex justify-between items-start pointer-events-auto mix-blend-difference animate-reveal">
            <Link href="/" className="group">
              <h1 className="font-display text-2xl md:text-3xl font-light tracking-[0.15em] uppercase leading-tight">
                {settings?.siteName?.includes(' ') ? settings.siteName.split(' ')[0] : (settings?.siteName || 'Studio Design')}
                <span className="block text-xs md:text-sm font-body font-light tracking-[0.3em] opacity-50 mt-1">
                  {settings?.siteName?.includes(' ') ? settings.siteName.split(' ').slice(1).join(' ') : (settings?.siteTagline || 'Design')}
                </span>
              </h1>
            </Link>

            <nav className="flex items-center gap-6 md:gap-10">
              {[
                { href: '/projects', label: 'Works' },
                { href: '/services', label: 'Services' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Inquire' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-[11px] md:text-xs font-light tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-500 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c9a96e] group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </nav>
          </header>

          {/* Hero Text — Bottom Left */}
          <div className="pointer-events-auto mix-blend-difference max-w-2xl pb-4">
            <div className="animate-reveal animate-reveal-delay-1">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] opacity-40 mb-6 font-light">
                {settings.scrollHint}
              </p>
            </div>
            <div className="animate-reveal animate-reveal-delay-2">
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-wide whitespace-pre-line">
                {settings.heroTitle}
              </h2>
            </div>
            <div className="animate-reveal animate-reveal-delay-3 mt-8">
              <p className="text-sm md:text-base font-light leading-relaxed opacity-40 max-w-md tracking-wide">
                {settings.heroSubtitle}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Decorative Line */}
        <div className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
          <div className="divider" />
        </div>

    </main>
  );
}
