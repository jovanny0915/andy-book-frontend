'use client';

import { useEffect, useState } from 'react';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

const encoded = (s: string) => encodeURIComponent(s);

type ShareWidgetProps = { floating?: boolean };

export function ShareWidget({ floating = false }: ShareWidgetProps = {}) {
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${apiUrl()}/api/petitions/waterman/count`).then((r) => r.json()),
      fetch(`${apiUrl()}/api/petitions/hickey/count`).then((r) => r.json()),
    ])
      .then(([a, b]) => setTotalCount((a.count ?? 0) + (b.count ?? 0)))
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

  return (
    <aside
      className={
        floating
          ? 'fixed bottom-6 right-6 z-20 w-[min(360px,calc(100vw-2rem))]'
          : 'max-w-5xl mx-auto px-4 py-8'
      }
    >
      <div className="rounded-xl border-2 border-heritage-gold/30 bg-white/95 p-6 shadow-lg shadow-heritage-navy/5">
        <h2 className="font-serif text-xl text-heritage-navy border-b border-heritage-gold/40 pb-2 mb-4">
          {floating ? 'Share This Page!' : 'Share this page'}
        </h2>
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
