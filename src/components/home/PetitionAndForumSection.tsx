'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const apiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

export function PetitionAndForumSection() {
  const [watermanCount, setWatermanCount] = useState<number | null>(null);
  const [hickeyCount, setHickeyCount] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${apiUrl()}/api/petitions/waterman/count`).then((r) => r.json()),
      fetch(`${apiUrl()}/api/petitions/hickey/count`).then((r) => r.json()),
    ]).then(([a, b]) => {
      setWatermanCount(a.count ?? 0);
      setHickeyCount(b.count ?? 0);
    }).catch(() => {});
  }, []);

  /** Hickey count includes 15k from a prior petition. */
  const HICKEY_PRIOR = 15000;
  const totalSignatures = (watermanCount ?? 0) + (hickeyCount ?? 0) + HICKEY_PRIOR;
  const displayCount = watermanCount !== null ? totalSignatures : null;

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Book + Petition CTA */}
        <div className="rounded-xl border border-heritage-navy/15 bg-white/90 p-6 shadow-md hover:shadow-glow-gold transition-shadow duration-300">
          <h2 className="font-serif text-xl text-heritage-navy border-b border-heritage-gold/30 pb-2 mb-4">
            Historical context
          </h2>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-28 h-40 rounded-lg bg-heritage-charcoal/20 flex items-center justify-center text-heritage-charcoal/50 text-xs border border-heritage-gold/20">
              The Chaplain&apos;s Diary
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg text-heritage-navy">Review of Waterman VC case</h3>
              <p className="text-sm text-heritage-charcoal/80 mt-1 mb-4">
                Add your verified signature. Name, email, and consent required.
              </p>
              <Link
                href="/petitions"
                className="inline-flex items-center gap-2 rounded-lg bg-heritage-navy px-5 py-2.5 text-white font-medium shadow-md hover:bg-heritage-navy-light hover:shadow-glow-gold transition-all duration-300"
              >
                Sign
                {displayCount !== null && (
                  <span className="text-heritage-gold font-semibold">{displayCount} Signatures</span>
                )}
              </Link>
              <Link href="/petitions" className="ml-4 text-sm text-heritage-navy hover:underline">
                View details
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Forum CTA */}
        <div className="rounded-xl border border-heritage-navy/15 bg-white/90 p-6 shadow-md hover:shadow-glow-gold transition-shadow duration-300">
          <h2 className="font-serif text-xl text-heritage-navy border-b border-heritage-gold/30 pb-2 mb-4">
            Join the discussion
          </h2>
          <p className="text-heritage-charcoal/80 text-sm mb-6">
            A simple, moderated discussion. Register with your email and verify to post. Respectful dialogue only.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/forum"
              className="inline-flex items-center gap-2 rounded-lg border border-heritage-navy/30 px-4 py-2 text-heritage-navy font-medium hover:bg-heritage-navy/5 hover:border-heritage-gold/40 transition-all"
            >
              Register / Login
            </Link>
            <Link
              href="/forum"
              className="inline-flex items-center gap-2 rounded-lg bg-heritage-navy px-4 py-2 text-white font-medium shadow-md hover:shadow-glow-gold transition-all"
            >
              Join the discussion
            </Link>
          </div>
          <p className="text-xs text-heritage-charcoal/60 mt-4">Simple moderated discussion.</p>
        </div>
      </div>
    </section>
  );
}
