'use client';

import { useEffect, useState } from 'react';
import SmoothScroll from '@/components/dom/SmoothScroll';
import Link from 'next/link';
import Navbar from '@/components/dom/Navbar';


export default function ContactPage() {
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
        setData({ contactContent: { headline: '', description: '', email: '', location: '' } });
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-[#080808]" />;

  const contactContent = data?.contactContent || { headline: '', description: '', email: '', location: '' };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#080808] text-[var(--color-text-primary)] selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]">
        
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.03)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10" style={{ padding: 'clamp(24px, 4vw, 48px)' }}>
          <Navbar activeHref="/contact" />

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 py-12">
            
            <section className="animate-reveal">
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-4">Contact</p>
              <h2 className="font-display text-5xl md:text-8xl font-light tracking-tight leading-[0.85] mb-12">
                {contactContent?.headline?.split('\n')[0] || "Let's"}
                <br />
                <span className="italic pl-16 md:pl-32 opacity-70">
                  {contactContent?.headline?.split('\n')[1] || 'collaborate'}
                </span>
              </h2>
              <p className="text-base font-light leading-relaxed opacity-40 max-w-sm tracking-wide mb-16">
                {contactContent.description}
              </p>

              <div className="space-y-8 pt-12 border-t border-white/5">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] opacity-20 block mb-2">Collaboration</span>
                  <a href={`mailto:${contactContent.email}`} className="text-xl font-light hover:text-[var(--color-accent)] transition-colors">{contactContent.email}</a>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] opacity-20 block mb-2">Location</span>
                  <span className="text-sm font-light tracking-widest opacity-60 uppercase">{contactContent.location}</span>
                </div>
              </div>
            </section>

            <section className="animate-reveal animate-reveal-delay-1 self-start">
              <form className="space-y-10 glass p-10 md:p-14">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest opacity-30">Full Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest opacity-30">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest opacity-30">Project Type</label>
                  <select className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors appearance-none text-white">
                    <option className="bg-[#111]" value="Residential">Residential Visualization</option>
                    <option className="bg-[#111]" value="Commercial">Commercial Visualization</option>
                    <option className="bg-[#111]" value="Full">Full Interior Project</option>
                    <option className="bg-[#111]" value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest opacity-30">Message</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors resize-none" />
                </div>
                <button type="submit" className="magnetic-btn w-full">Send Inquiry</button>
              </form>
            </section>

          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
