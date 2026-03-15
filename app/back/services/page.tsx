'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ServicesAdminPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/back');
      return;
    }
    fetchContent();
  }, [router]);

  const fetchContent = async () => {
    const res = await fetch('/api/content');
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    alert('Content saved successfully');
  };

  const handleUpdateService = (index: number, field: string, value: any) => {
    const newServices = [...data.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setData({ ...data, services: newServices });
  };

  if (loading) return <div className="p-8">Loading content...</div>;

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto pb-32">
      <header className="flex justify-between items-center mb-12">
        <button onClick={() => router.push('/back/dashboard')} className="text-xs uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">
          ← Dashboard
        </button>
        <h1 className="font-display text-3xl font-light">Services & Content</h1>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="text-xs uppercase tracking-[0.2em] bg-[#c9a96e] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#b8985d] transition-colors"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </header>

      <section className="mb-20">
        <h2 className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-8">Service Pricing Tiers</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {data.services.map((service: any, idx: number) => (
            <div key={service.id} className="p-8 bg-[#1a1a1a] rounded-2xl border border-white/5 space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest opacity-30">Plan Name</label>
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => handleUpdateService(idx, 'name', e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-xl font-display focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-[9px] uppercase tracking-widest opacity-30">Price</label>
                  <input
                    type="text"
                    value={service.price}
                    onChange={(e) => handleUpdateService(idx, 'price', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-sm focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[9px] uppercase tracking-widest opacity-30">Unit</label>
                  <input
                    type="text"
                    value={service.unit}
                    onChange={(e) => handleUpdateService(idx, 'unit', e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-sm focus:outline-none focus:border-[#c9a96e]"
                    placeholder="/ space"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest opacity-30">Description</label>
                <textarea
                  rows={2}
                  value={service.description}
                  onChange={(e) => handleUpdateService(idx, 'description', e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-xs opacity-60 focus:outline-none focus:border-[#c9a96e] resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-16">
        <section>
          <h2 className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-8">About Page Content</h2>
          <div className="space-y-6 bg-[#1a1a1a] p-8 rounded-2xl border border-white/5">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest opacity-30">Headline</label>
              <input
                type="text"
                value={data.aboutContent.headline}
                onChange={(e) => setData({...data, aboutContent: {...data.aboutContent, headline: e.target.value}})}
                className="w-full bg-transparent border-b border-white/10 py-2 text-lg font-display focus:outline-none focus:border-[#c9a96e]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest opacity-30">Left Description</label>
              <textarea
                rows={3}
                value={data.aboutContent.descriptionLeft}
                onChange={(e) => setData({...data, aboutContent: {...data.aboutContent, descriptionLeft: e.target.value}})}
                className="w-full bg-transparent border-b border-white/10 py-2 text-xs opacity-60 focus:outline-none focus:border-[#c9a96e] resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest opacity-30">Right Description</label>
              <textarea
                rows={4}
                value={data.aboutContent.descriptionRight}
                onChange={(e) => setData({...data, aboutContent: {...data.aboutContent, descriptionRight: e.target.value}})}
                className="w-full bg-transparent border-b border-white/10 py-2 text-xs opacity-60 focus:outline-none focus:border-[#c9a96e] resize-none"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[10px] uppercase tracking-[0.4em] opacity-30 mb-8">Contact Page Content</h2>
          <div className="space-y-6 bg-[#1a1a1a] p-8 rounded-2xl border border-white/5">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest opacity-30">Headline</label>
              <input
                type="text"
                value={data.contactContent.headline}
                onChange={(e) => setData({...data, contactContent: {...data.contactContent, headline: e.target.value}})}
                className="w-full bg-transparent border-b border-white/10 py-2 text-lg font-display focus:outline-none focus:border-[#c9a96e]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest opacity-30">Description</label>
              <textarea
                rows={3}
                value={data.contactContent.description}
                onChange={(e) => setData({...data, contactContent: {...data.contactContent, description: e.target.value}})}
                className="w-full bg-transparent border-b border-white/10 py-2 text-xs opacity-60 focus:outline-none focus:border-[#c9a96e] resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest opacity-30">Email</label>
                <input
                  type="text"
                  value={data.contactContent.email}
                  onChange={(e) => setData({...data, contactContent: {...data.contactContent, email: e.target.value}})}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-xs focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest opacity-30">Location</label>
                <input
                  type="text"
                  value={data.contactContent.location}
                  onChange={(e) => setData({...data, contactContent: {...data.contactContent, location: e.target.value}})}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-xs focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
