'use client';

import Image from 'next/image';
import Link from 'next/link';

const bookTitle = "The Chaplain's Diary";
const subtitle = "The Chaplain VC Case";
const description =
  "A compelling account of the Victoria Cross case, drawn from the chaplain's diary. This volume offers historical context and firsthand perspective on the events and individuals involved.";

const defaultAmazonUrl = 'https://www.amazon.ca/s?k=The+Chaplain%27s+Diary';
const buyUrl = process.env.NEXT_PUBLIC_BOOK_URL || defaultAmazonUrl;
const learnMoreUrl = '/history';
const price = process.env.NEXT_PUBLIC_BOOK_PRICE || '24.99';

const hasBookCover = false;

const productDetails = [
  {
    title: 'Price',
    value: `$${price}`,
    description: 'CAD, before applicable taxes.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Confirmation email',
    value: 'Sent right after order',
    description: 'You’ll receive an order confirmation and tracking details by email.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function BookPurchase() {
  return (
    <div className="animate-fade-in">
      {/* Product card */}
      <div className="rounded-2xl border border-heritage-gold/20 bg-white/95 backdrop-blur-sm shadow-xl shadow-heritage-navy/5 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Cover + main info */}
          <div className="flex flex-col sm:flex-row lg:flex-1 p-6 md:p-8 gap-6 md:gap-8">
            <div className="flex-shrink-0 w-full max-w-[260px] aspect-[3/4] mx-auto sm:mx-0 relative rounded-xl overflow-hidden border border-heritage-navy/10 bg-gradient-to-br from-heritage-parchment to-heritage-charcoal/5 shadow-inner-vintage">
              {hasBookCover ? (
                <Image
                  src="/book-cover.jpg"
                  alt={bookTitle}
                  fill
                  className="object-cover"
                  sizes="260px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-heritage-charcoal/40 p-4">
                  <span className="font-serif text-lg">The Chaplain&apos;s Diary</span>
                  <span className="text-xs mt-1">Cover</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <p className="text-sm font-medium text-heritage-gold uppercase tracking-wider mb-1">
                {subtitle}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-heritage-navy font-bold mb-3">
                {bookTitle}
              </h2>
              <p className="text-heritage-charcoal/90 leading-relaxed mb-6 flex-1">
                {description}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={buyUrl}
                  target={buyUrl.startsWith('http') ? '_blank' : undefined}
                  rel={buyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center gap-2 bg-heritage-navy text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-heritage-navy-dark transition-all duration-200 shadow-lg shadow-heritage-navy/20 hover:shadow-heritage-gold/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Buy Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <Link
                  href={learnMoreUrl}
                  className="inline-flex items-center justify-center gap-2 bg-white text-heritage-navy border-2 border-heritage-navy/30 px-6 py-3.5 rounded-xl font-semibold hover:bg-heritage-navy/5 hover:border-heritage-gold/50 transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Price, Confirmation email */}
        <div className="border-t border-heritage-navy/10 bg-heritage-stone/50">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-heritage-navy/10">
            {productDetails.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 md:p-6 text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-heritage-gold/15 text-heritage-gold flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-heritage-navy/70 mb-0.5">
                    {item.title}
                  </p>
                  <p className="font-serif text-lg font-bold text-heritage-navy">
                    {item.value}
                  </p>
                  <p className="text-sm text-heritage-charcoal/80 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
