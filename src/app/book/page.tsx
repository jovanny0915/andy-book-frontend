import { BookPurchase } from '@/components/BookPurchase';
import { BookReviews } from '@/components/book/BookReviews';
import { ShareWidget } from '@/components/home/ShareWidget';
import { BuyMeACoffeeWidget } from '@/components/home/BuyMeACoffeeWidget';
import { BookPassage } from '@/content/bookPassage';

export const metadata = {
  title: 'The Chaplain\'s Diary – Victoriacross.ca',
  description: 'Purchase the book The Chaplain\'s Diary. Price, shipping, and order confirmation by email.',
};

export default function BookPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-heritage-stone/40 via-transparent to-heritage-stone/60" aria-hidden />

      <div className="relative max-w-4xl mx-auto px-4 py-10 md:py-14">
        {/* Page title */}
        <header className="text-center mb-10 md:mb-12">
          <p className="text-sm font-medium text-heritage-gold uppercase tracking-widest mb-2">
            Product
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-heritage-navy font-bold tracking-tight">
            The Chaplain&apos;s Diary
          </h1>
          <div className="mt-4 h-1 w-20 bg-heritage-gold/80 rounded-full mx-auto" aria-hidden />
        </header>

        {/* About the book – passage adapted from The Chaplain's Diary */}
        <section className="mb-10 md:mb-12">
          <div className="rounded-2xl border border-heritage-gold/20 bg-white/95 backdrop-blur-sm p-6 md:p-8 shadow-lg shadow-heritage-navy/5">
            <h2 className="font-serif text-xl md:text-2xl text-heritage-navy font-semibold mb-4 sr-only">
              About the book
            </h2>
            <div className="prose prose-lg text-heritage-charcoal leading-relaxed space-y-4 max-w-none">
              <BookPassage />
            </div>
          </div>
        </section>

        {/* Product: Price, Shipping, Confirmation email */}
        <BookPurchase />

        {/* Reviews */}
        <BookReviews />
      </div>
      <BuyMeACoffeeWidget floating />
      <ShareWidget floating />
    </div>
  );
}
