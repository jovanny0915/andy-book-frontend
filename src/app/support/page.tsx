import { SupportContent } from '@/components/support/SupportContent';
import { ShareWidget } from '@/components/home/ShareWidget';
import { BuyMeACoffeeWidget } from '@/components/home/BuyMeACoffeeWidget';

export const metadata = {
  title: 'Support – Victoriacross.ca',
  description: 'Share the project or make a one-time donation to support Victoriacross.ca.',
};

export default function SupportPage() {
  return (
    <div className="relative min-h-screen">
      {/* Full-page map background – same as forum/book */}
      <div
        className="fixed inset-0 -z-10 blur-sm"
        style={{
          backgroundImage: 'url(/map-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundColor: '#f0ede6',
        }}
        aria-hidden
      />
      <SupportContent />
      <BuyMeACoffeeWidget floating />
      <ShareWidget floating />
    </div>
  );
}
