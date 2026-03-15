'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/back');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div className="p-8">Verifying session...</div>;

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-16">
        <div>
          <h1 className="font-display text-4xl font-light tracking-wide">Dashboard</h1>
          <p className="text-xs uppercase tracking-[0.2em] opacity-40 mt-2">Manage your studio portfolio</p>
        </div>
        <button 
          onClick={() => { localStorage.removeItem('admin-token'); router.push('/back'); }}
          className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
        >
          Logout
        </button>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Site Settings', desc: 'Edit site name, tagline, and hero text', href: '/back/settings', icon: '⚙️' },
          { title: 'Project Management', desc: 'Add, edit, or remove portfolio pieces', href: '/back/projects', icon: '📁' },
          { title: 'Service Tiers', desc: 'Update pricing plans and features', href: '/back/services', icon: '💳' },
        ].map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="block p-8 bg-[#1a1a1a] border border-white/5 rounded-2xl hover:border-[#c9a96e]/30 transition-all group"
          >
            <div className="text-3xl mb-6">{item.icon}</div>
            <h2 className="font-display text-2xl font-light mb-2 group-hover:text-[#c9a96e] transition-colors">{item.title}</h2>
            <p className="text-sm font-light opacity-40 leading-relaxed">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
