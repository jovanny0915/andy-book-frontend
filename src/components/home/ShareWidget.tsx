'use client';

import { useEffect, useState } from 'react';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

const STORAGE_KEY = 'victoriacross-share-widget-expanded';

function getStoredExpanded(): boolean {
  if (typeof window === 'undefined') return true;
  const v = localStorage.getItem(STORAGE_KEY);
  return v !== 'false';
}

function setStoredExpanded(expanded: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, String(expanded));
}

const encoded = (s: string) => encodeURIComponent(s);

type ShareWidgetProps = { floating?: boolean };

export function ShareWidget({ floating = false }: ShareWidgetProps = {}) {
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (floating) setExpanded(getStoredExpanded());
  }, [floating]);

  const setExpandedPersisted = (value: boolean) => {
    setExpanded(value);
    if (floating) setStoredExpanded(value);
  };

  /** Hickey count includes 15k from a prior petition. */
  const HICKEY_PRIOR = 15000;
  useEffect(() => {
    Promise.all([
      fetch(`${apiUrl()}/api/petitions/waterman/count`).then((r) => r.json()),
      fetch(`${apiUrl()}/api/petitions/hickey/count`).then((r) => r.json()),
    ])
      .then(([a, b]) => setTotalCount((a.count ?? 0) + (b.count ?? 0) + HICKEY_PRIOR))
      .catch(() => {});
  }, []);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = 'Victoriacross.ca – Remembering Waterman, Hickey & Vokes';
  const text = 'Historical context and petitions for the review of Victoria Cross cases. Add your voice.';

  const copyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  };

  const shareLinks = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encoded(url)}`, label: 'f' },
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${encoded(url)}&text=${encoded(text)}`, label: 'X' },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded(url)}`, label: 'in' },
    { name: 'Email', href: `mailto:?subject=${encoded(title)}&body=${encoded(text + ' ' + url)}`, label: '✉' },
  ];

  const headerLabel = floating ? 'Share This Page!' : 'Share this page';

  if (floating && !expanded) {
    return (
      <aside className="fixed bottom-6 right-6 z-20">
        <button
          type="button"
          onClick={() => setExpandedPersisted(true)}
          className="rounded-xl border-2 border-heritage-gold/30 bg-white/95 px-4 py-3 shadow-lg shadow-heritage-navy/5 flex items-center gap-2 font-serif text-heritage-navy hover:bg-heritage-gold/5 hover:border-heritage-gold/50 transition-colors"
          aria-expanded="false"
          aria-label="Expand share panel"
        >
          <span>{headerLabel}</span>
          <svg className="w-5 h-5 rotate-[-90deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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
          ? 'fixed bottom-6 right-6 z-20 w-[min(360px,calc(100vw-2rem))]'
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
              aria-label="Collapse share panel"
              aria-expanded="true"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
        {totalCount !== null && (
          <p className="text-heritage-charcoal font-medium mb-4">
            You made it <span className="text-heritage-gold font-bold">{totalCount.toLocaleString()}</span> Signatures!
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-heritage-navy/10 text-heritage-navy font-semibold hover:bg-heritage-gold/20 hover:text-heritage-bronze transition-colors"
              title={link.name}
            >
              {link.label}
            </a>
          ))}
          <div className="flex-1 min-w-[200px] flex gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 rounded border border-heritage-navy/20 px-3 py-2 text-sm text-heritage-charcoal/80 bg-heritage-stone/50"
            />
            <button
              type="button"
              onClick={copyLink}
              className="rounded-lg bg-heritage-navy px-4 py-2 text-white text-sm font-medium hover:bg-heritage-navy-light hover:shadow-glow-gold transition-all"
            >
              Copy link
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
