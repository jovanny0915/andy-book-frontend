'use client';

import { ShareButtons } from './ShareButtons';

type Props = {
  petitionId: string;
  petitionTitle?: string;
  /** When present (e.g. dev without email), show a link to verify manually */
  verificationUrl?: string;
};

/** Use current origin so the link works in prod even if backend sent localhost. */
function normalizeVerificationUrl(url: string): string {
  if (typeof window === 'undefined') return url;
  try {
    const parsed = new URL(url);
    return `${window.location.origin}${parsed.pathname}${parsed.search}`;
  } catch {
    return url;
  }
}

export function PetitionThankYou({ petitionId, petitionTitle, verificationUrl }: Props) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const displayVerificationUrl = verificationUrl ? normalizeVerificationUrl(verificationUrl) : undefined;
  const label = petitionTitle ?? (petitionId.startsWith('waterman') ? 'Waterman' : 'Hickey');
  const shareText = `I've signed the petition: ${label}. Add your voice: ${shareUrl}`;

  return (
    <div className="rounded-2xl border border-heritage-gold/30 bg-gradient-to-br from-heritage-stone to-heritage-parchment/50 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
          <span className="text-2xl text-emerald-600" aria-hidden>✓</span>
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-xl text-heritage-navy font-semibold">Thank you for your vote</h3>
          <p className="text-heritage-charcoal mt-2 leading-relaxed">
            Please check your email and click the verification link. Your vote will be counted once verified.
          </p>
          {displayVerificationUrl && (
            <p className="text-sm text-heritage-charcoal mt-3">
              If you didn&apos;t receive the email,{' '}
              <a href={displayVerificationUrl} className="text-heritage-navy underline font-medium">
                click here to verify your vote
              </a>
              .
            </p>
          )}
          <p className="text-sm text-heritage-charcoal/70 mt-3">
            One vote per email per petition. You can vote for the other petitions too (e.g. both Waterman VC and Waterman DSO).
          </p>
          <div className="mt-6 pt-6 border-t border-heritage-charcoal/10">
            <ShareButtons url={shareUrl} title="Petition signed" text={shareText} />
          </div>
        </div>
      </div>
    </div>
  );
}
