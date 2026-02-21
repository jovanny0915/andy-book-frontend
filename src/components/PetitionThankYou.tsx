'use client';

import { ShareButtons } from './ShareButtons';

type Props = {
  petitionId: string;
};

export function PetitionThankYou({ petitionId }: Props) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `I've signed the petition for the review of the ${petitionId === 'waterman' ? 'Waterman' : 'Hickey'} VC case. Add your voice: ${shareUrl}`;

  return (
    <div className="border border-heritage-gold/50 rounded-lg p-6 bg-heritage-stone">
      <p className="text-heritage-navy font-medium mb-2">Thank you for signing.</p>
      <p className="text-heritage-charcoal text-sm mb-4">
        Please check your email to verify your signature. The counter will update after verification.
      </p>
      <ShareButtons url={shareUrl} title="Petition signed" text={shareText} />
    </div>
  );
}
