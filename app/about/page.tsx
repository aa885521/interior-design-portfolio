'use client';

import { useEffect, useState } from 'react';
import SmoothScroll from '@/components/dom/SmoothScroll';
import Link from 'next/link';

export default function AboutPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' })
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-[#080808]" />;

  const { aboutContent } = data;

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#080808] text-[var(--color-text-primary)] selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]">
        
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(201,169,110,0.03)_0%,transparent_70%)]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,169,110,0.02)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10" style={{ padding: 'clamp(24px, 4vw, 48px)' }}>
          <header className="flex justify-between items-start mb-32 animate-reveal">
            <Link href="/" className="group">
              <h1 className="font-display text-2xl font-light tracking-[0.15em] uppercase leading-tight">
                Studio<span className="block text-xs font-body font-light tracking-[0.3em] opacity-50 mt-1">Design</span>
              </h1>
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/projects" className="text-[11px] font-light tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity">Works</Link>
              <Link href="/services" className="text-[11px] font-light tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity">Services</Link>
              <Link href="/about" className="text-[11px] font-light tracking-[0.2em] uppercase opacity-100 text-[var(--color-accent)]">About</Link>
              <Link href="/contact" className="text-[11px] font-light tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity">Inquire</Link>
            </nav>
          </header>

          <div className="max-w-7xl mx-auto py-24">
            <div className="grid md:grid-cols-12 gap-16 md:gap-24 mb-32">
              <div className="md:col-span-8 animate-reveal">
                <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-6">Our Philosophy</p>
                <h2 className="font-display text-5xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.85] mb-12">
                  {aboutContent.headline}
                </h2>
              </div>
              <div className="md:col-span-4 self-end animate-reveal animate-reveal-delay-1 pb-4">
                <p className="font-display text-2xl italic opacity-50 font-light tracking-wide leading-relaxed">
                  {aboutContent.descriptionLeft}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-16 md:gap-24 items-start pb-48">
              <div className="md:col-span-6 animate-reveal animate-reveal-delay-2">
                <div className="aspect-[4/5] bg-white/5 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200" 
                    alt="Atmospheric Interior" 
                    className="w-full h-full object-cover grayscale opacity-50"
                  />
                </div>
              </div>
              <div className="md:col-span-1" />
              <div className="md:col-span-5 space-y-12 animate-reveal animate-reveal-delay-3 pt-12">
                <p className="text-base font-light leading-relaxed opacity-40 tracking-wide max-w-sm">
                  {aboutContent.descriptionRight}
                </p>
                
                <div className="grid grid-cols-2 gap-y-12 gap-x-8 pt-12 border-t border-white/5">
                  {(aboutContent.stats || []).map((stat: any, i: number) => (
                    <div key={i}>
                      <span className="text-[9px] uppercase tracking-[0.3em] opacity-20 block mb-2">{stat.label}</span>
                      <span className="font-display text-2xl font-light tracking-wider text-[var(--color-accent)]">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-12">
                  <Link href="/contact" className="magnetic-btn">Let's Connect</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
