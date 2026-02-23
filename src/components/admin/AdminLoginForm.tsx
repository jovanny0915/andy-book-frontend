'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) return;
    setLoading(true);
    try {
      const { error: err } = await supabase!.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });
      if (err) {
        setMessage(err.message || 'Sign in failed.');
        setError(true);
        return;
      }
      setMessage('Signed in. Refreshing…');
      setEmail('');
      setPassword('');
      window.location.reload();
    } catch {
      setMessage('Request failed.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="rounded-2xl border border-heritage-gold/30 bg-white/95 shadow-xl shadow-heritage-navy/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-heritage-navy/10 bg-gradient-to-r from-heritage-navy/5 to-heritage-stone/50">
          <h2 className="font-serif text-xl font-semibold text-heritage-navy">
            Admin sign in
          </h2>
          <p className="text-sm text-heritage-charcoal/80 mt-0.5">
            Sign in with your admin email and password.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-medium text-heritage-charcoal mb-1"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-heritage-charcoal mb-1"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-heritage-charcoal/25 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
            />
          </div>
          {message && (
            <p
              className={`text-sm ${error ? 'text-red-600' : 'text-heritage-navy'}`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-heritage-navy text-white px-4 py-2.5 font-semibold hover:bg-heritage-navy-dark disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
