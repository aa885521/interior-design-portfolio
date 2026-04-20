'use client';

import { useEffect, useState } from 'react';
import SmoothScroll from '@/components/dom/SmoothScroll';
import Link from 'next/link';
import Navbar from '@/components/dom/Navbar';


export default function ServicesPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' })
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setData({ services: [], servicesIntro: '' });
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-[#080808]" />;

  const services: any[] = data?.services || [];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#080808] text-[var(--color-text-primary)] selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]">
        
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.04)_0%,transparent_60%)]" />
        </div>

        <div className="relative z-10" style={{ padding: 'clamp(24px, 4vw, 48px)' }}>
          <Navbar activeHref="/services" />

          <section className="max-w-3xl mb-24 animate-reveal animate-reveal-delay-1">
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-4">What We Offer</p>
            <h2 className="font-display text-5xl md:text-7xl font-light tracking-wide mb-8">Services <span className="italic">&</span> Pricing</h2>
            <p className="text-base font-light leading-relaxed opacity-40 max-w-xl tracking-wide">
              {data?.servicesIntro || 'Each project receives our full creative attention. Choose a tier that fits your vision, or reach out for a bespoke solution.'}
            </p>
          </section>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-32">
            {services.map((tier: any, i: number) => (
              <div 
                key={tier.id} 
                className={`glass flex flex-col p-10 animate-reveal ${tier.featured ? 'border-[#c9a96e]/30' : ''}`}
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                {tier.featured && (
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-accent)] mb-6 font-semibold">Most Requested</span>
                )}
                <h3 className="font-display text-3xl font-light tracking-wide mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-2xl font-light uppercase tracking-tighter">{tier.price}</span>
                  <span className="text-[10px] uppercase tracking-widest opacity-30">{tier.unit}</span>
                </div>
                <p className="text-sm font-light leading-relaxed opacity-40 mb-10 min-h-[60px]">
                  {tier.description}
                </p>
                <ul className="space-y-4 mb-auto pb-12">
                  {(tier.features || []).map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[var(--color-accent)] text-lg leading-none">+</span>
                      <span className="text-[11px] font-light tracking-wide opacity-50 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`magnetic-btn w-full text-center ${tier.featured ? '' : 'opacity-60 hover:opacity-100'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
