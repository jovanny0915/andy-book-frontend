'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

type Props = {
  petitionId: string;
  onSuccess: (verificationUrl?: string) => void;
  signatureCountDecorative?: boolean;
  hideSignatureCount?: boolean;
  signatureCount?: number;
  onCountUpdate?: (petitionId: string, count: number) => void;
};

export function PetitionForm({
  petitionId,
  onSuccess,
  signatureCountDecorative,
  hideSignatureCount,
  onCountUpdate,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
    fetch(`${apiUrl}/api/petitions/${petitionId}/count`)
      .then((r) => r.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => setCount(0));
  }, [petitionId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = {
      petitionId,
      name: data.get('name'),
      email: data.get('email'),
      country: data.get('country'),
      consent: data.get('consent') === 'on',
      website: data.get('website') || undefined,
    };
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
      const res = await fetch(`${apiUrl}/api/petitions/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || 'Something went wrong. Please try again.');
        return;
      }
      onSuccess(json.verificationUrl);
    } catch {
      setError('Unable to submit. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full border border-heritage-charcoal/20 rounded-xl px-4 py-3 bg-heritage-stone/50 text-heritage-charcoal placeholder:text-heritage-charcoal/40 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 focus:border-heritage-gold transition-colors';

  return (
    <div className="space-y-5">
      {!hideSignatureCount && count !== null && (
        <p
          className={
            signatureCountDecorative
              ? 'text-sm text-heritage-charcoal inline-block border border-heritage-gold/40 rounded-lg px-3 py-1.5'
              : 'text-sm text-heritage-charcoal'
          }
        >
          Signatures: <span data-counter>{count}</span>
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-xl border border-heritage-gold/40 bg-heritage-gold/10 px-4 py-3">
          <p className="text-sm text-heritage-charcoal leading-relaxed">
            Before signing, please review our{' '}
            <Link href="/disclosure" className="font-semibold text-heritage-navy underline underline-offset-2">
              Website Terms, Disclaimer, and Disclosure
            </Link>
            . By submitting your vote, you agree to these terms.
          </p>
        </div>
        {/* Honeypot: hidden from users, bots fill it */}
        <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden>
          <label htmlFor={`website-${petitionId}`}>Website</label>
          <input id={`website-${petitionId}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div>
          <label htmlFor={`email-${petitionId}`} className="block text-sm font-medium text-heritage-navy mb-1.5">
            Email <span className="text-heritage-charcoal/60">*</span>
          </label>
          <input
            id={`email-${petitionId}`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
          <p className="text-xs text-heritage-charcoal/60 mt-1">We’ll send a verification link. One vote per email per petition (you can vote for both Waterman VC and Waterman DSO).</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`name-${petitionId}`} className="block text-sm font-medium text-heritage-navy mb-1.5">
              Name <span className="text-heritage-charcoal/60">*</span>
            </label>
            <input
              id={`name-${petitionId}`}
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`country-${petitionId}`} className="block text-sm font-medium text-heritage-navy mb-1.5">
              Country <span className="text-heritage-charcoal/60">*</span>
            </label>
            <input
              id={`country-${petitionId}`}
              name="country"
              type="text"
              required
              autoComplete="country-name"
              placeholder="e.g. Canada"
              className={inputClass}
            />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <input
            id={`consent-${petitionId}`}
            name="consent"
            type="checkbox"
            required
            className="mt-1 rounded border-heritage-charcoal/30 text-heritage-navy focus:ring-heritage-gold"
          />
          <label htmlFor={`consent-${petitionId}`} className="text-sm text-heritage-charcoal leading-relaxed">
            I have read and agree to the{' '}
            <Link href="/disclosure" className="font-semibold text-heritage-navy underline underline-offset-2">
              Website Terms, Disclaimer, and Disclosure
            </Link>
            , and I consent to my name and country being displayed with this petition and to receive one verification
            email.
          </label>
        </div>
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto min-w-[180px] bg-heritage-navy text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-heritage-navy/20 hover:bg-heritage-navy-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-2"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden />
              Submitting…
            </span>
          ) : (
            'Submit vote'
          )}
        </button>
      </form>
    </div>
  );
}
