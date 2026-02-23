'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FORUM_TOKEN_KEY } from '@/lib/forumAuth';
import { supabase } from '@/lib/supabase';
import { ShareWidget } from '@/components/home/ShareWidget';
import { BuyMeACoffeeWidget } from '@/components/home/BuyMeACoffeeWidget';

function parseHashParams(hash: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!hash || hash.charAt(0) !== '#') return out;
  const q = hash.slice(1).split('&');
  for (const pair of q) {
    const [k, v] = pair.split('=');
    if (k && v) out[k] = decodeURIComponent(v);
  }
  return out;
}

export default function VerifyForumPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
    const params = new URLSearchParams(window.location.search);
    const legacyToken = params.get('token');
    const tokenHash = params.get('token_hash');
    const hashParams = parseHashParams(window.location.hash);
    const accessToken = hashParams.access_token;

    const finishSuccess = (data: { token: string }) => {
      try {
        localStorage.setItem(FORUM_TOKEN_KEY, data.token);
      } catch {}
      setStatus('ok');
      setMessage('You can now post in the forum.');
      setTimeout(() => router.push('/forum'), 2000);
    };

    const finishError = (msg: string) => {
      setStatus('error');
      setMessage(msg);
    };

    const sendAccessTokenToBackend = (token: string) => {
      fetch(`${apiUrl}/api/forum/verify-supabase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.verified && data.token) finishSuccess(data);
          else finishError(data.message || 'Verification failed.');
        })
        .catch(() => finishError('Something went wrong. Please try again.'));
    };

    if (accessToken) {
      sendAccessTokenToBackend(accessToken);
      return;
    }

    if (tokenHash && supabase) {
      supabase.auth
        .verifyOtp({ token_hash: tokenHash, type: 'email' })
        .then(({ data, error }) => {
          if (error) {
            finishError(error.message || 'Verification failed.');
            return;
          }
          const token = data.session?.access_token;
          if (token) sendAccessTokenToBackend(token);
          else finishError('Verification failed.');
        })
        .catch(() => finishError('Something went wrong. Please try again.'));
      return;
    }

    if (legacyToken) {
      fetch(`${apiUrl}/api/forum/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: legacyToken }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.verified && data.token) finishSuccess(data);
          else finishError(data.message || 'Verification failed.');
        })
        .catch(() => finishError('Something went wrong. Please try again.'));
      return;
    }

    setStatus('error');
    setMessage('Missing verification link.');
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col bg-heritage-stone relative">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {status === 'loading' && <p className="text-heritage-charcoal">Verifying…</p>}
          {status === 'ok' && (
            <>
              <p className="text-heritage-navy font-medium text-lg">Email verified</p>
              <p className="text-heritage-charcoal mt-2">{message}</p>
              <p className="text-sm text-heritage-charcoal/70 mt-4">Redirecting to forum…</p>
              <Link href="/forum" className="mt-6 inline-block text-heritage-navy hover:underline">
                Go to forum
              </Link>
            </>
          )}
          {status === 'error' && (
            <>
              <p className="text-red-600 font-medium">Verification failed</p>
              <p className="text-heritage-charcoal mt-2">{message}</p>
              <Link href="/forum" className="mt-6 inline-block text-heritage-navy hover:underline">
                Back to forum
              </Link>
            </>
          )}
        </div>
      </div>
      <BuyMeACoffeeWidget floating />
      <ShareWidget floating />
    </main>
  );
}
