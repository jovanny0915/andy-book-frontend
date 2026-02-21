import { PetitionSection } from '@/components/PetitionSection';

export const metadata = {
  title: 'Petitions – Victoriacross.ca',
  description: 'Sign the petitions for review of the Waterman and Hickey Victoria Cross cases.',
};

export default function PetitionsPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background: textured crumpled paper (replace with your image when provided) */}
      <div
        className="absolute inset-0 bg-heritage-parchment bg-parchment-texture"
        aria-hidden
      />
      {/* Optional: paper texture image - set when resource is provided
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: 'url(/paper-texture.png)' }}
      */}

      {/* Right-side accent: medal on velvet (full image visible, no crop) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute w-[70vw] max-w-[580px] bg-no-repeat"
          style={{
            backgroundImage: 'url(/medal-velvet.png)',
            backgroundSize: 'cover',
            backgroundPosition: '100% 50%',
            height: '100dvh',
            top: '0',
            right: '0',
            position: 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-heritage-parchment via-heritage-parchment/50 to-transparent" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-10 md:py-14">
        <PetitionSection />
      </div>
    </div>
  );
}
