'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';
/** Hickey's VC count includes 15k from a prior petition. */
const HICKEY_PRIOR_PETITION_VOTES = 15000;

export function LivePetitionCounter() {
  const [waterman, setWaterman] = useState<number | null>(null);
  const [hickey, setHickey] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${apiUrl()}/api/petitions/waterman/count`).then((r) => r.json()),
      fetch(`${apiUrl()}/api/petitions/hickey/count`).then((r) => r.json()),
    ])
      .then(([a, b]) => {
        setWaterman(a.count ?? 0);
        setHickey(b.count ?? 0);
      })
      .catch(() => {});
  }, []);

  const hickeyDisplay = hickey !== null ? hickey + HICKEY_PRIOR_PETITION_VOTES : null;

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 md:py-12">
      <div className="rounded-2xl border-2 border-heritage-gold/30 bg-heritage-navy/95 text-white p-8 md:p-10 shadow-xl">
        <h2 className="font-serif text-2xl text-center text-heritage-gold border-b border-heritage-gold/50 pb-3 mb-6">
          Live Petition Count
        </h2>
        <p className="text-center text-heritage-stone/90 text-sm mb-8">
          Total votes per case. No public voter names—just the numbers.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-white/10 border border-heritage-gold/30 p-6 text-center">
            <p className="text-heritage-stone/90 text-sm font-medium uppercase tracking-wider">
              Waterman VC Review
            </p>
            <p className="mt-2 font-serif text-4xl md:text-5xl font-bold text-heritage-gold tabular-nums">
              {waterman !== null ? waterman.toLocaleString() : '—'}
            </p>
            <p className="text-heritage-stone/70 text-xs mt-1">signatures</p>
          </div>
          <div className="rounded-xl bg-white/10 border border-heritage-gold/30 p-6 text-center">
            <p className="text-heritage-stone/90 text-sm font-medium uppercase tracking-wider">
              Hickey VC Review
            </p>
            <p className="mt-2 font-serif text-4xl md:text-5xl font-bold text-heritage-gold tabular-nums">
              {hickeyDisplay !== null ? hickeyDisplay.toLocaleString() : '—'}
            </p>
            <p className="text-heritage-stone/70 text-xs mt-1">signatures</p>
            <p className="text-heritage-stone/60 text-xs mt-0.5">(15k from a prior petition)</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/petitions"
            className="inline-flex items-center justify-center rounded-lg bg-heritage-gold text-heritage-navy px-6 py-3 font-semibold hover:bg-heritage-bronze transition-colors"
          >
            Vote and Sign Petition
          </Link>
        </div>
      </div>
    </section>
  );
}
