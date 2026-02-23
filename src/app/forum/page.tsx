import { Suspense } from 'react';
import { ForumSection } from '@/components/ForumSection';
import { ForumSidebar } from '@/components/ForumSidebar';
import { ShareWidget } from '@/components/home/ShareWidget';
import { BuyMeACoffeeWidget } from '@/components/home/BuyMeACoffeeWidget';

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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main content – first on mobile for accessibility */}
          <main className="flex-1 min-w-0 order-2 lg:order-2">
            <Suspense fallback={<div className="rounded-2xl border border-heritage-gold/20 bg-white/80 h-48 animate-pulse" />}>
              <ForumSection />
            </Suspense>
          </main>
          {/* Sidebar: categories + support – first on desktop */}
          <div className="order-1 lg:order-1 lg:w-72 flex-shrink-0">
            <Suspense fallback={<div className="rounded-2xl border border-heritage-gold/20 bg-white/80 h-64 animate-pulse" />}>
              <ForumSidebar />
            </Suspense>
          </div>
        </div>
      </div>
      <BuyMeACoffeeWidget floating />
      <ShareWidget floating />
    </div>
  );
}
