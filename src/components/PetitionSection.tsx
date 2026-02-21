'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { PetitionForm } from './PetitionForm';
import { PetitionThankYou } from './PetitionThankYou';

const PETITIONS: Array<{
  id: string;
  title: string;
  description: string;
  portraitSrc: string;
  portraitAlt: string;
  signatureCountDecorative?: boolean;
}> = [
  {
    id: 'waterman',
    title: 'Review of Waterman VC case',
    description: 'Support a review of Ronald Waterman’s Victoria Cross case.',
    portraitSrc: '/hero-waterman.png',
    portraitAlt: 'Ronald Waterman',
    signatureCountDecorative: true,
  },
  {
    id: 'hickey',
    title: 'Review of Hickey VC case',
    description: 'Support a review of Alphonsus Hickey’s Victoria Cross case.',
    portraitSrc: '/hero-hickey.png',
    portraitAlt: 'Alphonsus Hickey',
    signatureCountDecorative: true,
  },
];

export function PetitionSection() {
  const [signedId, setSignedId] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
    PETITIONS.forEach((p) => {
      fetch(`${apiUrl}/api/petitions/${p.id}/count`)
        .then((r) => r.json())
        .then((data) => setCounts((prev) => ({ ...prev, [p.id]: data.count ?? 0 })))
        .catch(() => setCounts((prev) => ({ ...prev, [p.id]: 0 })));
    });
  }, []);

  function handleCountUpdate(petitionId: string, count: number) {
    setCounts((prev) => ({ ...prev, [petitionId]: count }));
  }

  return (
    <section className="space-y-10 md:space-y-12">
      {PETITIONS.map((petition) => (
        <div
          key={petition.id}
          id={`petition-${petition.id}`}
          className="relative"
        >
          {/* Ornate dark brown wooden frame */}
          <div
            className="relative p-2 md:p-3 rounded-sm"
            style={{
              border: '8px solid #4a3728',
              boxShadow: 'inset 0 0 0 1px rgba(201, 162, 39, 0.2), 2px 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            {/* Inner: photo with caption at bottom, then form */}
            <div className="relative flex flex-col md:flex-row bg-heritage-stone/95 rounded-sm overflow-hidden border border-heritage-gold/20 min-h-[280px]">
              {/* Left: portrait (photo) with title, description, signatures at bottom */}
              <div className="relative w-full md:w-56 flex-shrink-0">
                <div className="relative w-full aspect-[3/4] max-h-[320px] md:max-h-[380px] min-h-[200px] rounded-l-sm overflow-hidden border-r border-heritage-gold/20">
                  <Image
                    src={petition.portraitSrc}
                    alt=""
                    fill
                    className="object-cover object-top grayscale contrast-110"
                    sizes="(max-width: 768px) 100vw, 224px"
                  />
                  {/* Caption at bottom of photo */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent pt-8 pb-3 px-3 text-white">
                    <h2 className="font-serif text-lg md:text-xl text-white">
                      {petition.title}
                    </h2>
                    <p className="text-sm text-white/90 mt-0.5">
                      {petition.description}
                    </p>
                    {counts[petition.id] !== undefined && (
                      <p
                        className={
                          petition.signatureCountDecorative
                            ? 'text-sm inline-block border border-heritage-gold/50 rounded px-2 py-1 mt-2 text-white/95'
                            : 'text-sm mt-2 text-white/95'
                        }
                      >
                        Signatures: <span data-counter>{counts[petition.id]}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Right: form or thank-you only */}
              <div className="flex-1 p-5 md:p-6 flex flex-col min-w-0 justify-center">
                {signedId === petition.id ? (
                  <PetitionThankYou petitionId={petition.id} />
                ) : (
                  <PetitionForm
                    petitionId={petition.id}
                    onSuccess={() => setSignedId(petition.id)}
                    onCountUpdate={handleCountUpdate}
                    signatureCount={counts[petition.id]}
                    hideSignatureCount
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
