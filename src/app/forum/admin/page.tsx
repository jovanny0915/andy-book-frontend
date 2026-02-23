import Link from 'next/link';
import { ForumAdminPanel } from '@/components/forum/ForumAdminPanel';

export const metadata = {
  title: 'Forum moderation – Victoriacross.ca',
  description: 'Admin moderation panel for the forum. Ban users, review reported posts.',
};

export default function ForumAdminPage() {
  return (
    <div className="relative min-h-screen">
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
      <div className="relative max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Link
          href="/forum"
          className="inline-flex items-center gap-2 text-heritage-navy hover:text-heritage-navy-dark font-medium text-sm mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to forum
        </Link>
        <ForumAdminPanel />
      </div>
    </div>
  );
}
