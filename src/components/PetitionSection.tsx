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
      sizes="(max-width: 640px) 100vw, 288px"
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
    portraitSrc: '/waterman-portrait.png?v=real',
    portraitAlt: 'Ronald Waterman',
    signatureCountDecorative: true,
  },
  {
    id: 'waterman-dso',
    shortTitle: 'DSO',
    title: 'Petition for Waterman to receive the DSO',
    description: 'Support Ronald Waterman to be awarded the Distinguished Service Order.',
    portraitSrc: '/waterman-portrait.png?v=real',
    portraitAlt: 'Ronald Waterman',
    signatureCountDecorative: true,
  },
  {
    id: 'hickey',
    shortTitle: 'Hickey',
    title: 'Petition for Hickey to receive the Victoria Cross',
    description: 'Support Alphonsus Hickey to be awarded the Victoria Cross.',
    portraitSrc: '/hero-hickey.png?v=real',
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
    portraitSrc: '/waterman-portrait.png?v=real',
    portraitAlt: 'Ronald Waterman',
    fallbackPortrait: '/hero-waterman.png?v=real',
    subsections: [
      PETITION_LIST.find((p) => p.id === 'waterman-vc')!,
      PETITION_LIST.find((p) => p.id === 'waterman-dso')!,
    ],
  },
  {
    sectionTitle: 'Alphonsus Hickey',
    portraitSrc: '/hero-hickey.png?v=real',
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

      <div className="relative overflow-hidden rounded-2xl border border-heritage-gold/30 bg-gradient-to-r from-white via-heritage-stone/20 to-heritage-gold/10 px-6 py-5 md:px-8">
        <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-heritage-gold/15 blur-2xl" />
        <div className="relative flex flex-col gap-3">
          <p className="text-base md:text-lg text-heritage-charcoal/90 leading-relaxed">
            This petition calls for a formal review of Corporal Hickey and Colonel Waterman&apos;s actions for the Victoria Cross.
          </p>
          <div className="inline-flex w-fit items-center rounded-full border border-heritage-gold/50 bg-heritage-gold/20 px-4 py-1.5 text-sm font-semibold tracking-wide text-heritage-navy">
            Target: 10,000 signatures for formal submission.
          </div>
        </div>
      </div>

      {/* Section cards: Waterman (VC + DSO subsections) and Hickey — section is clickable, defaults to first subsection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                  ? 'border-heritage-gold bg-heritage-gold/10 shadow-lg shadow-heritage-gold/25 ring-2 ring-heritage-gold/50 ring-inset'
                  : 'border-heritage-charcoal/20 bg-white hover:border-heritage-gold/40 hover:shadow-md'
              }`}
            >
              <div className="relative flex flex-col sm:flex-row min-h-[280px] md:min-h-[320px]">
                <div className="relative w-full sm:w-56 md:w-72 flex-shrink-0 aspect-[4/3] sm:aspect-square">
                  <PetitionPortrait
                    src={section.portraitSrc}
                    alt={section.portraitAlt}
                    fallbackSrc={section.fallbackPortrait}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:from-transparent sm:via-transparent sm:to-transparent group-hover:sm:from-transparent" />
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center min-w-0">
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-heritage-navy">
                    {section.sectionTitle}
                  </h2>
                  <p className="text-base text-heritage-charcoal/70 mt-1">
                    {section.subsections.length > 1
                      ? 'Click a petition to add your vote:'
                      : 'Petition to receive the Victoria Cross'}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3" onClick={(e) => e.stopPropagation()}>
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
                          className={`inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold focus-visible:ring-offset-2 ${
                            isSelected
                              ? 'border-heritage-gold bg-heritage-gold text-heritage-navy shadow'
                              : 'border-heritage-charcoal/25 bg-heritage-stone/30 text-heritage-charcoal hover:border-heritage-gold/70 hover:bg-heritage-gold/15'
                          }`}
                        >
                          <span>Vote — {sub.shortTitle}</span>
                          <span className="tabular-nums text-heritage-charcoal/90">
                            {counts[sub.id] !== undefined ? displayCount(sub.id, counts[sub.id]) : '—'} votes
                            {sub.id === 'hickey' && (
                              <span className="font-normal"> (15k from prior)</span>
                            )}
                          </span>
                          {isSelected && <span className="text-heritage-navy font-bold" aria-hidden>✓</span>}
                          {hasSigned && <span className="text-emerald-600" aria-hidden>✓</span>}
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

      {/* Form / thank-you panel — only show when a petition is selected or after voting */}
      {selectedPetition && (
      <div className="rounded-2xl border border-heritage-gold/25 bg-white/95 shadow-xl shadow-heritage-navy/5 overflow-hidden">
        {signedIds.has(selectedPetition.id) ? (
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
      )}
    </section>
  );
}
