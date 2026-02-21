'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FORUM_TOKEN_KEY } from '@/lib/forumAuth';

export default function VerifyForumPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const token = params.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Missing verification link.');
      return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
    fetch(`${apiUrl}/api/forum/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.verified && data.token) {
          try {
            localStorage.setItem(FORUM_TOKEN_KEY, data.token);
          } catch {}
          setStatus('ok');
          setMessage('You can now post in the forum.');
          setTimeout(() => router.push('/forum'), 2000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      });
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-heritage-stone">
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
    </main>
  );
}
