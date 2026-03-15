'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/dom/ImageUpload';

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    siteName: '',
    siteTagline: '',
    heroTitle: '',
    heroSubtitle: '',
    scrollHint: '',
    siteLogo: '',
    typography: {
      activeConcept: 'classic',
      concepts: [] as any[]
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/back');
      return;
    }

    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    alert('Settings saved successfully');
  };

  if (loading) return <div className="p-8 pb-32">Loading settings...</div>;

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <button onClick={() => router.push('/back/dashboard')} className="text-xs uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">
          ← Back
        </button>
        <h1 className="font-display text-3xl font-light">Site Settings</h1>
      </header>

      <form onSubmit={handleSave} className="space-y-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Site Tagline</label>
            <input
              type="text"
              value={settings.siteTagline}
              onChange={(e) => setSettings({...settings, siteTagline: e.target.value})}
              className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Hero Title (Use \n for line breaks)</label>
          <textarea
            rows={3}
            value={settings.heroTitle}
            onChange={(e) => setSettings({...settings, heroTitle: e.target.value})}
            className="w-full bg-transparent border-b border-white/10 py-3 text-2xl font-display font-light focus:outline-none focus:border-[#c9a96e] transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Hero Subtitle</label>
          <textarea
            rows={3}
            value={settings.heroSubtitle}
            onChange={(e) => setSettings({...settings, heroSubtitle: e.target.value})}
            className="w-full bg-transparent border-b border-white/10 py-3 text-sm font-light leading-relaxed opacity-60 focus:outline-none focus:border-[#c9a96e] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Scroll Hint Text</label>
          <input
            type="text"
            value={settings.scrollHint}
            onChange={(e) => setSettings({...settings, scrollHint: e.target.value})}
            className="w-full bg-transparent border-b border-white/10 py-3 text-xs tracking-widest focus:outline-none focus:border-[#c9a96e] transition-colors"
          />
        </div>

        {settings.typography && (
          <div className="space-y-6 pt-10 border-t border-white/5">
            <h2 className="text-[10px] uppercase tracking-[0.3em] opacity-30">Typography Design (排版設計)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {settings.typography.concepts.map((concept: any) => (
                <div 
                  key={concept.id}
                  onClick={() => setSettings({
                    ...settings, 
                    typography: { ...settings.typography, activeConcept: concept.id }
                  })}
                  className={`p-6 rounded-xl border transition-all cursor-pointer ${
                    settings.typography.activeConcept === concept.id 
                      ? 'border-[#c9a96e] bg-[#c9a96e]/5' 
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-widest opacity-40 mb-4">{concept.name}</div>
                  <div className="space-y-3">
                    <p style={{ fontFamily: concept.displayFont }} className="text-2xl leading-none">
                      Shaping Reality<br />
                      <span className="text-xl">日日映像</span>
                    </p>
                    <p style={{ fontFamily: concept.bodyFont }} className="text-xs opacity-50 leading-relaxed">
                      Architectural visualization transforms imagination into reality.<br />
                      視覺化將想像轉化為現實。
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="magnetic-btn w-full"
        >
          {saving ? 'Saving...' : 'Save Site Settings'}
        </button>
      </form>
    </div>
  );
}
