'use client';

import { useState, useEffect } from 'react';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

const STORAGE_KEY = 'victoriacross-buy-me-a-coffee-expanded';

function getStoredExpanded(): boolean {
  if (typeof window === 'undefined') return true;
  const v = localStorage.getItem(STORAGE_KEY);
  return v !== 'false';
}

function setStoredExpanded(expanded: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, String(expanded));
}

type BuyMeACoffeeWidgetProps = { floating?: boolean };

export function BuyMeACoffeeWidget({ floating = false }: BuyMeACoffeeWidgetProps = {}) {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (floating) setExpanded(getStoredExpanded());
  }, [floating]);

  const setExpandedPersisted = (value: boolean) => {
    setExpanded(value);
    if (floating) setStoredExpanded(value);
  };
  const [loadingAmount, setLoadingAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const amounts = [5, 10, 15, 20];

  const headerLabel = 'Buy Me a Coffee';

  if (floating && !expanded) {
    return (
      <aside className="fixed bottom-6 left-6 z-20">
        <button
          type="button"
          onClick={() => setExpandedPersisted(true)}
          className="rounded-xl border-2 border-heritage-gold/30 bg-white/95 px-4 py-3 shadow-lg shadow-heritage-navy/5 flex items-center gap-2 font-serif text-heritage-navy hover:bg-heritage-gold/5 hover:border-heritage-gold/50 transition-colors"
          aria-expanded="false"
          aria-label="Expand buy me a coffee panel"
        >
          <span>{headerLabel}</span>
          <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </aside>
    );
  }

  return (
    <aside
      className={
        floating
          ? 'fixed bottom-6 left-6 z-20 w-[min(360px,calc(100vw-2rem))]'
          : 'max-w-5xl mx-auto px-4 py-8'
      }
    >
      <div className="rounded-xl border-2 border-heritage-gold/30 bg-white/95 p-6 shadow-lg shadow-heritage-navy/5">
        <div className="flex items-center justify-between gap-2 border-b border-heritage-gold/40 pb-2 mb-4">
          <h2 className="font-serif text-xl text-heritage-navy">
            {headerLabel}
          </h2>
          {floating && (
            <button
              type="button"
              onClick={() => setExpandedPersisted(false)}
              className="p-1.5 rounded-lg text-heritage-charcoal/70 hover:bg-heritage-gold/10 hover:text-heritage-navy transition-colors"
              aria-label="Collapse buy me a coffee panel"
              aria-expanded="true"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
        <p className="text-heritage-charcoal/90 text-sm mb-4">
          Optional one-time support. All donations go toward research and maintaining this site.
        </p>
        {error && (
          <p className="text-red-600 text-sm mb-3" role="alert">
            {error}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          {amounts.map((amount) => (
            <button
              key={amount}
              type="button"
              disabled={loadingAmount !== null}
              onClick={async () => {
                setError(null);
                setLoadingAmount(amount);
                try {
                  const res = await fetch(`${apiUrl()}/api/stripe/create-checkout-session`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentType: 'support', amount }),
                  });
                  const data = await res.json().catch(() => ({}));
                  if (!res.ok) {
                    setError(data.message || 'Something went wrong.');
                    return;
                  }
                  if (data.url) {
                    window.location.href = data.url;
                    return;
                  }
                  setError('No checkout URL received.');
                } catch {
                  setError('Network error. Please try again.');
                } finally {
                  setLoadingAmount(null);
                }
              }}
              className="inline-flex h-10 min-w-[3rem] items-center justify-center rounded-lg border-2 border-heritage-navy/25 text-heritage-navy px-4 font-semibold hover:bg-heritage-navy/5 hover:border-heritage-gold/50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loadingAmount === amount ? '…' : `$${amount}`}
            </button>
          ))}
          <a
            href="/support"
            className="rounded-lg bg-heritage-navy px-4 py-2.5 text-white text-sm font-medium hover:bg-heritage-navy-light hover:shadow-glow-gold transition-all inline-flex items-center"
          >
            Support
          </a>
        </div>
        <p className="text-xs text-heritage-charcoal/60 mt-3">
          Secure payment via Stripe. No recurring charges unless you choose to.
        </p>
      </div>
    </aside>
  );
}
