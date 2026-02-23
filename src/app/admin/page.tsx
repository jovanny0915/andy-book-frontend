'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseAuthConfigured } from '@/lib/supabase';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

type AuthState = 'loading' | 'unauthenticated' | 'forbidden' | 'authenticated';

const ADMIN_TOKEN_STORAGE_KEY = 'admin_access_token';

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkSession = async (accessToken: string | undefined) => {
      if (!accessToken) {
        setAuthState('unauthenticated');
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
      const res = await fetch(`${apiUrl}/api/admin/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.status === 403) {
        sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
        setAuthState('forbidden');
        return;
      }
      if (res.status === 401 || !res.ok) {
        sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
        setAuthState('unauthenticated');
        return;
      }

      const data = await res.json().catch(() => ({}));
      sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, accessToken);
      setAdminEmail(data?.user?.email ?? null);
      setAuthState('authenticated');
    };

    supabase?.auth.getSession().then(({ data: { session } }) => {
      if (session?.access_token) {
        checkSession(session.access_token);
      } else {
        const stored = sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
        if (stored) {
          checkSession(stored);
        } else {
          setAuthState('unauthenticated');
        }
      }
    });
  }, []);

  const handleSignOut = async () => {
    await supabase?.auth.signOut();
    sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    setAuthState('unauthenticated');
    setAdminEmail(null);
  };

  if (!isSupabaseAuthConfigured() || !supabase) {
    return (
      <div className="relative min-h-screen">
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: 'url(/map-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundColor: '#f0ede6',
          }}
          aria-hidden
        />
        <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-heritage-charcoal">
            Admin sign-in is not configured. Set Supabase env vars (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY).
          </p>
          <Link href="/" className="mt-4 inline-block text-heritage-navy hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/map-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundColor: '#f0ede6',
        }}
        aria-hidden
      />
      <div className="relative max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-heritage-navy hover:text-heritage-navy-dark font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to site
          </Link>
          {authState === 'authenticated' && adminEmail && (
            <div className="flex items-center gap-3">
            <span className="text-sm text-heritage-charcoal/80">{adminEmail}</span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-heritage-charcoal/30 px-3 py-1.5 text-sm text-heritage-charcoal hover:bg-heritage-stone/50"
            >
              Sign out
            </button>
          </div>
          )}
        </div>

        <h1 className="font-serif text-2xl font-semibold text-heritage-navy mb-2">
          Admin
        </h1>
        <p className="text-sm text-heritage-charcoal/80 mb-8">
          Approve posts, manage users, and manage admin access.
        </p>

        {authState === 'loading' && (
          <p className="text-heritage-charcoal/80">Checking sign-in…</p>
        )}

        {authState === 'unauthenticated' && <AdminLoginForm />}

        {authState === 'forbidden' && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="access-denied-title"
          >
            <div className="rounded-2xl border border-red-200 bg-white shadow-xl max-w-sm w-full p-6 text-center">
              <p id="access-denied-title" className="font-semibold text-red-800 text-lg">
                Access denied
              </p>
              <p className="text-heritage-charcoal mt-2">
                This user is not admin user.
              </p>
              <button
                type="button"
                onClick={handleSignOut}
                className="mt-6 w-full rounded-xl bg-heritage-navy text-white px-4 py-2.5 font-medium hover:bg-heritage-navy-dark transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {authState === 'authenticated' && <AdminDashboard />}
      </div>
    </div>
  );
}
