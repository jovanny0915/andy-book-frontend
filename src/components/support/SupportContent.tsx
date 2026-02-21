'use client';

import { useCallback, useState } from 'react';

const encoded = (s: string) => encodeURIComponent(s);

const donationAmounts = [5, 10, 15, 20] as const;

function getShareHref(
  name: string,
  url: string,
  title: string,
  text: string
): string {
  switch (name) {
    case 'Facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encoded(url)}`;
    case 'X':
      return `https://twitter.com/intent/tweet?url=${encoded(url)}&text=${encoded(text)}`;
    case 'LinkedIn':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encoded(url)}`;
    case 'WhatsApp':
      return `https://wa.me/?text=${encoded(text + ' ' + url)}`;
    case 'Email':
      return `mailto:?subject=${encoded(title)}&body=${encoded(text + ' ' + url)}`;
    default:
      return url;
  }
}

const shareLinks = [
  { name: 'Facebook', label: 'f' },
  { name: 'X', label: 'X' },
  { name: 'LinkedIn', label: 'in' },
  { name: 'WhatsApp', label: 'wa' },
  { name: 'Email', label: '✉' },
];

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function OrnateFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative p-2 md:p-3 rounded-sm"
      style={{
        border: '8px solid #4a3728',
        boxShadow: 'inset 0 0 0 1px rgba(201, 162, 39, 0.35), 2px 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      <div className="relative rounded-sm overflow-hidden border border-heritage-gold/40 bg-heritage-parchment/90 p-6">
        {children}
      </div>
    </div>
  );
}

export function SupportContent() {
  const [copied, setCopied] = useState(false);
  const supportUrl = process.env.NEXT_PUBLIC_COFFEE_URL || '#';
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = 'Victoriacross.ca – Remembering Waterman, Hickey & Vokes';
  const text = 'Historical context and petitions for the review of Victoria Cross cases. Add your voice.';

  const copyLink = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  return (
    <div className="relative max-w-2xl mx-auto px-4 py-10 space-y-8">
      {/* One-time Donation */}
      <OrnateFrame>
        <h2 className="font-serif text-xl md:text-2xl text-heritage-navy mb-2">
          One-time Donation
        </h2>
        <p className="text-heritage-charcoal text-sm mb-6">
          Help preserve the legacy. Your contribution makes a difference.
        </p>
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-3">
            {donationAmounts.map((amount, i) => (
              <a
                key={`${amount}-${i}`}
                href={supportUrl}
                className="border border-heritage-navy/30 bg-heritage-stone/80 text-heritage-navy px-4 py-2.5 rounded font-medium hover:bg-heritage-navy/5 transition-colors"
              >
                ${amount}
              </a>
            ))}
          </div>
          <div
            className="cursor-pointer inline-flex text-center items-center justify-center gap-2 bg-[#6b5344] text-white px-5 py-2.5 rounded font-medium hover:opacity-90 transition-opacity shadow-sm"
            onClick={() => {
              window.location.href = supportUrl;
            }}
          >
            <div className="flex items-center gap-2">
              <LockIcon className="w-4 h-4" />
              Contribute
            </div>
          </div>
        </div>
        <p className="text-xs text-heritage-charcoal/70 mt-4">
          Stripe integration preferred – to be configured in backend.
        </p>
      </OrnateFrame>

      {/* Share This Page */}
      <OrnateFrame>
        <h2 className="font-serif text-xl md:text-2xl text-heritage-navy mb-2">
          Share This Page
        </h2>
        <p className="text-heritage-charcoal text-sm mb-6">
          Help spread the word. Use share buttons in your message. Open Graph is configured so links preview correctly on social platforms.
        </p>
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-3">
            {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={getShareHref(link.name, url, title, text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-heritage-navy/40 bg-heritage-stone/80 text-heritage-navy font-semibold hover:bg-heritage-navy/10 transition-colors"
                  title={link.name}
                >
                  {link.label}
                </a>
            ))}
          </div>
          <button
            type="button"
            onClick={copyLink}
            className="border border-heritage-navy/30 bg-heritage-stone/80 text-heritage-navy px-4 py-2.5 rounded font-medium hover:bg-heritage-navy/5 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </OrnateFrame>
    </div>
  );
}
