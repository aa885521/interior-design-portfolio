'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SmoothScroll from '@/components/dom/SmoothScroll';
import Link from 'next/link';
import Navbar from '@/components/dom/Navbar';


export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects?id=${id}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#080808]" />;
  if (!project || project.error) return <div className="min-h-screen bg-[#080808] flex items-center justify-center">Project not found</div>;

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#080808] text-[var(--color-text-primary)]">
        
        <section className="relative h-screen w-full overflow-hidden">
          <img 
            src={project.coverImage} 
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-60 scale-105"
            style={{ filter: 'contrast(1.1) brightness(0.8)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
          
          <div className="absolute top-0 left-0 w-full p-[clamp(24px,4vw,48px)] z-20 flex justify-between items-start">
            <Link href="/projects" className="text-[11px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
              ← Back to list
            </Link>
            <Navbar activeHref="" />
          </div>

          <div className="absolute bottom-[10vh] left-0 w-full p-[clamp(24px,4vw,48px)] z-20 animate-reveal">
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">{project.category} · {project.year}</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.8] mb-6">
              {project?.title?.split(' ')[0] || 'Project'}
              <br />
              <span className="italic opacity-80 pl-12 md:pl-24">
                {project?.title?.includes(' ') ? project.title.split(' ').slice(1).join(' ') : ''}
              </span>
            </h1>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-[clamp(24px,4vw,48px)] py-32">
          <div className="flex flex-col md:flex-row gap-20">
            <div className="w-full md:w-1/3 space-y-12 animate-reveal animate-reveal-delay-1">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] opacity-30 mb-6">Project Metadata</h3>
                <dl className="space-y-6">
                  {Object.entries(project.meta || {}).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-[9px] uppercase tracking-[0.2em] opacity-20 mb-1">{key}</dt>
                      <dd className="text-xs font-light tracking-wide">{value as string}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="w-full md:w-2/3 animate-reveal animate-reveal-delay-2">
              <h2 className="font-display text-3xl md:text-4xl font-light mb-10 tracking-wide">
                {project.subtitle}
              </h2>
              <div className="space-y-8 text-base font-light leading-relaxed opacity-50 tracking-wide max-w-2xl whitespace-pre-line">
                {project.description}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-48 space-y-32">
          {(project.gallery || []).map((img: string, index: number) => (
            <div 
              key={index} 
              className={`max-w-6xl mx-auto px-[clamp(24px,4vw,48px)] animate-reveal ${
                index % 2 === 0 ? 'flex justify-start' : 'flex justify-end'
              }`}
            >
              <div className="w-full md:w-10/12 overflow-hidden bg-white/5">
                <img 
                  src={img} 
                  alt="" 
                  className="w-full h-auto grayscale transition-all duration-1000 hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </section>

        <footer className="py-32 border-t border-white/5 text-center">
          <Link href="/projects" className="group">
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-6">Explore More</p>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-widest uppercase group-hover:text-[var(--color-accent)] transition-colors">
              View All <span className="italic">Works</span>
            </h2>
          </Link>
        </footer>

      </main>
    </SmoothScroll>
  );
}
