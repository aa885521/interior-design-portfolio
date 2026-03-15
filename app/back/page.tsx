'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      localStorage.setItem('admin-token', 'admin-session-token');
      router.push('/back/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-[#1a1a1a] rounded-xl border border-white/10 shadow-2xl">
        <h1 className="font-display text-4xl font-light mb-8 text-center tracking-wide">
          Studio <span className="italic">Admin</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] opacity-50">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#080808] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#c9a96e] text-[#080808] font-body text-xs uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-[#b8985d] transition-colors font-semibold"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
