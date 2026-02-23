import { PetitionSection } from '@/components/PetitionSection';
import { ShareWidget } from '@/components/home/ShareWidget';
import { BuyMeACoffeeWidget } from '@/components/home/BuyMeACoffeeWidget';

export const metadata = {
  title: 'Vote & Petitions – Victoriacross.ca',
  description: 'Add your verified vote. Petitions for Waterman to receive the VC and DSO, and for Hickey to receive the VC. One vote per email per petition.',
};

export default function PetitionsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background: subtle gradient + light pattern */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-heritage-stone via-heritage-parchment/80 to-heritage-stone"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-parchment-texture opacity-30"
        aria-hidden
      />
      {/* Soft accent gradient from right */}
      <div
        className="absolute top-0 right-0 w-[min(80vw,520px)] h-[70vh] bg-gradient-to-bl from-heritage-navy/8 via-heritage-gold/5 to-transparent rounded-bl-[120px] pointer-events-none"
        aria-hidden
      />

      <div className="relative">
        <header className="text-center px-4 pt-8 pb-4 md:pt-10 md:pb-6">
          <h1 className="font-serif text-2xl md:text-3xl text-heritage-navy tracking-tight">
            Vote & Petitions
          </h1>
        </header>

        <div className="max-w-6xl mx-auto px-4 pb-16 md:pb-20">
          <PetitionSection />
        </div>
      </div>
      <BuyMeACoffeeWidget floating />
      <ShareWidget floating />
    </div>
  );
}
