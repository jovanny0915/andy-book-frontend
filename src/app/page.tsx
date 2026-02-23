import { HeroSection } from '@/components/home/HeroSection';
import { ShortIntroduction } from '@/components/home/ShortIntroduction';
import { FocusTiles } from '@/components/home/FocusTiles';
import { LivePetitionCounter } from '@/components/home/LivePetitionCounter';
import { BuyMeACoffeeWidget } from '@/components/home/BuyMeACoffeeWidget';
import { ShareWidget } from '@/components/home/ShareWidget';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Full-page map background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/map-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundColor: '#f0ede6',
        }}
        aria-hidden
      />
      <div className="relative">
        <HeroSection />
        <ShortIntroduction />
        <FocusTiles />
        <LivePetitionCounter />
      </div>
      <BuyMeACoffeeWidget floating />
      <ShareWidget floating />
    </div>
  );
}
