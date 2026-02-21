import { BookPurchase } from '@/components/BookPurchase';
import { BookReviews } from '@/components/book/BookReviews';
import { ShareWidget } from '@/components/home/ShareWidget';

export const metadata = {
  title: 'The Chaplain\'s Diary – Victoriacross.ca',
  description: 'Purchase the book The Chaplain\'s Diary.',
};

export default function BookPage() {
  return (
    <div className="relative min-h-screen">
      {/* Full-page map background – same as forum page */}
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
      <div className="relative max-w-5xl mx-auto px-4 py-10">
        <h1 className="font-serif text-3xl md:text-4xl text-heritage-navy text-center border-b border-heritage-navy/30 pb-2 mb-10">
          The Chaplain&apos;s Diary
        </h1>
        <BookPurchase />
        <BookReviews />
      </div>
      <ShareWidget floating />
    </div>
  );
}
