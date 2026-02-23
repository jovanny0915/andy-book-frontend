import { PetitionSection } from '@/components/PetitionSection';

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
        {/* Hero block */}
        <header className="text-center px-4 pt-12 pb-8 md:pt-16 md:pb-12">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-heritage-navy tracking-tight">
            Vote & Petitions
          </h1>
          <p className="mt-3 md:mt-4 text-heritage-charcoal/80 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Your verified vote supports petitions for Waterman (VC and DSO) and Hickey (VC). One vote per email per petition—you can vote twice for Waterman. Counted after verification.
          </p>
        </header>

        <div className="max-w-4xl mx-auto px-4 pb-16 md:pb-20">
          <PetitionSection />
        </div>
      </div>
    </div>
  );
}
