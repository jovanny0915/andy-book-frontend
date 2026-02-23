'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShareWidget } from '@/components/home/ShareWidget';
import { BuyMeACoffeeWidget } from '@/components/home/BuyMeACoffeeWidget';

export default function VerifyPetitionPage() {
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
    fetch(`${apiUrl}/api/petitions/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.verified) {
          setStatus('ok');
          setMessage(data.message || 'Your signature is verified. Thank you.');
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      });
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-heritage-stone relative">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {status === 'loading' && <p className="text-heritage-charcoal">Verifying…</p>}
          {status === 'ok' && (
            <>
              <p className="text-heritage-navy font-medium text-lg">Email verified</p>
              <p className="text-heritage-charcoal mt-2">{message}</p>
              <Link href="/" className="mt-6 inline-block text-heritage-navy hover:underline">
                Back to home
              </Link>
            </>
          )}
          {status === 'error' && (
            <>
              <p className="text-red-600 font-medium">Verification failed</p>
              <p className="text-heritage-charcoal mt-2">{message}</p>
              <Link href="/" className="mt-6 inline-block text-heritage-navy hover:underline">
                Back to home
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
