'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/dom/ImageUpload';

export default function ProjectsAdminPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/back');
      return;
    }
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  const handleEdit = (project: any) => {
    setEditingProject({ ...project, meta: { ...project.meta }, gallery: [...project.gallery] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setEditingProject({
      title: '',
      subtitle: '',
      category: 'Residential',
      year: new Date().getFullYear().toString(),
      description: '',
      coverImage: '',
      gallery: [],
      meta: { location: '', scope: '', software: '' }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProject.id ? 'PUT' : 'POST';
    const res = await fetch('/api/projects', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingProject),
    });

    if (res.ok) {
      setEditingProject(null);
      fetchProjects();
      alert('Project saved successfully');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  if (loading) return <div className="p-8">Loading projects...</div>;

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <button onClick={() => router.push('/back/dashboard')} className="text-xs uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">
          ← Dashboard
        </button>
        <h1 className="font-display text-3xl font-light">Project Management</h1>
        <button 
          onClick={handleAddNew}
          className="text-xs uppercase tracking-[0.2em] bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-[#c9a96e] transition-colors"
        >
          Add New
        </button>
      </header>

      {editingProject && (
        <div className="mb-24 p-8 bg-[#1a1a1a] rounded-2xl border border-[#c9a96e]/20 animate-reveal">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-display text-2xl font-light">{editingProject.id ? 'Edit' : 'New'} Project</h2>
            <button onClick={() => setEditingProject(null)} className="opacity-40 hover:opacity-100 uppercase tracking-widest text-[10px]">Close</button>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Subtitle</label>
                <input
                  type="text"
                  value={editingProject.subtitle}
                  onChange={(e) => setEditingProject({...editingProject, subtitle: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Category</label>
                <select
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                  className="w-full bg-[#080808] border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e]"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Interior</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Year</label>
                <input
                  type="text"
                  value={editingProject.year}
                  onChange={(e) => setEditingProject({...editingProject, year: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Location</label>
                <input
                  type="text"
                  value={editingProject.meta.location}
                  onChange={(e) => setEditingProject({...editingProject, meta: {...editingProject.meta, location: e.target.value}})}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Description</label>
              <textarea
                rows={4}
                value={editingProject.description}
                onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                className="w-full bg-transparent border-b border-white/10 py-3 text-sm leading-relaxed focus:outline-none focus:border-[#c9a96e] resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Cover Image</label>
              <div className="flex gap-4 items-start">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editingProject.coverImage}
                  onChange={(e) => setEditingProject({...editingProject, coverImage: e.target.value})}
                  className="flex-1 bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
                />
                <div className="w-48">
                  <ImageUpload onUploadSuccess={(url) => setEditingProject({...editingProject, coverImage: url})} label="" />
                </div>
              </div>
              {editingProject.coverImage && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/5">
                  <img src={editingProject.coverImage} alt="Cover preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-[0.3em] opacity-30">Gallery Images</label>
                <div className="w-48">
                  <ImageUpload 
                    onUploadSuccess={(url) => setEditingProject({...editingProject, gallery: [...editingProject.gallery, url]})} 
                    label="Add to Gallery" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {editingProject.gallery.map((url: string, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/5 group">
                    <img src={url} alt={`Gallery ${idx}`} className="object-cover w-full h-full" />
                    <button 
                      type="button"
                      onClick={() => {
                        const newGallery = [...editingProject.gallery];
                        newGallery.splice(idx, 1);
                        setEditingProject({...editingProject, gallery: newGallery});
                      }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="text-[10px] uppercase tracking-widest text-[#ff4d4d]">Remove</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-[9px] uppercase tracking-widest opacity-20">Manual JSON Edit</p>
                <textarea
                  rows={4}
                  value={JSON.stringify(editingProject.gallery, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setEditingProject({...editingProject, gallery: parsed});
                    } catch(e) {}
                  }}
                  className="w-full bg-[#080808] border border-white/10 p-4 text-xs font-mono focus:outline-none focus:border-[#c9a96e] rounded-lg"
                />
              </div>
            </div>

            <button type="submit" className="magnetic-btn w-full">Save Project</button>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.id} className="group p-6 bg-[#1a1a1a] rounded-xl border border-white/5 flex justify-between items-center hover:border-white/10 transition-all">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-white/5 rounded overflow-hidden">
                {p.coverImage && <img src={p.coverImage} alt="" className="w-full h-full object-cover opacity-50" />}
              </div>
              <div>
                <h3 className="font-display text-xl font-light tracking-wide">{p.title}</h3>
                <p className="text-[10px] uppercase tracking-widest opacity-30">{p.category} · {p.year}</p>
              </div>
            </div>
            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(p)} className="text-[10px] uppercase tracking-widest px-4 py-2 hover:text-[#c9a96e]">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-[10px] uppercase tracking-widest px-4 py-2 hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
