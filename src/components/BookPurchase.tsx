import Image from 'next/image';

const bookTitle = "The Chaplain's Diary";
const subtitle = "The Chaplain VC Case";
const description = "A compelling account of the Victoria Cross case, drawn from the chaplain's diary. This volume offers historical context and firsthand perspective on the events and individuals involved.";
const buyUrl = process.env.NEXT_PUBLIC_BOOK_URL || '#';
const learnMoreUrl = '/history'; // or a dedicated book details page

const hasBookCover = false; // Set to true when /book-cover.jpg is in public/

export function BookPurchase() {
  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
      <div className="flex-shrink-0 w-full max-w-[280px] aspect-square relative rounded overflow-hidden border border-heritage-navy/10 shadow-lg bg-heritage-charcoal/10">
        {hasBookCover ? (
          <Image
            src="/book-cover.jpg"
            alt={bookTitle}
            width={280}
            height={280}
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-heritage-charcoal/50 text-sm font-serif">
            Book cover
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="font-serif text-xl md:text-2xl text-heritage-navy mb-4">
          {subtitle}
        </h2>
        <p className="text-heritage-charcoal mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={buyUrl}
            target={buyUrl.startsWith('http') ? '_blank' : undefined}
            rel={buyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-block bg-heritage-navy text-white px-6 py-3 rounded font-medium hover:bg-heritage-navy/90 transition-colors"
          >
            Buy Now
          </a>
          <a
            href={learnMoreUrl}
            className="inline-block bg-white text-heritage-navy border-2 border-heritage-navy px-6 py-3 rounded font-medium hover:bg-heritage-navy/5 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
