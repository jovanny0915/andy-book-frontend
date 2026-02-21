'use client';

import { useState, useEffect } from 'react';

type Props = {
  petitionId: string;
  onSuccess: () => void;
  signatureCountDecorative?: boolean;
  /** When true, parent shows count (e.g. in overlay); form does not render the Signatures line */
  hideSignatureCount?: boolean;
  /** Optional so parent can display count; form still fetches for initial display unless hidden */
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
      const newCount = json.count ?? null;
      setCount(newCount);
      if (newCount !== null && onCountUpdate) onCountUpdate(petitionId, newCount);
      onSuccess();
    } catch {
      setError('Unable to submit. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full border border-heritage-charcoal/25 rounded px-3 py-2 bg-white text-heritage-charcoal focus:outline-none focus:ring-2 focus:ring-heritage-navy focus:border-heritage-navy';

  return (
    <div className="space-y-4">
      {!hideSignatureCount && count !== null && (
        <p
          className={
            signatureCountDecorative
              ? 'text-sm text-heritage-charcoal inline-block border border-heritage-gold/40 rounded px-2 py-1'
              : 'text-sm text-heritage-charcoal'
          }
        >
          Signatures: <span data-counter>{count}</span>
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`name-${petitionId}`} className="block text-sm font-medium text-heritage-charcoal mb-1">
              Name *
            </label>
            <input
              id={`name-${petitionId}`}
              name="name"
              type="text"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`country-${petitionId}`} className="block text-sm font-medium text-heritage-charcoal mb-1">
              Country *
            </label>
            <input
              id={`country-${petitionId}`}
              name="country"
              type="text"
              required
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`email-${petitionId}`} className="block text-sm font-medium text-heritage-charcoal mb-1">
            Email *
          </label>
          <input
            id={`email-${petitionId}`}
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </div>
        <div className="flex items-start gap-2">
          <input
            id={`consent-${petitionId}`}
            name="consent"
            type="checkbox"
            required
            className="mt-1 rounded border-heritage-charcoal/30"
          />
          <label htmlFor={`consent-${petitionId}`} className="text-sm text-heritage-charcoal">
            I consent to my name and country being displayed with this petition and to receive one verification email. (GDPR compliant.)
          </label>
        </div>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-heritage-navy text-white px-6 py-2.5 rounded-lg font-medium hover:bg-heritage-navy-light disabled:opacity-50 transition-colors"
        >
          {loading ? 'Submitting…' : 'Sign petition'}
        </button>
      </form>
    </div>
  );
}
