'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ onUploadSuccess, label = 'Upload Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        onUploadSuccess(data.url);
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-[10px] uppercase tracking-[0.3em] opacity-30">{label}</p>}
      <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-[#c9a96e]/40 transition-colors bg-white/[0.02] group">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-3 opacity-20 group-hover:opacity-40 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p className="text-xs tracking-widest opacity-40">{uploading ? 'UPLOADING...' : 'SELECT FILE'}</p>
        </div>
        <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} accept="image/*" />
      </label>
    </div>
  );
}
