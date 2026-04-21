'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type Review = {
  id?: string;
  title: string;
  rating: number;
  quote: string;
  reviewerName?: string;
};

const hasBookCover = true;

const initialForm = {
  reviewerName: '',
  title: '',
  rating: 5,
  quote: '',
  consent: false,
};

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);

  const apiUrl = useMemo(() => process.env.NEXT_PUBLIC_API_URL ?? '', []);

  useEffect(() => {
    let mounted = true;
    async function loadReviews() {
      try {
        const res = await fetch(`${apiUrl}/api/reviews`);
        const json = await res.json().catch(() => ({}));
        if (!mounted) return;
        if (res.ok && Array.isArray(json.reviews)) {
          setReviews(json.reviews);
        }
      } catch {
        // Keep current reviews if API is unavailable.
      } finally {
        if (mounted) setIsLoadingReviews(false);
      }
    }
    loadReviews();
    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      if (!apiUrl) {
        setError('API address is not configured. Set NEXT_PUBLIC_API_URL for this site.');
        return;
      }

      const reviewerName = form.reviewerName.trim();
      const title = form.title.trim();
      const quote = form.quote.trim();
      const rating = Math.min(5, Math.max(1, Math.round(Number(form.rating))));

      const payload = {
        reviewerName,
        title,
        rating,
        quote,
        consent: form.consent === true,
      };

      const res = await fetch(`${apiUrl}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { message?: string };

      if (!res.ok) {
        setError(json.message || 'Could not submit your review. Please try again.');
        return;
      }

      setReviews((prev) => [
        {
          title,
          quote,
          rating,
          reviewerName,
        },
        ...prev,
      ]);
      setSuccess(json.message || 'Thanks! Your review was submitted.');
      setForm(initialForm);
      setIsFormOpen(false);
    } catch {
      setError('Unable to submit right now. Please try again shortly.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-14 pt-10 border-t border-heritage-navy/10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="font-serif text-2xl text-heritage-navy">Reviews</h2>
        <button
          type="button"
          onClick={() => {
            setError(null);
            setSuccess(null);
            setIsFormOpen((prev) => !prev);
          }}
          className="inline-flex items-center justify-center rounded-xl bg-heritage-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-heritage-navy-dark transition-colors"
          aria-expanded={isFormOpen}
          aria-controls="leave-review-form"
        >
          {isFormOpen ? 'Close Review Form' : 'Leave a Review'}
        </button>
      </div>

      {isFormOpen && (
        <form
          id="leave-review-form"
          onSubmit={handleSubmit}
          className="mb-8 p-5 rounded-xl border border-heritage-gold/30 bg-white/95 shadow-sm space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reviewerName" className="block text-sm font-medium text-heritage-navy mb-1.5">
                Your name
              </label>
              <input
                id="reviewerName"
                type="text"
                required
                value={form.reviewerName}
                onChange={(e) => setForm((prev) => ({ ...prev, reviewerName: e.target.value }))}
                className="w-full border border-heritage-charcoal/20 rounded-xl px-3 py-2.5 bg-white text-heritage-charcoal focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="reviewRating" className="block text-sm font-medium text-heritage-navy mb-1.5">
                Rating
              </label>
              <select
                id="reviewRating"
                value={form.rating}
                onChange={(e) => setForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                className="w-full border border-heritage-charcoal/20 rounded-xl px-3 py-2.5 bg-white text-heritage-charcoal focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
              >
                <option value={5}>5 stars</option>
                <option value={4}>4 stars</option>
                <option value={3}>3 stars</option>
                <option value={2}>2 stars</option>
                <option value={1}>1 star</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="reviewTitle" className="block text-sm font-medium text-heritage-navy mb-1.5">
              Review title
            </label>
            <input
              id="reviewTitle"
              type="text"
              required
              maxLength={120}
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full border border-heritage-charcoal/20 rounded-xl px-3 py-2.5 bg-white text-heritage-charcoal focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
              placeholder="Short headline for your review"
            />
          </div>

          <div>
            <label htmlFor="reviewQuote" className="block text-sm font-medium text-heritage-navy mb-1.5">
              Your review
            </label>
            <textarea
              id="reviewQuote"
              required
              maxLength={1200}
              rows={4}
              value={form.quote}
              onChange={(e) => setForm((prev) => ({ ...prev, quote: e.target.value }))}
              className="w-full border border-heritage-charcoal/20 rounded-xl px-3 py-2.5 bg-white text-heritage-charcoal focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
              placeholder="Share what you thought about the book"
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              id="reviewConsent"
              type="checkbox"
              required
              checked={form.consent}
              onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
              className="mt-1 rounded border-heritage-charcoal/30 text-heritage-navy focus:ring-heritage-gold"
            />
            <label htmlFor="reviewConsent" className="text-sm text-heritage-charcoal">
              I confirm this review is based on my own reading experience.
            </label>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-heritage-navy text-white px-5 py-2.5 text-sm font-semibold hover:bg-heritage-navy-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <p className="text-xs text-heritage-charcoal/70">Your review appears after successful submission.</p>
          </div>
        </form>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <ul className="space-y-6">
        {reviews.map((review, i) => (
          <li
            key={review.id || `${review.title}-${i}`}
            className="flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-lg border border-heritage-navy/10 shadow-sm"
          >
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative rounded overflow-hidden border border-heritage-navy/10 bg-heritage-charcoal/10">
              {hasBookCover ? (
                <Image
                  src="/book-cover.jpg"
                  alt=""
                  width={96}
                  height={96}
                  className="object-contain object-top w-full h-full p-1"
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
              {review.reviewerName && (
                <p className="mt-1 text-xs text-heritage-charcoal/70">By {review.reviewerName}</p>
              )}
              <blockquote className="mt-3 text-heritage-charcoal/90 text-sm leading-relaxed italic">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
            </div>
          </li>
        ))}
      </ul>
      {!isLoadingReviews && reviews.length === 0 && (
        <p className="mt-5 text-sm text-heritage-charcoal/80">No public reviews yet. Be the first to leave one.</p>
      )}
    </section>
  );
}
