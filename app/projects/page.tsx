'use client';

import { useEffect, useState } from 'react';
import SmoothScroll from '@/components/dom/SmoothScroll';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-[#080808]" />;

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#080808] text-[var(--color-text-primary)] selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]">
        
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,169,110,0.03)_0%,transparent_70%)]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,169,110,0.02)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10" style={{ padding: 'clamp(24px, 4vw, 48px)' }}>
          <header className="flex justify-between items-start mb-32 animate-reveal">
            <Link href="/" className="group">
              <h1 className="font-display text-2xl font-light tracking-[0.15em] uppercase leading-tight">
                Studio<span className="block text-xs font-body font-light tracking-[0.3em] opacity-50 mt-1">Design</span>
              </h1>
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/projects" className="text-[11px] font-light tracking-[0.2em] uppercase opacity-100 text-[var(--color-accent)]">Works</Link>
              <Link href="/services" className="text-[11px] font-light tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity">Services</Link>
              <Link href="/about" className="text-[11px] font-light tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity">About</Link>
              <Link href="/contact" className="text-[11px] font-light tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity">Inquire</Link>
            </nav>
          </header>

          <section className="max-w-3xl mb-32 animate-reveal animate-reveal-delay-1">
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-4">Portfolio</p>
            <h2 className="font-display text-5xl md:text-7xl font-light tracking-wide mb-8">Selected <span className="italic">Works</span></h2>
            <p className="text-base font-light leading-relaxed opacity-40 max-w-xl tracking-wide">
              An editorial selection of our architectural visualizations, exploring the relationship between light, shadow, and materiality.
            </p>
          </section>

          <section className="max-w-7xl mx-auto space-y-48 pb-32">
            {projects.map((project: any, index: number) => (
              <div key={project.id} className="animate-reveal">
                <Link href={`/projects/${project.id}`} className="group block">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center`}>
                    <div className="w-full md:w-7/12 aspect-[16/10] overflow-hidden bg-white/5 relative">
                      <img 
                        src={project.coverImage} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                    <div className="w-full md:w-4/12 flex flex-col items-start gap-4">
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase tracking-[0.3em] opacity-30">{project.category} · {project.year}</p>
                        <h3 className="font-display text-4xl md:text-5xl font-light tracking-wide group-hover:text-[var(--color-accent)] transition-colors duration-500">
                          {project.title}
                        </h3>
                        <p className="text-xs uppercase tracking-[0.15em] opacity-40 italic mt-1">{project.subtitle}</p>
                      </div>
                      <p className="text-sm font-light leading-relaxed opacity-40 mt-4 line-clamp-3">
                        {project.description}
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.3em] mt-6 border-b border-white/10 pb-1 group-hover:border-[var(--color-accent)] transition-colors">
                        View Project
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </section>
        </div>
      </main>
    </SmoothScroll>
  );
}
