import { HeroWithPortraits } from '@/components/home/HeroWithPortraits';
import { HistoricalCards } from '@/components/home/HistoricalCards';
import { PetitionAndForumSection } from '@/components/home/PetitionAndForumSection';
import { ShareWidget } from '@/components/home/ShareWidget';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Full-page map background – no overlay so the map stays visible */}
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
        <HeroWithPortraits />
        <div className="min-h-screen">
          <HistoricalCards />
          <PetitionAndForumSection />
        </div>
      </div>
      <ShareWidget floating />
    </div>
  );
}
