'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { PetitionForm } from './PetitionForm';
import { PetitionThankYou } from './PetitionThankYou';

function PetitionPortrait({
  src,
  alt,
  fallbackSrc,
}: {
  src: string;
  alt: string;
  fallbackSrc?: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  useEffect(() => setCurrentSrc(src), [src]);
  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
      sizes="(max-width: 640px) 100vw, 128px"
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}

const PETITION_LIST: Array<{
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  portraitSrc: string;
  portraitAlt: string;
  signatureCountDecorative?: boolean;
}> = [
  {
    id: 'waterman-vc',
    shortTitle: 'VC',
    title: 'Petition for Waterman to receive the Victoria Cross',
    description: 'Support Ronald Waterman to be awarded the Victoria Cross.',
    portraitSrc: '/waterman-portrait.png',
    portraitAlt: 'Ronald Waterman',
    signatureCountDecorative: true,
  },
  {
    id: 'waterman-dso',
    shortTitle: 'DSO',
    title: 'Petition for Waterman to receive the DSO',
    description: 'Support Ronald Waterman to be awarded the Distinguished Service Order.',
    portraitSrc: '/waterman-portrait.png',
    portraitAlt: 'Ronald Waterman',
    signatureCountDecorative: true,
  },
  {
    id: 'hickey',
    shortTitle: 'Hickey',
    title: 'Petition for Hickey to receive the Victoria Cross',
    description: 'Support Alphonsus Hickey to be awarded the Victoria Cross.',
    portraitSrc: '/hero-hickey.png',
    portraitAlt: 'Alphonsus Hickey',
    signatureCountDecorative: true,
  },
];

/** Hickey's VC petition count starts at 15k from a prior petition. */
const HICKEY_PRIOR_PETITION_VOTES = 15000;

function displayCount(petitionId: string, apiCount: number | undefined): number {
  const raw = apiCount ?? 0;
  return petitionId === 'hickey' ? raw + HICKEY_PRIOR_PETITION_VOTES : raw;
}

/** Section = one person; subsections = VC, DSO, etc. */
const SECTIONS = [
  {
    sectionTitle: 'Ronald Waterman',
    portraitSrc: '/waterman-portrait.png',
    portraitAlt: 'Ronald Waterman',
    fallbackPortrait: '/hero-waterman.png',
    subsections: [
      PETITION_LIST.find((p) => p.id === 'waterman-vc')!,
      PETITION_LIST.find((p) => p.id === 'waterman-dso')!,
    ],
  },
  {
    sectionTitle: 'Alphonsus Hickey',
    portraitSrc: '/hero-hickey.png',
    portraitAlt: 'Alphonsus Hickey',
    fallbackPortrait: undefined,
    subsections: [PETITION_LIST.find((p) => p.id === 'hickey')!],
  },
];

export function PetitionSection() {
  const [signedIds, setSignedIds] = useState<Set<string>>(new Set());
  const [verificationUrls, setVerificationUrls] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [banner, setBanner] = useState<'verified' | 'invalid' | null>(null);

  const fetchCounts = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
    PETITION_LIST.forEach((p) => {
      fetch(`${apiUrl}/api/petitions/${p.id}/count`)
        .then((r) => r.json())
        .then((data) => setCounts((prev) => ({ ...prev, [p.id]: data.count ?? 0 })))
        .catch(() => setCounts((prev) => ({ ...prev, [p.id]: 0 })));
    });
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('verified') === '1') {
      setBanner('verified');
      fetchCounts();
      window.history.replaceState({}, '', window.location.pathname);
    } else if (params.get('error') === 'invalid') {
      setBanner('invalid');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  function handleCountUpdate(petitionId: string, count: number) {
    setCounts((prev) => ({ ...prev, [petitionId]: count }));
  }

  const totalVotes = PETITION_LIST.reduce((sum, p) => sum + displayCount(p.id, counts[p.id]), 0);
  const selectedPetition = selectedId ? PETITION_LIST.find((p) => p.id === selectedId) : null;

  return (
    <section className="space-y-8 md:space-y-10">
      {banner === 'verified' && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-6 py-4 text-emerald-800 text-center">
          <p className="font-medium">Your vote has been verified. Thank you!</p>
        </div>
      )}
      {banner === 'invalid' && (
        <div className="rounded-2xl bg-amber-50 border border-amber-200 px-6 py-4 text-amber-800 text-center">
          <p className="font-medium">This verification link is invalid or has already been used.</p>
        </div>
      )}
      {/* Live totals bar */}
      <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-heritage-gold/20 shadow-lg shadow-heritage-navy/5 px-6 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-10">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-heritage-charcoal/70 uppercase tracking-wider">Total votes</span>
          <span className="text-2xl md:text-3xl font-serif font-bold text-heritage-navy tabular-nums" data-counter>
            {totalVotes}
          </span>
        </div>
        {PETITION_LIST.map((p) => (
          <div key={p.id} className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm text-heritage-charcoal/60">{p.id === 'waterman-vc' ? 'Waterman VC' : p.id === 'waterman-dso' ? 'Waterman DSO' : p.shortTitle}:</span>
            <span className="text-xl font-semibold text-heritage-navy tabular-nums" data-counter>
              {counts[p.id] !== undefined ? displayCount(p.id, counts[p.id]) : '—'}
            </span>
            {p.id === 'hickey' && (
              <span className="text-sm text-heritage-charcoal/60">(15k from a prior petition)</span>
            )}
          </div>
        ))}
      </div>

      {/* Section cards: Waterman (VC + DSO subsections) and Hickey — section is clickable, defaults to first subsection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {SECTIONS.map((section) => {
          const firstSubId = section.subsections[0].id;
          const isSectionSelected = section.subsections.some((s) => s.id === selectedId);
          return (
            <div
              key={section.sectionTitle}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedId(isSectionSelected && selectedId === firstSubId ? null : firstSubId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedId(isSectionSelected && selectedId === firstSubId ? null : firstSubId);
                }
              }}
              className={`group relative rounded-2xl overflow-hidden border-2 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-2 cursor-pointer ${
                isSectionSelected
                  ? 'border-heritage-gold bg-white shadow-lg shadow-heritage-gold/20'
                  : 'border-heritage-charcoal/10 bg-white/95 hover:border-heritage-gold/30 hover:shadow-md'
              }`}
            >
              <div className="relative flex flex-col sm:flex-row min-h-[120px]">
                <div className="relative w-full sm:w-28 flex-shrink-0 aspect-[4/3] sm:aspect-square">
                  <PetitionPortrait
                    src={section.portraitSrc}
                    alt={section.portraitAlt}
                    fallbackSrc={section.fallbackPortrait}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:from-transparent sm:via-transparent sm:to-transparent group-hover:sm:from-transparent" />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                  <h2 className="font-serif text-lg font-semibold text-heritage-navy">
                    {section.sectionTitle}
                  </h2>
                  <p className="text-sm text-heritage-charcoal/70 mt-0.5">
                    {section.subsections.length > 1
                      ? 'Select a petition to vote:'
                      : 'Petition to receive the Victoria Cross'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                    {section.subsections.map((sub) => {
                      const isSelected = selectedId === sub.id;
                      const hasSigned = signedIds.has(sub.id);
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(isSelected ? null : sub.id);
                          }}
                          className={`inline-flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-1 ${
                            isSelected
                              ? 'border-heritage-gold bg-heritage-gold/10 text-heritage-navy shadow-sm'
                              : 'border-heritage-charcoal/15 bg-heritage-stone/50 text-heritage-charcoal hover:border-heritage-gold/40 hover:bg-heritage-gold/5'
                          }`}
                        >
                          <span>{sub.shortTitle}</span>
                          <span className="tabular-nums text-heritage-navy">
                            {counts[sub.id] !== undefined ? displayCount(sub.id, counts[sub.id]) : '—'} votes
                            {sub.id === 'hickey' && (
                              <span className="text-heritage-charcoal/70 font-normal"> (15k from a prior petition)</span>
                            )}
                          </span>
                          {hasSigned && (
                            <span className="text-emerald-600" aria-hidden>✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form / thank-you panel */}
      <div className="rounded-2xl border border-heritage-gold/25 bg-white/95 shadow-xl shadow-heritage-navy/5 overflow-hidden">
        {!selectedPetition ? (
          <div className="p-8 md:p-10 text-center">
            <div className="inline-flex w-14 h-14 rounded-full bg-heritage-gold/10 items-center justify-center text-heritage-gold mb-4" aria-hidden>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
            </div>
            <p className="font-medium text-heritage-navy">Select a petition above to add your vote</p>
            <p className="text-sm text-heritage-charcoal/70 mt-1 max-w-sm mx-auto">One vote per email per petition. You can vote for both Waterman VC and Waterman DSO. Counted after you verify via email.</p>
          </div>
        ) : signedIds.has(selectedPetition.id) ? (
          <div className="p-6 md:p-8">
            <PetitionThankYou
              petitionId={selectedPetition.id}
              petitionTitle={selectedPetition.title}
              verificationUrl={verificationUrls[selectedPetition.id]}
            />
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h3 className="font-serif text-xl text-heritage-navy">{selectedPetition.title}</h3>
              <p className="text-sm text-heritage-charcoal/70 mt-1">Enter your email. We’ll send a verification link—your vote counts after you verify. You can vote for each petition once per email (e.g. twice for Waterman: VC and DSO).</p>
            </div>
            <PetitionForm
              petitionId={selectedPetition.id}
              onSuccess={(verificationUrl) => {
                setSignedIds((prev) => new Set(prev).add(selectedPetition.id));
                if (verificationUrl) setVerificationUrls((prev) => ({ ...prev, [selectedPetition.id]: verificationUrl }));
              }}
              onCountUpdate={handleCountUpdate}
              signatureCount={counts[selectedPetition.id]}
              hideSignatureCount
            />
          </div>
        )}
      </div>
    </section>
  );
}
