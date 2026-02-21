import { ForumSection } from '@/components/ForumSection';
import { ForumSidebar } from '@/components/ForumSidebar';
import { ShareWidget } from '@/components/home/ShareWidget';

export const metadata = {
  title: 'Forum – Victoriacross.ca',
  description: 'Moderated discussion forum for Victoriacross.ca. Share your thoughts on historical insights.',
};

export default function ForumPage() {
  return (
    <div className="relative min-h-screen">
      {/* Full-page map background – same as home page */}
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
      <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Main content */}
          <main className="flex-1 min-w-0">
            <ForumSection />
          </main>
          {/* Left sidebar on large screens (order after main on mobile so main content first) */}
          <div className="lg:order-first">
            <ForumSidebar />
          </div>
        </div>
      </div>
      <ShareWidget floating />
    </div>
  );
}
