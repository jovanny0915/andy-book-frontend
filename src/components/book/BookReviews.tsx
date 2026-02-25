import Image from 'next/image';

const bookTitle = "The Chaplain's Diary";
const hasBookCover = true;

type Review = {
  title: string;
  rating: number;
  quote: string;
};

const reviews: Review[] = [
  {
    title: "Review of The Chaplain's Diary",
    rating: 5,
    quote: "A moving and meticulously researched account. Essential reading for anyone interested in the Victoria Cross and the individuals behind the citations.",
  },
  {
    title: "Powerful historical narrative",
    rating: 5,
    quote: "The chaplain's perspective brings a unique depth to the story. Highly recommended for history enthusiasts and those who want to understand the human side of these events.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= rating ? 'text-heritage-gold' : 'text-heritage-charcoal/30'}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function BookReviews() {
  return (
    <section className="mt-14 pt-10 border-t border-heritage-navy/10">
      <h2 className="font-serif text-2xl text-heritage-navy mb-8">Reviews</h2>
      <ul className="space-y-6">
        {reviews.map((review, i) => (
          <li
            key={i}
            className="flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-lg border border-heritage-navy/10 shadow-sm"
          >
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative rounded overflow-hidden border border-heritage-navy/10 bg-heritage-charcoal/10">
              {hasBookCover ? (
                <Image
                  src="/book-cover.jpg"
                  alt=""
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-heritage-charcoal/40 text-xs">
                  Cover
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-lg text-heritage-navy mb-1">{review.title}</h3>
              <StarRating rating={review.rating} />
              <blockquote className="mt-3 text-heritage-charcoal/90 text-sm leading-relaxed italic">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
